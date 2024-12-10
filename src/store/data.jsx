import { supabase } from "../config/supabase";
import { throttle } from "lodash";

// 声明状态变量
let clothingItems = [];
let outfits = [];

// 导出
export { clothingItems, outfits };

// 上传图片到 Cloudinary
const uploadToCloudinary = async (file) => {
  try {
    // 创建 FormData
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    );

    // 上传图片
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`上传失败: ${errorData.error?.message || "未知错误"}`);
    }

    const data = await response.json();
    return data.secure_url; // 返回图片URL
  } catch (error) {
    console.error("上传图片失败:", error);
    throw error;
  }
};

// 添加数据对比函数
const hasDataChanged = (newClothes, newOutfits) => {
  // 如果数据长度不同，说明有变化
  if (
    newClothes.length !== clothingItems.length ||
    newOutfits.length !== outfits.length
  ) {
    return true;
  }

  // 比较每个衣物项的ID是否相同
  const clothesChanged = newClothes.some(
    (item, index) => item.id !== clothingItems[index]?.id
  );

  // 比较每个穿搭项的ID是否相同
  const outfitsChanged = newOutfits.some(
    (item, index) => item.id !== outfits[index]?.id
  );

  return clothesChanged || outfitsChanged;
};

// 添加节流函数
export const throttledInitialize = throttle(async () => {
  await initializeData();
}, 1000);

// 初始化数据
export const initializeData = async () => {
  try {
    const [clothesResponse, outfitsResponse] = await Promise.all([
      supabase
        .from("clothing")
        .select("*")
        .order("created_at", { ascending: false }), //按照最新上传时间排序
      supabase
        .from("outfits")
        .select(
          `
        *,
        outfit_clothing (
          clothing (*)
        )
      `
        )
        .order("created_at", { ascending: false }), //按照最新创建时间排序
    ]);
    // 如果获取数据失败
    if (clothesResponse.error || outfitsResponse.error) {
      throw new Error("获取数据失败");
    }

    // 如果获取成功，先处理Promise.all的response结果
    if (hasDataChanged(clothesResponse.data, outfitsResponse.data)) {
      clothingItems = clothesResponse.data;
      outfits = outfitsResponse.data;
      // 发布者：触发"dataUpdated"事件
      window.dispatchEvent(new CustomEvent("dataUpdated"));
    }
  } catch (error) {
    console.error("初始化数据失败:", error);
    return false;
  }
};

// 添加衣物
export const addClothingItem = async (item) => {
  try {
    // 先上传图片到 Cloudinary
    const imageUrl = await uploadToCloudinary(item.file);

    // 创建新的衣物数据
    const newItem = {
      image_url: imageUrl,
      category: item.category,
      tags: item.tags,
    };

    // 保存到后端
    const { data, error } = await supabase
      .from("clothing")
      .insert([newItem])
      .select();

    if (error) throw error;
    // 更新本地状态
    clothingItems = [data[0], ...clothingItems];
    // 触发更新事件
    window.dispatchEvent(new CustomEvent("dataUpdated"));
  } catch (error) {
    console.error("添加衣物失败:", error);
    throw error;
  }
};

// 获取特定衣物的详细信息
export const getClothingById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("clothing")
      .select("*")
      .eq("id", id)
      .single(); // 获取单个记录

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("获取衣物失败:", error);
    throw error;
  }
};

// 更新衣物信息
export const updateClothingItem = async (id, updatedItem) => {
  try {
    // 如果有新的文件，先上传图片到 Cloudinary
    let imageUrl = updatedItem.file
      ? await uploadToCloudinary(updatedItem.file)
      : null;

    // 更新衣物数据
    const { data, error } = await supabase
      .from("clothing")
      .update({
        image_url: imageUrl || updatedItem.image_url, // 如果没有新图片，保持原有图片
        category: updatedItem.category,
        tags: updatedItem.tags,
      })
      .eq("id", id)
      .select();

    if (error) throw error;

    // 更新本地状态
    clothingItems = clothingItems.map((item) =>
      item.id === id ? { ...item, ...data[0] } : item
    );

    // 触发更新事件
    window.dispatchEvent(new CustomEvent("dataUpdated"));
  } catch (error) {
    console.error("更新衣物失败:", error);
    throw error;
  }
};

// 添加穿搭
export const addOutfit = async (outfit) => {
  try {
    let imageUrls = [];
    if (outfit.photo) {
      const photoUrl = await uploadToCloudinary(outfit.photo);
      imageUrls.push(photoUrl);
    }

    const outfitData = {
      name: outfit.name,
      image_urls: imageUrls,
      tags: outfit.tags || [],
    };

    const { data: newOutfit, error: outfitError } = await supabase
      .from("outfits")
      .insert([outfitData])
      .select();
    if (outfitError) throw outfitError;

    // 添加outfit_clothing关联
    if (outfit.items && outfit.items.length > 0) {
      const relationships = outfit.items.map((itemId) => ({
        outfit_id: newOutfit[0].id,
        clothing_id: itemId,
      }));

      const { error: relationError } = await supabase
        .from("outfit_clothing")
        .insert(relationships);

      if (relationError) throw relationError;
    }

    // 获取完整的outfit数据(包括关联的clothing)
    const { data: completeOutfit, error: fetchError } = await supabase
      .from("outfits")
      .select(
        `
        *,
        outfit_clothing (
          clothing (*)
        )
      `
      )
      .eq("id", newOutfit[0].id)
      .single();

    if (fetchError) throw fetchError;

    // 触发事件让 Layout 组件重新获取数据
    window.dispatchEvent(new CustomEvent("dataUpdated"));

    return completeOutfit;
  } catch (error) {
    console.error("添加穿搭失败:", error);
    throw error;
  }
};

// 获取穿搭组合中所有的衣物
export const getOutfitItems = async (outfitId) => {
  try {
    const { data, error } = await supabase
      .from("outfit_clothing")
      .select("clothing(*)")
      .eq("outfit_id", outfitId);
    if (error) throw error;

    return data.map((item) => item.clothing);
  } catch (error) {
    console.error("获取穿搭衣物失败:", error);
    return [];
  }
};

// 删除衣物
export const deleteClothingItem = async (id) => {
  try {
    const { error } = await supabase.from("clothing").delete().eq("id", id);

    if (error) throw error;

    // 更新本地状态
    clothingItems = clothingItems.filter((item) => item.id !== id);
    // 触发更新事件
    window.dispatchEvent(new CustomEvent("dataUpdated"));
  } catch (error) {
    console.error("删除衣物失败:", error);
    throw error;
  }
};

// 删除穿搭
export const deleteOutfit = async (id) => {
  try {
    const { error } = await supabase.from("outfits").delete().eq("id", id);

    if (error) throw error;

    // 更新本地状态
    outfits = outfits.filter((item) => item.id !== id);
    // 触发更新事件
    window.dispatchEvent(new CustomEvent("dataUpdated"));
  } catch (error) {
    console.error("删除穿搭失败:", error);
    throw error;
  }
};
