const BasePage = require('./BasePage');

class TpaCreationPage extends BasePage {
  constructor(page) {
    super(page);

    // 🔹 Navigation
    this.tpaMenu = page.locator('a').filter({ hasText: 'TPA' });
    this.createBtn = page.getByRole('button', { name: ' Create' });
    this.submitBtn = page.getByRole('button', { name: ' Submit' });

    // 🔹 Basic Agency Info
    this.nameInput = page.getByRole('textbox', { name: 'Name * Name * Name *' });
    this.categoryDropdown = page.locator('.ng-arrow-wrapper').first();
    this.agencyNoInput = page.getByRole('textbox', { name: 'Agency # *' });
    this.validFromInput = page.getByRole('textbox', { name: 'Valid From' });
    this.validToInput = page.getByRole('textbox', { name: 'Valid To' });
    this.sourceCodeDropdown = page.locator('#source-codes > .ng-select-container > .ng-arrow-wrapper');
    this.iataNoInput = page.getByRole('textbox', { name: 'IATA #' });

    // 🔹 Primary Contact Person
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name *' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name *' });
    this.countryCodeDropdown = page.locator('#imageId > .ng-select-container > .ng-arrow-wrapper').first();
    this.countrySearch = page.locator('ng-select').filter({ hasText: '×+93-Afghanistan+355-Albania+' }).getByRole('combobox');
    this.phoneInput = page.getByRole('textbox', { name: 'Enter your phone number' }).first();
    this.emailInput = page.getByRole('textbox', { name: 'Email * Email * Email *' });

    // 🔹 Address
    this.address1Input = page.getByRole('textbox', { name: 'Address1 * City *' });
    this.address2Input = page.getByRole('textbox', { name: 'Address2 *' });
    this.stateInput = page.getByRole('textbox', { name: 'State *' });
    this.cityInput = page.getByRole('textbox', { name: 'City', exact: true });

    //  Account Manager
    this.accountManagerName = page.locator("//div[@formgroupname='accountManager']//input[@id='name']");
    this.accountManagerEmail = page.locator("//div[@formgroupname='accountManager']//input[@id='email']");
    this.accountManagerCountryCodedrpdwn = page.locator("//div[@formgroupname='accountManager']//span[@class='ng-arrow-wrapper']");
    this.accountManagerCountryCode = page.locator("//ui-select-country[@class='ng-touched ng-dirty ng-valid']//input[@role='combobox']");
    this.accountManagerPhone = page.locator("//div[@formgroupname='accountManager']//input[@id='phone']");

    // 🔹 Financial Details
    this.gstNoInput = page.getByRole('textbox', { name: 'GST #' });
    this.cinInput = page.getByRole('textbox', { name: 'CIN' });
    this.bankAccountInput = page.getByRole('textbox', { name: 'Bank Account' });
    this.ifscInput = page.getByRole('textbox', { name: 'IFSC' });

    // 🔹 Commission & Negotiated Rates
    this.commissionType = page.getByRole('combobox').nth(5);
    this.calculationType = page.locator('select').nth(1);
    this.commissionValueInput = page.getByPlaceholder('%').first();
  }

  // 🔹 Action Methods
  async openTpaForm() {
    await this.tpaMenu.waitFor({ state: 'visible' });
    await this.tpaMenu.click();
    await this.createBtn.waitFor({ state: 'visible' });
    await this.createBtn.click();
  }

  async fillAgencyDetails(name, category, agencyNo, from, to, source, iata) {
    await this.nameInput.fill(name);
    await this.categoryDropdown.click();
    await this.page.getByRole('option', { name: category }).click();
    await this.agencyNoInput.fill(agencyNo);
    await this.validFromInput.fill(from);
    await this.validToInput.fill(to);
    await this.sourceCodeDropdown.click();
    await this.page.getByRole('option', { name: source }).click();
    await this.iataNoInput.fill(iata);
  }

  async fillPrimaryContact(fname, lname, countryCode, phone, email) {
    await this.firstNameInput.fill(fname);
    await this.lastNameInput.fill(lname);
    await this.countryCodeDropdown.click();
    await this.countrySearch.fill(countryCode);
    await this.page.getByRole('option', { name: new RegExp(`\\+${countryCode}`) }).click();
    await this.phoneInput.fill(phone);
    await this.emailInput.fill(email);
  }

  async fillAddress(addr1, addr2, state, city) {
    await this.address1Input.fill(addr1);
    await this.address2Input.fill(addr2);
    await this.stateInput.fill(state);
    await this.cityInput.fill(city);
  }

  async fillAccountManager(name, email, countryCode, phone) {
    await this.accountManagerName.fill(name);
    await this.accountManagerEmail.fill(email);
    await this.accountManagerCountryCodedrpdwn.click();
    await this.accountManagerCountryCode.fill(countryCode);
    await this.page.getByRole('option', { name: new RegExp(`\\+${countryCode}`) }).click();
    await this.accountManagerPhone.fill(phone);
  }

  async fillFinancials(gst, cin, bank, ifsc) {
    await this.gstNoInput.fill(gst);
    await this.cinInput.fill(cin);
    await this.bankAccountInput.fill(bank);
    await this.ifscInput.fill(ifsc);
  }

  async setCommissions(type, calc, value) {
    await this.commissionType.selectOption(type);
    await this.calculationType.selectOption(calc);
    await this.commissionValueInput.fill(String(value));
  }

  async submitTpa() {
    await this.submitBtn.click();
  }
}

module.exports = TpaCreationPage;
