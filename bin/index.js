#! /usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const packageJson = require('../package.json');
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
    try {
      console.log('Downloading files...');
      execSync(`git clone --depth 1 ${git_repo} ${projectPath}`);

      process.chdir(projectPath);

      console.log('\x1b[34m', 'Installing dependencies...', '\x1b[0m');
      execSync('npm install');

      console.log('Removing useless files');
      execSync('npx rimraf ./.git');

      fs.unlinkSync(path.join(projectPath, 'LICENSE.MD'));
      fs.rmdirSync(path.join(projectPath, 'bin'), { recursive: true });
      fs.unlinkSync(path.join(projectPath, 'package.json'));

      buildPackageFile(packageJson, folderName);

      console.log(
        '\x1b[32m',
        'The installation is done!',
        '\x1b[0m'
      );
      console.log();
  
      console.log('\x1b[34m', 'You can start by typing:');
      console.log(`    cd ${folderName}`);
      console.log('    npm start', '\x1b[0m');
      console.log();
      console.log('Check Readme.md for more informations');
      console.log();

    } catch (error) {
      console.log(error);
    }
}

function buildPackageFile(packageJson,folderName){
  const {
    bin,
    keywords,
    license,
    homepage,
    repository,
    bugs,
    ...newPackage
  } = packageJson;

  Object.assign(newPackage, {
    "name": folderName,
    "version": "1.0.0",
    "type": "module",
    "scripts": {
      "start": "webpack-dev-server --mode development"
    },
    "author": "",
    "license": "ISC",
    "dependencies": {
      "antd-mobile": "^5.4.0",
      "react": "^17.0.2",
      "react-dom": "^17.0.2"
    },
    "devDependencies": {
      "@babel/core": "^7.17.5",
      "@babel/eslint-parser": "^7.17.0",
      "@babel/preset-env": "^7.16.11",
      "@babel/preset-react": "^7.16.7",
      "babel-loader": "^8.2.3",
      "css-loader": "^6.7.1",
      "eslint": "^8.10.0",
      "eslint-config-react": "^1.1.7",
      "eslint-plugin-react": "^7.29.3",
      "eslint-webpack-plugin": "^3.1.1",
      "file-loader": "^6.2.0",
      "html-webpack-plugin": "^5.5.0",
      "less": "^4.1.2",
      "less-loader": "^10.2.0",
      "style-loader": "^3.3.1",
      "url-loader": "^4.1.1",
      "webpack": "^5.70.0",
      "webpack-cli": "^4.9.2",
      "webpack-dev-server": "^4.7.4"
    }
  });

  fs.writeFileSync(
    `${process.cwd()}/package.json`,
    JSON.stringify(newPackage, null, 2),
    'utf8'
  );
}


main();
