var banner = require('./');
let chai = require('chai');
let expect = chai.expect;

describe('banner', () => {

  const FILEPATH = 'test-target.js';

  context('without options (using defaults)', () => {
    let expectation = `/*!
 * add-banner <https://github.com/jonschlinkert/add-banner>
 *
 * Copyright (c) 2018 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

`;
    it('expected to populate banner', () => {
      expect(banner(FILEPATH)).to.eql(expectation);
    });
  });

  context('with specific options', () => {

    let options = {
      name: 'addbanner',
      author: 'Jon Schlinkert (https://github.com/jonschlinkert)',
      homepage: 'https://github.com/jonschlinkert/add-banner',
      banner: 'banner.tmpl',
      year: '2017',
      license: 'GPL-3'
    };

    let expectation = `/*!
 * addbanner <https://github.com/jonschlinkert/add-banner>
 *
 * Copyright (c) 2017 Jon Schlinkert, contributors.
 * Licensed under the GPL-3 license.
 */

`;

    it('expected to populate banner', () => {
      expect(banner(FILEPATH, options)).to.eql(expectation);
    });
  });

});
