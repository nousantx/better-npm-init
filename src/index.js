#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const template = {
  name: 'my-cool-project',
  version: '1.0.0',
  description: 'My cool project',
  author: 'Me',
  license: 'MIT',
  homepage: '',
  keywords: ['keywords'],
  repository: {
    type: 'git',
    url: ''
  },
  bugs: {
    url: ''
  },
  files: ['dist', 'package.json', 'README.md', 'LICENSE'],
  type: 'module',
  types: 'index.d.ts',
  main: 'index.js',
  module: 'index.esm.js',
  style: 'index.css',
  scripts: {
    start: "echo 'hello world'"
  }
}

function promptUser(question, defaultAnswer) {
  return new Promise(resolve => {
    rl.question(`${question} (${defaultAnswer}): `, answer => {
      resolve(answer || defaultAnswer)
    })
  })
}

async function init() {
  template.name = await promptUser('Package name', template.name)
  template.version = await promptUser('Version', template.version)
  template.description = await promptUser('Description', template.description)
  template.author = await promptUser('Author', template.author)

  const repoUrl = await promptUser('Repository URL', 'https://github.com/username/repository')
  template.repository.url = `git+${repoUrl}.git`
  template.bugs.url = `${repoUrl}/issues`
  template.homepage = `${repoUrl}#readme`

  const packageJsonPath = path.join(process.cwd(), 'package.json')
  fs.writeFileSync(packageJsonPath, JSON.stringify(template, null, 2))

  console.log(`package.json created successfully at ${packageJsonPath}`)
  rl.close()
}

init()
