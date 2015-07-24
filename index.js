
'use strict';

var fs = require('fs');
var path = require('path');
var template = require('template');
var strip = require('strip-banner');
var pkg = require('load-pkg');
var extend = require('xtend');
var year = require('year');
var author = require('parse-authors');

var defaultBanner = path.join(__dirname, 'banner.tmpl');

function read(filepath) {
  filepath = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(filepath, 'utf8');
}

var ctx = function (context) {
  var opts = {
    author: context.author.name || author(context.author)[0].name || 'unknown',
    homepage: context.homepage || context.repo.url || 'unknown',
    license: context.license || 'MIT',
    year: context.year || year()
  };
  return extend({}, context, opts);
};

/**
 * ## addBanner(str, options)
 *
 * **Examples:**
 *
 * ```js
 * var banner = require('add-banner');
 * banner('index.js');
 * ```
 *
 * Specify a custom banner:
 *
 * ```js
 * var banner = require('add-banner');
 * banner('index.js', {banner: 'my-banner.tmpl'});
 * ```
 *
 * Extend the context:
 *
 * ```js
 * var banner = require('add-banner');
 * banner('index.js', {username: 'jonschlinkert'});
 * ```
 *
 * **Params:**
 *
 * @param  {String} `filepath` The file to update with a banner.
 * @param  {Object} `options` Pass a custom banner template to `banner`, or
 *     extend the context passed to templates. By default package.json is used,
 *     any property added to the options object will extend the default object
 *     (package.json) and will be passed to templates as context.
 * @return {String}
 */

module.exports = function(str, options) {
  options = options || {};
  var tmpl = read(options.banner || defaultBanner);
  var context = ctx(extend({}, pkg, options));

  var banner = template(tmpl, context, options);
  return banner + strip(read(str));
};
