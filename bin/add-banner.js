#!/usr/bin/env node
// vim: syntax=javascript

const fs = require('fs');
const path = require('path');
const load = require('load-pkg');
const pkg = load.sync(path.join(__dirname, '..'));
const banner = require('..');
const program = require('commander');

program
  .version(pkg.version)
  .option('-t, --template [filepath]', 'path to template file', 'banner.tmpl')
  .usage('[options] <pattern>')
  .parse(process.argv);

if (program.args.length < 1) {
  console.error('Command argument for files missing!');
  process.exit(1);
}

const bannerise = file => {
  if (fs.writeFile(file, banner(file, options))) {
    console.log('Banner added to', file);
  }
}

const options = program.template ? {banner: program.template} : {};
program.args.forEach(bannerise);
