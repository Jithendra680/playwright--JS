const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/EhotlLoginPage');
const TpaBookingPage = require('../pages/TpaBookingPage');
const tpaBookingData = require('../testData/TpaBookingData.json');

for (const data of tpaBookingData) {
    test(`Complete TPA Booking Flow - ${data.testCaseName}`, async ({ page }) => {

        const loginPage = new LoginPage(page);
        const tpaBookingPage = new TpaBookingPage(page);

        await loginPage.login(data.login.username, data.login.password);

        await tpaBookingPage.openBooking();
        await tpaBookingPage.enterStayDetails(data.stayDetails.checkIn, data.stayDetails.checkInTime, data.stayDetails.checkOut, data.stayDetails.checkOutTime);
        await tpaBookingPage.selectReservationStatus(data.reservation.status);
        await tpaBookingPage.selectSourceCode(data.reservation.sourceCode);
        await tpaBookingPage.selectSalesPerson(data.reservation.salesPerson);
        await tpaBookingPage.selectMarketSegment(data.reservation.marketSegment);
        await tpaBookingPage.enterTpaDetails(data.tpaDetails.profile, data.tpaDetails.voucher, data.tpaDetails.ota);
        await tpaBookingPage.selectGuests(data.guests.adults, data.guests.children);
        await tpaBookingPage.selectRoomType(data.roomDetails.type);
        await tpaBookingPage.selectPackage(data.roomDetails.package);
        await tpaBookingPage.enterGuestDetails(data.guestDetails.phone, data.guestDetails.email, data.guestDetails.firstName, data.guestDetails.lastName);
        await tpaBookingPage.enterLocation(data.guestDetails.location, data.guestDetails.specificLocation);
        await tpaBookingPage.enterAdditionalDetails(data.additionalDetails);
        await tpaBookingPage.completeBooking();

        // Assertion for completion (optional)
        // await expect(page).toHaveURL(/.*booking/);
    });
}
