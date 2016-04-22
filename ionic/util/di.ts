import {Container, resolver} from 'aurelia-framework';

@resolver()
export class Attribute {
  static of(key: string): Attribute {
    return new Attribute(key);
  }

  static all(...keys: string[]) {
    return keys.map(Attribute.of);
  }

  constructor(private _key: string) {}

  get(container: Container): string {
    let host = container.get(Element);

    return host.getAttribute(this._key);
  }
}
