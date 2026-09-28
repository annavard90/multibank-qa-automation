import type { Locator, Page } from "@playwright/test";

export class HeaderPage {
    constructor(readonly page: Page) { }

    getHeader(): Locator {
        return this.page.locator('header')
    }

    getBannerTitle(): Locator {
        return this.page.getByRole('heading', { name: 'Crypto for everyone' });
    }


    getNavigation(): Locator {
        return this.page.locator("header nav");
    }

    getNavigationLinks(): Locator {
        return this.getNavigation().locator("a:visible");
    }

    getNavigationItem(name: string): Locator {
        return this.getNavigation().getByRole("link", { name, exact: true });
    }

    async homePage(): Promise<void> {
        await this.page.getByRole("banner")
            .getByRole("link", { name: "Home" })
            .click();
    }

    async explorePage(): Promise<void> {
        await this.getNavigationItem("Explore").click();
    }

    async featuresPage(): Promise<void> {
        await this.getNavigationItem("Features").click();
    }

    async otcDeskPage(): Promise<void> {
        await this.getNavigationItem("OTC Desk").click();
    }

    async companyPage(): Promise<void> {
        await this.getNavigationItem("Company").click();
    }

    async supportPage(): Promise<void> {
        await this.getNavigationItem("Support").click();
    }

    async blogPage(): Promise<void> {
        await this.getNavigationItem("Blog").click();
    }

    async mbgPage(): Promise<void> {
        await this.getNavigationItem("$MBG").click();
    }
}