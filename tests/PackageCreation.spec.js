const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/EhotlLoginPage');
const PackageCreationPage = require('../pages/PackageCreationPage');
const packageDataRoot = require('../testData/PackageCreationData.json');

test('Successfully Create Sequential Sales Packages in Single Session', async ({ page }) => {
  // Set high timeout for creating multiple packages
  test.setTimeout(480000);

  const loginPage = new LoginPage(page);
  const packagePage = new PackageCreationPage(page);

  // 1. Initial Access & Login (Read once from the root login object)
  await loginPage.login(packageDataRoot.login.username, packageDataRoot.login.password);

  // 2. Initial Navigation to Sales Package
  await packagePage.openPackageSection();

  // 3. Sequential Package Creation (Loop through scenarios)
  for (const data of packageDataRoot.scenarios) {
    await packagePage.openCreateForm();

    await packagePage.fillBasicInfo(
      data.basicInfo.name,
      data.basicInfo.code,
      data.basicInfo.source,
      data.basicInfo.roomType
    );

    await packagePage.selectTaxes(data.config.taxes);
    await packagePage.selectAmenities(data.config.amenities);
    await packagePage.setValidity(data.config.validFrom, data.config.validTo);

    await packagePage.setOccupancyAndPrice(
      data.config.adults,
      data.config.children,
      data.config.maxOccupancy,
      data.config.price,
      data.config.objectId
    );

    await packagePage.setFacilities(data.details.facilities, data.details.description);

    await packagePage.addNewMeal(
      data.meal.type,
      data.meal.rule,
      data.meal.price,
      data.meal.objectId
    );

    await packagePage.submitForm();

    console.log(`✅ Package (${data.basicInfo.code} - ${data.basicInfo.name}) Created Successfully`);
  }

  console.log('🎉 All packages created successfully in a single session.');
});
