const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/EhotlLoginPage');
const RoomCreationPage = require('../pages/RoomCreationPage');
const roomCreationData = require('../testData/RoomCreationData.json');

test('Successfully Create Sequential Rooms in Single Session', async ({ page }) => {
  // Set high timeout for creating multiple rooms in one go (5 minutes)
  test.setTimeout(300000);

  const loginPage = new LoginPage(page);
  const roomPage = new RoomCreationPage(page);

  // 1. Initial Access & Login (Only Once)
  const firstScenario = roomCreationData[0];
  await loginPage.login(firstScenario.login.username, firstScenario.login.password);

  // 2. Initial Navigation to Property Admin -> Rooms
  await roomPage.navigateToRooms();

  // 3. Loop through all room data in the same session
  for (const data of roomCreationData) {
    await roomPage.openCreateForm();

    await roomPage.fillBasicInfo(
      data.basicInfo.code,
      data.basicInfo.roomName,
      data.basicInfo.category,
      data.basicInfo.subCategory
    );

    await roomPage.fillMappingAndDescription(
      data.mapping.posId,
      data.mapping.roomType,
      data.mapping.description
    );

    await roomPage.submitRoom();

    console.log(`✅ Room (${data.basicInfo.code} - ${data.basicInfo.roomName}) Created Successfully`);
  }

  console.log('🎉 All rooms created successfully in a single session.');
});
