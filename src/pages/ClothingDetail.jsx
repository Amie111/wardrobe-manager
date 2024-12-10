import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getClothingById, updateClothingItem } from "../store/data";
import ImageUpload from "../components/ImageUpload";
import TagInput from "../components/TagInput";
import { categories } from "../config/config";

const ClothingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [clothingItem, setClothingItem] = useState(null);
  const [tags, setTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchClothingItem = async () => {
      const item = await getClothingById(id);
      setClothingItem(item);
      setTags(item.tags || []);
      setSelectedCategory(item.category);
      setPreview(item.image_url);
    };
    fetchClothingItem();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedItem = {
      ...clothingItem,
      category: selectedCategory,
      tags: tags,
      file,
    };
    await updateClothingItem(id, updatedItem);
    navigate("/");
  };

  if (!clothingItem) return <div>加载中...</div>;

  return (
    <div className="form-container">
      <h2 className="create-outfit-title">编辑衣物信息</h2>
      <form onSubmit={handleSubmit} className="form-wrapper">
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
          <TagInput tags={tags} setTags={setTags} />
        </div>
        <div className="form-group">
          <ImageUpload
            preview={preview}
            setPreview={setPreview}
            setPhoto={setFile}
            label="上传照片"
          />
        </div>
        <button type="submit" className="btn-submit">
          保存
        </button>
      </form>
    </div>
  );
};

export default ClothingDetail;
