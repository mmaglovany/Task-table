import { binding, given, when, then } from 'cucumber-tsflow';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { CallbackStepDefinition } from 'cucumber';
import { browser } from 'protractor';
let expect = chai.use(chaiAsPromised).expect;

import { PageFactory } from '../../pageObjects/pageFactory';
import { IHomePage } from '../../pageObjects/homepage.api';

@binding()
class DemoSteps {
  private page: IHomePage;

  @given(/^I open the browser$/)
  private givenIOpenTheBrowser(callback: CallbackStepDefinition): void {
    this.page = PageFactory.homepage();
    callback();
  };

  @when(/^I visit the page "(.+)"/)
  private whenIVisitThePage(path: string, callback: CallbackStepDefinition): void {
    this.page.navigateTo(path);
    callback();
  };

  @then(/^it should display a the message "(.+)"$/)
  private thenAssertTitle(text: string, callback: CallbackStepDefinition): void {
    expect(this.page.getParagraphText()).to.eventually.equal(text);
    callback();
  };
}

export = DemoSteps;
