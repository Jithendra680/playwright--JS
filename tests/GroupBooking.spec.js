const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/EhotlLoginPage');
const GroupBookingPage = require('../pages/GroupBookingPage');
const groupBookingData = require('../testData/GroupBookingData.json');

for (const data of groupBookingData) {
  test(`Complete Group Booking Flow - ${data.testCaseName}`, async ({ page }) => {

    const loginPage = new LoginPage(page);
    const groupBookingPage = new GroupBookingPage(page);

    await loginPage.login(data.login.username, data.login.password);
    // Group Booking Flow
    await groupBookingPage.openGroupBooking();
    await groupBookingPage.enterStayDetails(data.stayDetails.checkIn, data.stayDetails.checkInTime, data.stayDetails.checkOut, data.stayDetails.checkOutTime);
    await groupBookingPage.selectReservationStatus(data.reservation.status);
    await groupBookingPage.selectSourceCode(data.reservation.sourceCode);
    await groupBookingPage.selectSalesPerson(data.reservation.salesPerson);
    await groupBookingPage.selectMarketSegment(data.reservation.marketSegment);
    await groupBookingPage.selectRoomType(data.roomDetails.type);
    await groupBookingPage.selectPackage(data.roomDetails.package);
    await groupBookingPage.enterRoomCount(data.roomDetails.roomCount);
    await groupBookingPage.enterGuestInformation(data.guestDetails.phone, data.guestDetails.email, data.guestDetails.firstName, data.guestDetails.lastName);
    await groupBookingPage.enterAdditionalGuestInfo(data.additionalGuestInfo);
    await groupBookingPage.handlePayMaster(data.payMaster.option);
    await groupBookingPage.completeBooking();
  });
}
