import { test, expect } from '@playwright/test';
import { HeaderPage } from '../page-objects/header-page';

test.describe('Navigation and Layout', () => {
    test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.goto('https://mb.io/en');

    });

    test('Top navigation renders with all expected items visible', async ({ page }) => {
        const header = new HeaderPage(page)
        const navigationBar = header.getNavigation()
        await expect(navigationBar).toBeVisible();

        const links = header.getNavigationLinks()
        await expect(links).not.toHaveCount(0);

        const navigationItemsActual = await links.allTextContents();

        console.log(navigationItemsActual)

        const navigationItemsExpected: string[] = ['Explore', 'Features', 'OTC Desk', 'Company', 'Support', 'Blog', '$MBG'];
        expect(navigationItemsActual).toEqual(navigationItemsExpected);

        for (const link of await links.all()) {
            await expect(link).toBeVisible();

        }

    });

    test("Each navigation item links to the correct destination", async ({ page }) => {

        const expectedLinks = [
            { name: "Explore", href: "/en/explore" },
            { name: "Features", href: "/en/features" },
            { name: "OTC Desk", href: "/en/features/otc-desk" },
            { name: "Company", href: "/en/company" },
            { name: "Support", href: "/en/support" },
            { name: "Blog", href: "/en/blog" },
            { name: "$MBG", href: "https://token.multibankgroup.com/en" },
        ];

        const header = new HeaderPage(page)


        for (const { name, href } of expectedLinks) {
            const link = header.getNavigationItem(name);

            await expect(link).toBeVisible();
            await expect(link).toHaveAttribute(
                "href",
                href,
            );
        }
    });



    test("Navigation behaves correctly at standard desktop viewport sizes", async ({ page }) => {

        const desktopViewports = [
            { width: 1280, height: 800 },
            { width: 1440, height: 900 },
            { width: 1920, height: 1080 },
        ];

        for (const viewport of desktopViewports) {
            await page.setViewportSize(viewport);

            const header = new HeaderPage(page)
            const navigationBar = header.getNavigation()
            await expect(navigationBar).toBeVisible();

            const links = header.getNavigationLinks()
            await expect(links).not.toHaveCount(0);

            const navFitsViewport = await navigationBar.evaluate((element) => {
                const rect = element.getBoundingClientRect();
                return rect.left >= 0 && rect.right <= window.innerWidth;
            });

            expect(navFitsViewport).toBe(true);

            for (const link of await links.all()) {
                await expect(link).toBeVisible();
            }
        }
    });
});