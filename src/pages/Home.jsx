import React, { useState, useEffect } from "react";
import ClothingGrid from "../components/ClothingGrid";
import { X } from "lucide-react";
import { clothingItems } from "../store/data";
import { categories } from "../config/config";

const Home = () => {
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [selectedTags, setSelectedTags] = useState(new Set());

  useEffect(() => {
    // 监听类别筛选事件
    const handleCategoryFilter = (e) => {
      const categoryId = e.detail;
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

    // 监听标签筛选事件
    const handleTagFilter = (e) => {
      const tag = e.detail;
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

    window.addEventListener("filterCategory", handleCategoryFilter);
    window.addEventListener("filterTag", handleTagFilter);

    return () => {
      window.removeEventListener("filterCategory", handleCategoryFilter);
      window.removeEventListener("filterTag", handleTagFilter);
    };
  }, []);

  // 筛选逻辑
  const filteredItems = clothingItems.filter((item) => {
    const matchCategory =
      selectedCategories.size === 0 || selectedCategories.has(item.category);
    const matchTag =
      selectedTags.size === 0 || item.tags.some((tag) => selectedTags.has(tag));
    return matchCategory && matchTag;
  });

  // 添加删除单个筛选的处理函数
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
    <div>
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
      <ClothingGrid items={filteredItems} />
    </div>
  );
};

export default Home;
