'use strict';

const banner = require('./');
const assert = require('assert');

describe('banner', () => {
  const FILEPATH = 'test-target.js';

  context('without options (using defaults)', () => {
    const year =  new Date().getFullYear();
    const expectation = '/*!\n * add-banner <https://github.com/jonschlinkert/add-banner>\n *\n * Copyright (c) ' + year + ' Jon Schlinkert, contributors.\n * Licensed under the MIT license.\n */\n';
    it('expected to populate banner', function() {
      assert.equal(banner(FILEPATH), expectation);
    });
  });

  context('with specific options', () => {

    const options = {
      name: 'addbanner',
      author: 'J. Schlinkert (https://github.com/jonschlinkert)',
      homepage: 'https://github.com/jonschlinkert/addbanner',
      template: 'banner.tmpl',
      year: '2017',
      license: 'GPL-3'
    };

    const expectation = '/*!\n * addbanner <https://github.com/jonschlinkert/addbanner>\n *\n * Copyright (c) 2017 J. Schlinkert, contributors.\n * Licensed under the GPL-3 license.\n */\n';

    it('expected to populate banner', () => {
      assert.equal(banner(FILEPATH, options), expectation);
    });
  });
});

describe('CLI', () => {

  let capture = null;
  const exec = require("child_process").exec;
  const cliout = (cmd, done) => {
     exec('./bin/add-banner.js ' + cmd, (error, stdout, stderr) => {
      if (error) {
        done(error);
      }
      capture = stdout;
      done();
    });
  };

  context('help', () => {

    const expectation = '\n  Usage: add-banner [options] <pattern>\n\n' +
      '  Options:\n\n' +
      '    -V, --version              output the version number\n' +
      '    -t, --template [filepath]  path to template file\n' +
      '    -h, --help                 output usage information\n';

    context('--help', () => {

      before(done => {
        cliout('--help', done);
      });

      it('expected to return help information', () => {
        assert.strictEqual(capture, expectation);
      });

    });

    context('-h', () => {

      before(done => {
        cliout('-h', done);
      });

      it('expected to return help information', () => {
        assert.strictEqual(capture, expectation);
      });

    });

  });

  context('version', () => {

    const version = require('./package.json').version + '\n';

    context('--version', () => {

      before(done => {
        cliout('--version', done);
      });

      it('expected to return current version', () => {
        assert.strictEqual(capture, version);
      });

    });

    context('-V', () => {

      before(done => {
        cliout('-V', done);
      });

      it('expected to return current version', () => {
        assert.strictEqual(capture, version);
      });

    });

  });

});
