import React, { useState } from "react";
import { X } from "lucide-react";
import { deleteClothingItem } from "../store/data";
import { Link } from "react-router-dom";

const ClothingGrid = ({ items = [] }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDelete = async (id) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteClothingItem(selectedId);
      setShowConfirm(false);
      setSelectedId(null);
    } catch (error) {
      alert("删除失败，请重试");
    }
  };

  return (
    <>
      <div className="grid-layout">
        {items.map((item) => (
          <div key={item.id} className="grid-item">
            <Link to={`/clothing/${item.id}`}>
              <div className="img-container">
                <div className="img-wrapper">
                  {item.image_url ? (
                    <>
                      <img
                        src={item.image_url}
                        alt={`Clothing item${item.title}`}
                        className="img-full"
                        loading="eager"
                        decoding="async"
                        crossOrigin="anonymous"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://placehold.co/300x300?text=No+Image";
                        }}
                      />
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="delete-btn"
                      >
                        <X className="delete-icon" />
                      </button>
                    </>
                  ) : (
                    <div className="no-image">No Image</div>
                  )}
                </div>
              </div>
              <div className="item-content">
                <div className="tag-container">
                  {item.tags?.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </div>
        ))}

        {items.length === 0 && (
          <div className="empty-state">还没有添加任何衣物...</div>
        )}
      </div>

      {/* 确认删除对话框 */}
      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">确认删除</h3>
            <p className="modal-text">确定要删除这件衣物吗？此操作无法撤销。</p>
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
    </>
  );
};

export default ClothingGrid;
