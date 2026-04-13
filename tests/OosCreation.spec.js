const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/EhotlLoginPage');
const OosCreationPage = require('../pages/OosCreationPage');

test('Successfully Create OOS with Date and Inventory Block', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const oosPage = new OosCreationPage(page);


  await loginPage.login('Pravin@greenwood.com', 'Greenwood@123');
  await oosPage.navigateToOooOos();
  await oosPage.openAddForm();
  await oosPage.fillOosFullDetails('103', '06/04/2026', '19:00', '06/04/2026', '20:00', 'Maintenance', true);
  await oosPage.submitForm();

  console.log('Success: OOS with Block Inventory Created');
})