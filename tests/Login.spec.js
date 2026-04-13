const { test, expect } = require('@playwright/test');
const EhotlLoginPage = require('../../pages/EhotlLoginPage');
const loginDataRows = require('../testData/loginData.json');

for (const row of loginDataRows) {
  test(`Login Test - Case: ${row.testCaseName}`, async ({ page }) => {
    const loginPage = new EhotlLoginPage(page);
    await loginPage.login(row.username, row.password);
  });
}

