const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/EhotlLoginPage');
const CompanyBookingPage = require('../pages/CompanyBookingPage');
const companyBookingData = require('../testData/CompanyBookingData.json');

for (const data of companyBookingData) {
  test(`Complete Company Booking Flow - ${data.testCaseName}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const companyBookingPage = new CompanyBookingPage(page);

    await loginPage.login(data.login.username, data.login.password);
    await companyBookingPage.openBooking();
    await companyBookingPage.enterStayDetails(
      data.stayDetails.checkIn,
      data.stayDetails.checkInTime,
      data.stayDetails.checkOut,
      data.stayDetails.checkOutTime
    );
    await companyBookingPage.selectReservationStatus(data.reservation.status);
    await companyBookingPage.selectSourceCode(data.reservation.sourceCode);
    await companyBookingPage.selectSalesPerson(data.reservation.salesPerson);
    await companyBookingPage.selectMarketSegment(data.reservation.marketSegment);
    await companyBookingPage.enterCompanyDetails(data.company.name, data.company.info);
    await companyBookingPage.selectGuests(data.guests.adults, data.guests.children);
    await companyBookingPage.selectRoomType(data.roomDetails.type);
    await companyBookingPage.selectPackage(data.roomDetails.package);

    // Updated Guest Details call
    await companyBookingPage.enterGuestDetails(
      data.guestDetails.phone,
      data.guestDetails.email,
      data.guestDetails.firstName,
      data.guestDetails.lastName
    );

    // Updated Location call
    await companyBookingPage.enterLocation(
      data.guestDetails.locationQuery,
      data.guestDetails.specificLocation
    );

    await companyBookingPage.enterAdditionalDetails(data.additionalDetails);
    await companyBookingPage.completeBooking();
  });
}