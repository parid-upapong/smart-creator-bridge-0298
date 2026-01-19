import { test, expect } from '@playwright/test';

test.describe('Overlord Creative Studio - User Journey', () => {
  
  test('should allow a user to upload and trigger a multi-platform adaptation', async ({ page }) => {
    // 1. Navigate to Dashboard
    await page.goto('/dashboard');
    await expect(page.getByText('The Command Center')).toBeVisible();

    // 2. Open Adaptation Studio
    await page.click('text=Create New Adaptation');
    await expect(page).toHaveURL(/.*studio/);

    // 3. Mock File Upload
    // Note: In real E2E, we use setInputFiles on a hidden input
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.locator('button:has-text("Upload")').click(),
    ]);
    await fileChooser.setFiles('tests/assets/test_footage.mp4');

    // 4. Select Platforms
    await page.getByLabel('TikTok (9:16)').check();
    await page.getByLabel('Instagram Reels').check();
    await page.getByLabel('LinkedIn Article').check();

    // 5. Start Process
    await page.click('button:has-text("Generate Assets")');

    // 6. Verify Progress UI
    await expect(page.locator('.status-badge')).toContainText('Orchestrating');
    
    // 7. Verify Multi-device Preview
    await page.click('button:has-text("Live Preview")');
    const mobilePreview = page.locator('[data-testid="preview-mobile"]');
    await expect(mobilePreview).toBeVisible();
  });

  test('should display brand kit consistency in the preview', async ({ page }) => {
    await page.goto('/studio');
    // Change Brand Kit
    await page.selectOption('select[name="brand-kit"]', 'Hyper-Modern-Dark');
    
    // Check if the preview container background color changes according to theme
    const previewContainer = page.locator('.preview-container');
    await expect(previewContainer).toHaveCSS('background-color', 'rgb(10, 10, 10)');
  });
});