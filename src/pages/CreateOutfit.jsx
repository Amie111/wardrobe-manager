import React, { useState } from "react";
import { X, Upload } from "lucide-react";
import { clothingItems, addOutfit } from "../store/data";
import { useNavigate } from "react-router-dom";
import TagInput from "../components/TagInput";
import ImageUpload from "../components/ImageUpload";

const CreateOutfit = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [outfitName, setOutfitName] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleItemSelect = (item) => {
    if (selectedItems.find((i) => i.id === item.id)) {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!outfitName || selectedItems.length === 0) {
      alert("请填写穿搭名称并选择至少一件衣物");
      return;
    }
    const newOutfit = {
      name: outfitName,
      items: selectedItems.map((item) => item.id),
      tags: tags,
      photo: preview,
    };
    addOutfit(newOutfit);
    alert("穿搭创建成功！");
    navigate("/outfits");
  };

  return (
    <div className="form-container max-w-4xl">
      <h2 className="text-2xl font-bold mb-6">创建新穿搭</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 穿搭名称输入 */}
        <div className="form-group">
          <label className="form-label">穿搭名称</label>
          <input
            type="text"
            value={outfitName}
            onChange={(e) => setOutfitName(e.target.value)}
            className="form-input"
            placeholder="给你的穿搭起个名字"
            required
          />
        </div>

        {/* 选择衣物区域 */}
        <div className="form-group">
          <label className="form-label">选择衣物</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
            {clothingItems.map((item) => (
              <div
                key={item.id}
                className={`cursor-pointer relative ${
                  selectedItems.find((i) => i.id === item.id)
                    ? "ring-2 ring-blue-500"
                    : ""
                }`}
                onClick={() => handleItemSelect(item)}
              >
                <img
                  src={item.imageUrl}
                  alt={`服装${item.id}`}
                  className="w-full aspect-square object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 上传穿搭照片 */}
        <ImageUpload
          preview={preview}
          setPreview={setPreview}
          setPhoto={setPhoto}
          label="上传穿搭照片（可选）"
        />

        {/* 标签输入区域 */}
        <TagInput
          tags={tags}
          setTags={setTags}
          newTag={newTag}
          setNewTag={setNewTag}
        />

        <button type="submit" className="btn-submit">
          创建穿搭
        </button>
      </form>
    </div>
  );
};

export default CreateOutfit;
