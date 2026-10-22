# CI³ Lab 中英文三折页设计源码

本分支独立保存中英文三折页的 Vue 源码与所需原始图片素材，包括原版/替换图片、版式、留白和字体切换。默认使用替换图片、调整后的版式及留白。仅保存源码与素材，不提交最终 PDF、预览截图、构建产物或海报文件。

## 运行与构建

使用 Node.js 22.12 或更新版本。

```sh
npm ci
npm run dev
```

中文：<http://localhost:5173/>；英文：<http://localhost:5173/english.html>。

```sh
npm run build
npm run preview
```

构建输出位于 `dist/`，已从版本控制排除。

## 文件说明

- `src/App.vue` / `src/AppEn.vue`：中英文文案及三折页结构。
- `src/styles.css`：版式、图片显示、响应式预览及 A4 横向打印样式。
- `src/*Switcher.vue` / `src/use*Version.js`：字体、图片、版式和留白切换。
- `assets/`：源码使用的原始图片（含切换前后的素材）；`manifest.json` 记录原始相对路径、文件大小及 SHA-256。
- `scripts/export-brochures.cjs`：已有的版式检查及 PDF 导出脚本。

素材保留原始字节，仅整理路径。字体使用操作系统已安装字体及 CSS 回退字体；未打包字体文件，不同系统的字体显示可能不同。

## 检查与按需导出

先运行开发服务器，再在另一个终端执行：

```sh
npx playwright install chromium
npm run verify
npm run export:pdf
```

在 macOS 上脚本优先使用已安装的 Google Chrome；其他系统可以使用 Playwright Chromium，或通过 `CHROME_EXECUTABLE` 指定浏览器。`BROCHURE_URL` 可指定服务器地址。检查涵盖中英文、图片切换、留白、响应式预览和打印几何；字体及浏览器差异可能影响严格的尺寸断言。

导出文件写入 `output/pdf/`，检查报告写入 `tmp/pdfs/`；两者均不会提交到 Git。仅检查可用 `npm run verify`。
