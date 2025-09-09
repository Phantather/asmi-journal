/// <reference types="vitest" />

import fs from 'fs';
import path from 'path';

import { defineConfig, loadEnv } from 'vite';
// import ssr from 'vite-plugin-ssr/plugin';

import react from '@vitejs/plugin-react';
import jotaiDebugLabel from 'jotai/babel/plugin-debug-label';
import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh';
import checker from 'vite-plugin-checker';
import eslint from 'vite-plugin-eslint';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';
import { VitePluginRadar } from 'vite-plugin-radar';
import svgr from 'vite-plugin-svgr';

const rootPath = __dirname;

const basePath = path.resolve(rootPath, './src');
const srcDirs = fs
  .readdirSync(basePath)
  .filter((name) => fs.lstatSync(path.join(basePath, name)).isDirectory());

const srcAliases = srcDirs.reduce(
  (acc: any, name: any) => ({
    ...acc,
    [`~${name}`]: `${path.resolve(rootPath, 'src')}/${name}`,
  }),
  {}
);

const manifestForPlugIn: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',
  includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
  injectRegister: 'inline',
  manifest: {
    name: 'Hyundai',
    short_name: 'Hyundai',
    description: 'Hyundai kyrgyzstan',
    background_color: '#ffffff',
    icons: [
      {
        src: '/assets/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'favicon',
      },
      {
        src: '/assets/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'favicon',
      },
      {
        src: '/assets/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'apple touch icon',
      },
    ],
  },
  disable: false,
};

export default ({ mode }: { mode: string }) => {
  const viteEnv = loadEnv(mode, './envs');
  process.env = { ...process.env, ...viteEnv };

  return defineConfig({
    plugins: [
      react({
        babel: {
          plugins: ['@emotion/babel-plugin', jotaiDebugLabel, jotaiReactRefresh],
        },
      }),
      VitePluginRadar({
        analytics: {
          id: process.env.VITE_GOOGLE_ANALYTICS || 'G-AAAAAAAAAA',
        },
      }),
      // VitePWA(manifestForPlugIn),
      // ssr(),
      checker({
        typescript: true,
      }),
      eslint(),
      svgr(),
    ],
    envDir: './envs',
    build: {
      sourcemap: false,
    },
    resolve: {
      alias: {
        ...srcAliases,
      },
    },
    base: '/',
    server: {
      port: 3000,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/shared/lib/test/setup.ts',
    },
  });
};
