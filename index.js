#!/usr/bin/env node
import arg from 'arg'
import { overlayFiles } from './src/overlay.js'

function showHelp () {
  console.log('Usage: overlayjs --openapi FILEPATH --overlay FILEPATH')
  console.log('    use --help to see this help')
}

try {
  const args = arg({
    '--openapi': String,
    '--overlay': String,
    '--help': String
  })

  if (args['--overlay'] && args['--openapi']) {
    const openapiFile = args['--openapi']
    const overlayFile = args['--overlay']
    const spec = overlayFiles(openapiFile, overlayFile)
    console.log(spec)
  } else {
    showHelp()
  }
} catch (err) {
  if (err.code === 'ARG_UNKNOWN_OPTION') {
    console.warn(err.message)
    showHelp()
  } else {
    throw err
  }
}
