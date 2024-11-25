import React from "react";
import { getOutfitItems } from "../store/data";

const OutfitGrid = ({ outfits = [] }) => {
  return (
    <div className="grid-layout">
      {outfits.map((outfit) => (
        <div key={outfit.id} className="outfit-card">
          {/* 穿搭照片展示 */}
          <div className="outfit-photo-container">
            {outfit.photo ? (
              <img
                src={outfit.photo}
                alt={outfit.name}
                className="outfit-photo"
              />
            ) : (
              <div className="outfit-items-grid">
                {getOutfitItems(outfit.id).map((item) => (
                  <img
                    key={item.id}
                    src={item.imageUrl}
                    alt={`服装${item.id}`}
                    className="outfit-item-photo"
                  />
                ))}
              </div>
            )}
          </div>

          {/* 穿搭信息 */}
          <div className="outfit-info">
            <h3 className="outfit-name">{outfit.name}</h3>
            {outfit.description && (
              <p className="outfit-description">{outfit.description}</p>
            )}
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
    </div>
  );
};

export default OutfitGrid;
