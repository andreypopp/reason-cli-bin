#!/usr/bin/env node

const child_process = require('child_process');
const fs = require('fs');

const packagename = 'reason-cli';
const baseurl = 'https://github.com/reasonml/' + packagename + '/archive/';
const version = '1.13.7';
const basefilename = 'beta-v-' + version + '-bin-' + process.platform;
const extension = '.tar.gz';

const installReasonCli = (platform) => {
  const supportedPlatforms = ['darwin', 'linux'];

  if (!supportedPlatforms.includes(platform)) {
    throw 'Unsupport platform: ' + platform;
  }

  const filename = basefilename + extension;
  const url = baseurl + filename;

  extractTarballFromUrl(url, 'reason-cli.tar.gz');

  console.log('Successfully extracted reason-cli tarball.');
  process.exit(0);
}

const extractTarballFromUrl = (url, filename) => {
  if (!fs.existsSync(filename)) {
    console.log('Fetching reason-cli from ' + url);
    child_process.execSync('curl -L ' + url + ' > ' + filename, 'inherit');
  } else {
    console.log('Tarball ' + filename + ' is already downloaded.');
  }
}

installReasonCli(process.platform);
