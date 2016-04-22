import {customAttribute, autoinject, bindable} from 'aurelia-framework';

import {IonicApp} from './app';

/**
 * @name Id
 * @description
 * The `id` attribute is an easy way to identify unique components in an app and access them
 * no matter where in the UI hierarchy you are. For example, this makes toggling
 * a global side menu possible from any place in the application.
 *
 * @usage
 * To give any component an ID, simply set its `id` property:
 * ```html
 * <ion-checkbox id="myCheckbox"></ion-checkbox>
 * ```
 *
 * To get a reference to the registered component, inject the [IonicApp](../IonicApp/)
 * service:
 * ```ts
 * constructor(app: IonicApp) {
 *   this.app = app
 * }
 *
 * attached() {
 *   var checkbox = this.app.getComponent("myCheckbox");
 *   if (checkbox.checked) {
 *     console.log('checkbox is checked');
 *   }
 * }
 * ```
 *
 * *NOTE:* It is not recommended to use ID's across Pages, as there is often no
 * guarantee that the registered component has not been destroyed if its Page
 * has been navigated away from.
 *
 * @demo /docs/v2/demos/id/
 */
@customAttribute('id')
@autoinject
export class IdRef {

  /**
   * @private
   */
  value: string;

  private _component: Object;

  constructor(private _app: IonicApp, element: Element) {
    // Grab the component this directive is attached to
    this._component = (<any>element).au.controller.viewModel;
  }

  /**
   * @private
   */
  created() {
    this._app.register(this.value, this._component);
  }

  /**
   * @private
   */
  detached() {
    this._app.unregister(this.value);
  }
}


/**
 * @private
 */
@customAttribute('attr')
@autoinject
export class Attr {
  value: string;

  constructor(private _element: Element) {}

/**
 * @private
 */
  created() {
    this._element.setAttribute(this.value, '');
  }
}
