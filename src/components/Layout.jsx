import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Shirt, PlusCircle } from "lucide-react";
import { initializeData } from "../store/data";

const Layout = ({ children }) => {
  // 添加 useNavigate hook
  const navigate = useNavigate();

  // 添加数据初始化
  useEffect(() => {
    initializeData();
    // 添加数据更新事件监听
    const handleDataUpdate = () => {
      initializeData();
    };
    window.addEventListener("dataUpdated", handleDataUpdate);

    return () => {
      window.removeEventListener("dataUpdated", handleDataUpdate);
    };
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
        </div>
      </header>
      <main className="main-content">{children}</main>
    </div>
  );
};

export default Layout;
