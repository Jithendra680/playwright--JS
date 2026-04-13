const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/EhotlLoginPage');
const TpaCreationPage = require('../../pages/TpaCreationPage');

test('Successfully Create New TPA Account (Redbull)', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const tpaPage = new TpaCreationPage(page);

  // 1. Login
  await loginPage.login('Pravin@greenwood.com', 'Greenwood@123');

  // 2. Open Form
  await tpaPage.openTpaForm();

  // 3. Basic Details
  await tpaPage.fillAgencyDetails(
    'RedBull',
    'Corporate',
    '785RB',
    '01/04/2026',
    '01/05/2026',
    'Email',
    '5645767'
  );

  // 4. Contact & Address
  await tpaPage.fillPrimaryContact('Jithendra', 'A', '91', '8639072763', 'jithendra.a@itprofound.com');
  await tpaPage.fillAddress('Tirupati', 'Mallamgunta', 'AndhraPradesh', 'Tirupati');
  await tpaPage.fillAccountManager('Jithendra', 'jithendra.a@itprofound.com', '91', '8639072763');

  // 5. Financial Information
  await tpaPage.fillFinancials('75468568865', '5865888545', '5475745757', '4574574777');

  // 6. Negotiated Rates / Commission
  await tpaPage.setCommissions('Discount', 'Percentage', 10);

  // 7. Final Submit
  await tpaPage.submitTpa();

  console.log('✅ TPA Created Successfully');
});
