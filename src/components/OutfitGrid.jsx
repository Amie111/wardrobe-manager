import React from "react";

const OutfitGrid = ({ outfits = [] }) => {
  return (
    <div className="grid-layout">
      {outfits.map((outfit) => (
        <div key={outfit.id} className="outfit-card">
          {/* 穿搭照片展示 */}
          <div className="outfit-photo-container">
            {outfit.image_urls?.length > 0 ? (
              <img
                src={outfit.image_urls[0]}
                alt={outfit.name}
                className="outfit-photo"
              />
            ) : (
              <div className="outfit-items-grid">
                {outfit.outfit_clothing?.map((relation) => (
                  <img
                    key={relation.clothing.id}
                    src={relation.clothing.image_url}
                    alt={`服装${relation.clothing.id}`}
                    className="outfit-item-photo"
                  />
                ))}
              </div>
            )}
          </div>

          {/* 穿搭信息 */}
          <div className="outfit-info">
            <h3 className="outfit-name">{outfit.name}</h3>
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
