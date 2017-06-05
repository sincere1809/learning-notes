# Import Vuejs into our project

## Introduction of Vue (version 2.0+)

Vue (pronounced /vjuː/, like **view**) is a **progressive framework** for building user interfaces. Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable. The core library is focused on the view layer only, and is very easy to pick up and integrate with other libraries or existing projects. On the other hand, Vue is also perfectly capable of powering sophisticated Single-Page Applications when used in combination with [modern tooling](https://vuejs.org/v2/guide/single-file-components.html) and [supporting libraries](https://github.com/vuejs/awesome-vue#components--libraries).
If you are an experienced frontend developer and want to know how Vue compares to other libraries/frameworks, check out the [Comparison with Other Frameworks](https://vuejs.org/v2/guide/comparison.html).

[Guide](https://vuejs.org/v2/guide/index.html) and [API](https://vuejs.org/v2/api/) documents please find in the [official web site](https://vuejs.org/).

## Using vuejs with rollup

### Preparatory work

* Before we go any further, we need some other resources and rollup plugins to start a server for our application

  * Create src/index.html

  ```Bash
  touch src/index.html
  ```

  ```HTML
  // src/index.html
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="chrome=1">
      <meta name="viewport" content="width=device-width">
      <title>Welcome to Vuejs and Rollup</title>
    </head>
    <body>
      <div id="app">
        <h2>Welcome to Vue and Rollup</h2>
      </div>
      <script src="js/bundle.js"></script>
    </body>
  </html>
  ```

  * Install node package and rollup plugins, more plugins you can find from [rollup wiki](https://github.com/rollup/rollup/wiki/Plugins)

  ```Bash
  npm i -D rimraf rollup-watch rollup-plugin-serve
  ```

  * Update your rollup.config.js

  ```JavaScript
  import serve from 'rollup-plugin-serve'

  export default {
    entry: 'src/js/main.js',
    format: 'cjs',
    dest: 'dist/js/bundle.js',
    plugins: [
      serve({
        contentBase: 'dist',
        historyApiFallback: false,
        host: 'localhost',
        port: 3000
      })
    ]
  }
  ```

  * Modify your package.json

  ```JSON
  "scripts": {
    "clean": "rimraf dist/*",
    "moveAssets": "cp src/*.html dist/",
    "prestart": "npm run-script clean && npm run-script moveAssets",
    "start": "rollup -w -c rollup.config.js"
  }
  ```

  * start the server

  ```Bash
  npm run-script start
  ```

  Right now, you can launch your browser and access [http://localhost:3000/](http://localhost:3000/)

### Install vue and import into our project

* Run below command to install `vue` locally

```Bash
npm i -S vue
```

* Modify the main.js to import `vue`

```JavaScript
import Vue from 'vue'

new Vue({
  el: '#app',
  render: createElement => createElement('div', 'Static content set in the Vue instace')
})
```

* Restart the server

```Bash
npm run-script start
```

Unfortunatly, we got an error in the console
> ⚠️   'vue' is imported by src/js/main.js, but could not be resolved – treating it as an external dependency

How to solve the problem?
As the `vue` was installed by npm and rollup need a plugin to resolve importing module from `node_modules`. Follow below steps:

* Install rollup-plugin-node-resolve

```Bash
npm i -D rollup-plugin-node-resolve
```

* Update rollup.config.js

```JavaScript
import serve from 'rollup-plugin-serve'
import resolve from 'rollup-plugin-node-resolve'

export default {
  entry: 'src/js/main.js',
  format: 'es',
  dest: 'dist/js/bundle.js',
  plugins: [
    resolve({
      jsnext: true
    }),
    serve({
      contentBase: 'dist',
      historyApiFallback: false,
      host: 'localhost',
      port: 3000
    })
  ]
}
```

Restart the server and refresh the page. OK, bundle succeed. But, there is an error in the Chrome.

```Text
Uncaught ReferenceError: process is not defined at bundle.js:306
```

How to solve the problem?
We need another plugin called `rollup-plugin-replace`. Please refer to [Vue official guide document](https://vuejs.org/v2/guide/installation.html#Development-vs-Production-Mode)

* Install rollup-plugin-replace

```Bash
npm i -D rollup-plugin-replace
```

* Modify rollup.config.js

```JavaScript
import serve from 'rollup-plugin-serve'
import resolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'

export default {
  entry: 'src/js/main.js',
  format: 'es',
  dest: 'dist/js/bundle.js',
  plugins: [
    resolve({
      jsnext: true
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    serve({
      contentBase: 'dist',
      historyApiFallback: false,
      host: 'localhost',
      port: 3000
    })
  ]
}
```

Restart the server again and refresh the page. The content is changed. That means vue is running correctly.