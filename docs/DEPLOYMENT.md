# 部署指南

本指南将帮助您将 Crossbar Simulator 项目介绍网站部署到 GitHub Pages。

## 🚀 部署到 GitHub Pages

### 方法一：使用现有仓库的 docs 文件夹

1. **确保文件结构正确**
   ```
   你的仓库/
   ├── docs/
   │   ├── index.html
   │   ├── styles.css
   │   ├── script.js
   │   ├── assets/
   │   │   └── zju-logo.svg
   │   └── README.md
   └── 其他项目文件...
   ```

2. **提交并推送代码**
   ```bash
   git add docs/
   git commit -m "Add project documentation website"
   git push origin main
   ```

3. **启用 GitHub Pages**
   - 进入你的 GitHub 仓库
   - 点击 "Settings" 标签
   - 滚动到 "Pages" 部分
   - 在 "Source" 下选择 "Deploy from a branch"
   - 选择 "main" 分支和 "/docs" 文件夹
   - 点击 "Save"

4. **等待部署**
   - GitHub 会自动构建和部署你的网站
   - 通常需要几分钟时间
   - 部署完成后，你会收到通知邮件

### 方法二：创建专门的文档仓库

1. **创建新仓库**
   - 在 GitHub 上创建一个新的公开仓库
   - 建议命名为 `crossbar-simulator-docs` 或类似名称

2. **上传文件**
   - 将 `docs/` 文件夹中的所有内容上传到新仓库的根目录
   - 或者使用 Git 命令：
   ```bash
   git clone https://github.com/你的用户名/crossbar-simulator-docs.git
   cd crossbar-simulator-docs
   # 复制 docs/ 文件夹中的所有文件到当前目录
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. **启用 GitHub Pages**
   - 按照方法一的步骤 3 操作
   - 这次选择根目录 "/ (root)" 作为源

## 🔧 自定义配置

### 更新下载链接

在 `index.html` 中找到下载按钮，将 `href="#"` 替换为实际的下载链接：

```html
<!-- Windows 版本 -->
<a href="https://github.com/你的用户名/你的仓库/releases/download/v1.0.0/crossbar-simulator-windows.exe" class="btn btn-download">
    下载 Windows 版本
</a>

<!-- macOS 版本 -->
<a href="https://github.com/你的用户名/你的仓库/releases/download/v1.0.0/crossbar-simulator-macos.dmg" class="btn btn-download">
    下载 macOS 版本
</a>

<!-- Linux 版本 -->
<a href="https://github.com/你的用户名/你的仓库/releases/download/v1.0.0/crossbar-simulator-linux.AppImage" class="btn btn-download">
    下载 Linux 版本
</a>
```

### 更新文档链接

在 `index.html` 中找到文档卡片，更新链接：

```html
<a href="https://github.com/你的用户名/你的仓库/wiki" class="doc-card">
    <div class="doc-icon">
        <i class="fas fa-book"></i>
    </div>
    <h3>用户手册</h3>
    <p>详细的使用说明和操作指南</p>
</a>
```

### 更新社交媒体链接

在 `index.html` 的页脚部分更新链接：

```html
<div class="social-links">
    <a href="https://github.com/你的用户名/你的仓库"><i class="fab fa-github"></i></a>
    <a href="https://twitter.com/你的用户名"><i class="fab fa-twitter"></i></a>
    <a href="https://linkedin.com/in/你的用户名"><i class="fab fa-linkedin"></i></a>
</div>
```

## 📝 本地测试

在部署之前，建议先在本地测试网站：

1. **使用 Python 简单服务器**
   ```bash
   cd docs
   python -m http.server 8000
   ```
   然后在浏览器中访问 `http://localhost:8000`

2. **使用 Node.js live-server**
   ```bash
   npm install -g live-server
   cd docs
   live-server
   ```

3. **直接打开文件**
   - 在浏览器中直接打开 `docs/index.html`
   - 注意：某些功能可能需要服务器环境

## 🔍 故障排除

### 常见问题

1. **页面显示空白**
   - 检查文件路径是否正确
   - 确保所有文件都已上传
   - 查看浏览器控制台是否有错误

2. **样式没有加载**
   - 检查 `styles.css` 文件是否存在
   - 确认文件路径正确
   - 检查网络连接（CDN资源）

3. **JavaScript 功能不工作**
   - 检查 `script.js` 文件是否存在
   - 查看浏览器控制台错误信息
   - 确认没有JavaScript语法错误

4. **图片不显示**
   - 检查 `assets/` 文件夹是否存在
   - 确认图片文件路径正确
   - 检查文件大小是否过大

### 调试技巧

1. **使用浏览器开发者工具**
   - 按 F12 打开开发者工具
   - 查看 Console 标签页的错误信息
   - 检查 Network 标签页的资源加载情况

2. **检查 GitHub Pages 状态**
   - 在仓库的 "Actions" 标签页查看部署状态
   - 检查是否有构建错误

3. **验证 HTML 和 CSS**
   - 使用在线工具验证 HTML 语法
   - 检查 CSS 语法是否正确

## 📈 性能优化建议

1. **压缩文件**
   - 使用工具压缩 CSS 和 JavaScript 文件
   - 优化图片大小和格式

2. **使用 CDN**
   - 考虑将静态资源托管到 CDN
   - 使用 GitHub 的 raw 链接作为备选

3. **缓存策略**
   - 设置适当的缓存头
   - 使用版本号控制缓存

## 🎯 下一步

部署完成后，你可以：

1. **分享链接**：将网站链接分享给用户和合作伙伴
2. **收集反馈**：通过网站收集用户反馈和建议
3. **持续更新**：定期更新软件版本和文档内容
4. **分析访问**：使用 Google Analytics 等工具分析访问数据

---

如有任何问题，请参考 GitHub Pages 官方文档或联系开发团队。 