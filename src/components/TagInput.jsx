import React from "react";
import { X } from "lucide-react";

const TagInput = ({ tags, setTags, newTag, setNewTag }) => {
  const handleAddTag = (e) => {
    e.preventDefault();
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
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
