import {overlayFiles} from './src/overlay.js'

// example: node index.js test/openapi/petstore.yaml test/overlays/overlay.yaml
const openapiFile = process.argv[2]
const overlayFile = process.argv[3]
var spec = overlayFiles(openapiFile, overlayFile);
console.log(spec);

