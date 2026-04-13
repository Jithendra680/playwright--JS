const BasePage = require('./BasePage');

class EhotlLoginPage extends BasePage {
  constructor(page) {
    super(page);

    this.emailInput = page.getByRole('textbox', { name: 'Enter your email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Enter your password' });
    this.signInBtn = page.getByRole('button', { name: 'Sign In' });
  }

  async login(email, password) {
    await this.navigate(`${this.baseUrl}/auth/login`);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInBtn.click();
  }
}

module.exports = EhotlLoginPage;