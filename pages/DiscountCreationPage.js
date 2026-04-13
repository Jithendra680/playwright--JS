const BasePage = require('./BasePage');

class DiscountCreationPage extends BasePage {
    constructor(page) {
        super(page);

        // Navigation
        this.propertyAdminLink = page.locator('a').filter({ hasText: 'Property Admin' });
        this.discountTab = page.getByRole('tab', { name: 'Discount' });
        this.createDiscountBtn = page.getByRole('button', { name: ' Create Discount' });

        // Basic Info
        this.nameInput = page.getByRole('textbox', { name: 'Name *' });
        this.codeInput = page.getByRole('textbox', { name: 'Code *' });
        this.descriptionInput = page.getByRole('textbox', { name: 'Description' });

        // Discount Configuration
        this.typeArrow = page.locator('.ng-arrow-wrapper').first();
        this.valueInput = page.getByRole('spinbutton', { name: 'Value *' });
        this.overallAppliedCheckbox = page.getByRole('checkbox', { name: 'Overall Applied to total' });
        this.selectedNightsCheckbox = page.getByRole('checkbox', { name: 'Selected Nights Applied to' });

        // Revenue Centers
        this.revenueCenterDropdown = page.locator('div').filter({ hasText: /^Select Revenue Centers$/ }).nth(2);

        // Dates & Usage
        this.startDateInput = page.getByRole('textbox', { name: 'Select start date' });
        this.endDateInput = page.getByRole('textbox', { name: 'Select end date' });
        this.maxUsageInput = page.getByRole('spinbutton', { name: 'Max Usages Per Reservation *' });

        // Final Create
        this.finalCreateBtn = page.getByRole('button', { name: 'Create Discount' });
    }

    async navigateToDiscount() {
        await this.propertyAdminLink.waitFor({ state: 'visible', timeout: 15000 });
        await this.propertyAdminLink.click();
        await this.discountTab.waitFor({ state: 'visible', timeout: 10000 });
        await this.discountTab.click();
        await this.createDiscountBtn.click();
    }

    async fillBasicDetails(name, code, description) {
        await this.nameInput.click();
        await this.nameInput.fill(name);
        await this.codeInput.click();
        await this.codeInput.fill(code);
        await this.descriptionInput.click();
        await this.descriptionInput.fill(description);
    }

    async configureDiscount(type, value) {
        await this.typeArrow.click();
        await this.page.getByRole('option', { name: type }).click();
        await this.valueInput.click();
        await this.valueInput.fill(value);
        await this.overallAppliedCheckbox.check();
        await this.selectedNightsCheckbox.check();
    }

    async selectRevenueCenters(centers) {
        await this.revenueCenterDropdown.click();
        for (const center of centers) {
            await this.page.getByRole('option', { name: center }).click();
        }
    }

    async setDatesAndUsage(startDate, endDate, maxUsage) {
        await this.startDateInput.click();
        await this.startDateInput.fill(startDate);
        await this.endDateInput.click();
        await this.endDateInput.fill(endDate);
        await this.maxUsageInput.click();
        await this.maxUsageInput.fill(maxUsage);
    }

    async submit() {
        await this.finalCreateBtn.click();
    }
}

module.exports = DiscountCreationPage;
