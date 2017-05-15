// import { IHomePage } from '../homepage.api';
// import * as webdriver from '@types/selenium-webdriver';
// import { browser, promise, element, protractor, ElementFinder } from 'protractor';
// import Promise = webdriver.promise.Promise;

// export class HomePage implements IHomePage {
//   private _baseElement: ElementFinder = element(protractor.by.css('app-root h1'));
//   private _sideNav: ElementFinder = element(protractor.by.css('.mat-sidenav-container .mat-sidenav-transition'));
//   navigateTo(path: string): Promise<any> {
//     return browser.get(path)
//     //  return browser.get('/')
//        .then(() => browser.wait( () => this._sideNav.isPresent()));
//     //  // browser.get('/');
//     //   page.navigateTo('/');
//     // expect(page.getParagraphText()).toEqual('Tasks list');
//   }

//   getParagraphText(): Promise<string> {
//     return this._baseElement.getText();
//   }
// }


import { IHomePage } from '../homepage.api';
import * as webdriver from '@types/selenium-webdriver';
import { browser, promise, element, protractor, ElementFinder } from 'protractor';
import Promise = webdriver.promise.Promise;

export class HomePage implements IHomePage {
  private _baseElement: ElementFinder = element(protractor.by.id('prestart'));
  navigateTo(path): Promise<any> {
    return browser.get('/' + path)
      .then(() => browser.wait(() => this._baseElement.isPresent()));
    // browser.get('/');
  }

  getParagraphText(): Promise<string> {
    return browser.get('/')
      .then(() => element(protractor.by.css('app-root h1')).getText());
  }
}
