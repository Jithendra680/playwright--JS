const BasePage = require('./BasePage');

class GroupBookingPage extends BasePage {
  constructor(page) {
    super(page);

    // Navigation
    this.reservationsLink = page.locator('a').filter({ hasText: 'Reservations' });
    this.toggleDropdown = page.getByRole('button', { name: 'Toggle Dropdown ' });
    this.groupBookingOption = page.getByText('Group Booking');

    // Stay Details
    this.checkInInput = page.getByRole('textbox', { name: 'Check In' });
    this.checkOutInput = page.getByRole('textbox', { name: 'Check Out' });
    this.checkInTime = page.locator('#times').first();
    this.checkOutTime = page.locator('#times').nth(1);

    // Reservation Details
    this.statusArrow = page.locator('.ng-arrow-wrapper').first();
    this.sourceCodeArrow = page.locator('#source-code > .ng-select-container > .ng-arrow-wrapper');
    this.salesPersonArrow = page.locator('#sales-person > .ng-select-container > .ng-arrow-wrapper');
    this.marketSegmentArrow = page.locator('#market-segment > .ng-select-container > .ng-arrow-wrapper');

    // Room & Package
    this.roomTypeCombo = page.locator('#room-type').getByRole('combobox').filter({ hasText: /^$/ });
    this.packageArrow = page.locator('#package > .ng-select-container > .ng-arrow-wrapper');
    this.optionsList = page.getByLabel('Options List');
    this.roomCountSpinner = page.getByRole('spinbutton').first();

    // Guest Details
    this.phoneInput = page.getByRole('textbox', { name: 'Phone' }).first();
    this.emailInput = page.getByRole('textbox', { name: 'Email' }).first();
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' }).first();
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' }).first();
    this.selfCheck = page.getByRole('checkbox', { name: 'Are you booking for yourself?' });

    // Additional Guest Details
    this.dobInput = page.getByRole('textbox', { name: 'Select DOB' });
    this.iataInput = page.getByRole('textbox', { name: 'IATA #' });
    this.gstInput = page.getByRole('textbox', { name: 'GST #' });
    this.guestStatusArrow = page.locator('#guest-status > .ng-select-container > .ng-arrow-wrapper');
    this.nationalityInput = page.getByRole('textbox', { name: 'Nationality' });
    this.zipCodeInput = page.getByRole('textbox', { name: 'Zip Code' });
    this.guestPreferences = page.getByRole('textbox', { name: 'Guest Preferences' });
    this.reservationComments = page.getByRole('textbox', { name: 'Reservation Comments' });
    this.cashierComments = page.getByRole('textbox', { name: 'Cashier Comments' });
    this.billingInstructions = page.getByRole('textbox', { name: 'Billing Instructions' });

    // Pay Master
    this.createPayMasterArrow = page.locator('#create-pay-master > .ng-select-container > .ng-arrow-wrapper');
    this.selectPayMasterArrow = page.locator('#select-pay-master > .ng-select-container > .ng-arrow-wrapper');

    // Action Buttons
    this.nextBtn = page.getByRole('button', { name: 'Next' });
    this.proceedBtn = page.getByRole('button', { name: 'Proceed' });
  }

  // 🔹 Step 1: Open Group Booking
  async openGroupBooking() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.reservationsLink.click();
    await this.toggleDropdown.click();
    await this.groupBookingOption.click();

    // 🔹 Auto-Dismiss the Popup
    const noBtn = this.page.getByRole('button', { name: 'No' });
    try {
      await noBtn.waitFor({ state: 'visible', timeout: 5000 });
      await noBtn.click();
    } catch (e) {
      // No popup appeared
    }
  }

  // 🔹 Step 2: Stay Details
  async enterStayDetails(checkInDay, checkInTime, checkOutDay, checkOutTime) {
    await this.checkInInput.fill(checkInDay);
    await this.checkInTime.selectOption(checkInTime);
    await this.checkOutInput.fill(checkOutDay);
    await this.checkOutTime.selectOption(checkOutTime);
  }

  // 🔹 Step 3: Reservation Details
  async selectReservationStatus(status) {
    await this.statusArrow.click();
    await this.page.getByRole('option', { name: status, exact: true }).click();
  }
  async selectSourceCode(code) {
    await this.sourceCodeArrow.click();
    await this.page.getByRole('option', { name: code }).click();
  }
  async selectSalesPerson(person) {
    await this.salesPersonArrow.click();
    await this.page.getByRole('option', { name: person }).click();
  }
  async selectMarketSegment(segment) {
    await this.marketSegmentArrow.click();
    await this.page.getByRole('option', { name: segment }).click();
    await this.page.waitForTimeout(1000);
  }

  // 🔹 Step 4: Room Type Selection
  async selectRoomType(type) {
    await this.roomTypeCombo.click();
    await this.page.getByText(type, { exact: true }).click();
  }

  // 🔹 Step 4: Package Selection
  async selectPackage(pkg) {
    await this.packageArrow.click();
    await this.optionsList.getByText(pkg, { exact: true }).click();
  }

  // 🔹 Step 4: Room Count
  async enterRoomCount(count) {
    await this.roomCountSpinner.click();
    await this.roomCountSpinner.fill(count);
  }

  // 🔹 Step 5: Guest Information
  async enterGuestInformation(phone, email, firstName, lastName) {
    await this.phoneInput.click();
    await this.phoneInput.fill(phone);
    await this.emailInput.click();
    await this.emailInput.fill(email);
    await this.firstNameInput.click({ force: true });
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.click({ force: true });
    await this.lastNameInput.fill(lastName);
    await this.selfCheck.check();
  }

  // 🔹 Step 6: Additional Guest Details
  async enterAdditionalGuestInfo(details) {
    await this.dobInput.click();
    await this.dobInput.fill(details.dob);
    await this.iataInput.fill(details.iata);
    await this.gstInput.fill(details.gst);
    await this.guestStatusArrow.click();
    await this.page.getByRole('option', { name: details.status }).click();
    await this.nationalityInput.fill(details.nationality);
    await this.zipCodeInput.fill(details.zipCode);
    await this.guestPreferences.fill(details.preferences);
    await this.reservationComments.fill(details.resComments);
    await this.cashierComments.fill(details.cashComments);
    await this.billingInstructions.fill(details.billInstructions);
  }

  // 🔹 Step 7: Handle Pay Master
  async handlePayMaster(createOption) {
    await this.createPayMasterArrow.click();
    await this.page.getByRole('option', { name: createOption }).click();

    if (createOption === 'No') {
      await this.selectPayMasterArrow.click();
    }
  }

  // 🔹 Step 8 : Complete Booking
  async completeBooking() {
    await this.nextBtn.click();
    await this.proceedBtn.click();
  }
}

module.exports = GroupBookingPage;