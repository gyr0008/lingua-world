# LinguaWorld 部署指南

## 🚀 快速部署到 Vercel（推荐）

### 方式一：通过 GitHub 部署（永久免费）

1. **上传代码到 GitHub**
   ```bash
   cd lingua-world
   git init
   git add -A
   git commit -m "LinguaWorld - 多语种在线教育平台"
   git remote add origin https://github.com/YOUR_USERNAME/lingua-world.git
   git branch -M main
   git push -u origin main
   ```

2. **登录 Vercel**
   - 访问 https://vercel.com
   - 使用 GitHub 账号登录
   - 点击 "Add New Project"
   - 选择 `lingua-world` 仓库
   - Vercel 会自动检测配置（构建命令: `npm run build`，输出目录: `dist`）
   - 点击 "Deploy"

3. **获取永久链接**
   - 部署完成后，Vercel 会提供一个 `*.vercel.app` 域名
   - 这个链接可以永久访问和分享！

### 方式二：使用 Vercel CLI

```bash
npm install -g vercel
cd lingua-world
vercel --prod
```

---

## 🌐 部署到 Netlify

1. **上传代码到 GitHub**

2. **登录 Netlify**
   - 访问 https://app.netlify.com
   - 使用 GitHub 账号登录
   - 点击 "Add new site" → "Import an existing project"
   - 选择 GitHub 仓库
   - 构建命令：`npm run build`
   - 发布目录：`dist`
   - 点击 "Deploy site"

3. **自定义域名**
   - Netlify 提供免费的 `*.netlify.app` 子域名
   - 支持绑定自定义域名

---

## 📦 项目文件

项目已构建完成，`dist/` 目录包含所有生产环境文件：

```
lingua-world/dist/
├── index.html          # 主页面入口
├── assets/
│   ├── index-*.js     # JavaScript 打包文件
│   └── index-*.css    # CSS 样式文件
└── favicon.svg        # 网站图标
```

---

## ✅ LocalStorage 数据持久化

项目已配置使用 LocalStorage 存储用户数据：

- 用户登录信息
- 学习进度
- 成就记录
- 每日学习目标

这些数据会永久保存在用户浏览器中，刷新页面或重新访问时数据不会丢失。

---

## 🔧 自定义配置

### Vercel 配置 (vercel.json)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

### Netlify 配置 (netlify.toml)
```toml
[build]
  command = "npm run build"
  publish = "dist"
```

### Cloudflare Pages 配置 (wrangler.toml)
```toml
name = "lingua-world"
pages_build_output_dir = "dist"
```

---

## 🆘 常见问题

### Q: 部署后页面空白？
A: 检查 `vite.config.ts` 中的 `base` 配置，确保为 `./`

### Q: 资源加载失败？
A: 确保构建命令和输出目录配置正确

### Q: 路由不工作？
A: Vercel/Netlify 需要配置重定向到 index.html
