import { clothingAPI, outfitAPI, tagAPI, outfitTagAPI } from "../services/api";

// 声明状态变量
let clothingItems = [];
let outfits = [];
let allTags = [];
let outfitTags = [];

// 其他现有的导出
export { clothingItems, outfits, allTags, outfitTags };

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
      console.error("Cloudinary 响应:", errorData);
      throw new Error(`上传失败: ${errorData.error?.message || "未知错误"}`);
    }

    const data = await response.json();
    return data.secure_url; // 返回图片URL
  } catch (error) {
    console.error("上传图片失败:", error);
    throw error;
  }
};

// 初始化数据
export const initializeData = async () => {
  try {
    const [clothesResponse, outfitsResponse, tagsResponse, outfitTagsResponse] =
      await Promise.allSettled([
        clothingAPI.getAll(),
        outfitAPI.getAll(),
        tagAPI.getAll(),
        outfitTagAPI.getAll(),
      ]);

    // 正确处理 Promise.allSettled 的结果
    clothingItems =
      clothesResponse.status === "fulfilled" ? clothesResponse.value : [];
    outfits =
      outfitsResponse.status === "fulfilled" ? outfitsResponse.value : [];
    allTags =
      Array.isArray(tagsResponse.value) && tagsResponse.status === "fulfilled"
        ? tagsResponse.value.map((tag) => tag?.name).filter(Boolean)
        : [];
    outfitTags =
      Array.isArray(outfitTagsResponse.value) &&
      outfitTagsResponse.status === "fulfilled"
        ? outfitTagsResponse.value.map((tag) => tag?.name).filter(Boolean)
        : [];

    // 触发更新事件
    window.dispatchEvent(new CustomEvent("dataUpdated"));
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
      imageUrl,
      category: item.category,
      tags: item.tags,
    };

    // 保存到后端
    const savedItem = await clothingAPI.add(newItem);
    if (savedItem) {
      clothingItems = [...clothingItems, savedItem];
      // 触发更新事件
      window.dispatchEvent(new CustomEvent("dataUpdated"));
      return savedItem;
    }
    throw new Error("保存衣物失败");
  } catch (error) {
    console.error("添加衣物失败:", error);
    throw error;
  }
};

// 添加标签
export const addTag = async (tagName) => {
  try {
    const savedTag = await tagAPI.add(tagName);
    if (savedTag && savedTag.name) {
      allTags = [...allTags, savedTag.name];
      window.dispatchEvent(new CustomEvent("tagsUpdated"));
      return savedTag;
    }
    throw new Error("保存标签失败");
  } catch (error) {
    console.error("添加标签失败:", error);
    throw error;
  }
};

// 添加穿搭标签
export const addOutfitTag = async (tagData) => {
  try {
    const savedTag = await outfitTagAPI.add(tagData);
    if (savedTag && savedTag.name) {
      outfitTags = [...outfitTags, savedTag.name];
      window.dispatchEvent(new CustomEvent("outfitTagsUpdated"));
      return savedTag;
    }
    throw new Error("保存穿搭标签失败");
  } catch (error) {
    console.error("添加穿搭标签失败:", error);
    throw error;
  }
};

// 添加穿搭
export const addOutfit = async (outfit) => {
  try {
    let photoUrl = null;
    if (outfit.photo) {
      photoUrl = await uploadToCloudinary(outfit.photo);
    }

    const outfitData = {
      name: outfit.name,
      items: outfit.items,
      tags: outfit.tags,
      photo: photoUrl,
    };

    const savedOutfit = await outfitAPI.add(outfitData);
    if (savedOutfit) {
      outfits = [...outfits, savedOutfit];
      window.dispatchEvent(new CustomEvent("dataUpdated"));
      return savedOutfit;
    }
    throw new Error("保存穿搭失败");
  } catch (error) {
    console.error("添加穿搭失败:", error);
    throw error;
  }
};

// 获取穿搭组合中所有的衣物
export const getOutfitItems = (outfitId) => {
  const outfit = outfits.find((outfit) => outfit.id === outfitId);
  if (!outfit) return [];
  return outfit.items.map((itemId) =>
    clothingItems.find((item) => item.id === itemId)
  );
};
