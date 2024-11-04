// rollup.config.js
import { defineConfig } from "rollup";
import vue from "@vitejs/plugin-vue";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import postcss from "rollup-plugin-postcss";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import clear from "rollup-plugin-clear";
import copy from "rollup-plugin-copy";
import progress from "rollup-plugin-progress";
import alias from "@rollup/plugin-alias";
import path from "path";
import { fileURLToPath } from "url";
import { sourceMapsEnabled } from "process";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRootDir = path.resolve(__dirname);
export default defineConfig({
  input: "./src/main.js",
  plugins: [
    // 解析.vue文件
    vue(),
    // 文件别名配置
    alias({
      entries: [
        { find: "@", replacement: path.resolve(projectRootDir, "src") },
      ],
    }),
    // 解析并打包第三方库
    nodeResolve(),
    // 环境变量的替换->vue源码中
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
      preventAssignment: true,
    }),
    // postcss
    postcss({
      extract: true, // 将css提取成单独的文件
      minimize: true,
      plugins: [],
    }),
    // 清除打包dist目录
    clear({
      targets: ["dist"],
    }),
    // 文件复制
    copy({
      targets: [{ src: "public/**", dest: "dist" }],
    }),
    // 打包进度查看
    progress(),
    // 热加载
    livereload(),
    // 本地服务
    serve({
      contentBase: "dist",
      port: 4576,
      open: true
    }),
  ],
  output: {
    dir: "dist",
    format: "esm",
    sourcemap: true,
    manualChunks: {
      vue: ["vue"],
    },
  },
});
