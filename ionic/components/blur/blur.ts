import {customAttribute} from 'aurelia-framework';


/**
 * @name Blur
 * @description
 * The blur attribute applies the CSS blur attribute to an element. Safari only.
 *
 * @usage
 * ```html
 * <ion-card blur>
 *    This card will blur the content behind it.
 * </ion-card>
 * ```
 *
 * @demo /docs/v2/demos/blur/
 * @private
 */
@customAttribute('blur')
export class Blur {
  constructor(element: Element) {
    (<HTMLElement>element).style['-webkit-backdrop-filter'] = 'blur(10px)';
  }
}
