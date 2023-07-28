import { exec } from 'child-process-promise';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const EXTENSION_PATH = resolve(__dirname, './build');
const START_URL = 'https://local.agentero.com/dashboard';

const launchBrowser = async () => {
	console.log('Running chrome browser...');
	const options = [
		'--target=chromium',
		`--source-dir=${EXTENSION_PATH}`,
		`--start-url=${START_URL}`,
		'--devtools',
		'--browser-console',
		'--keep-profile-changes',
		//'--chromium-profile="/Users/ivanrodriguezcalleja/Library/Application Support/Google/Chrome"',
    	//"--arg ' --profile-directory=Profile 2'"
	];

	try {
		await exec(`npx web-ext run ${options.join(' ')}`);
	} catch (err) {
		console.error('`web-ext run` failed', err.stdout, err.stderr);
	}
};

setTimeout(launchBrowser, 1000);
