import {customElement, customAttribute, inlineView, inject, children, child, processContent, DOM} from 'aurelia-framework';

import {Button} from '../button/button';
import {Form} from '../../util/form';
import {Icon} from '../icon/icon';
import {Label} from '../label/label';


/**
 * @name Item
 * @description
 * Creates a list-item that can easily be swiped, deleted, reordered, edited, and more.
 *
 * There are three common ways to use an item:
 * - Use `<ion-item>` for something that is only non-clickable text.
 * - Use `<button ion-item>` for something that can be clicked/tapped. Typically this element will also have a `(click)` handler.
 * - Use `<a ion-item>` for when the item needs to contain a `href`.
 *
 * By default, `<button ion-item>` and `<a ion-item>` will receive a right arrow icon on iOS to signal that tapping the item will reveal more information.
 * To hide this icon, add the `detail-none` attribute to the item (eg: `<button ion-item detail-none>`). To add the icon when it is not displayed by default,
 * add the `detail-push` attribute (eg: `<ion-item detail-push>`).
 *
 *
 * @usage
 * ```html
 *
 * <ion-list>
 *
 *   // default item
 *   <ion-item>
 *     {{item.title}}
 *   </ion-item>
 *
 * </ion-list>
 *
 *  ```
 * @demo /docs/v2/demos/item/
 * @see {@link /docs/v2/components#lists List Component Docs}
 * @see {@link ../../list/List List API Docs}
 */
 // TODO: check how to apply same behavior for customAttribute
@customElement('ion-item')
@customAttribute('ion-item')
@inlineView(
  '<template class="item">' +
    '<content select="[item-left],ion-checkbox"></content>' +
    '<div class="item-inner">' +
      '<div class="input-wrapper">' +
        '<content select="ion-label"></content>' +
        '<content select="ion-select,ion-input,ion-textarea"></content>' +
      '</div>' +
      '<content select="[item-right],ion-radio,ion-toggle"></content>' +
    '</div>' +
    '<ion-button-effect></ion-button-effect>' +
  '</template>'
)
@inject(Form, Element)
@processContent(ensureHasLabel)
export class Item {
  private _ids: number = -1;
  private _inputs: Array<string> = [];
  private _viewLabel: boolean = true;

  @children('button')
  private _buttons: Button[];

  @children('ion-icon')
  private _icons: Icon[];

  @child('ion-label')
  private _label: Label;

  /**
   * @private
   */
  id: string;

  /**
   * @private
   */
  labelId: string = null;

  constructor(form: Form, private _element: Element) {
    this.id = form.nextId().toString();
  }

  /**
   * @private
   */
  registerInput(type: string) {
    this._inputs.push(type);
    return this.id + '-' + (++this._ids);
  }

  /**
   * @private
   */
  attached() {
    if (this._viewLabel && this._inputs.length) {
      let labelText = this.getLabelText().trim();
      this._viewLabel = (labelText.length > 0);
    }

    if (this._inputs.length > 1) {
      this.setCssClass('item-multiple-inputs', true);
    }
  }

  /**
   * @private
   */
  setCssClass(cssClass: string, shouldAdd: boolean) {
    this._element.classList[shouldAdd ? 'add' : 'remove'](cssClass);
  }

  /**
   * @private
   */
  getLabelText(): string {
    return this._label ? this._label.text : '';
  }

  /**
   * @private
   */
  private _labelChanged(label: Label) {
    if (label) {
      this._label = label;
      this.labelId = label.id = ('lbl-' + this.id);
      if (label.type) {
        this.setCssClass('item-label-' + label.type, true);
      }
      this._viewLabel = false;
    }
  }

  /**
   * @private
   */
  // @ViewChild(Label)
  // private set viewLabel(label: Label) {
  //   if (!this._label) {
  //     this._label = label;
  //   }
  // }

  /**
   * @private
   */
  private _buttonsChanged(buttons) {
    buttons.forEach(button => {
      // Don't add the item-button class if the user specifies
      // a different size button
      if (!button.isItem && !button._size) {
        button.addClass('item-button');
      }
    });
  }

  private _iconsChanged(icons) {
    icons.forEach(icon => {
      icon.addClass('item-icon');
    });
  }
}

function ensureHasLabel(compiler, resources, element: HTMLElement, instruction) {
  if (!element.querySelector('ion-label')) {
    let label = DOM.createElement('ion-label');

    Array.prototype.forEach.call(element.children, function(child) {
      if (!child.matches('[item-left],ion-checkbox,ion-select,ion-input,ion-textarea,[item-right],ion-radio,ion-toggle')) {
        label.appendChild(child);
      }
    });
    element.appendChild(label);
  }

  instruction.anchorIsContainer = true;

  return true;
}
