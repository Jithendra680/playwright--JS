const BasePage = require('./BasePage');

class RoomCreationPage extends BasePage {
  constructor(page) {
    super(page);

    // 🔹 Navigation
    this.propertyAdminMenu = page.locator('a').filter({ hasText: 'Property Admin' });
    this.roomsTab = page.getByRole('tab', { name: 'Rooms' });
    this.hamburgerBtn = page.getByRole('button', { name: '☰ ' });
    this.createBtn = page.getByRole('button', { name: 'Create' });

    // 🔹 Basic Room Details
    this.codeInput = page.getByRole('textbox', { name: 'Code *' });
    this.roomNameInput = page.getByRole('textbox', { name: 'Room Name *' });
    this.categoryArrow = page.locator('.ng-arrow-wrapper').first();
    this.subCategoryArrow = page.locator('.ng-select.ng-select-single.ng-select-searchable.ng-untouched > .ng-select-container > .ng-arrow-wrapper').first();

    // 🔹 System and Mapping Details
    this.posObjectIdInput = page.getByRole('textbox', { name: 'Pos Object Id' });
    this.roomTypeArrow = page.locator('.ng-select.ng-select-single.ng-select-searchable.ng-untouched > .ng-select-container > .ng-arrow-wrapper');
    this.descriptionInput = page.getByRole('textbox', { name: 'Description' });
    this.submitBtn = page.getByRole('button', { name: ' Submit' });
  }

  // 🔹 Action Methods
  async navigateToRooms() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.propertyAdminMenu.waitFor({ state: 'visible', timeout: 15000 });
    await this.propertyAdminMenu.click();
    await this.roomsTab.waitFor({ state: 'visible', timeout: 10000 });
    await this.roomsTab.click();
  }

  async openCreateForm() {
    // Reveal the Create button by clicking the Hamburger menu
    await this.hamburgerBtn.waitFor({ state: 'visible', timeout: 5000 });
    await this.hamburgerBtn.click();
    
    // Click the Create button
    await this.createBtn.waitFor({ state: 'visible', timeout: 5000 });
    await this.createBtn.click();
  }

  async fillBasicInfo(code, roomName, category, subCategory) {
    await this.codeInput.click();
    await this.codeInput.fill(code);
    await this.roomNameInput.click();
    await this.roomNameInput.fill(roomName);

    // Select Category (e.g., Deluxe)
    await this.categoryArrow.click();
    await this.page.getByRole('option', { name: category }).click();

    // Select Sub-Category (e.g., First Floor)
    await this.subCategoryArrow.waitFor({ state: 'visible' });
    await this.subCategoryArrow.click();
    await this.page.getByRole('option', { name: subCategory }).click();
  }

  async fillMappingAndDescription(posId, roomType, description) {
    await this.posObjectIdInput.click();
    await this.posObjectIdInput.fill(posId);

    // Select Room Type (e.g., Deluxe)
    await this.roomTypeArrow.click();
    await this.page.getByRole('option', { name: roomType }).click();

    await this.descriptionInput.click();
    await this.descriptionInput.fill(description);
  }

  async submitRoom() {
    await this.submitBtn.click();
    // Wait for the form to close
    await this.submitBtn.waitFor({ state: 'hidden', timeout: 10000 });
  }
}

module.exports = RoomCreationPage;
