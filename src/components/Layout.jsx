import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Shirt, PlusCircle } from "lucide-react";
import { categories } from "../config/config";
import { allTags } from "../store/data";

const Layout = ({ children }) => {
  // 添加 useNavigate hook
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";
  // 添加一个用于强制重新渲染的状态
  const [, setForceUpdate] = useState({});
  // 添加监听标签变化的 effect
  useEffect(() => {
    const forceUpdate = () => {
      setForceUpdate({}); // 使用正确的 setState 函数
    };

    window.addEventListener("tagsUpdated", forceUpdate);
    return () => window.removeEventListener("tagsUpdated", forceUpdate);
  }, []);

  // 导航处理函数
  const handleAddClick = () => {
    navigate("/upload");
  };
  // 添加处理点击“我的衣橱”的函数
  const handleHomeClick = () => {
    navigate("/");
  };

  // 添加处理点击“创建穿搭”的函数
  const handleCreateOutfitClick = () => {
    navigate("/create-outfit");
  };

  // 添加处理点击“我的穿搭”的函数
  const handleOutfitClick = () => {
    navigate(`/outfits`);
  };

  // 添加处理点击类型的函数
  const handleCategoryClick = (categoryId) => {
    if (!isHome) {
      navigate("/");
    }
    window.dispatchEvent(
      new CustomEvent("filterCategory", {
        detail: categoryId,
      })
    );
  };
  // 添加处理点击标签的函数
  const handleTagClick = (tag) => {
    if (!isHome) {
      navigate("/");
    }
    window.dispatchEvent(
      new CustomEvent("filterTag", {
        detail: tag,
      })
    );
  };

  return (
    <div className="layout-container">
      <header className="header">
        <div className="header-container">
          <div className="flex-between">
            <button onClick={handleHomeClick} className="btn-secondary">
              <Home className="icon-lg" />
              <span className="text-title">我的衣橱</span>
            </button>
            <div className="flex space-x-2">
              <button className="btn-primary" onClick={handleOutfitClick}>
                <Shirt className="icon-md" />
                我的穿搭
              </button>
              <button className="btn-primary" onClick={handleCreateOutfitClick}>
                <Shirt className="icon-md" />
                创建穿搭
              </button>
              <button className="btn-primary" onClick={handleAddClick}>
                <PlusCircle className="icon-md" />
                添加新衣物
              </button>
            </div>
          </div>

          <nav className="nav-space">
            <ul className="nav-items-space">
              {categories.map((category) => (
                <li key={category.id}>
                  <button
                    className="category-btn"
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <span className="icon-space">{category.icon}</span>
                    {category.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="tags-filter-container">
            {allTags.map((tag, index) => (
              <button
                key={index}
                className="tag-filter"
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="main-content">{children}</main>
    </div>
  );
};

export default Layout;
