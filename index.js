var outputStatus = function (module, path) {
  console.log(
    '\x1b[0;33m', 'Linked', module, 'to local path', path, '\x1b[0m'
  );
}

function WebpackLinkPlugin(options) {
  this.options = options;
}

WebpackLinkPlugin.prototype.apply = function(compiler) {
  var options = this.options;
  if (!options) { return }

  for (var key in options) {
    if (!options.hasOwnProperty(key)) continue;
    compiler.options.resolve.alias[key] = options[key];
    outputStatus(key, options[key])
  }
};

module.exports = WebpackLinkPlugin;
