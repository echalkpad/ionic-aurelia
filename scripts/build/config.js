
module.exports = {
  dist: 'dist',
  src: {
    spec: ['ionic/**/test/*.spec.js'],
    js: ['ionic/**/*.js'],

    // Get all the non-js files and main.js
    e2e: ['ionic/components/*/test/*/**/*'],
    html: 'ionic/**/*.html',
    scss: 'ionic/**/*.scss',
  },

  scripts: [
    'node_modules/aurelia-polyfills/dist/system/aurelia-polyfills.js',
    'node_modules/aurelia-framework/dist/system/aurelia-framework.js',
    'node_modules/aurelia-event-aggregator/dist/system/aurelia-event-aggregator.js',
    'node_modules/aurelia-templating-binding/dist/system/aurelia-templating-binding.js',
    'node_modules/aurelia-templating-resources/dist/system/aurelia-templating-resources.js',
    'node_modules/aurelia-logging-console/dist/system/aurelia-logging-console.js',
    'node_modules/aurelia-pal-browser/dist/system/aurelia-pal-browser.js',
    'dist/js/ionic.js'
  ],

  protractorPort: 8876,

  autoprefixer: {
    browsers: [
      'last 2 versions',
      'iOS >= 7',
      'Android >= 4',
      'Explorer >= 10',
      'ExplorerMobile >= 11'
    ],
    cascade: false
  }

};
