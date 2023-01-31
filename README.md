# vue-element-plus-admin
## 1. 项目搭建
### 1.1 依赖

>  pnpm + vue3 + vite4 + ts

```shell
pnpm create vite@latest vue3-admin --template vue-ts
```

### 1.2 引入pinia+vue-router

```shell
 pnpm install vue-router@^4.1.6 pinia@^2.0.29
```

### 1.3 tsconfig.json配置

```json
{
   "compilerOptions": {
   "target": "esnext",
   "useDefineForClassFields": true,
   "module": "esnext",
   "moduleResolution": "node",
   "strict": true,
   "jsx": "preserve",
   "sourceMap": true,
   "resolveJsonModule": true,
   "esModuleInterop": true,
   "lib": ["esnext", "dom"],
   "baseUrl": ".",
   "allowJs": true,
   "forceConsistentCasingInFileNames": true,
   "allowSyntheticDefaultImports": true,
   "strictFunctionTypes": false,
   "noUnusedLocals": true,
   "noUnusedParameters": true,
   "experimentalDecorators": true,
   "noImplicitAny": false,
   "skipLibCheck": true,
   "paths": {
   "@/*": ["src/*"]
   },
   "typeRoots": ["./node_modules/@types/", "./types"]
   },
   "include": ["src/**/*", "types/**/*.d.ts", "mock/**/*.ts"],
   "exclude": ["dist", "node_modules"]
   }
```

### 1.4 alias别名配置
 
tsconfig.json
```json
{
   "paths": {
      "@/*": ["src/*"]
   }
}
```
vite.config.ts

```ts
import {resolve} from 'path'
import {defineConfig} from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'

const root = process.cwd()

function pathResolve(dir: string) {
   return resolve(root, '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [
      Vue(),
      VueJsx(),
   ],
   resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.less', '.css'],
      alias: [
         {
            find: /\@\//,
            replacement: `${pathResolve('src')}/`
         }
      ]
   }
})

```

### 1.5 eslint + prettier

package.json添加依赖
```json
{
  "@typescript-eslint/eslint-plugin": "^5.48.1",
  "@typescript-eslint/parser": "^5.48.1",
  "eslint": "^8.32.0",
  "eslint-config-prettier": "^8.6.0",
  "eslint-define-config": "^1.14.0",
  "eslint-plugin-prettier": "^4.2.1",
  "eslint-plugin-vue": "^9.9.0",
  "prettier": "^2.8.3",
  "vite-plugin-eslint": "^1.8.1"
}
```

vite.config.ts配置

```ts
import EslintPlugin from 'vite-plugin-eslint'

export default defineConfig({
    plugins: [
        EslintPlugin({
            cache: false,
            include: ['src/**/*.vue', 'src/**/*.ts', 'src/**/*.tsx'] // 检查的文件
        }),
    ],
})
```

**注意⚠️**

> vite配置eslint需要去除package.json中type: “module”。
> 设置了"type": "module" 后你的所有js文件默认使用ESM模块规范，不支持commonjs规范


### 1.6 环境变量配置

.env.base
```dotenv
# 环境
NODE_ENV=development

# 接口前缀
VITE_API_BASEPATH=base

# 打包路径
VITE_BASE_PATH=/

# 标题
VITE_APP_TITLE=ElementAdmin

```

package.json

```json
{
  "script": {
    "dev": "vite --mode base"
  }
}
```

## 2. 数据配置

### 2.1 mock数据配置

### 2.2 axios配置

## 3. 页面配置

### 3.1 element-plus引入

### 3.2 layout页面

### 3.3 登陆页功能实现