import { TestListPage } from './app.po';

describe('test-list App', () => {
  let page: TestListPage;

  beforeEach(() => {
    page = new TestListPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
