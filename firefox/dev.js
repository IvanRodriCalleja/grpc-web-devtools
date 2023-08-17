import { exec } from 'child-process-promise';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const EXTENSION_PATH = resolve(__dirname, './build');
const START_URL = 'http://localhost:3000';

const launchBrowser = async () => {
	console.log('Running firefox browser...');
	const options = [
		`--source-dir=${EXTENSION_PATH}`,
		`--start-url=${START_URL}`,
		'--devtools',
		'--browser-console',
		'--keep-profile-changes'
	];

	try {
		await exec(`npx web-ext run ${options.join(' ')}`);
	} catch (err) {
		console.error('`web-ext run` failed', err.stdout, err.stderr);
	}
};

setTimeout(launchBrowser, 2000);
