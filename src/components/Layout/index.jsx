import React from "react";
import { PlusCircle, Home } from "lucide-react";
import { categories } from "../../config/config";
import { useNavigate, useLocation } from "react-router-dom";
import { allTags } from "../../store/data";

const Layout = ({ children }) => {
  // 添加 useNavigate hook
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  // 添加处理点击“添加新衣服”的函数
  const handleAddClick = () => {
    navigate("/upload");
  };

  const handleHomeClick = () => {
    navigate("/");
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
            <button className="btn-primary" onClick={handleAddClick}>
              <PlusCircle className="icon-md" />
              添加新衣物
            </button>
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
