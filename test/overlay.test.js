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

test('add a description and update the summary', () => {
	const openapiFile = "test/openapi/town.yaml";
	const overlayFile = "test/overlays/building-description.yaml";
	const expectedFile = "test/expected/town-building-description.yaml";
	const expectedOutput = fs.readFileSync(expectedFile, 'utf8');

	const result = overlayFiles(openapiFile, overlayFile);

	expect(result).toEqual(expectedOutput);
});


test('remove an example', () => {
	const openapiFile = "test/openapi/town.yaml";
	const overlayFile = "test/overlays/remove-example.yaml";
	const expectedFile = "test/expected/town-remove-example.yaml";
	const expectedOutput = fs.readFileSync(expectedFile, 'utf8');

	const result = overlayFiles(openapiFile, overlayFile);

	expect(result).toEqual(expectedOutput);
});


