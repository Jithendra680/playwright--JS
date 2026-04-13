const BasePage = require('./BasePage');

class RoomTypeCreationPage extends BasePage {
  constructor(page) {
    super(page);

    // 🔹 Navigation
    this.propertyAdminMenu = page.locator('a').filter({ hasText: 'Property Admin' });
    this.roomTypeTab = page.getByRole('tab', { name: 'Room Type' });
    this.createBtn = page.getByRole('button', { name: 'Create' });

    // 🔹 Basic Details
    this.nameInput = page.getByRole('textbox', { name: 'Name *' });
    this.codeInput = page.getByRole('textbox', { name: 'Code *' });
    this.hurdleRateInput = page.getByRole('spinbutton', { name: 'Hurdle Rate' });

    // 🔹 Features & Facilities
    this.facilitiesDropdown = page.locator('#undefined > .ng-select-container > .ng-arrow-wrapper');

    // 🔹 Room Specifications
    this.bedTypeInput = page.getByRole('textbox', { name: 'Bed Type' });
    this.bedNumberInput = page.getByRole('spinbutton', { name: 'Bed Number' });
    this.areaInput = page.getByRole('spinbutton', { name: 'Area of Room(Sq.ft/Sq.m)' });

    // 🔹 Metadata
    this.objectIdInput = page.getByRole('textbox', { name: 'Object Id' });
    this.descriptionInput = page.getByRole('textbox', { name: 'Description' });
    this.submitBtn = page.getByRole('button', { name: ' Submit' });
  }

  // 🔹 Action Methods
  async navigateToRoomType() {
    await this.propertyAdminMenu.waitFor({ state: 'visible' });
    await this.propertyAdminMenu.click();
    await this.roomTypeTab.waitFor({ state: 'visible' });
    await this.roomTypeTab.click();
  }

  async openCreateForm() {
    await this.createBtn.waitFor({ state: 'visible' });
    await this.createBtn.click();
  }

  async fillBasicInfo(name, code, hurdleRate) {
    await this.nameInput.fill(name);
    await this.codeInput.fill(code);
    await this.hurdleRateInput.fill(String(hurdleRate));
  }

  async selectFacilities(facilityNames) {
    await this.facilitiesDropdown.click();
    for (const facility of facilityNames) {
      await this.page.locator('div').filter({ hasText: new RegExp(`^${facility}$`) }).nth(1).click();
    }
    await this.facilitiesDropdown.click();
  }

  async fillSpecifications(bedType, bedNumber, area) {
    await this.bedTypeInput.fill(bedType);
    await this.bedNumberInput.fill(String(bedNumber));
    await this.areaInput.fill(String(area));
  }

  async fillMetadata(objectId, description) {
    await this.objectIdInput.fill(objectId);
    await this.descriptionInput.fill(description);
  }

  async submitRoomType() {
    await this.submitBtn.click();
  }
}

module.exports = RoomTypeCreationPage;
