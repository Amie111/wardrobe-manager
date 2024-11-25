// 存储所有衣物数据
export let clothingItems = [
  {
    id: "1",
    imageUrl: "https://placehold.co/300x300?text=Summer+Casual",
    tags: ["夏季", "休闲"],
    category: "tops",
  },
  {
    id: "2",
    imageUrl: "https://placehold.co/300x300?text=Spring+Formal",
    tags: ["春秋", "正装"],
    category: "bottoms",
  },
];

// 存储所有标签
export let allTags = ["所有", "最新", "夏季", "休闲", "春秋"];

// 存储所有穿搭组合
export let outfits = [
  {
    id: "1",
    createdAt: new Date().toISOString().split("T")[0],
    name: "藏蓝韩系穿搭",
    items: ["1", "2"], // 引用现有衣物的 ID
    tags: ["韩系", "休闲"],
    photo: null, // 实际穿搭照片
    category: "all",
    description: "藏蓝韩系穿搭",
  },
];

// 添加新的衣物
export const addClothingItem = (item) => {
  const newItem = {
    ...item,
    id: String(clothingItems.length + 1), // 简单的 ID 生成
  };
  clothingItems = [...clothingItems, newItem];
  // 更新标签列表
  const newTags = item.tags.filter((tag) => !allTags.includes(tag));
  if (newTags.length > 0) {
    allTags = [...allTags, ...newTags];
  }

  return newItem;
};

// 添加新的穿搭组合并返回新添加的穿搭组合
export const addOutfit = (outfit) => {
  const newOutfit = {
    ...outfit,
    id: String(outfits.length + 1),
    createdAt: new Date().toISOString().split("T")[0],
  };
  outfits = [...outfits, newOutfit];
  // 更新标签列表
  const newTags = outfit.tags.filter((tag) => !allTags.includes(tag));
  if (newTags.length > 0) {
    allTags = [...allTags, ...newTags];
  }
  return newOutfit;
};

// 获取穿搭组合中所有的衣物
export const getOutfitItems = (outfitId) => {
  const outfit = outfits.find((outfit) => outfit.id === outfitId);
  if (!outfit) return [];

  return outfit.items.map((itemId) =>
    clothingItems.find((item) => item.id === itemId)
  );
};
