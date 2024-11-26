import React from "react";
import { X, Upload } from "lucide-react";

const ImageUpload = ({ preview, setPreview, setPhoto, label }) => {
  // 1.处理文件上传
  const handleFile = (file) => {
    // 1.检查是否为图片文件
    if (file && file.type.startsWith("image/")) {
      // 2.保存原始文件对象
      setPhoto?.(file);
      // 3.使用 FileReader API读取文件内容
      const reader = new FileReader();
      // 4.设置回调：当读取完成时，将读取结果设置为预览图片
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      // 5.开始读取文件，将文件读取为 Data URL（Base64 格式）
      reader.readAsDataURL(file);
    }
  };

  // 2.处理文件选择
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    // 检查是否上传文件
    if (!file) {
      alert("没有选择文件");
      return;
    }
    // 检查文件类型
    if (!file.type.startsWith("image/")) {
      alert("请选择图片类型文件");
      return;
    }
    if (file) {
      handleFile(file);
    }
  };

  // 3.处理拖拽事件
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation(); // 阻止事件冒泡
  };

  // 4.处理拖拽事件
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0]; // 获取拖拽的文件
    if (file && file.type.startsWith("image/")) {
      handleFile(file);
    }
  };

  // 5.渲染组件
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <div className="mt-2">
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="预览"
              className="w-full max-h-96 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => {
                setPhoto?.(null);
                setPreview(null);
              }}
              className="delete-btn"
            >
              <X className="icon-sm" />
            </button>
          </div>
        ) : (
          <label
            className="upload-area"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="upload-content">
              <Upload className="icon-upload" />
              <p className="text-hint">点击或拖拽照片上传</p>
              <p className="text-hint-sm">支持 JPG、PNG 格式</p>
            </div>
            <input
              type="file"
              className="upload-input"
              accept="image/*"
              onChange={handleFileSelect}
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
