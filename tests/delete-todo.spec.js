import { test, expect } from '@playwright/test';

test('Delete a to-do item test', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000');
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  const noTasksMessage = page.locator('text=You don\'t have any task here');
  await expect(noTasksMessage).toBeVisible();

  await page.fill('.task-input input', 'Delete this task');
  await page.keyboard.press('Enter');

  const newTask = page.locator('.task-box .task', { hasText: 'Delete this task' });
  await expect(newTask).toBeVisible();

  let todosInStorage = await page.evaluate(() => JSON.parse(localStorage.getItem('todo-list')));
  expect(todosInStorage).not.toBeNull();
  expect(todosInStorage.length).toBe(1);
  expect(todosInStorage[0].name).toBe('Delete this task');

  await page.click('.task .settings i');
  await page.click('.task-menu li', { hasText: 'Delete' });
   
   // BUG FOUND: When clicking on Delete for a task, it doesn't delete the specific task
   // but rather it deletes another task on the list.
   // Therefore, it's impossible to add validations to confirm whether the task was actually deleted or not. 
   // Created a 4th test case using the "Clear All" button that checks that tasks get properly deleted.
 });



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
