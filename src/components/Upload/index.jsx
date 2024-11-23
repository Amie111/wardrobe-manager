import React, { useState } from "react";
import { Upload, X } from "lucide-react";
import { categories } from "../../config/config";
import { addClothingItem } from "../../store/data";
import { useNavigate } from "react-router-dom";

const UploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // 添加类别状态
  const navigate = useNavigate(); // 添加 useNavigate hook

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement upload logic
    if (!selectedFile || !selectedCategory || tags.length === 0) {
      alert("请填写所有必要信息");
      return;
    }
    // 创建新的衣物数据
    const newItem = {
      imageUrl: preview, //使用预览图片的 base64 数据
      category: selectedCategory,
      tags: tags,
    };
    // 添加新的衣物到存储中
    addClothingItem(newItem);
    // 重置表单
    setSelectedFile(null);
    setPreview(null);
    setTags([]);
    setNewTag("");
    setSelectedCategory("");
    // 提示用户添加成功
    alert("衣物添加成功");
    // 导航回主页
    navigate("/");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-wrapper">
        <div className="form-group">
          <label className="form-label">上传照片</label>
          <div className="relative-wrapper">
            {preview ? (
              <div className="relative-wrapper">
                <img src={preview} alt="Preview" className="preview-image" />
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    setPreview(null);
                  }}
                  className="delete-btn"
                >
                  <X className="icon-sm" />
                </button>
              </div>
            ) : (
              <label
                className="upload-area"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <div className="upload-content">
                  <Upload className="icon-upload" />
                  <p className="text-hint">点击或拖拽照片上传</p>
                  <p className="text-hint-sm">支持 JPG、PNG 格式</p>
                </div>
                <input
                  type="file"
                  className="upload-input"
                  accept="image/*"
                  onChange={handleFileSelect}
                />
              </label>
            )}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">选择类别</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="form-input"
            required
          >
            <option value="">请选择类别</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.icon} {category.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">添加标签</label>
          <div className="tag-container">
            {tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="tag-btn"
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
            <button
              type="button"
              onClick={handleAddTag}
              className="tag-btn-shrink"
            >
              添加
            </button>
          </div>
        </div>

        <button type="submit" className="btn-submit">
          保存
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
