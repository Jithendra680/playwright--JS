const BasePage = require('./BasePage');

class QuickBookingPage extends BasePage {
  constructor(page) {
    super(page);

    // Navigation
    this.reservationsLink = page.locator('a').filter({ hasText: 'Reservations' });
    this.toggleDropdown = page.getByRole('button', { name: 'Toggle Dropdown ' });
    this.quickBookOption = page.getByText('Quick Book');
    this.noBtn = page.getByRole('button', { name: 'No' });

    // Stay Details 
    this.checkInInput = page.getByRole('textbox', { name: 'Check In' });
    this.checkOutInput = page.getByRole('textbox', { name: 'Check Out' });
    this.checkInTimeElement = page.locator('#times').first();
    this.checkOutTimeElement = page.locator('#times').nth(1);

    // Guest & Room Selections
    this.roomCountInput = page.getByRole('spinbutton').first();
    this.roomTypeArrow = page.locator('.col-md-6 > ui-select > .group > .d-flex > #room-type > .ng-select-container > .ng-arrow-wrapper');
    this.packageArrow = page.locator('#package > .ng-select-container > .ng-arrow-wrapper');

    // Guest Information
    this.phoneInput = page.getByRole('textbox', { name: 'Phone' });
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });

    // Action Buttons
    this.bookBtn = page.getByRole('button', { name: 'Book' });
  }

  // 🔹 Step 1: Open Quick Booking
  async openQuickBooking() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.reservationsLink.waitFor({ state: 'visible', timeout: 15000 });
    await this.reservationsLink.click();
    await this.toggleDropdown.click();
    await this.quickBookOption.click();

    try {
      await this.noBtn.waitFor({ state: 'visible', timeout: 5000 });
      await this.noBtn.click();
    } catch (e) {
      // No popup appeared
    }
  }

  // 🔹 Step 2: Stay Details
  async enterStayDetails(checkIn, cTime, checkOut, oTime) {
    await this.checkInInput.fill(checkIn);
    await this.checkInTimeElement.selectOption(cTime);
    await this.checkOutInput.fill(checkOut);
    await this.checkOutTimeElement.selectOption(oTime);
  }

  // 🔹 Step 3: Guest & Room Details
  async enterGuestAndRoomDetails(roomCount, roomType, packageName) {
    await this.roomCountInput.click();
    await this.roomCountInput.fill(roomCount);
    await this.roomTypeArrow.click();
    await this.page.getByRole('option', { name: roomType }).click();
    await this.packageArrow.click();
    await this.page.getByRole('option', { name: packageName }).click();
  }

  // 🔹 Step 4: Guest Information
  async enterGuestInformation(phone, email, firstName, lastName) {
    await this.phoneInput.click();
    await this.phoneInput.fill(phone);
    await this.emailInput.click();
    await this.emailInput.fill(email);
    await this.firstNameInput.waitFor({ state: 'visible' });
    await this.firstNameInput.click({ force: true });
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.click({ force: true });
    await this.lastNameInput.fill(lastName);
  }

  // 🔹 Step 5: Finalize Booking
  async clickBook() {
    await this.bookBtn.click();
  }
}

module.exports = QuickBookingPage;
