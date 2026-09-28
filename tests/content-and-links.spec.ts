import { test, expect } from '@playwright/test';
import { HeaderPage } from '../page-objects/header-page';

test.describe('Content and Links', () => {
    test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.goto('https://mb.io/en');
    });


    test("Homepage marketing banner renders in the expected page region", async ({ page }) => {

        const headerPage = new HeaderPage(page);
        const header = headerPage.getHeader() 
        const headerBox = await header.boundingBox()


        const bannerTitle = headerPage.getBannerTitle()
        await expect(bannerTitle).toBeVisible();
        await expect(bannerTitle).toBeTruthy();
        await expect(bannerTitle).toHaveText('Crypto for everyone');


        const bannerContainer = bannerTitle.locator('..')
        await expect(bannerContainer).toBeVisible();
        await expect(bannerContainer).toBeTruthy();

        const bannerBox = await bannerContainer.boundingBox();

        expect(bannerBox).not.toBeNull();
        expect(headerBox).not.toBeNull();

        expect(bannerBox!.y).toEqual(headerBox!.y + headerBox!.height);

        const titleBox = await bannerTitle.boundingBox();
        const viewport = page.viewportSize();

        expect(titleBox).not.toBeNull();
        expect(viewport).not.toBeNull();

        const titleCenterX = titleBox!.x + titleBox!.width / 2;
        const viewportCenterX = viewport!.width / 2;

        expect(Math.abs(titleCenterX - viewportCenterX)).toBeGreaterThanOrEqual(0);
        expect(Math.abs(titleCenterX - viewportCenterX)).toBeLessThanOrEqual(5);

        const downloadLink = page.getByRole("link", {
            name: "Download the app",
            exact: true,
        });

    });

    test("App Store and Google Play download links resolve correctly", async ({ page, }) => {


        const downloadLink = page.getByRole("link", {
            name: "Download the app",
            exact: true,
        });

        await expect(downloadLink).toBeVisible();
        await expect(downloadLink).toHaveAttribute(
            "href",
            "https://mbio.go.link/6OW91",
        );

    });




    test("Why MultiBank page renders expected sections", async ({ page }) => {

        const headerPage = new HeaderPage(page);
        headerPage.companyPage()

        await expect(page).toHaveURL('https://mb.io/en/company');

        const header = page.getByRole('heading', { name: 'Why MultiBank Group?' })
        await expect(header).toBeVisible
        await expect(header).toHaveText('Why MultiBank Group?')

        const headerText = page.getByRole('heading', { name: 'For nearly two decades,' })
        await expect(headerText).toBeVisible
        const text = 'For nearly two decades, MultiBank has built a reputation as one of the world’s most trusted financial institutions. With a foundation rooted in regulation, transparency, and technological excellence, we continue to serve millions of clients across the globe with integrity and ambition.'
        await expect(headerText).toHaveText(text)



    });
})