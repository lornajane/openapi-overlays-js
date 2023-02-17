import fs from 'fs';
import jsonpath from 'jsonpath';
import {safeStringify,parse,parseWithPointers} from "@stoplight/yaml";
import mergician from 'mergician';

function applyOverlayToOpenAPI(spec, overlay) {
	// Use jsonpath.apply to do the changes
	overlay.actions.forEach((a)=>{
		// Is it a remove?
		if (a.hasOwnProperty('remove')) {
			while(true) {
				var path = jsonpath.paths(spec, a.target, 1)
				if (path.length == 0) {
					break
				}
				var parent = jsonpath.parent(spec, a.target)
				const thingToRemove = path[0][path[0].length - 1]
				delete parent[thingToRemove]
			}

		} else {
			// It must be an update
			jsonpath.apply(spec, a.target, (chunk) => {
				
				// Deep merge using a module (built-in spread operator is only shallow)
				const merger = mergician({appendArrays: true});
				const merged = merger(chunk, a.update);
				return merged;

			});
		}
	})

	return spec;
}

export function overlayFiles(openapiFile, overlayFile) {
	// Parse the "input" OpenAPI document
	const specraw = fs.readFileSync(openapiFile, 'utf8');
	var spec = parseWithPointers(specraw).data;

	// Parse the "overlay" document
	const overlayraw = fs.readFileSync(overlayFile, 'utf8');
	const overlay = parseWithPointers(overlayraw).data;

	spec = applyOverlayToOpenAPI(spec, overlay);

	// Return the new spec
	return safeStringify(spec);

}

