import {autoinject} from 'aurelia-framework';

import {Translate} from './translate';

/**
 * @private
 * The Translate pipe makes it easy to translate strings.
 *
 * @usage
 * Translate using the current language or language set through Translate.setLanguage
 * ${ 'Please enter your location' | translate }
 *
 * Translate using a specific language
 * ${ 'Please enter your location' | translate:"de" }
 */

@autoinject
export class TranslateValueConverter {
  private translate: any = {};

  constructor(translate: Translate) {
    this.translate = translate;
  }

  toView(value, ...args) {
    let lang;
    if(args.length > 0) {
      lang = args[0];
    }
    return this.translate.translate(value, lang);
  }

  supports(obj) {
    return true;
  }
}
