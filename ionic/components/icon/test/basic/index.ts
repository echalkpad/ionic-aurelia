import {bootstrap} from 'aurelia-bootstrapper';

class E2EApp {
  public homeIcon: string;
  public isActive: boolean;
  public iconIndex: number;
  public icons: string[];
  public btnIcon: string;

  constructor() {
    this.homeIcon = 'home';
    this.isActive = false;

    this.iconIndex = 0;
    this.icons = [
      'home',
      'star',
      'ios-alert',
      'ios-alert-outline',
      'md-alert',
      'logo-apple'
    ];
    this.btnIcon = this.icons[0];
  }

  updateIcon() {
    this.iconIndex++;
    if (this.iconIndex >= this.icons.length) {
      this.iconIndex = 0;
    }
    this.btnIcon = this.icons[this.iconIndex];
  }
}
