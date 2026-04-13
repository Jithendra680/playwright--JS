const BasePage = require('./BasePage');

class OosCreationPage extends BasePage {
  constructor(page) {
    super(page);

    // 🔹 Navigation
    this.frontDeskMenu = page.locator('#navbar-nav a').filter({ hasText: 'Front Desk' });
    this.oooOosTab = page.getByRole('tab', { name: 'OOO / OOS' });
    this.addNewBtn = page.getByRole('button', { name: 'Add New' });

    // 🔹 Form Fields - Core Selections
    this.typeDropdown = page.locator('.ng-arrow-wrapper').first();
    this.roomDropdown = page.locator('#room > .ng-select-container > .ng-arrow-wrapper');

    // 🔹 Date & Time Fields
    this.startDateDate = page.locator('ui-input-date').filter({ hasText: 'Start date time *' }).getByPlaceholder('Select Date');
    this.startTimeSelect = page.locator('#times').first();

    this.endDateDate = page.locator('ui-input-date').filter({ hasText: 'End date time *' }).getByPlaceholder('Select Date');
    this.endTimeSelect = page.locator('#times').nth(1);

    // 🔹 Additional Settings
    this.remarksTextarea = page.locator('textarea');
    this.blockInventoryCheckbox = page.getByRole('checkbox', { name: 'Block Inventory' });
    this.submitBtn = page.getByRole('button', { name: 'Submit' });
  }

  // 🔹 Action Methods
  async navigateToOooOos() {
    await this.frontDeskMenu.waitFor({ state: 'visible' });
    await this.frontDeskMenu.click();
    await this.oooOosTab.waitFor({ state: 'visible' });
    await this.oooOosTab.click();
  }

  async openAddForm() {
    await this.addNewBtn.waitFor({ state: 'visible' });
    await this.addNewBtn.click();
  }

  async fillOosFullDetails(room, start, startTime, end, endTime, reason, block = true) {

    await this.typeDropdown.click();
    await this.page.getByRole('option', { name: 'OOS', exact: true }).click();
    await this.roomDropdown.click();
    await this.page.getByRole('option', { name: room }).click();
    await this.startDateDate.click();
    await this.startDateDate.fill(start);
    await this.startTimeSelect.selectOption(startTime);
    await this.endDateDate.click();
    await this.endDateDate.clear();
    await this.endDateDate.fill(end);
    await this.endDateDate.press('Tab');
    await this.endTimeSelect.selectOption(endTime);
    await this.remarksTextarea.fill(reason);

    if (block) {
      await this.blockInventoryCheckbox.check();
    }
  }

  async submitForm() {
    await this.submitBtn.click();
  }
}

module.exports = OosCreationPage;
