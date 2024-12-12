import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { getOutfitById, updateOutfit } from "../store/data";
import ImageUpload from "../components/ImageUpload";
import TagInput from "../components/TagInput";
import { categories } from "../config/config";
import { clothingItems } from "../store/data"; // 引入衣物数据

const OutfitDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [outfit, setOutfit] = useState(null);
  const [tags, setTags] = useState([]);
  const [name, setName] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedFilterCategory, setSelectedFilterCategory] = useState("");

  useEffect(() => {
    const fetchOutfit = async () => {
      try {
        const data = await getOutfitById(id);
        setOutfit(data);
        setTags(data.tags || []);
        setName(data.name);
        setImageUrls(data.image_urls || []);
        setSelectedItems(data.outfit_clothing.map((item) => item.clothing.id)); // 设置已选衣物
      } catch (error) {
        console.log("获取穿搭详情失败", error);
      }
    };
    if (id) {
      fetchOutfit();
    }
  }, [id]); // 只依赖于 id 变化

  const handleItemSelect = (item) => {
    if (!selectedItems.includes(item.id)) {
      setSelectedItems([...selectedItems, item.id]);
    } else {
      setSelectedItems(selectedItems.filter((i) => i !== item.id));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedOutfit = {
      name,
      tags: tags,
      image_urls: imageUrls.length > 0 ? imageUrls : [],
      items: selectedItems,
    };
    try {
      await updateOutfit(id, updatedOutfit);
      navigate("/");
    } catch (error) {
      console.error("更新失败:", error);
      alert("更新失败，请重试");
    }
  };

  const filteredClothingItems = selectedFilterCategory
    ? clothingItems.filter((item) => item.category === selectedFilterCategory)
    : [];

  if (!outfit) return <div>加载中...</div>;

  return (
    <div className="create-outfit-container">
      <h2 className="create-outfit-title">编辑穿搭信息</h2>
      <form onSubmit={handleSubmit} className="form-wrapper">
        <div className="form-group">
          <label className="form-label">穿搭名称</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
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
                    selectedItems.includes(item.id) ? "selected" : ""
                  }`}
                  onClick={() => handleItemSelect(item)}
                >
                  <img
                    src={item.image_url}
                    alt={`服装${item.id}`}
                    className="outfit-item-image"
                  />
                  {/* <div className="tag-container">
                    {item.tags?.map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div> */}
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
              {selectedItems.map((itemId) => {
                const item = clothingItems.find((i) => i.id === itemId);
                return (
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
                );
              })}
            </div>
          </div>
        )}

        {/* 上传穿搭照片 */}
        <ImageUpload
          preview={imageUrls[0]}
          setPreview={(url) => setImageUrls([url])}
          setPhoto={(file) => setImageUrls([file])}
          label="上传穿搭照片"
        />

        {/* 标签输入区域 */}
        <TagInput tags={tags} setTags={setTags} />

        <button type="submit" className="btn-submit">
          保存
        </button>
      </form>
    </div>
  );
};

export default OutfitDetail;
