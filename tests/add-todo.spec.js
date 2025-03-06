import { test, expect } from '@playwright/test';

test('Add a new to-do item test', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000');

  await page.evaluate(() => localStorage.clear());
  await page.reload();

  const noTasksMessage = page.locator('text=You don\'t have any task here');
  await expect(noTasksMessage).toBeVisible();

  await page.fill('.task-input input', 'Buy groceries');
  await page.keyboard.press('Enter');

  const todoItem = page.locator('.task-box .task', { hasText: 'Buy groceries' });
  await expect(todoItem).toBeVisible();
  await expect(noTasksMessage).toHaveCount(0);

  // assert to ensure that the input field is cleared after adding a task
  const inputField = page.locator('.task-input input');
  await expect(inputField).toHaveValue('');

  // check if the task is saved in the localstorage (and under the pending tab) so that the task isn't gone when refreshing the page.
  const tasksInStorage = await page.evaluate(() => JSON.parse(localStorage.getItem('todo-list')));
  expect(tasksInStorage).not.toBeNull();
  expect(tasksInStorage.length).toBe(1);
  expect(tasksInStorage[0].name).toBe('Buy groceries');
  expect(tasksInStorage[0].status).toBe('pending');
});
