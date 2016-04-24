import {ClickBlock} from '../util/click-block';
import {Config} from './config';
import {EventAggregator} from 'aurelia-event-aggregator';
import {FeatureDetect} from '../util/feature-detect';
import {Keyboard} from '../util/keyboard';
import {NavRegistry} from '../components/nav/nav-registry';
import {Platform} from '../platform/platform';
import {ready, closest} from '../util/dom';
import {ScrollView} from '../util/scroll-view';
import {TapClick} from '../components/tap-click/tap-click';
import {Translate} from '../translation/translate';
import {IonicApp} from '../components/app/app';

/**
 * @private
 */
export function bootstrap(args: any={}) {
  let platform = new Platform();
  let navRegistry = new NavRegistry(args.pages);

  var config = args.config;

  if (!(config instanceof Config)) {
    config = new Config(config);
  }

  platform.setUrl(window.location.href);
  platform.setUserAgent(window.navigator.userAgent);
  platform.setNavigatorPlatform(window.navigator.platform);
  platform.load(config);
  config.setPlatform(platform);

  let clickBlock = new ClickBlock();

  let events = new EventAggregator();
  let featureDetect = new FeatureDetect();

  setupDom(window, document, config, platform, clickBlock, featureDetect);
  bindEvents(window, document, platform, events);

  return [
    clickBlock,
    platform,
    navRegistry,
    events,
    config
  ];
}

/**
 * @private
 */
export function postBootstrap(appRef: any) {
  appRef.injector.get(TapClick);
  let app: IonicApp = appRef.injector.get(IonicApp);
  let platform: Platform = appRef.injector.get(Platform);
  platform.prepareReady();
  app.setAppInjector(appRef.injector);
}

function setupDom(window, document, config, platform, clickBlock, featureDetect) {
  let bodyEle = document.body;
  let mode = config.get('mode');

  // if dynamic mode links have been added the fire up the correct one
  let modeLinkAttr = mode + '-href';
  let linkEle = document.head.querySelector('link[' + modeLinkAttr + ']');
  if (linkEle) {
    let href = linkEle.getAttribute(modeLinkAttr);
    linkEle.removeAttribute(modeLinkAttr);
    linkEle.href = href;
  }

  // set the mode class name
  // ios/md/wp
  bodyEle.classList.add(mode);

  // language and direction
  platform.setDir(document.documentElement.dir, false);
  platform.setLang(document.documentElement.lang, false);

  let versions = platform.versions();
  platform.platforms().forEach(platformName => {
    // platform-ios
    let platformClass = 'platform-' + platformName;
    bodyEle.classList.add(platformClass);

    let platformVersion = versions[platformName];
    if (platformVersion) {
      // platform-ios9
      platformClass += platformVersion.major;
      bodyEle.classList.add(platformClass);

      // platform-ios9_3
      bodyEle.classList.add(platformClass + '_' + platformVersion.minor);
    }
  });

  // touch devices should not use :hover CSS pseudo
  // enable :hover CSS when the "hoverCSS" setting is not false
  if (config.get('hoverCSS') !== false) {
    bodyEle.classList.add('enable-hover');
  }

  if (config.get('clickBlock')) {
    clickBlock.enable();
  }

  // run feature detection tests
  featureDetect.run(window, document);
}


/**
 * Bind some global events and publish on the 'app' channel
 */
function bindEvents(window, document, platform, events) {
  window.addEventListener('online', (ev) => {
    events.publish('app:online', ev);
  }, false);

  window.addEventListener('offline', (ev) => {
    events.publish('app:offline', ev);
  }, false);

  window.addEventListener('orientationchange', (ev) => {
    events.publish('app:rotated', ev);
  });

  // When that status taps, we respond
  window.addEventListener('statusTap', (ev) => {
    // TODO: Make this more better
    var el = document.elementFromPoint(platform.width() / 2, platform.height() / 2);
    if (!el) { return; }

    var content = closest(el, 'scroll-content');
    if (content) {
      var scroll = new ScrollView(content);
      scroll.scrollTo(0, 0, 300);
    }
  });

  // start listening for resizes XXms after the app starts
  setTimeout(function() {
    window.addEventListener('resize', function() {
      platform.windowResize();
    });
  }, 2000);
}
