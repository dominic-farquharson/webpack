*This is a work in progress*


## Webpack

### Setting up Webpack

install the webpack-cli (the tool used to run webpack on the command line):

```bash

npm install webpack webpack-cli --save-dev
```



webpack is a static module bundler for modern JavaScript applications. When webpack processes your application, it recursively builds a dependency graph that includes every module your application needs, then packages all of those modules into one or more bundles.

There are four important concepts: 
- Entry
- Output
- Loaders
- Plugins


### Entry

An entry point indicates which module webpack should use to begin building out its internal dependency graph. After entering the entry point, webpack will figure out which other modules and libraries that entry point depends on (directly and indirectly).


### Output

The output property tells webpack where to emit the bundles it creates and how to name these files, it defaults to ./dist. You can configure this part of the process by specifying an output field in your configuration:


```js 
// webpack.config.js
const path = require('path');


module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  }
};
```

In the example above, we use the output.filename and the output.path properties to tell webpack the name of our bundle and where we want it to be emitted to.


### Loaders

Loaders enable webpack to process more than just JavaScript files (webpack itself only understands JavaScript). They give you the ability to leverage webpack's bundling capabilities for all kinds of files by converting them to valid modules that webpack can process.

Essentially, webpack loaders transform all types of files into modules that can be included in your application's dependency graph (and eventually a bundle).


At a high level, loaders have two purposes in your webpack configuration:

1. The test property identifies which file or files should be transformed.
2. The use property indicates which loader should be used to do the transforming.

```js
const path = require('path');

const config = {
  output: {
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
};

module.exports = config;

```

### Plugins

While loaders are used to transform certain types of modules, plugins can be leveraged to perform a wider range of tasks. Plugins range from bundle optimization and minification all the way to defining environment-like variables. The plugin interface is extremely powerful and can be used to tackle a wide variety of tasks.

In order to use a plugin, you need to require() it and add it to the plugins array. Most plugins are customizable through options. Since you can use a plugin multiple times in a config for different purposes, you need to create an instance of it by calling it with the new operator.

webpack.config.js

```js
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins

const config = {
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};

module.exports = config;
```

## Development Tools

### Watch mode

You can instruct webpack to "watch" all files within your dependency graph for changes. If one of these files is updated, the code will be recompiled so you don't have to run the full build manually.

```bash
"watch": "webpack --watch"
```

### Webpack Dev Server

The webpack-dev-server provides you with a simple web server and the ability to use live reloading. Let's set it up:

```bash
npm install --save-dev webpack-dev-server
```

Change your config file to tell the dev server where to look for files:
```js

//webpack.config.js

  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CleanWebpackPlugin = require('clean-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
    devtool: 'inline-source-map',
    devServer: {
     contentBase: './dist'
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Development'
      })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };

```

This tells webpack-dev-server to serve the files from the dist directory on localhost:8080.

Adding script to easily start server: 

```js
"start": "webpack-dev-server --open"
```

Now we can run npm start from the command line and we will see our browser automatically loading up our page. If you now change any of the source files and save them, the web server will automatically reload after the code has been compiled. Give it a try!



### References

- [Webpack Docs](https://webpack.js.org/concepts/)