import * as webdriver from '@types/selenium-webdriver';
import Promise = webdriver.promise.Promise;

export interface IHomePage {
  navigateTo(path?: string): Promise<any>;
  getParagraphText(): Promise<string>;
}
