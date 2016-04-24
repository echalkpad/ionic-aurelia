import {customElement, Optional, inject, bindable, inlineView} from 'aurelia-framework';

import {Attribute} from '../../util/di';
/**
 * @name Label
 * @description
 * Labels are placed inside of an `ion-item` element and can be used
 * to describe an `ion-input`, `ion-toggle`, `ion-checkbox`, and more.
 *
 * @property [fixed] - A persistant label that sits next the input.
 * @property [floating] - A label that will float about the input if the input is empty of looses focus.
 * @property [stacked] - A stacked label will always appear on top of the input.

 *
 * @usage
 * ```html
 *  <ion-item>
 *    <ion-label>Username</ion-label>
 *    <ion-input></ion-input>
 *  </ion-item>
 *
 *  <ion-item>
 *    <ion-label fixed>Website</ion-label>
 *    <ion-input type="url"></ion-input>
 *  </ion-item>
 *
 *  <ion-item>
 *    <ion-label floating>Email</ion-label>
 *    <ion-input type="email"></ion-input>
 *  </ion-item>
 *
 *  <ion-item>
 *    <ion-label stacked>Phone</ion-label>
 *    <ion-input type="tel"></ion-input>
 *  </ion-item>
 *
 *  <ion-item>
 *    <ion-label>Toggle</ion-label>
 *    <ion-toggle></ion-toggle>
 *  </ion-item>
 *
 *  <ion-item>
 *    <ion-label>Checkbox</ion-label>
 *    <ion-checkbox></ion-checkbox>
 *  </ion-item>
 * ```
 *
 * @demo /docs/v2/demos/label/
 * @see {@link ../../../../components#inputs Input Component Docs}
 * @see {@link ../Input Input API Docs}
 *
 */

@customElement('ion-label')
@inject(Element, ...Attribute.all('floating', 'stacked', 'fixed', 'inset'))
@inlineView('<template><content></content></template>')
export class Label {
  private _id: string;

  @bindable id: string;

  /**
   * @private
   */
  type: string;

  constructor(
    private _element: HTMLElement,
    isFloating: string,
    isStacked: string,
    isFixed: string,
    isInset: string
  ) {
    this.type = (isFloating === '' ? 'floating' : (isStacked === '' ? 'stacked' : (isFixed === '' ? 'fixed' : (isInset === '' ? 'inset' : null))));
  }

  idChanged(val: string) {
    this._id = val;
    if (val) {
      this._element.setAttribute('id', val);
    }
  }

  /**
   * @private
   */
  get text(): string {
    return this._element.textContent || '';
  }

  /**
   * @private
   * @param {string} add class name
   */
  addClass(className: string) {
    this._element.classList.add(className);
  }

}
