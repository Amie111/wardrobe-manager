import React from "react";
import { X, Upload } from "lucide-react";

const ImageUpload = ({ preview, setPreview, setPhoto, label }) => {
  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      setPhoto?.(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

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
