# Crossbar Simulator 项目介绍网站

这是 Crossbar Simulator 忆阻器阵列仿真软件的项目介绍网站，专门用于展示软件功能、提供下载链接和文档支持。

## 📁 文件结构

```
docs/
├── index.html          # 主页面
├── styles.css          # 样式文件
├── script.js           # 交互脚本
├── assets/             # 静态资源
│   └── zju-logo.svg    # 浙江大学logo
└── README.md           # 说明文档
```

## 🎨 设计特点

- **现代化设计**: 采用最新的设计趋势，包含渐变背景、毛玻璃效果、动画等
- **响应式布局**: 完美适配桌面端、平板和移动设备
- **交互体验**: 平滑滚动、悬停效果、加载动画等
- **性能优化**: 使用Intersection Observer API和防抖技术优化性能

## 🚀 功能模块

### 1. 英雄区域 (Hero Section)
- 项目标题和简介
- 行动按钮（下载、了解更多）
- 动态忆阻器阵列可视化

### 2. 功能特性 (Features)
- 时域仿真
- 频域分析
- 3D可视化
- 参数配置
- 数据导出
- 高性能

### 3. 技术规格 (Specifications)
- 阵列规模：64×64
- 3D可视化
- 实时仿真
- 多格式导出

### 4. 下载区域 (Download)
- Windows、macOS、Linux 三个平台
- 版本信息和文件大小
- 系统要求说明

### 5. 文档支持 (Documentation)
- 用户手册
- API文档
- 常见问题
- 技术支持

### 6. 关于我们 (About)
- 项目介绍
- 统计数据
- 浙江大学logo

## 🛠️ 技术栈

- **HTML5**: 语义化标签，SEO友好
- **CSS3**: 现代CSS特性，包括Grid、Flexbox、CSS变量
- **JavaScript ES6+**: 模块化代码，现代JavaScript特性
- **Font Awesome**: 图标库
- **Google Fonts**: Inter字体

## 📱 响应式断点

- **桌面端**: > 768px
- **平板端**: 768px - 480px
- **移动端**: < 480px

## 🎯 使用说明

1. **本地预览**: 直接在浏览器中打开 `index.html`
2. **部署到GitHub Pages**: 
   - 将docs文件夹内容推送到公开仓库
   - 在仓库设置中启用GitHub Pages
   - 选择docs文件夹作为源

## 🔧 自定义配置

### 修改颜色主题
在 `styles.css` 中的 `:root` 选择器中修改CSS变量：

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    /* 其他颜色变量 */
}
```

### 修改下载链接
在 `index.html` 中找到下载按钮，修改 `href` 属性：

```html
<a href="你的下载链接" class="btn btn-download">
```

### 修改项目信息
在 `index.html` 中搜索并替换相关文本内容。

## 📈 性能优化

- 使用CDN加载外部资源
- 图片懒加载
- CSS和JavaScript压缩
- 浏览器缓存优化

## 🔍 SEO优化

- 语义化HTML标签
- Meta标签优化
- 结构化数据
- 移动端友好

## 📞 技术支持

如需修改或定制，请联系开发团队。

---

© 2024 Crossbar Simulator. 由浙江大学开发维护。 