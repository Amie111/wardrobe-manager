import React, { useState } from "react";
import ClothingGrid from "../components/ClothingGrid";
import OutfitGrid from "../components/OutfitGrid";
import { clothingItems, outfits } from "../store/data";
import { categories } from "../config/config";
import { X } from "lucide-react";

const Home = () => {
  const [activeTab, setActiveTab] = useState("clothing");
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [selectedTags, setSelectedTags] = useState(new Set());
  const [isTagsExpanded, setIsTagsExpanded] = useState(false);

  // 获取所有衣物标签
  const allClothingTags = [
    ...new Set(clothingItems.flatMap((item) => item.tags || [])),
  ];

  // 获取所有穿搭标签
  const allOutfitTags = [
    ...new Set(outfits.flatMap((outfit) => outfit.tags || [])),
  ];

  // 筛选衣物
  const filteredClothingItems = clothingItems.filter((item) => {
    const matchCategory =
      selectedCategories.size === 0 || selectedCategories.has(item.category);
    const matchTag =
      selectedTags.size === 0 ||
      (item.tags || []).some((tag) => selectedTags.has(tag));
    return matchCategory && matchTag;
  });

  // 筛选穿搭
  const filteredOutfits = outfits.filter((outfit) => {
    return (
      selectedTags.size === 0 ||
      (outfit.tags || []).some((tag) => selectedTags.has(tag))
    );
  });

  // 处理分类点击
  const handleCategoryClick = (categoryId) => {
    setSelectedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  // 处理标签点击
  const handleTagClick = (tag) => {
    setSelectedTags((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(tag)) {
        newSet.delete(tag);
      } else {
        newSet.add(tag);
      }
      return newSet;
    });
  };

  // 删除单个筛选
  const handleRemoveFilter = (type, value) => {
    if (type === "category") {
      setSelectedCategories((prev) => {
        const newSet = new Set(prev);
        newSet.delete(value);
        return newSet;
      });
    } else {
      setSelectedTags((prev) => {
        const newSet = new Set(prev);
        newSet.delete(value);
        return newSet;
      });
    }
  };

  // 清除所有筛选
  const clearAllFilters = () => {
    setSelectedCategories(new Set());
    setSelectedTags(new Set());
  };

  return (
    <div className="home-container">
      {/* 标签页切换 */}
      <div className="tab-header">
        <button
          className={`tab-btn ${activeTab === "clothing" ? "active" : ""}`}
          onClick={() => setActiveTab("clothing")}
        >
          衣物
        </button>
        <button
          className={`tab-btn ${activeTab === "outfits" ? "active" : ""}`}
          onClick={() => setActiveTab("outfits")}
        >
          穿搭
        </button>
      </div>

      {/* 筛选区域 */}
      <div className="filter-area">
        {activeTab === "clothing" && (
          <div className="category-section">
            <div className="category-filters">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`category-btn ${
                    selectedCategories.has(category.id) ? "active" : ""
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.icon} {category.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="tag-section">
          <div className={`tag-filters ${isTagsExpanded ? "expanded" : ""}`}>
            {(activeTab === "clothing" ? allClothingTags : allOutfitTags).map(
              (tag) => (
                <button
                  key={tag}
                  className={`tag-btn ${selectedTags.has(tag) ? "active" : ""}`}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </button>
              )
            )}
          </div>
          {(activeTab === "clothing" ? allClothingTags : allOutfitTags).length >
            10 && (
            <button
              className="expand-tags-btn"
              onClick={() => setIsTagsExpanded(!isTagsExpanded)}
            >
              {isTagsExpanded ? "收起" : "显示更多"}
            </button>
          )}
        </div>

        {/* 显示当前筛选状态 */}
        {(selectedCategories.size > 0 || selectedTags.size > 0) && (
          <div className="filter-status">
            <div className="filter-tags">
              {Array.from(selectedCategories).map((categoryId) => (
                <span key={categoryId} className="active-filter">
                  {categories.find((c) => c.id === categoryId)?.label}
                  <button
                    onClick={() => handleRemoveFilter("category", categoryId)}
                    className="remove-filter-btn"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
              {Array.from(selectedTags).map((tag) => (
                <span key={tag} className="active-filter">
                  {tag}
                  <button
                    onClick={() => handleRemoveFilter("tag", tag)}
                    className="remove-filter-btn"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
            <button className="clear-filter" onClick={clearAllFilters}>
              清除筛选
            </button>
          </div>
        )}
      </div>

      {/* 内容区域 */}
      <div className="tab-content">
        {activeTab === "clothing" ? (
          <ClothingGrid items={filteredClothingItems} />
        ) : (
          <OutfitGrid outfits={filteredOutfits} />
        )}
      </div>
    </div>
  );
};

export default Home;
