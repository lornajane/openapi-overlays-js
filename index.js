#!/usr/bin/env node
import arg from 'arg'
import fs from 'fs'
import { overlayFiles } from './src/overlay.js'

function showHelp () {
  console.log('Usage: overlayjs --openapi FILEPATH --overlay FILEPATH')
  console.log('    use --help to see this help')
}

// Function to read the version from package.json
function showVersion () {
  const packageJsonPath = './package.json'
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
  console.log(packageJson.version)
}

try {
  const args = arg({
    '--openapi': String,
    '--overlay': String,
    '--version': Boolean,
    '--help': Boolean
  })

  if (args['--version']) {
    showVersion()
    process.exit(0)
  }

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
