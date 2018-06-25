var banner = require('./');
var chai = require('chai');
var expect = chai.expect;

describe('banner', function() {

  var FILEPATH = 'test-target.js';

  context('without options (using defaults)', function() {
    var expectation = '/*!\n * add-banner <https://github.com/jonschlinkert/add-banner>\n *\n * Copyright (c) 2018 Jon Schlinkert, contributors.\n * Licensed under the MIT license.\n */\n\n';
    it('expected to populate banner', function() {
      expect(banner(FILEPATH)).to.eql(expectation);
    });
  });

  context('with specific options', function() {

    var options = {
      name: 'addbanner',
      author: 'J. Schlinkert (https://github.com/jonschlinkert)',
      homepage: 'https://github.com/jonschlinkert/addbanner',
      banner: 'banner.tmpl',
      year: '2017',
      license: 'GPL-3'
    };

    var expectation = '/*!\n * addbanner <https://github.com/jonschlinkert/addbanner>\n *\n * Copyright (c) 2017 J. Schlinkert, contributors.\n * Licensed under the GPL-3 license.\n */\n\n';

    it('expected to populate banner', function() {
      expect(banner(FILEPATH, options)).to.eql(expectation);
    });
  });

});
