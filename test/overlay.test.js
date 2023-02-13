import {overlayFiles} from '../src/overlay.js'
import fs from 'fs';


test('apply an overlay and check the output', () => {
	const openapiFile = "test/openapi/petstore.yaml";
	const overlayFile = "test/overlays/overlay.yaml";
	const expectedFile = "test/expected/output1.yaml";
	const expectedOutput = fs.readFileSync(expectedFile, 'utf8');

	const result = overlayFiles(openapiFile, overlayFile);

	expect(result).toEqual(expectedOutput);
});

test('apply an overlay and check the output', () => {
	const openapiFile = "test/openapi/town.yaml";
	const overlayFile = "test/overlays/building-description.yaml";
	const expectedFile = "test/expected/town-building-description.yaml";
	const expectedOutput = fs.readFileSync(expectedFile, 'utf8');

	const result = overlayFiles(openapiFile, overlayFile);

	expect(result).toEqual(expectedOutput);
});


