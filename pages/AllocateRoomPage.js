const BasePage = require('./BasePage');

class AllocateRoomPage extends BasePage {
  constructor(page) {
    super(page);

    // Locators
    this.reservationsLink = page.locator('a').filter({ hasText: 'Reservations' });
    this.reservationSwitch = page.getByRole('switch');
    this.actionsBtn = page.getByRole('button', { name: 'Actions' }).first();
    this.allocateRoomAction = page.getByText('Allocate Room');
    this.roomSelectArrow = page.locator('.ng-arrow-wrapper');
    this.saveAndCloseBtn = page.getByRole('button', { name: 'Save & Close' });
  }

  // Step 1: Reservations & Toggle
  async openAllocationPortal() {
    await this.reservationsLink.click();
    await this.reservationSwitch.check();
  }

  // Step 2: Open Allocate Menu
  async openAllocateRoomMenu() {
    await this.actionsBtn.click();
    await this.allocateRoomAction.click();
  }

  // Step 3: Select Available Room from Dropdown
  async selectRoom() {
    await this.roomSelectArrow.click();
    const firstOption = this.page.getByRole('option').first();
    await firstOption.waitFor({ state: 'visible' });
    await firstOption.click();
  }

  // Step 4: Save and Close
  async clickSaveAndClose() {
    await this.saveAndCloseBtn.click();
  }
}

module.exports = AllocateRoomPage;