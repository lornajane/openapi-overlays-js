import fs from 'fs'
import jsonpath from 'jsonpath'
import { safeStringify, parseWithPointers } from '@stoplight/yaml'
import mergician from 'mergician'

function applyOverlayToOpenAPI (spec, overlay) {
  // Use jsonpath.apply to do the changes
  if (overlay.actions && overlay.actions.length >= 1) {
    overlay.actions.forEach((a) => {
    // Is it a remove?
      if (Object.prototype.hasOwnProperty.call(a, 'remove')) {
        while (true) {
          const path = jsonpath.paths(spec, a.target)
          if (path.length === 0) {
            break
          }
          const parent = jsonpath.parent(spec, a.target)
          const thingToRemove = path[0][path[0].length - 1]
          if (Array.isArray(parent)) {
            parent.splice(thingToRemove, 1)
          } else {
            delete parent[thingToRemove]
          }
        }
      } else {
        try {
        // It must be an update
          if (a.target === '$') {
            spec = merger(a.update)(spec)
          } else {
            jsonpath.apply(spec, a.target, merger(a.update))
          }
        } catch (ex) {
          process.stderr.write(`Error applying overlay: ${ex.message}\n`)
        // return chunk
        }
      }
    })
  }

  return spec
}

// Deep merge using a module (built-in spread operator is only shallow)
function merger (obj) {
  return (chunk) => {
    return mergician({ appendArrays: true })(chunk, obj)
  }
}

function sortOpenAPIFields (field1, field2) {
  const orderedKeys = ['info', 'servers', 'summary', 'operationId', 'tags', 'paths', 'components', 'description', 'parameters', 'responses']

  const index1 = orderedKeys.indexOf(field1)
  const index2 = orderedKeys.indexOf(field2)

  if (index1 === -1 || index2 === -1) {
    return 0
  } else if (index1 > index2) {
    return 1
  } else {
    return -1
  }
}

export function applyOverlay (definition, overlay) {
  return applyOverlayToOpenAPI(definition, overlay)
}

export function overlayFiles (openapiFile, overlayFile) {
  // Parse the "input" OpenAPI document
  const specraw = fs.readFileSync(openapiFile, 'utf8')
  let spec = parseWithPointers(specraw).data

  // Parse the "overlay" document
  const overlayraw = fs.readFileSync(overlayFile, 'utf8')
  const overlay = parseWithPointers(overlayraw).data

  spec = applyOverlayToOpenAPI(spec, overlay)

  // Return the new spec
  return safeStringify(spec, { sortKeys: sortOpenAPIFields })
}
