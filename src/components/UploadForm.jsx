import React, { useState } from "react";
import { addClothingItem } from "../store/data";
import { useNavigate } from "react-router-dom";
import ImageUpload from "./ImageUpload";
import TagInput from "./TagInput";
import { categories } from "../config/config";

const UploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [tags, setTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate(); // 添加 useNavigate hook

  // 处理表单提交
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile || !selectedCategory || tags.length === 0) {
      alert("请填写所有必要信息");
      return;
    }

    try {
      // 创建新的衣物数据
      const newItem = {
        file: selectedFile, // 传入 File 对象
        category: selectedCategory,
        tags: tags,
      };

      // 等待上传完成
      await addClothingItem(newItem);
      // 重置表单
      setSelectedFile(null);
      setPreview(null);
      setTags([]);
      setSelectedCategory("");

      alert("衣物添加成功");
      navigate("/");
    } catch (error) {
      alert("添加衣物失败,请重试");
      console.error(error);
    }
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
        <TagInput tags={tags} setTags={setTags} />

        <button type="submit" className="btn-submit">
          保存
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
