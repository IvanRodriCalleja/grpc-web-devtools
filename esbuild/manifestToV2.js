import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';

export const manifestToV2 = (options = {}) => ({
	name: 'manifest-to-v2',
	setup(build) {
		if (!options.path) throw new Error('manifestToV2: Path is required');
		if (!options.out) throw new Error('manifestToV2: Put is required');

		const segments = options.out.split('/');
		segments.pop();
		const dir = segments.join('/');
		if (!existsSync(dir)) {
			mkdirSync(dir, { recursive: true });
		}

		build.onEnd(() => {
			const manifest = JSON.parse(readFileSync(options.path, { encoding: 'utf-8' }));

			manifest.manifest_version = 2;

			if (manifest.background && manifest.background.service_worker) {
				manifest.background = {
					scripts: [manifest.background.service_worker],
					persistent: false
				};
			}

			if (manifest.web_accessible_resources) {
				manifest.web_accessible_resources = manifest.web_accessible_resources.reduce(
					(acc, { resources }) => {
						return [...acc, ...resources];
					},
					[]
				);
			}

			writeFileSync(options.out, JSON.stringify(manifest, null, 2));
		});
	}
});
