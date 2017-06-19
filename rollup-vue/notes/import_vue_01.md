# Import Vuejs single file components

## Introduction of Single File Components

In many Vue projects, global components will be defined using `Vue.component`, followed by `new Vue({ el: '#container' })` to target a container element in the body of every page.
This can work very well for small to medium-sized projects, where JavaScript is only used to enhance certain views. In more complex projects however, or when your frontend is entirely driven by JavaScript, these disadvantages become apparent:

+ **Global definitions** force unique names for every component

+ **String templates** lack syntax highlighting and require ugly slashes for multiline HTML

+ **No CSS support** means that while HTML and JavaScript are modularized into components, CSS is conspicuously left out

+ **No build step** restricts us to HTML and ES5 JavaScript, rather than preprocessors like Pug (formerly Jade) and Babel

All of these are solved by **single-file components** with a `.vue` extension, made possible with build tools such as Webpack or Browserify.

[Guide](https://vuejs.org/v2/guide/single-file-components.html) documents please find in the [official web site](https://vuejs.org/).

## Using single file components with rollup

+ Install rollup plugins

```Bash
npm i -D rollup-plugin-vue
```

+ Update your rollup.config.js

```JavaScript
import serve from 'rollup-plugin-serve'
import resolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import vue from 'rollup-plugin-vue'

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
    vue(),
    serve({
      contentBase: 'dist',
      historyApiFallback: false,
      host: 'localhost',
      port: 3000
    })
  ]
}
```

+ Create a new file `src/js/app.vue`

```HTML
// src/js/app.vue
<template>
<div>
  <h2>{{message}}</h2>
</div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      message: 'use the vuejs single file component'
    }
  }
}
</script>
```

+ MOdify your `src/js/main.js`

```JavaScript
import Vue from 'vue'
import App from './app.vue'

new Vue({
  el: '#app',
  components: {
    App
  },
  render: createElement => createElement('app')
})
```

+ start the server

```Bash
npm run-script start
```