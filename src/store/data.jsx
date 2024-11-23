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
