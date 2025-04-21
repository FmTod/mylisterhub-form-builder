import type { UserConfig } from 'vite';
import * as path from 'node:path';
import vue from '@vitejs/plugin-vue2';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';
import { checker } from 'vite-plugin-checker';
import dts from 'vite-plugin-dts';

export default defineConfig(async ({ command }): Promise<UserConfig> => ({
    define: {
        // eslint-disable-next-line node/prefer-global/process
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? 'development'),
        'process.env': '{}',
    },
    plugins: [
        laravel({
            input: ['resources/js/main.ts'],
            buildDirectory: 'resources/dist',
            hotFile: 'resources/dist/hot',
            refresh: true,
        }),
        vue(),
        dts({
            insertTypesEntry: true,
        }),
        checker({
            typescript: true,
            vueTsc: true,
        }),
    ],
    build: {
        outDir: './resources/dist',
        cssCodeSplit: true,
        lib: {
            name: 'FormBuilder',
            entry: 'resources/js/main.ts',
            formats: ['es', 'cjs', 'umd'],
        },
    },
    server: {
        watch: {
            ignored: [
                '**/.git/**',
                '**/vendor/**',
                '**/node_modules/**',
                'resources/dist/**',
            ],
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/js'),
        },
    },
    esbuild: {
        drop: command !== 'serve' ? ['console'] : [],
    },
    css: {
        preprocessorOptions: {
            scss: {
                quietDeps: true,
            },
        },
    },
}));
