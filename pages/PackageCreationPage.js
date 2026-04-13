const BasePage = require('./BasePage');

class PackageCreationPage extends BasePage {
  constructor(page) {
    super(page);

    // 🔹 Navigation & General Actions
    this.salesPackageMenu = page.locator('a').filter({ hasText: 'Sales Package' });
    this.createBtn = page.getByRole('button', { name: 'Create', exact: true });

    // Updated Submit Locator based on user specification
    this.submitBtn = page.locator('ui-button').filter({ hasText: 'Submit' });

    // 🔹 Basic Package Details
    this.packageNameInput = page.getByRole('textbox', { name: 'Package Name *' });
    this.packageCodeInput = page.getByRole('textbox', { name: 'Code *' });

    // Updated Dropdown Locators
    this.sourceDropdown = page.locator('.ng-arrow-wrapper').first();
    this.roomTypeDropdown = page.locator('div:nth-child(4) > .ng-untouched.ng-pristine.ng-invalid > .group > .d-flex > #undefined > .ng-select-container > .ng-arrow-wrapper');
    this.taxDropdown = page.locator('.ng-select.ng-select-multiple > .ng-select-container > .ng-arrow-wrapper').first();
    this.taxInput = page.locator('.ng-select.ng-select-multiple > .ng-select-container > .ng-value-container > .ng-input').first();

    // 🔹 Amenities & Features
    this.amenitiesDropdown = page.locator('.ng-select.ng-select-multiple.ng-select-searchable.ng-select-clearable > .ng-select-container > .ng-arrow-wrapper');

    // 🔹 Validity Dates
    this.validFromDate = page.locator('ui-input-date').filter({ hasText: 'Valid From *' }).getByPlaceholder('Select Date');
    this.validToDate = page.locator('ui-input-date').filter({ hasText: 'Valid To *' }).getByPlaceholder('Select Date');

    // 🔹 Occupancy & Pricing
    this.adultsInput = page.getByRole('spinbutton', { name: 'Adults *' });
    this.childrenInput = page.getByRole('spinbutton', { name: 'Children *' });
    this.maxOccupancyInput = page.getByRole('spinbutton', { name: 'Max Occupancy *' });
    this.priceInput = page.getByRole('spinbutton', { name: 'Price *' });
    this.objectIdInput = page.getByRole('textbox', { name: 'Object Id' }).first();

    // 🔹 Descriptions & Facilities
    this.facilitiesTextarea = page.locator('ui-input-textarea').filter({ hasText: 'Facilities' }).locator('#undefined');
    this.descriptionTextarea = page.locator('ui-input-textarea').filter({ hasText: 'Description' }).locator('#undefined');

    // 🔹 Meal Management
    this.addMealsBtn = page.getByRole('button', { name: 'Add meals' });
    this.mealTypeArrow = page.locator('.d-flex > ui-select > .group > .d-flex > #undefined > .ng-select-container > .ng-arrow-wrapper').first();
    this.mealRuleArrow = page.locator('ui-select:nth-child(2) > .group > .d-flex > #undefined > .ng-select-container > .ng-arrow-wrapper');
    this.mealPriceInput = page.getByPlaceholder('Price').nth(1);
    this.mealObjectIdInput = page.getByRole('textbox', { name: 'Object Id', exact: true });
    this.perPackCheckbox = page.getByRole('checkbox', { name: 'Per Pack' });
  }

  // 🔹 Action Methods
  async openPackageSection() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.salesPackageMenu.waitFor({ state: 'visible', timeout: 15000 });
    await this.salesPackageMenu.click();
  }

  async openCreateForm() {
    await this.createBtn.waitFor({ state: 'visible', timeout: 5000 });
    await this.createBtn.click();
  }

  async fillBasicInfo(name, code, source, roomType) {
    await this.packageNameInput.click();
    await this.packageNameInput.fill(name);
    await this.packageCodeInput.click();
    await this.packageCodeInput.fill(code);

    await this.sourceDropdown.click();
    await this.page.getByRole('option', { name: source }).click();

    await this.roomTypeDropdown.click();
    await this.page.getByRole('option', { name: roomType }).click();
  }

  async selectTaxes(taxNames) {
    await this.taxDropdown.click();
    await this.taxInput.click();
    for (const tax of taxNames) {
      await this.page.getByRole('option', { name: tax }).click();
    }
    await this.taxDropdown.click();
  }

  async selectAmenities(amenities) {
    await this.amenitiesDropdown.click();
    for (const amenity of amenities) {
      await this.page.locator('div').filter({ hasText: new RegExp(`^${amenity}$`) }).nth(1).click();
    }
  }

  async setValidity(fromDate, toDate) {
    await this.validFromDate.click();
    await this.validFromDate.fill(fromDate);
    await this.validToDate.click();
    await this.validToDate.fill(toDate);
  }

  async setOccupancyAndPrice(adults, children, max, price, objectId) {
    await this.adultsInput.click();
    await this.adultsInput.fill(String(adults));
    await this.childrenInput.click();
    await this.childrenInput.fill(String(children));
    await this.maxOccupancyInput.click();
    await this.maxOccupancyInput.fill(String(max));
    await this.priceInput.click();
    await this.priceInput.fill(String(price));
    await this.objectIdInput.click();
    await this.objectIdInput.fill(objectId);
  }

  async setFacilities(facilities, description) {
    if (facilities) await this.facilitiesTextarea.fill(facilities);
    if (description) await this.descriptionTextarea.fill(description);
  }

  async addNewMeal(type, rule, price, objectId) {
    await this.addMealsBtn.click();

    await this.mealTypeArrow.click();
    await this.page.getByRole('option', { name: type }).click();

    await this.mealRuleArrow.click();
    await this.page.getByText(rule).first().click();

    await this.mealPriceInput.click();
    await this.mealPriceInput.fill(String(price));

    await this.mealObjectIdInput.click();
    await this.mealObjectIdInput.fill(objectId);

    await this.perPackCheckbox.check();
  }

  async submitForm() {
    await this.submitBtn.click();
    await this.submitBtn.waitFor({ state: 'hidden', timeout: 10 * 1000 });
  }
}

module.exports = PackageCreationPage;
