const API_BASE_URL = "http://localhost:5001/api";

// 统一的响应处理
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "请求失败");
  }
  // 返回 JSON 数据
  return response.json();
};

// 衣物相关的 API 调用
export const clothingAPI = {
  // 获取所有衣物
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/clothing`);
      return handleResponse(response);
    } catch (error) {
      console.error("获取衣物失败:", error);
      return [];
    }
  },

  // 添加新衣物
  add: async (clothingData) => {
    const response = await fetch(`${API_BASE_URL}/clothing`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clothingData),
    });
    return handleResponse(response);
  },
};

// 标签相关的 API 调用
export const tagAPI = {
  // 获取所有标签
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tags`);
      return handleResponse(response);
    } catch (error) {
      console.error("获取标签失败:", error);
      return [];
    }
  },

  // 添加新标签
  add: async (tagName) => {
    const response = await fetch(`${API_BASE_URL}/tags`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: tagName }),
    });
    return handleResponse(response);
  },
};

// 穿搭标签相关的 API 调用
export const outfitTagAPI = {
  // 获取所有穿搭标签
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/outfit-tags`);
      return handleResponse(response);
    } catch (error) {
      console.error("获取穿搭标签失败:", error);
      return [];
    }
  },

  // 添加新穿搭标签
  add: async (tagData) => {
    const response = await fetch(`${API_BASE_URL}/outfit-tags`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tagData),
    });
    return handleResponse(response);
  },
};

// 穿搭相关的 API 调用
export const outfitAPI = {
  // 获取所有穿搭
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/outfits`);
      return handleResponse(response);
    } catch (error) {
      console.error("获取穿搭失败:", error);
      return [];
    }
  },

  // 添加新穿搭
  add: async (outfitData) => {
    const response = await fetch(`${API_BASE_URL}/outfits`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(outfitData),
    });
    return handleResponse(response);
  },
};
