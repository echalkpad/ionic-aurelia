module.exports = function(config) {
  config.set({
    singleRun: true,
    basePath: '../../',

    frameworks: ['jasmine'],

    files: [
      'node_modules/es6-module-loader/dist/es6-module-loader.src.js',
      'node_modules/systemjs/dist/system.src.js',
      'scripts/karma/system.config.js',
      'dist/bundles/ionic.system.js',
      { pattern: 'node_modules/aurelia-*/dist/system/aurelia-*.js', included: false },
      { pattern: 'dist/tests/**/*.spec.js', included: false },
      'scripts/karma/test-main.js'
    ],

    exclude: ['ionic/components/*/test/*/**/*'],

    logLevel: 'warn',

    browsers: ['Chrome'],
    port: 9876
  });
};
