# webpack-link
## Webpack replacement for NPM link

Uses Webpack alias options to resolve a module to a local path for development.

### Install

`$ npm install webpack-link --save-dev`

### Usage
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
  },
  resolve: {
    extensions: [".js"],
  }
}

```
