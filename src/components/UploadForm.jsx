import React, { useState } from "react";
import { categories } from "../config/config";
import { addClothingItem } from "../store/data";
import { useNavigate } from "react-router-dom";
import TagInput from "./TagInput";
import ImageUpload from "./ImageUpload";

const UploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // 添加类别状态
  const navigate = useNavigate(); // 添加 useNavigate hook

  // 处理表单提交
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
        <ImageUpload
          preview={preview}
          setPreview={setPreview}
          setPhoto={setSelectedFile}
          label="上传照片"
        />

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
        <TagInput
          tags={tags}
          setTags={setTags}
          newTag={newTag}
          setNewTag={setNewTag}
        />

        <button type="submit" className="btn-submit">
          保存
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
