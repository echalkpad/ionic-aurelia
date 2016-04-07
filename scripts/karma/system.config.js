var map = Object.keys(__karma__.files).reduce(function(map, path) {
  if (path.indexOf('aurelia-') > -1) {
    map[path.slice(path.lastIndexOf('/') + 1).slice(0, -3)] = path;
  }

  return map;
}, {});

map['ionic-aurelia'] = '/base/ionic';

System.config({
  defaultJSExtensions: true,
  map: map,
  packages: {
    'ionic-aurelia': {
      main: 'index'
    }
  }
});
