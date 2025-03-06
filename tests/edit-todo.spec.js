import { test, expect } from '@playwright/test';

test('Edit an existing to-do item test', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000');
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  const noTasksMessage = page.locator('text=You don\'t have any task here');
  await expect(noTasksMessage).toBeVisible();

  await page.fill('.task-input input', 'New Task');
  await page.keyboard.press('Enter');

  const inputField = page.locator('.task-input input');
  await expect(inputField).toHaveValue('');

  let tasksInStorage = await page.evaluate(() => JSON.parse(localStorage.getItem('todo-list')));
  expect(tasksInStorage).not.toBeNull();
  expect(tasksInStorage.length).toBe(1);
  expect(tasksInStorage[0].name).toBe('New Task');
  expect(tasksInStorage[0].status).toBe('pending');

  await page.click('.task .settings i');
  await page.click('.task-menu li', { hasText: 'Edit' });

  await page.fill('.task-input input', 'Edited Task');
  await page.keyboard.press('Enter');

  const updatedItem = page.locator('.task-box .task', { hasText: 'Edited Task' });
  await expect(updatedItem).toBeVisible();

  // assert to ensure the input field is cleared after editing the task and pressing enter
  await expect(inputField).toHaveValue('');

  // ensure the localstorage was updated with the new edited task
  tasksInStorage = await page.evaluate(() => JSON.parse(localStorage.getItem('todo-list')));
  expect(tasksInStorage.length).toBe(1);
  expect(tasksInStorage[0].name).toBe('Edited Task');
  expect(tasksInStorage[0].status).toBe('pending');
});
