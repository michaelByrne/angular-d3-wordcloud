import { AngularD3CloudPage } from './app.po';

describe('angular-d3-cloud App', () => {
  let page: AngularD3CloudPage;

  beforeEach(() => {
    page = new AngularD3CloudPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to ngcloud!');
  });
});
