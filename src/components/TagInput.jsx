import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

const TagInput = ({ tags, setTags, isOutfitTag = false }) => {
  const [newTag, setNewTag] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // 添加标签
  const handleAddTag = (tagToAdd = newTag) => {
    const trimmedTag = tagToAdd.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setNewTag("");
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // 处理输入变化
  const handleInputChange = (e) => {
    const value = e.target.value;
    // 检查是否输入了全角或半角逗号
    if (value.endsWith(",") || value.endsWith("，")) {
      const tagValue = value.slice(0, -1);
      setNewTag(tagValue);
      handleAddTag(tagValue);
      return;
    }
    setNewTag(value);

    // 搜索匹配的标签
    if (value.trim()) {
      const matchedTags = tags.filter(
        (tag) =>
          tag &&
          tag.toLowerCase().includes(value.toLowerCase()) &&
          !tags.includes(tag)
      );
      setSuggestions(matchedTags);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // 处理按键事件
  const handleKeyDown = (e) => {
    if (e.key === "," || e.key === "Enter" || e.key === "，") {
      e.preventDefault();
      handleAddTag();
    }
  };

  // 删除标签
  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // 选择建议的标签
  const selectSuggestion = (suggestion) => {
    handleAddTag(suggestion);
    inputRef.current?.focus();
  };

  // 点击外部关闭建议列表
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="tag-input-container">
      <label className="form-label">
        {isOutfitTag ? "穿搭标签" : "衣物标签"}
      </label>
      <div className="tag-list">
        {tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="remove-tag-btn"
            >
              <X className="tag-remove-icon" />
            </button>
          </span>
        ))}
      </div>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={newTag}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="tag-input"
          placeholder="输入标签，按回车或逗号添加"
        />
        {showSuggestions && suggestions.length > 0 && (
          <div ref={suggestionsRef} className="tag-suggestions">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="tag-suggestion-item"
                onClick={() => selectSuggestion(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TagInput;
