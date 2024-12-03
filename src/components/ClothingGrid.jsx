import React from "react";

const ClothingGrid = ({ items = [] }) => {
  return (
    <div className="grid-layout">
      {items.map((item) => (
        <div key={item.id} className="grid-item">
          <div className="img-container">
            <div className="img-wrapper">
              {item.image_url ? (
                <img
                  src={item.image_url}
                  alt={`Clothing item${item.title}`}
                  className="img-full"
                  onError={(e) => {
                    e.target.onerror = null; // 防止无限循环
                    e.target.src = "https://placehold.co/300x300?text=No+Image";
                  }}
                />
              ) : (
                <div className="text-gray-400">No Image</div>
              )}
            </div>
          </div>
          <div className="p-4">
            <div className="tag-container">
              {item.tags?.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Loading placeholder */}
      {items.length === 0 && (
        <div className="empty-state">还没有添加任何衣物...</div>
      )}
    </div>
  );
};

export default ClothingGrid;
