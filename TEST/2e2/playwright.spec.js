// tests/playwright.spec.js
import { test, expect } from '@playwright/test';

test.describe('ToDo App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000'); // adapte si nécessaire
  });

  test('peut ajouter une nouvelle tâche', async ({ page }) => {
    const uniqueTitle = 'Tâche E2E Playwright ' + Date.now();
    await page.fill('#task-title', uniqueTitle);
    await page.click('form button[type="submit"]');

    const task = page.locator(`li >> text=${uniqueTitle}`);
    await expect(task).toBeVisible();
  });

  test('peut modifier le titre d\'une tâche', async ({ page }) => {
    const originalTitle = 'Tâche à modifier ' + Date.now();
    const newTitle = 'Titre modifié Playwright ' + Date.now();
    // Créer une tâche spécifique pour ce test
    await page.fill('#task-title', originalTitle);
    await page.click('form button[type="submit"]');

    const task = page.locator(`li:has-text("${originalTitle}")`);
    const editButton = task.locator('.edit-btn');

    // Intercepter le prompt et envoyer le nouveau titre
    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('prompt');
      expect(dialog.message()).toContain('Modifier le titre de la tâche');
      await dialog.accept(newTitle);
    });

    await editButton.click();

    // Vérifier que le titre a bien changé dans le DOM
    await expect(page.locator(`li:has-text("${newTitle}")`)).toBeVisible();
  });

  test('peut marquer une tâche comme complétée', async ({ page }) => {
    const uniqueTitle = 'Tâche à compléter ' + Date.now();
    await page.fill('#task-title', uniqueTitle);
    await page.click('form button[type="submit"]');

    const task = page.locator(`li:has-text("${uniqueTitle}")`);
    const toggleButton = task.locator('.toggle-btn');

    await toggleButton.click();
    await expect(task).toHaveClass(/completed/);
  });

  test('peut supprimer une tâche', async ({ page }) => {
    const uniqueTitle = 'Tâche à supprimer ' + Date.now();
    await page.fill('#task-title', uniqueTitle);
    await page.click('form button[type="submit"]');

    const task = page.locator(`li:has-text("${uniqueTitle}")`);
    const deleteButton = task.locator('.delete-btn');

    await deleteButton.click();
    await expect(task).toHaveCount(0);
  });
});
