const BasePage = require('./BasePage');

class OooCreationPage extends BasePage {
  constructor(page) {
    super(page);

    // 🔹 Navigation
    this.frontDeskMenu = page.locator('#navbar-nav a').filter({ hasText: 'Front Desk' });
    this.oooTab = page.getByRole('tab', { name: 'OOO / OOS' });
    this.addNewBtn = page.getByRole('button', { name: 'Add New' });

    // 🔹 Form Fields
    this.typeDropdown = page.locator('.ng-arrow-wrapper').first();
    this.roomDropdown = page.locator('#room > .ng-select-container > .ng-arrow-wrapper');

    this.startDateDate = page.locator('ui-input-date').filter({ hasText: 'Start date time *' }).getByPlaceholder('Select Date');
    this.startTimeSelect = page.locator('#times').first();

    this.endDateDate = page.locator('ui-input-date').filter({ hasText: 'End date time *' }).getByPlaceholder('Select Date');
    this.endTimeSelect = page.locator('#times').nth(1);

    this.reasonTextarea = page.locator('textarea');
    this.submitBtn = page.getByRole('button', { name: 'Submit' });
    
  }

  // 🔹 Action Methods
  async navigateToOoo() {
    await this.frontDeskMenu.waitFor({ state: 'visible' });
    await this.frontDeskMenu.click();
    await this.oooTab.waitFor({ state: 'visible' });
    await this.oooTab.click();
  }

  async openCreateForm() {
    await this.addNewBtn.waitFor({ state: 'visible' });
    await this.addNewBtn.click();
  }

  async fillOooDetails(type, room, startDate, startTime, endDate, endTime, reason) {
    await this.typeDropdown.click();
    await this.page.getByRole('option', { name: type, exact: true }).click();
    await this.roomDropdown.click();
    await this.page.getByRole('option', { name: room }).click();
    await this.startDateDate.click();
    await this.startDateDate.fill(startDate);
    await this.startTimeSelect.selectOption(startTime);
    await this.endDateDate.click();
    await this.endDateDate.clear();
    await this.endDateDate.fill(endDate);
    await this.endDateDate.press('Tab');
    await this.endTimeSelect.selectOption(endTime);
    await this.reasonTextarea.fill(reason);
  }

  async submitOoo() {
    await this.submitBtn.click();
  }
}

module.exports = OooCreationPage;
