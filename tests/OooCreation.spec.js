const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/EhotlLoginPage');
const OooCreationPage = require('../../pages/OooCreationPage');

test('Successfully Put Room Out of Order (OOO)', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const oooPage = new OooCreationPage(page);

  await loginPage.login('Pravin@greenwood.com', 'Greenwood@123');
  await oooPage.navigateToOoo();
  await oooPage.openCreateForm();
  await oooPage.fillOooDetails('OOO', '308', '07/04/2026', '18:00', '08/04/2026', '12:00', 'Room is in Renovation');
  await oooPage.submitOoo();
  console.log('Room 308 set to OOO successfully');
});
