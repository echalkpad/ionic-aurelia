import * as dom from '../util/dom';

let ids: number = 0;

/**
 * Base class for all Ionic components. Exposes some common functionality
 * that all Ionic components need, such as accessing underlying native elements and
 * sending/receiving app-level events.
 */
export class Ion {
  private _id: string;

  constructor(protected element: HTMLElement) {
    this._id = 'i' + ids++;
  }

  getElementRef(): HTMLElement {
    return this.element;
  }

  getNativeElement(): any {
    return this.element;
  }

  getDimensions(): {
    width: number, height: number, left: number, top: number
  } {
    return dom.getDimensions(this.element, this._id);
  }

  width(): number {
    return dom.getDimensions(this.element, this._id).width;
  }

  height(): number {
    return dom.getDimensions(this.element, this._id).height;
  }

  detached() {
    dom.clearDimensions(this._id);
  }

}
