# 黑苹果商城 - Black Apple

## 快速上手

安装依赖：npm install

启动：npm run dev

打包：npm run build

## 前置条件

Node.js 18+

npm 9+ / yarn 1.22+

## Key用法

1. 渲染列表
2. 强制组件重置
   - 直接改组件的Key,重新创建新组件，重置数据与状态
3. 路由切换触发刷新
   - 每次 userId 变了，组件立刻刷新加载数据，不用你手动处理生命周期。
  
   ```jsx
   <Route 
   path="/profile/:userId"
   element={<UserProfile key={userId} />}
   />
   ```
