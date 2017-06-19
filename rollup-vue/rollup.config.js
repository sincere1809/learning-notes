'use strict'

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
