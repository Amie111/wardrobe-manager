import React, { useState } from "react";
import { X } from "lucide-react";
import { deleteOutfit } from "../store/data";

const OutfitGrid = ({ outfits = [] }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const handleDelete = async (id) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteOutfit(selectedId);
      setShowConfirm(false);
      setSelectedId(null);
    } catch (error) {
      alert("删除失败，请重试");
    }
  };

  return (
    <div className="grid-layout">
      {outfits.map((outfit) => (
        <div key={outfit.id} className="grid-item">
          <div className="img-container">
            <div className="img-wrapper">
              {outfit.image_urls?.length > 0 ? (
                // 如果有上传的穿搭照片就显示照片
                <img
                  src={outfit.image_urls[0]}
                  alt={outfit.name}
                  className="img-full"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/300x300?text=No+Image";
                  }}
                />
              ) : (
                // 否则显示2x2网格的衣物预览
                <div className="outfit-items-preview">
                  {outfit.outfit_clothing?.slice(0, 4).map((relation) => (
                    <img
                      key={relation.clothing.id}
                      src={relation.clothing.image_url}
                      alt={`服装${relation.clothing.id}`}
                      className="outfit-item-preview"
                    />
                  ))}
                  {/* 如果衣物不足4件,用空白填充 */}
                  {Array.from({
                    length: Math.max(
                      0,
                      4 - (outfit.outfit_clothing?.length || 0)
                    ),
                  }).map((_, index) => (
                    <div
                      key={`empty-${index}`}
                      className="outfit-item-preview empty"
                    />
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => handleDelete(outfit.id)}
              className="delete-btn"
            >
              <X className="delete-icon" />
            </button>
          </div>
          <div className="item-content">
            <h3 className="outfit-title">{outfit.name}</h3>
            <div className="tag-container">
              {outfit.tags?.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}

      {outfits.length === 0 && (
        <div className="empty-state">还没有创建任何穿搭...</div>
      )}
      {/* 确认删除对话框 */}
      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">确认删除</h3>
            <p className="modal-text">确定要删除这套穿搭吗？此操作无法撤销。</p>
            <div className="modal-actions">
              <button
                onClick={() => setShowConfirm(false)}
                className="btn-cancel"
              >
                取消
              </button>
              <button onClick={confirmDelete} className="btn-delete">
                删除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OutfitGrid;
