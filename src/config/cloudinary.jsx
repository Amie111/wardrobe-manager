import { Cloudinary } from "@cloudinary/url-gen";
import { quality } from "@cloudinary/url-gen/actions/delivery";
import { format } from "@cloudinary/url-gen/actions/delivery";

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  },
});

// 添加图片URL优化函数
export const getOptimizedImageUrl = (url, options = {}) => {
  if (!url || !url.includes("cloudinary")) return url;

  try {
    // 从URL中提取公共ID
    const publicId = url.split("/upload/")[1].split(".")[0];
    const image = cloudinary.image(publicId);

    // 设置基本优化
    image.format("auto").quality(85);

    // 根据不同场景设置不同的尺寸
    if (options.thumbnail) {
      image.resize(`w_600,h_600,c_fill`);
    }

    return image.toURL();
  } catch (error) {
    console.error("图片URL优化失败:", error);
    return url;
  }
};

export default cloudinary;
