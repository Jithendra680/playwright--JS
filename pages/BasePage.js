class BasePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://stage.ehotl.com/';
  }

  async navigate(url) {
    await this.page.goto(url);
  }
}

module.exports = BasePage;
