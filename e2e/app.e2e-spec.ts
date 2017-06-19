import { MyCarcassonneAngPage } from './app.po';

describe('my-carcassonne-ang App', () => {
  let page: MyCarcassonneAngPage;

  beforeEach(() => {
    page = new MyCarcassonneAngPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
