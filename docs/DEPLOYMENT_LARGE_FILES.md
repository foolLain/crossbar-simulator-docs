# 大文件部署指南

本指南专门针对Crossbar Simulator 600MB应用程序文件的GitHub Pages部署问题。

## 🚨 GitHub文件大小限制

- **单个文件最大**：100MB
- **仓库总大小建议**：不超过1GB
- **超过100MB的文件**：需要使用Git LFS

## 📦 推荐部署方案

### 方案一：GitHub Releases + 文档仓库（推荐）

#### 1. 创建专门的文档仓库

```bash
# 创建新的文档仓库
git clone https://github.com/your-username/crossbar-simulator-docs.git
cd crossbar-simulator-docs

# 将docs文件夹内容复制到根目录
cp -r ../CrossbarSimulation/docs/* .

# 提交并推送
git add .
git commit -m "Initial documentation website"
git push origin main
```

#### 2. 在主项目仓库创建Release

1. **进入主项目仓库**
2. **创建Release**：
   - 点击 "Releases" → "Create a new release"
   - 填写版本号（如 v1.0.0）
   - 添加发布说明
   - **上传应用程序文件**：
     - `crossbar-simulator-windows.exe` (600MB)
     - `crossbar-simulator-macos.dmg`
     - `crossbar-simulator-linux.AppImage`

#### 3. 更新下载链接

在文档仓库中，确保下载链接指向GitHub Releases：

```html
<!-- Windows版本 -->
<a href="https://github.com/your-username/crossbar-simulator/releases/latest/download/crossbar-simulator-windows.exe">

<!-- macOS版本 -->
<a href="https://github.com/your-username/crossbar-simulator/releases/latest/download/crossbar-simulator-macos.dmg">

<!-- Linux版本 -->
<a href="https://github.com/your-username/crossbar-simulator/releases/latest/download/crossbar-simulator-linux.AppImage">
```

#### 4. 启用GitHub Pages

1. 进入文档仓库设置
2. 启用GitHub Pages
3. 选择 "Deploy from a branch"
4. 选择 "main" 分支和 "/ (root)" 源

### 方案二：外部文件托管

#### 使用云存储服务

1. **阿里云OSS**（推荐国内用户）：
   ```bash
   # 上传文件到OSS
   ossutil cp crossbar-simulator-windows.exe oss://your-bucket/releases/
   
   # 获取下载链接
   https://your-bucket.oss-cn-region.aliyuncs.com/releases/crossbar-simulator-windows.exe
   ```

2. **Google Drive**：
   - 上传文件到Google Drive
   - 右键文件 → "获取分享链接"
   - 修改链接格式：`https://drive.google.com/uc?export=download&id=文件ID`

3. **Dropbox**：
   - 上传文件到Dropbox
   - 右键文件 → "分享" → "复制链接"
   - 修改链接格式：`https://dl.dropboxusercontent.com/s/文件ID/文件名`

#### 更新下载链接

```html
<!-- 示例：使用阿里云OSS -->
<a href="https://your-bucket.oss-cn-region.aliyuncs.com/releases/crossbar-simulator-windows.exe" class="btn btn-download">
    <i class="fas fa-download"></i>
    下载 Windows 版本
</a>
```

## 🔧 自动化部署脚本

### 创建部署脚本

```bash
#!/bin/bash
# deploy.sh

echo "开始部署Crossbar Simulator文档网站..."

# 1. 更新文档仓库
cd crossbar-simulator-docs
git pull origin main

# 2. 复制最新文档
cp -r ../CrossbarSimulation/docs/* .

# 3. 提交更改
git add .
git commit -m "Update documentation $(date)"
git push origin main

echo "文档网站部署完成！"
echo "访问地址: https://your-username.github.io/crossbar-simulator-docs/"
```

### 创建Release脚本

```bash
#!/bin/bash
# create-release.sh

VERSION=$1
if [ -z "$VERSION" ]; then
    echo "请提供版本号，例如: ./create-release.sh v1.0.0"
    exit 1
fi

echo "创建版本 $VERSION 的Release..."

# 1. 构建应用程序
npm run build:full

# 2. 创建Release
gh release create $VERSION \
    --title "Crossbar Simulator $VERSION" \
    --notes "新版本发布" \
    out/memristor-simulator-*.exe \
    out/memristor-simulator-*.dmg \
    out/memristor-simulator-*.AppImage

echo "Release创建完成！"
```

## 📊 文件大小优化建议

### 1. 压缩应用程序

```bash
# 使用7-Zip压缩
7z a -t7z crossbar-simulator-windows.7z out/memristor-simulator-*.exe

# 使用WinRAR压缩
winrar a crossbar-simulator-windows.rar out/memristor-simulator-*.exe
```

### 2. 分离资源文件

- 将大型资源文件（如图片、音频）分离到CDN
- 使用懒加载技术
- 考虑使用增量更新

### 3. 使用分块下载

```javascript
// 在script.js中添加分块下载功能
function downloadWithProgress(url, filename) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';
    
    xhr.onprogress = function(e) {
        if (e.lengthComputable) {
            const percentComplete = (e.loaded / e.total) * 100;
            updateProgressBar(percentComplete);
        }
    };
    
    xhr.onload = function() {
        if (xhr.status === 200) {
            const blob = xhr.response;
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(url);
        }
    };
    
    xhr.send();
}
```

## 🚀 最终推荐流程

1. **创建文档仓库**：`crossbar-simulator-docs`
2. **在主仓库创建Release**：上传600MB应用程序文件
3. **更新文档链接**：指向GitHub Releases
4. **启用GitHub Pages**：部署文档网站
5. **设置自动化**：创建部署脚本

这样既解决了大文件问题，又保持了代码的私密性，同时提供了良好的用户体验。

## 📞 技术支持

如果遇到部署问题，可以：
1. 检查GitHub Pages设置
2. 验证文件链接是否有效
3. 使用浏览器开发者工具检查网络请求
4. 查看GitHub Actions日志（如果使用） 