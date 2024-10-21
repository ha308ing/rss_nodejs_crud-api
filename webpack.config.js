import { resolve } from "path";

const __dirname = import.meta.dirname;

/** @type {import('webpack').Configuration} */
export default {
  mode: "production",
  entry: "./src/index.ts",
  output: {
    path: resolve(__dirname, "dist"),
    filename: "server.cjs",
    clean: true,
  },
  target: "node",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    extensionAlias: {
      ".js": [".js", ".ts"],
    },
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
};
