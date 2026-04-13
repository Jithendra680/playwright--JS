const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/EhotlLoginPage');
const DiscountCreationPage = require('../pages/DiscountCreationPage');
const discountData = require('../testData/DiscountData.json');

for (const data of discountData) {
    test(`Create Discount - ${data.testCaseName}`, async ({ page }) => {

        const loginPage = new LoginPage(page);
        const discountPage = new DiscountCreationPage(page);

        await loginPage.login(data.login.username, data.login.password);
        await discountPage.navigateToDiscount();
        await discountPage.fillBasicDetails(data.basicInfo.name, data.basicInfo.code, data.basicInfo.description);
        await discountPage.configureDiscount(data.config.type, data.config.value);
        await discountPage.selectRevenueCenters(data.revenueCenters);
        await discountPage.setDatesAndUsage(data.dates.startDate, data.dates.endDate, data.usage.maxPerReservation);
        await discountPage.submit();
    });
}
