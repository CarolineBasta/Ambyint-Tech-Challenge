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
   
  const deletedItem = page.locator('.task-box .task', { hasText: 'Delete this task' });
  await expect(deletedItem).toHaveCount(0);

   // BUG FOUND: When clicking on Delete for a task, if there is more than one task on the list, it doesn't delete the specific task,
   // but rather it deletes another task from the list, and the task remains in the localhost.

   // Similarly, if there is only one task on the list, deleting this task doesn't actually delete it,
   // but rather remove it from the list and the task remains in the localhost

   // Therefore, this test will always fail until the bug is fixed.
   // Created another test using the "Clear All" button that checks that tasks get properly deleted.
 });
