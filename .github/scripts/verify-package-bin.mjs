import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

export function verifyPackageBin(root) {
  const pkg = JSON.parse(
    fs.readFileSync(path.join(root, 'package.json'), 'utf8'),
  )
  if (
    !pkg.bin ||
    typeof pkg.bin !== 'object' ||
    Object.keys(pkg.bin).length !== 1 ||
    pkg.bin.pixverse !== 'dist/index.js'
  ) {
    throw new Error('package.json bin must be { "pixverse": "dist/index.js" }')
  }
  const entry = path.join(root, pkg.bin.pixverse)
  if (!fs.statSync(entry).isFile()) {
    throw new Error('The pixverse bin target must be a file')
  }
  if (!fs.readFileSync(entry, 'utf8').startsWith('#!/usr/bin/env node\n')) {
    throw new Error('The pixverse bin target must start with a Node.js shebang')
  }
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  try {
    verifyPackageBin(path.resolve(process.argv[2] || '.'))
    console.log('Verified pixverse package bin.')
  } catch (error) {
    console.error(error.message)
    process.exitCode = 1
  }
}
