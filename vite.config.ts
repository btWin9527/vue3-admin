import { resolve } from "path";
import { loadEnv } from "vite";
import type { UserConfig, ConfigEnv } from "vite";
import Vue from "@vitejs/plugin-vue";
import VueJsx from "@vitejs/plugin-vue-jsx";
import EslintPlugin from "vite-plugin-eslint";
import { viteMockServe } from "vite-plugin-mock";

const root = process.cwd();

function pathResolve(dir: string) {
  return resolve(root, ".", dir);
}

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  let env = {} as any;
  const isBuild = command === "build";
  if (!isBuild) {
    env = loadEnv((process.argv[3] === "--mode" ? process.argv[4] : process.argv[3]), root);
  } else {
    env = loadEnv(mode, root);
  }

  return {
    base: env.VITE_BASE_PATH,
    plugins: [
      Vue(),
      VueJsx(),
      EslintPlugin({
        cache: false,
        include: ["src/**/*.vue", "src/**/*.ts", "src/**/*.tsx"] // 检查的文件
      }),
      viteMockServe({
        ignore: /^\_/,
        mockPath: "mock",
        localEnabled: !isBuild,
        prodEnabled: isBuild,
        injectCode: `
          import { setupProdMockServer } from '../mock/_createProductionServer'

          setupProdMockServer()
          `
      })
    ],
    resolve: {
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".less", ".css"],
      alias: [
        {
          find: /\@\//,
          replacement: `${pathResolve("src")}/`
        }
      ]
    },
    optimizeDeps: {
      include: [
        "vue",
        "vue-router",
        "vue-types"
      ]
    }
  };
}
