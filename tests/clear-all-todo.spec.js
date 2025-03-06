import { test, expect } from '@playwright/test';

test('Clear all to-do items test', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000');
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  const noTasksMessage = page.locator('text=You don\'t have any task here');
  await expect(noTasksMessage).toBeVisible();

  await page.fill('.task-input input', 'First task');
  await page.keyboard.press('Enter');
  await page.fill('.task-input input', 'Second task');
  await page.keyboard.press('Enter');

  const tasks = page.locator('.task-box .task');
  await expect(tasks).toHaveCount(2);

  let tasksInStorage = await page.evaluate(() => JSON.parse(localStorage.getItem('todo-list')));
  expect(tasksInStorage).not.toBeNull();
  expect(tasksInStorage.length).toBe(2);
  expect(tasksInStorage[0].name).toBe('First task');
  expect(tasksInStorage[1].name).toBe('Second task');

  await page.click('text=Clear All');
  
  await expect(tasks).toHaveCount(0);

  tasksInStorage = await page.evaluate(() => JSON.parse(localStorage.getItem('todo-list')));
  expect(tasksInStorage).toEqual([]); // ensure all tasks are deleted from local storage

  await expect(noTasksMessage).toBeVisible();
});
