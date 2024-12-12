/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      // 扩展 padding 配置
      padding: {
        full: "100%", // 添加 pb-full
        "1/2": "50%", // 添加 pb-1/2
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "3/4": "75%",
      },
      // 如果需要，也可以扩展其他配置
      aspectRatio: {
        square: "1 / 1",
      },
    },
  },
  plugins: [],
};
