import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Shirt, PlusCircle } from "lucide-react";
import { initializeData, throttledInitialize } from "../store/data";

const Layout = ({ children }) => {
  // 添加 useNavigate hook
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //初始加载数据
    const loadInitialData = async () => {
      try {
        const success = await initializeData();
        if (!success) {
          console.error("数据加载失败");
        }
      } catch (error) {
        console.error("初始化数据失败:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadInitialData();
    // 监听后续更新
    const handleDataUpdate = throttledInitialize;
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>加载中...</div>
      </div>
    );
  }

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
