import {customElement, bindable, noView} from 'aurelia-framework';
import {Config} from '../../config/config';


/**
 * @name Icon
 * @description
 * Icons can be used on their own, or inside of a number of Ionic components.
 * For a full list of available icons, check out the
 * [Ionicons resource docs](../../../../resources/ionicons).
 *
 * One feature of Ionicons in Ionic is when icon names are set, the actual icon
 * which is rendered can change slightly depending on the mode the app is
 * running from. For example, by setting the icon name of `alarm`, on iOS the
 * icon will automatically apply `ios-alarm`, and on Material Design it will
 * automatically apply `md-alarm`. This allows the developer to write the
 * markup once while Ionic applies the appropriate icon based on the mode.
 *
 * @usage
 * ```html
 * <!-- automatically uses the correct "star" icon depending on the mode -->
 * <ion-icon name="star"></ion-icon>
 *
 * <!-- explicity set the icon for each mode -->
 * <ion-icon ios="ios-home" md="md-home"></ion-icon>
 *
 * <!-- always use the same icon, no matter what the mode -->
 * <ion-icon name="ios-clock"></ion-icon>
 * <ion-icon name="logo-twitter"></ion-icon>
 * ```
 *
 * @demo /docs/v2/demos/icon/
 * @see {@link /docs/v2/components#icons Icon Component Docs}
 *
 */
@customElement('ion-icon')
@customElement('icon')
@noView
export class Icon {
  private _isActive: boolean = true;
  private _name: string = '';
  private _ios: string = '';
  private _md: string = '';
  private _css: string = '';

  /**
   * @input {string} Icon to use. Will load the appropriate icon for each mode
   */
  @bindable name: string;

  /**
   * @input {string} Explicitly set the icon to use on iOS
   */
  @bindable ios: string;

  /**
   * @input {string} Explicitly set the icon to use on MD
   */
  @bindable md: string;

  /**
   * @input {bool} Whether or not the icon has an "active" appearance. On iOS an active icon is filled in or full appearance, and an inactive icon on iOS will use an outlined version of the icon same icon. Material Design icons do not change appearance depending if they're active or not. The `isActive` property is largely used by the tabbar.
   */
  @bindable isActive: boolean = true;

  /**
   * @private
   */
  mode: string;

  constructor(config: Config, private _element: Element) {
    this.mode = config.get('iconMode');
    _element.setAttribute('role', 'img');

    if (_element.tagName === 'ICON') {
      // deprecated warning
      console.warn('<icon> has been renamed to <ion-icon>');
      console.warn('<ion-icon> requires the "name" attribute w/ a value');
      console.warn('<icon home></icon> should now be <ion-icon name="home"></ion-icon>');
    }
  }

  detached() {
    if (this._css) {
      this._element.classList.remove(this._css);
    }
  }

  nameChanged(val: string) {
    if (!(/^md-|^ios-|^logo-/.test(val))) {
      // this does not have one of the defaults
      // so lets auto add in the mode prefix for them
      val = this.mode + '-' + val;
    }
    this._name = val;
    this.update();
  }

  iosChanged(val: string) {
    this._ios = val;
    this.update();
  }

  mdChanged(val: string) {
    this._md = val;
    this.update();
  }

  isActiveChanged(val: boolean | string) {
    this._isActive = val === 'true' || Boolean(val);
    this.update();
  }

  /**
   * @private
   */
  update() {
    let css = 'ion-';

    if (this._ios && this.mode === 'ios') {
      css += this._ios;

    } else if (this._md && this.mode === 'md') {
      css += this._md;

    } else {
      css += this._name;
    }

    if (this.mode == 'ios' && !this._isActive) {
      css += '-outline';
    }

    if (this._css !== css) {
      if (this._css) {
        this._element.classList.remove(this._css);
      }
      this._css = css;
      this._element.classList.add(css);

      this._element.setAttribute('aria-label',
          css.replace('ion-', '').replace('ios-', '').replace('md-', '').replace('-', ' '));
    }
  }
}
