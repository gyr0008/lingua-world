# LinguaWorld - 多语种在线教育平台

🌍 一款沉浸式多语种在线学习平台，支持英语、日语、韩语等主流语言的学习。

## 快速访问

**🚀 部署状态**: 项目已构建完成，可通过以下方式部署：

### 部署方式

#### 方式一：Vercel 部署（推荐）

1. 访问 [vercel.com](https://vercel.com)
2. 使用 GitHub 账号登录
3. 点击 "Import Project"
4. 选择 `lingua-world` 仓库
5. Vercel 会自动检测到 Vite 配置
6. 点击 Deploy 即可

**或者使用命令行**:
```bash
cd lingua-world
npx vercel --prod
```

#### 方式二：Netlify 部署

1. 访问 [netlify.com](https://netlify.com)
2. 使用 GitHub 账号登录
3. 点击 "Add new site" → "Import an existing project"
4. 选择 GitHub 仓库
5. 构建命令：`npm run build`
6. 发布目录：`dist`
7. 点击 Deploy

#### 方式三：本地预览

```bash
cd lingua-world
npm install
npm run dev
```

然后访问 http://localhost:5173

## 功能特性

- ✅ **多语言支持** - 英语、日语、韩语
- ✅ **分级课程体系** - 入门、进阶、精通三个级别
- ✅ **互动学习模块** - 单词记忆、语法练习、口语跟读、听力训练
- ✅ **学习进度追踪** - XP经验值系统、环形进度条
- ✅ **用户注册登录** - LocalStorage数据持久化
- ✅ **成就激励系统** - 12个成就徽章
- ✅ **社区交流** - 帖子浏览和发布

## 技术栈

- React 18 + TypeScript
- Vite 构建工具
- Tailwind CSS v4
- Framer Motion 动画
- Lucide React 图标库
- React Router 路由
- LocalStorage 数据持久化

## 项目结构

```
lingua-world/
├── src/
│   ├── components/       # UI组件
│   │   ├── common/      # 通用组件（Button, Card, Modal, Progress）
│   │   ├── home/        # 首页组件
│   │   ├── learn/       # 学习模块组件
│   │   ├── layout/      # 布局组件
│   │   ├── profile/      # 个人中心组件
│   │   └── community/    # 社区组件
│   ├── contexts/        # React Context状态管理
│   ├── pages/           # 页面组件
│   ├── types/           # TypeScript类型定义
│   └── data/            # Mock数据
├── dist/                # 构建产物（部署用）
├── vercel.json          # Vercel配置
├── netlify.toml         # Netlify配置
└── wrangler.toml        # Cloudflare配置
```

## 构建产物

项目已构建完成，`dist/` 目录包含所有生产环境文件，可直接部署到任何静态托管服务。

## License

MIT
