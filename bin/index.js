#! /usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const git_repo = 'git@github.com:adamwreuben/LipaMiniApp.git';


if(process.argv.length < 3){
    console.log('You have to provide a name to your app.');
    console.log('For example :');
    console.log('    npx create-lipa-miniapp yourAppName');
    process.exit(1);
}else{
    try {
        fs.mkdirSync(projectPath);
      } catch (err) {
        if (err.code === 'EEXIST') {
          console.log(`The file ${projectName} already exist in the current directory, please give it another name.`);
        } else {
          console.log(error);
        }
        process.exit(1);
    }
}

async function main() {
  console.log('Downloading files...');
  execSync(`git clone --depth 1 ${git_repo} ${projectPath}`);

  console.log('\x1b[34m', 'Installing dependencies...', '\x1b[0m');
  execSync('npm install');

  console.log('Removing useless files');
  execSync('npx rimraf ./.git');

  console.log(
    '\x1b[32m',
    'The installation is done!',
    '\x1b[0m'
  );
  console.log();
}

main();
