const BasePage = require('./BasePage');

class CompanyBookingPage extends BasePage {
  constructor(page) {
    super(page);

    // Navigation
    this.reservationsLink = page.locator('a').filter({ hasText: 'Reservations' });
    this.bookBtn = page.getByRole('button', { name: 'Book' });

    // Stay Details
    this.checkInInput = page.getByRole('textbox', { name: 'Check-In' });
    this.checkOutInput = page.getByRole('textbox', { name: 'Check-Out' });
    this.checkInTime = page.locator('#times').first();
    this.checkOutTime = page.locator('#times').nth(1);
    this.bookingType = page.getByRole('radio', { name: 'Company' });

    //Reservation Type & Communication Details
    this.reservationStatusArrow = page.locator('.col-md-6 > .ng-select-searchable > .ng-select-container > .ng-arrow-wrapper').first();
    this.sourceCodeArrow = page.locator('div:nth-child(7) > .ng-select-searchable > .ng-select-container > .ng-arrow-wrapper');
    this.salesPersonArrow = page.locator('div:nth-child(8) > .ng-select-searchable > .ng-select-container > .ng-arrow-wrapper').first();
    this.marketSegmentArrow = page.locator('div:nth-child(9) > .ng-select-searchable > .ng-select-container > .ng-arrow-wrapper');
    this.companyName = page.getByRole('textbox', { name: 'Company Name' });
    this.companyInfo = page.getByRole('textbox', { name: 'Company Info.' });

    // Guest Counts
    this.adultCountInput = page.locator('#adult');
    this.childCountInput = page.locator('#children');

    // Search Button 
    this.searchBtn = page.getByRole('button', { name: 'Search' });

    // Room & Package
    this.roomTypeArrow = page.locator('#select-room-type > .ng-select-container > .ng-arrow-wrapper');
    this.packageInput = page.locator('#select-package > .ng-select-container > .ng-value-container > .ng-input > input');

    // Guest Details
    this.phoneInput = page.getByRole('textbox', { name: 'Phone* Phone*' });
    this.emailInput = page.getByRole('textbox', { name: 'Email * Email *' });
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name * First Name *' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name * Last Name *' });
    this.selfBookingCheckbox = page.getByRole('checkbox', { name: 'Are you booking for yourself?' });

    // Location
    this.locationSearchInput = page.getByRole('textbox', { name: 'Enter location' });
    this.locationResultItem = (text) => this.page.getByText(text);

    // Additional Details
    this.iataNo = page.locator('[name="iataNo"]');
    this.gstNo = page.locator('input[name="gstNo"]');
    this.departingFlightNo = page.locator('input[name="departingFlightNo"]');
    this.arrivalFlightNo = page.locator('input[name="arrivalFlightNo"]');
    this.guestPreferences = page.getByRole('textbox', { name: 'Guest Preferences' });
    this.reservationComments = page.getByRole('textbox', { name: 'Reservation Comments' });
    this.cashierComments = page.getByRole('textbox', { name: 'Cashier Comments' });
    this.billingInstructions = page.getByRole('textbox', { name: 'Billing Instructions' });

    // Final Book
    this.finalBookBtn = page.locator("//button[@type='submit'][normalize-space()='Book']");
  }

  // 🔹 Step 1: Open Booking
  async openBooking() {
    await this.page.waitForLoadState('load');
    await this.reservationsLink.waitFor({ state: 'visible' });
    await this.reservationsLink.click();
    await this.bookBtn.waitFor({ state: 'visible' });
    await this.bookBtn.click();
  }

  // 🔹 Step 2: Stay Details
  async enterStayDetails(checkIn, cTime, checkOut, oTime) {
    await this.checkInInput.fill(checkIn);
    await this.checkInTime.selectOption(cTime);
    await this.checkOutInput.fill(checkOut);
    await this.checkOutTime.selectOption(oTime);
    await this.bookingType.check();
  }

  // 🔹 Step 3: Reservation Type & Communication Details
  async selectReservationStatus(status) {
    await this.reservationStatusArrow.click();
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
  }

  // Company Details
  async enterCompanyDetails(name, info) {
    await this.companyName.fill(name);
    await this.companyInfo.fill(info);
  }

  // 🔹 Step 4: Guest Counts
  async selectGuests(adults, children) {
    await this.adultCountInput.clear();
    await this.adultCountInput.fill(adults);
    await this.childCountInput.clear();
    await this.childCountInput.fill(children);
    await this.searchBtn.click();
  }

  // 🔹 Step 4: Room & Package 
  async selectRoomType(type) {
    await this.roomTypeArrow.click();
    await this.page.getByRole('option', { name: type }).click();
  }
  async selectPackage(pkg) {
    await this.packageInput.click();
    await this.page.getByText(pkg, { exact: true }).first().click();
  }

  // 🔹 Step 5: Guest Details
  async enterGuestDetails(phone, email, fname, lname) {
    await this.phoneInput.click();
    await this.phoneInput.fill(phone);
    await this.emailInput.click();
    await this.emailInput.fill(email);
    await this.firstNameInput.click();
    await this.firstNameInput.fill(fname);
    await this.lastNameInput.click();
    await this.lastNameInput.fill(lname);
    await this.selfBookingCheckbox.check();
  }

  // 🔹 Step 6: Location
  async enterLocation(query, resultText) {
    await this.locationSearchInput.click();
    await this.locationSearchInput.fill(query);
    await this.locationResultItem(resultText).click();
  }

  // 🔹 Step 7: Additional Details
  async enterAdditionalDetails(details) {
    await this.iataNo.fill(details.iata);
    await this.gstNo.fill(details.gst);
    await this.departingFlightNo.fill(details.depFlight);
    await this.arrivalFlightNo.fill(details.arrFlight);
    await this.guestPreferences.fill(details.preferences);
    await this.reservationComments.fill(details.resComments);
    await this.cashierComments.fill(details.cashComments);
    await this.billingInstructions.fill(details.billingInst);
  }

  // 🔹 Step 8: Final Booking
  async completeBooking() {
    await this.finalBookBtn.click();
  }
}
module.exports = CompanyBookingPage;