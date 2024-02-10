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


test('remove a property', () => {
	const openapiFile = "test/openapi/town.yaml";
	const overlayFile = "test/overlays/remove-properties.yaml";
	const expectedFile = "test/expected/town-remove-properties.yaml";
	const expectedOutput = fs.readFileSync(expectedFile, 'utf8');

	const result = overlayFiles(openapiFile, overlayFile);

	expect(result).toEqual(expectedOutput);
});

test('remove all description fields', () => {
	const openapiFile = "test/openapi/town.yaml";
	const overlayFile = "test/overlays/remove-descriptions.yaml";
	const expectedFile = "test/expected/town-remove-descriptions.yaml";
	const expectedOutput = fs.readFileSync(expectedFile, 'utf8');

	const result = overlayFiles(openapiFile, overlayFile);

	expect(result).toEqual(expectedOutput);
});

test('fail to update a primitive string type', () => {
	const openapiFile = "test/openapi/immutable.yaml";
	const overlayFile = "test/overlays/immutable.yaml";
	const expectedFile = "test/expected/immutable.yaml";
	const expectedOutput = fs.readFileSync(expectedFile, 'utf8');

	const result = overlayFiles(openapiFile, overlayFile);

	expect(result).toEqual(expectedOutput);
});

test('fail to parse invalid jsonpath expression', () => {
	const openapiFile = "test/openapi/not-jsonpath.yaml";
	const overlayFile = "test/overlays/not-jsonpath.yaml";
	const expectedFile = "test/expected/not-jsonpath.yaml";
	const expectedOutput = fs.readFileSync(expectedFile, 'utf8');

	const result = overlayFiles(openapiFile, overlayFile);

	expect(result).toEqual(expectedOutput);
});

test('fail to parse invalid overlay document', () => {
	const openapiFile = "test/openapi/not-overlay.yaml";
	const overlayFile = "test/overlays/not-overlay.yaml";
	const expectedFile = "test/expected/not-overlay.yaml";
	const expectedOutput = fs.readFileSync(expectedFile, 'utf8');

	const result = overlayFiles(openapiFile, overlayFile);

	expect(result).toEqual(expectedOutput);
});

test('overlay document with empty actions is a nop', () => {
	const openapiFile = "test/openapi/not-overlay.yaml";
	const overlayFile = "test/overlays/not-overlay.yaml";
	const expectedFile = "test/expected/not-overlay.yaml";
	const expectedOutput = fs.readFileSync(expectedFile, 'utf8');

	const result = overlayFiles(openapiFile, overlayFile);

	expect(result).toEqual(expectedOutput);
});

test('remove all matching responses', () => {
	const openapiFile = "test/openapi/responses.yaml";
	const overlayFile = "test/overlays/remove-responses.yaml";
	const expectedFile = "test/expected/remove-responses.yaml";
	const expectedOutput = fs.readFileSync(expectedFile, 'utf8');

	const result = overlayFiles(openapiFile, overlayFile);

	expect(result).toEqual(expectedOutput);
});

