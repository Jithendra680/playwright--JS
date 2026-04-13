const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/EhotlLoginPage');
const AllocateRoomPage = require('../pages/AllocateRoomPage');

test('Successfully Allocate Room 107', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const allocateRoomPage = new AllocateRoomPage(page);

  await loginPage.login('Pravin@greenwood.com', 'Greenwood@123');

  await allocateRoomPage.openAllocationPortal();
  await allocateRoomPage.openAllocateRoomMenu();
  await allocateRoomPage.selectRoom();
  await allocateRoomPage.clickSaveAndClose();
});
