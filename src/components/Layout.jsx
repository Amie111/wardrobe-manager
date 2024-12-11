import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Shirt, PlusCircle } from "lucide-react";
import { initializeData, throttledInitialize } from "../store/data";

const Layout = ({ children }) => {
  // 添加 useNavigate hook
  const navigate = useNavigate();

  // 组件渲染后，初始化数据（依赖项[]=只在组件首次挂载时执行一次）
  useEffect(() => {
    // 初始化数据
    // initializeData();
    const handleDataUpdate = () => {
      throttledInitialize();
    };
    // 订阅者：添加数据更新事件监听
    window.addEventListener("dataUpdated", handleDataUpdate);
    return () => {
      // 取消订阅：移除数据更新事件监听
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
              <span className="text-title">AMIE'S CLOSET</span>
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
