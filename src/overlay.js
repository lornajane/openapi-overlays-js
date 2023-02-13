import fs from 'fs';
import jsonpath from 'jsonpath';
import {safeStringify,parse,parseWithPointers} from "@stoplight/yaml";
import mergician from 'mergician';

function applyOverlayToOpenAPI(spec, overlay) {
	// Use jsonpath.apply to do the changes
	overlay.actions.forEach((a)=>{
		// Is it a remove?
		if (a.hasOwnProperty('remove')) {
			// split the path expression
			var target_pieces = jsonpath.parse(a.target);
			// snag the last piece, we need this info to work out which element to remove
			var final_segment = target_pieces.pop();
			var target_key = "";
			if(final_segment.expression.type == "identifier") {
				target_key = final_segment.expression.value;
			}

		    // Now rebuild the path up to before the final bit
			var remaining_path = jsonpath.stringify(target_pieces);
			
			// get the parent node and remove the target element
			var node_value = jsonpath.value(spec, remaining_path);
			delete node_value[target_key];
			
		} else {
			// It must be an update
			jsonpath.apply(spec, a.target, (chunk) => {
				
				// Deep merge using a module (built-in spread operator is only shallow)
				const merger = mergician({appendArrays: true});
				console.debug(a);
				const merged = merger(chunk, a.update);
				return merged;

			});
		}
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

