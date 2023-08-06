import postCssPlugin from '@deanc/esbuild-plugin-postcss';
import pandaCssPlugin from '@pandacss/dev/postcss';
import { build } from 'esbuild';
import { copy } from 'esbuild-plugin-copy';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

console.log({ env: process.env.NODE_ENV });

build({
	entryPoints: [
		'./src/injected.ts',
		'./src/contentScript.ts',
		'./src/background.ts',
		'./src/devtools/devtools.tsx',
		'./src/devtools/app/index.tsx'
	],
	bundle: true,
	minify: true,
	sourcemap: process.env.NODE_ENV !== 'production',
	tsconfig: './tsconfig.json',
	target: ['chrome58', 'firefox57'],
	outdir: `./${process.env.BROWSER}/build`,
	define: {
		'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`
	},
	plugins: [
		copy({
			resolveFrom: 'cwd',
			assets: {
				from: ['./src/devtools/devtools.html', './src/devtools/panel.html'],
				to: [`./${process.env.BROWSER}/build/devtools`]
			},
			watch: true
		}),
		copy({
			resolveFrom: 'cwd',
			assets: {
				from: ['./assets/*'],
				to: [`./${process.env.BROWSER}/build/assets`]
			},
			watch: true
		}),
		copy({
			resolveFrom: 'cwd',
			assets: {
				from: ['./src/manifest.json'],
				to: [`./${process.env.BROWSER}/build`]
			},
			watch: true
		}),
		postCssPlugin({
			plugins: [pandaCssPlugin]
		})
	],
	alias: {
		'@panda/css': path.resolve(__dirname, './src/devtools/styled-system/css/index.mjs')
	}
}).catch(() => process.exit(1));
