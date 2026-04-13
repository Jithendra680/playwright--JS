const BasePage = require('./BasePage');

class BookingPage extends BasePage {
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
    //this.individualRadio = page.getByRole('radio', { name: 'Individual' });

    //Reservation Type & Communication Details
    this.reservationStatusArrow = page.locator('.col-md-6 > .ng-select-searchable > .ng-select-container > .ng-arrow-wrapper').first();
    this.sourceCodeArrow = page.locator('div:nth-child(7) > .ng-select-searchable > .ng-select-container > .ng-arrow-wrapper');
    this.salesPersonArrow = page.locator('div:nth-child(8) > .ng-select-searchable > .ng-select-container > .ng-arrow-wrapper').first();
    this.marketSegmentArrow = page.locator('div:nth-child(9) > .ng-select-searchable > .ng-select-container > .ng-arrow-wrapper');

    // Guest Counts
    this.adultCountInput = page.locator('#adult');
    this.childCountInput = page.locator('#children');

    // Search Button 
    this.searchBtn = page.getByRole('button', { name: 'Search' });

    // Room & Package
    this.roomTypeArrow = page.locator('#select-room-type > .ng-select-container > .ng-arrow-wrapper');
    this.packageArrow = page.locator('#select-package > .ng-select-container > .ng-arrow-wrapper');

    // Guest Details
    this.phone = page.getByRole('textbox', { name: 'Phone* Phone*' });
    this.email = page.getByRole('textbox', { name: 'Email * Email *' });
    this.firstName = page.getByRole('textbox', { name: 'First Name * First Name *' });
    this.lastName = page.getByRole('textbox', { name: 'Last Name * Last Name *' });
    this.selfCheck = page.getByRole('checkbox', { name: 'Are you booking for yourself?' });

    // Location
    this.location = page.getByRole('textbox', { name: 'Enter location' });
    this.locationOption = page.getByText('Bangalore Palace');

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
  async enterStayDetails(checkIn, checkInTime, checkOut, checkOutTime) {
    await this.checkInInput.fill(checkIn);
    await this.checkInTime.selectOption(checkInTime);
    await this.checkOutInput.fill(checkOut);
    await this.checkOutTime.selectOption(checkOutTime);
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
    await this.packageArrow.click();
    await this.page.getByLabel('Options List').getByText(pkg).click();
  }

  // 🔹 Step 5: Guest Details
  async enterGuestDetails(phone, email, firstName, lastName) {
    await this.phone.click();
    await this.phone.fill(phone);
    await this.email.click();
    await this.email.fill(email);
    await this.firstName.click();
    await this.firstName.fill(firstName);
    await this.lastName.click();
    await this.lastName.fill(lastName);
    await this.selfCheck.check();
  }

  // 🔹 Step 6: Location
  async enterLocation(location) {
    await this.location.fill(location);
    await this.locationOption.click();
  }

  // 🔹 Step 7: Additional Details
  async enterAdditionalDetails({ iata, gst, depFlight, arrFlight, preferences, resComments, cashComments, billingInst }) {
    await this.iataNo.fill(iata);
    await this.gstNo.fill(gst);
    await this.departingFlightNo.fill(depFlight);
    await this.arrivalFlightNo.fill(arrFlight);
    await this.guestPreferences.fill(preferences);
    await this.reservationComments.fill(resComments);
    await this.cashierComments.fill(cashComments);
    await this.billingInstructions.fill(billingInst);
  }

  // 🔹 Step 8: Final Booking
  async completeBooking() {
    await this.finalBookBtn.click();
  }
}

module.exports = BookingPage;
