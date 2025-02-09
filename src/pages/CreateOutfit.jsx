import React, { useState } from "react";
import { X } from "lucide-react";
import { clothingItems, addOutfit } from "../store/data";
import { useNavigate } from "react-router-dom";
import TagInput from "../components/TagInput";
import ImageUpload from "../components/ImageUpload";
import { categories } from "../config/config";

const CreateOutfit = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [outfitName, setOutfitName] = useState("");
  const [tags, setTags] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [selectedFilterCategory, setSelectedFilterCategory] = useState("");
  const navigate = useNavigate();

  const filteredClothingItems = selectedFilterCategory
    ? clothingItems.filter((item) => item.category === selectedFilterCategory)
    : [];

  // 处理衣物选择
  const handleItemSelect = (item) => {
    if (!selectedItems.find((i) => i.id === item.id)) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
    }
  };

  // 处理表单提交
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!outfitName || selectedItems.length === 0) {
      alert("请填写穿搭名称并选择至少一件衣物");
      return;
    }

    try {
      const newOutfit = {
        name: outfitName,
        items: selectedItems.map((item) => item.id),
        tags: tags,
        photo: photo,
      };

      await addOutfit(newOutfit);
      alert("穿搭创建成功！");
      navigate("/");
    } catch (error) {
      alert("创建穿搭失败，请重试");
      console.error("创建穿搭失败:", error);
    }
  };

  return (
    <div className="create-outfit-container">
      <h2 className="create-outfit-title">创建新穿搭</h2>
      <form onSubmit={handleSubmit} className="create-outfit-form">
        {/* 穿搭名称输入 */}
        <div className="form-group">
          <label className="form-label">穿搭名称</label>
          <input
            type="text"
            value={outfitName}
            onChange={(e) => setOutfitName(e.target.value)}
            className="outfit-name-input"
            placeholder="给你的穿搭起个名字"
            required
          />
        </div>

        {/* 选择衣物区域 */}
        <div className="form-group">
          <label className="form-label">选择衣物</label>
          <select
            value={selectedFilterCategory}
            onChange={(e) => setSelectedFilterCategory(e.target.value)}
            className="outfit-category-select"
          >
            <option value="">请选择类别</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.icon} {category.label}
              </option>
            ))}
          </select>

          {/* 可选衣物网格 */}
          <div className="outfit-items-grid">
            {filteredClothingItems.length > 0 ? (
              filteredClothingItems.map((item) => (
                <div
                  key={item.id}
                  className={`outfit-item-card ${
                    selectedItems.find((i) => i.id === item.id)
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleItemSelect(item)}
                >
                  <img
                    src={item.image_url}
                    alt={`服装${item.id}`}
                    className="outfit-item-image"
                  />
                  <div className="tag-container">
                    {item.tags?.map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="outfit-empty-state">当前类别暂无衣物...</div>
            )}
          </div>
        </div>

        {/* 搭配预览区域 */}
        {selectedItems.length > 0 && (
          <div className="selected-preview-container">
            <h3 className="selected-preview-title">已选衣物</h3>
            <div className="selected-items-grid">
              {selectedItems.map((item) => (
                <div key={item.id} className="selected-item-wrapper">
                  <img
                    src={item.image_url}
                    alt={`选中的衣物${item.id}`}
                    className="selected-item-image"
                  />
                  <button
                    type="button"
                    onClick={() => handleItemSelect(item)}
                    className="remove-item-btn"
                  >
                    <X className="remove-icon" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 上传穿搭照片 */}
        <ImageUpload
          preview={preview}
          setPreview={setPreview}
          setPhoto={setPhoto}
          label="上传穿搭照片（可选）"
        />

        {/* 标签输入区域 */}
        <TagInput tags={tags} setTags={setTags} isOutfitTag={true} />

        <button type="submit" className="btn-submit">
          创建穿搭
        </button>
      </form>
    </div>
  );
};

export default CreateOutfit;
