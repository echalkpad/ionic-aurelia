import {Directive, ElementRef} from 'angular2/core';

import {rafFrames} from '../../util/dom';

/**
 * @private
 */
@Directive({
  selector: 'tab-highlight'
})
export class TabHighlight {
  private _init: boolean;
  
  constructor(private _elementRef: ElementRef) {}

  select(tab) {
    rafFrames(3, () => {
      let d = tab.btn.getDimensions();
      let ele = this._elementRef.nativeElement;
      ele.style.transform = 'translate3d(' + d.left + 'px,0,0) scaleX(' + d.width + ')';

      if (!this._init) {
        this._init = true;
        rafFrames(6, () => {
          ele.classList.add('animate');
        });
      }
    });
  }

}