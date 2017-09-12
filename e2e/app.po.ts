import { browser, by, element } from 'protractor';

export class AngularD3CloudPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ngcloud-root h1')).getText();
  }
}
