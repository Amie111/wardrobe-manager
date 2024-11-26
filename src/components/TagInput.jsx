import React from "react";
import { X } from "lucide-react";

const TagInput = ({ tags, setTags, newTag, setNewTag }) => {
  // 处理添加新标签
  const handleAddTag = (e) => {
    e.preventDefault();
    // 检查标签是否为空，并且不重复
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      // 清空输入框
      setNewTag("");
    }
  };

  return (
    <div className="form-group">
      <label className="form-label">添加标签</label>
      <div className="tag-container">
        {tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
            <button
              type="button"
              onClick={() => setTags(tags.filter((t) => t !== tag))}
              className="tag-delete-btn"
            >
              <X className="icon-sm" />
            </button>
          </span>
        ))}
      </div>
      <div className="tag-input-wrapper">
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          className="form-input"
          placeholder="输入标签"
        />
        <button type="button" onClick={handleAddTag} className="tag-btn-shrink">
          添加
        </button>
      </div>
    </div>
  );
};

export default TagInput;
