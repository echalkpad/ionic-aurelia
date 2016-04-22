import {customElement, inlineView, inject, noView} from 'aurelia-framework';

import {Ion} from '../ion';
import {ItemSlidingGesture} from '../item/item-sliding-gesture';

/**
 * The List is a widely used interface element in almost any mobile app,
 * and can include content ranging from basic text all the way to
 * buttons, toggles, icons, and thumbnails.
 *
 * Both the list, which contains items, and the list items themselves
 * can be any HTML element.
 *
 * Using the List and Item components make it easy to support various
 * interaction modes such as swipe to edit, drag to reorder, and
 * removing items.
 *
 * @demo /docs/v2/demos/list/
 * @see {@link /docs/v2/components#lists List Component Docs}
 *
 */
@customElement('ion-list')
@inlineView('<template><content></content></template>')
@inject(Element)
export class List extends Ion {
  private _enableSliding: boolean = false;

  /**
   * @private
   */
  ele: HTMLElement;

  /**
   * @private
   */
  slidingGesture: ItemSlidingGesture;

  constructor(element: HTMLElement) {
    super(element);
    this.ele = element;
  }

  /**
   * @private
   */
  detached() {
    this.slidingGesture && this.slidingGesture.destroy();
    this.ele = this.slidingGesture = null;
  }

  /**
   * Enable sliding items if your page has them
   *
   * ```ts
   * export class MyClass {
   *    constructor(app: IonicApp){
   *      this.app = app;
   *      this.list = this.app.getComponent('my-list');
   *    }
   *    stopSliding(){
   *      this.list.enableSlidingItems(false);
   *    }
   * }
   * ```
   * @param {boolean} shouldEnable whether the item-sliding should be enabled or not
   */
  enableSlidingItems(shouldEnable: boolean) {
    if (this._enableSliding !== shouldEnable) {
      this._enableSliding = shouldEnable;

      if (shouldEnable) {
        console.debug('enableSlidingItems');
        setTimeout(() => {
          this.slidingGesture = new ItemSlidingGesture(this, this.ele);
        });

      } else {
        this.slidingGesture && this.slidingGesture.unlisten();
      }
    }
  }

  /**
   * Enable sliding items if your page has
   *
   * ```ts
   * export class MyClass {
   *    constructor(app: IonicApp){
   *      this.app = app;
   *      this.list = this.app.getComponent('my-list');
   *    }
   *    // Here we have some method that will close the items
   *    // when called
   *    closeItmes(){
   *      this.list.closeSlidingItems();
   *    }
   * }
   * ```
   */
  closeSlidingItems() {
    this.slidingGesture && this.slidingGesture.closeOpened();
  }

}


/**
 * @private
 */
@customElement('ion-list-header')
@noView
@inject(Element)
export class ListHeader {
  private _id: string;

  constructor(private _element: Element) {
    this._id = _element.getAttribute('id');
  }

  public get id(): string {
    return this._id;
  }

  public set id(val: string) {
    this._id = val;
    this._element.setAttribute('id', val);
  }

}
