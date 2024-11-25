import React from "react";
import OutfitGrid from "../components/OutfitGrid";
import { outfits } from "../store/data";

const Outfits = () => {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">我的穿搭</h1>
      </div>
      <OutfitGrid outfits={outfits} />
    </div>
  );
};

export default Outfits;
