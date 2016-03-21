var assign = require('object-assign');

var getCLIOptions = function () {
  var modules = [];
  process.argv.forEach(function (val, index, array) {
    if (val.indexOf('--link') > -1) {
      var args = val.split('=')[1];
      if (args) { modules = args.split(',') }
    }
  });
  return modules;
};

var formatSettings = function (option) {
  if (option.constructor !== Array) return { path: option };
  return {
    path: option[0],
    loader: assign(
      option[1],
      { include: [option[0]] }
    )
  }
}

var outputStatus = function (module, path) {
  console.log(
    '\x1b[0;33m', 'Linked', module, 'to local path', path, '\x1b[0m'
  );
}

function WebpackLinkPlugin(options) {
  this.options = options;
  this.modules = getCLIOptions();
}

WebpackLinkPlugin.prototype.apply = function(compiler) {
  var options = this.options;
  var modules = this.modules;
  if (!modules || !options) { return }

  for (var key in options) {
    if (!options.hasOwnProperty(key)) continue;
    if (key.indexOf(modules) > -1) continue;

    var settings = formatSettings(options[key]);
    compiler.options.resolve.alias[key] = settings.path;
    outputStatus(key, settings.path);

    if (!settings.loader) continue;

    compiler.options.module.loaders = compiler.options.module.loaders || []
    compiler.options.module.loaders.push(settings.loader);
  }
};

module.exports = WebpackLinkPlugin;
