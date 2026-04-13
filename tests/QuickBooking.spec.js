const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/EhotlLoginPage');
const QuickBookingPage = require('../pages/QuickBookingPage');
const quickBookingData = require('../testData/QuickBookingData.json');

for (const data of quickBookingData) {
  test(`Complete Quick Booking Flow - ${data.testCaseName}`, async ({ page }) => {

    const loginPage = new LoginPage(page);
    const quickBookingPage = new QuickBookingPage(page);

    // Login
    await loginPage.login(data.login.username, data.login.password);

    // Quick Booking Flow
    await quickBookingPage.openQuickBooking();
    await quickBookingPage.enterStayDetails(data.stayDetails.checkIn, data.stayDetails.checkInTime, data.stayDetails.checkOut, data.stayDetails.checkOutTime);
    await quickBookingPage.enterGuestAndRoomDetails(data.roomDetails.roomCount, data.roomDetails.roomType, data.roomDetails.packageName);
    await quickBookingPage.enterGuestInformation(data.guestDetails.phone, data.guestDetails.email, data.guestDetails.firstName, data.guestDetails.lastName);
    await quickBookingPage.clickBook();

    // Optional assertion
    // await expect(page).toHaveURL(/.*dashboard/);
  });
}
