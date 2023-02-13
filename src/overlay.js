import fs from 'fs';
import jsonpath from 'jsonpath';
import {safeStringify,parse,parseWithPointers} from "@stoplight/yaml";
import mergician from 'mergician';

function applyOverlayToOpenAPI(spec, overlay) {
	// Use jsonpath.apply to do the changes
	overlay.actions.forEach((a)=>{
		jsonpath.apply(spec, a.target, (chunk) => {
			// Is it a remove?
			if (a.hasOwnProperty('remove')) {
				return {};
			}

			// It must be an update
			
			// Deep merge using a module (built-in spread operator is only shallow)
			const merger = mergician({appendArrays: true});
			console.debug(a);
			const merged = merger(chunk, a.update);
			return merged;

		});
	})

	return spec;
}

export function overlayFiles(openapiFile, overlayFile) {
	// Parse the "input" OpenAPI document
    console.debug(openapiFile);
    console.debug (typeof openapiFile);
	const specraw = fs.readFileSync(openapiFile, 'utf8');
	var spec = parseWithPointers(specraw).data;

	// Parse the "overlay" document
	const overlayraw = fs.readFileSync(overlayFile, 'utf8');
	const overlay = parseWithPointers(overlayraw).data;

	spec = applyOverlayToOpenAPI(spec, overlay);

	// Return the new spec
	return safeStringify(spec);

}

