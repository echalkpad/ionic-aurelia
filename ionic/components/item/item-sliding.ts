import {customElement, inlineView, inject, Optional} from 'aurelia-framework';

import {List} from '../list/list';


/**
 * @name ItemSliding
 *
 * @description
 * Creates a list-item that can easily be swiped, deleted, reordered, edited, and more.
 *
 * @usage
 * ```html
 * <ion-list>
 *   <ion-item-sliding *ngFor="#item of items">
 *     <button ion-item (click)="itemTapped(item)">
 *       {{item.title}}
 *     </button>
 *     <ion-item-options>
 *       <button (click)="favorite(item)">Favorite</button>
 *       <button (click)="share(item)">Share</button>
 *     </ion-item-options>
 *   </ion-item-sliding>
 * </ion-list>
 * ```
 * @demo /docs/v2/demos/item-sliding/
 * @see {@link /docs/v2/components#lists List Component Docs}
 * @see {@link ../../list/List List API Docs}
 */
@customElement('ion-item-sliding')
@inlineView(
  '<template>' +
    '<ng-content select="ion-item,[ion-item]"></ng-content>' +
    '<ng-content select="ion-item-options"></ng-content>' +
  '</template>'
)
@inject(Optional.of(List), Element)
export class ItemSliding {

  constructor(private _list: List, element: Element) {
    _list.enableSlidingItems(true);
    element.$ionSlide = ++slideIds;
  }

  /**
   * @private
   */
  close() {
    this._list.closeSlidingItems();
  }

}

let slideIds = 0;
