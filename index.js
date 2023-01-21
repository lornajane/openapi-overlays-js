import fs from 'fs';
import jsonpath from 'jsonpath';
import {safeStringify,parseWithPointers} from "@stoplight/yaml";
import mergician from 'mergician';

try {

	// Parse the "input" OpenAPI spec document

	const specraw = fs.readFileSync('big.yaml', 'utf8');
	var spec = parseWithPointers(specraw).data;

	// Parse the "overlay" OpenAPI document

	const overlayraw = fs.readFileSync('overlay.yaml', 'utf8');
	const overlay = parseWithPointers(overlayraw).data;

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
			const merged = merger(chunk, a.update);
			return merged;

		});
	})

	// Output the new spec
	//console.log(JSON.stringify(spec, null, 2));
	console.log(safeStringify(spec));

} catch (err) {
	console.error(err);
}

