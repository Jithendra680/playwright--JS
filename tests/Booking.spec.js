const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/EhotlLoginPage');
const BookingPage = require('../pages/BookingPage');
const bookingData = require('../testData/BookingData.json');

for (const data of bookingData) {
  test(`Complete Booking Flow - ${data.testCaseName}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const bookingPage = new BookingPage(page);


    await loginPage.login(data.login.username, data.login.password);
    await bookingPage.openBooking();
    await bookingPage.enterStayDetails(data.stayDetails.checkInDate, data.stayDetails.checkInTime, data.stayDetails.checkOutDate, data.stayDetails.checkOutTime);
    await bookingPage.selectReservationStatus(data.reservation.status);
    await bookingPage.selectSourceCode(data.reservation.sourceCode);
    await bookingPage.selectSalesPerson(data.reservation.salesPerson);
    await bookingPage.selectMarketSegment(data.reservation.marketSegment);
    await bookingPage.selectGuests(data.reservation.adults, data.reservation.children);
    await bookingPage.selectRoomType(data.reservation.roomType);
    await bookingPage.selectPackage(data.reservation.package);
    await bookingPage.enterGuestDetails(data.guestDetails.phoneNumber, data.guestDetails.email, data.guestDetails.firstName, data.guestDetails.lastName);
    await bookingPage.enterLocation(data.guestDetails.location);
    await bookingPage.enterAdditionalDetails(data.additionalDetails);
    await bookingPage.completeBooking();
  });
}