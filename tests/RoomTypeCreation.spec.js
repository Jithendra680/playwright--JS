const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/EhotlLoginPage');
const RoomTypeCreationPage = require('../pages/RoomTypeCreationPage');

test('Successfully Create New Room Type (Deluxe King)', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const roomPage = new RoomTypeCreationPage(page);

  await loginPage.login('Pravin@greenwood.com', 'Greenwood@123');
  await roomPage.navigateToRoomType();
  await roomPage.openCreateForm();
  await roomPage.fillBasicInfo('King Room', 'KR_01', 3000);
  await roomPage.selectFacilities(['Breakfast', 'Free Wi-Fi', 'Non-Smoking Rooms']);
  await roomPage.fillSpecifications('King Relax Bed', 89, 250);
  await roomPage.fillMetadata('6x691', 'Automation RoomType Setup for King Room Category');
  await roomPage.submitRoomType();

  console.log('✅ Room Type (King Room) Created Successfully');
});
