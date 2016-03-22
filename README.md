# webpack-link
## Webpack replacement for NPM link

Uses Webpack alias options to resolve a module to a local path for development.

### Install

`$ npm install webpack-link --save-dev`

### Usage

By default, adding a config doesn't turn on the linked module. To turn it on for a build you need to pass webpack a `--link` parameter with a comma separated list of modules to be linked.

eg: `webpack --link=localModule`

#### config
```
var path = require('path'),
    webpackLinkPlugin = require('webpack-link')

module.exports = {
  entry: "src/index.js",
  plugins: [
    new webpackLinkPlugin({
      localModule: path.resolve(__dirname, '../localModule')
    })
  ],
  output: {
    filename: "build.js",
  }
}
```

### Using loaders

```
var path = require('path'),
    webpackLinkPlugin = require('webpack-link')

module.exports = {
  entry: "src/index.js",
  plugins: [
    new webpackLinkPlugin({
      localModule: [
        path.resolve(__dirname, '../localeModule'),
        {
          entry: path.resolve(__dirname, '../localeModule/src'),
          test: /\.js$/,
          loader: "babel-loader?presets[]=es2015"
        }
      ]
    })
  ],
  output: {
    filename: "build.js",
  }
}
```
