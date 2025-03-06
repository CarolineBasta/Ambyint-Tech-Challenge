## 1. Overview
This test plan outlines the strategy for testing and verifying the main functionalities of the To-Do List App. The purpose is to ensure that the application behaves as expected.

## 2. Scope
The testing will focus on the following features:
- Adding a New To-Do Item
- Editing an Existing To-Do Item
- Marking a To-Do Item as Completed
- Deleting a To-Do Item

## 3. Assumptions and Prerequisites
- The application is accessible through http://127.0.0.1:3000 if running the automated tests or through Index.html if accessing it manually.
- The user starts on a clean state (i.e. no existing tasks in localStorage)

## 4. Test Environment
- Browser: Google Chrome
- Operating System: Windows 10 Pro
- Devices: Desktop environments
- Automation Framework: Playwright


## 5. Test Scenarios & Test Cases

### 5.1. Adding a New To-Do Item
- **Test Case 1:** 
  - **Steps:** 
               1. Open the To-Do List App
               2. Locate the text input field.
               3. In the input field, type in a name for the new task, for example, type in "Work"
               4. Press Enter on your keyboard
  - **Expected Result:** 
               1. The new task appears in the "All" task list.
               2. The “You don't have any task here” message disappears.
               3. The new task is saved in localStorage and can be found under the “Pending” tab.

### 5.2. Editing a To-Do Item
- **Test Case 1:** 
  - **Preconditions**: At least one task already exists in the to-do list.
  - **Steps:** 
               1. Identify the task to be edited, for example: "Work"  
               2. Click on the 3-dots menu next to that task on the right
               3. Click on the Edit button
               4. In the textbox, type the new task name, for example, "Workout"
               5. Press Enter on your keyboard
  - **Expected Result:** 
               1. The UI reflects the new task name.
               2. No new task is created with the new name, only the existing one is updated.
               3. The new task is still saved in localStorage and can still be found under the “Pending” tab.
  

### 5.3. Marking a To-Do Item as Complete
- **Test Case 1:** 
  - **Preconditions**: At least one task already exists in the to-do list.
  - **Steps:** 
               1. Identify the task to be marked as complete  
               2. Click on the checkbox next to that task

  - **Expected Result:** 
               1. The task is crossed out
               3. The task upears under the "Completed" tab, and disappears from the "Pending" tab
  
### 5.4. Deleting a To-Do Item 
- **Test Case 1:** 
  - **Preconditions**: At least one task already exists in the to-do list.
  - **Steps:** 
               1. Identify the task to be marked deleted
               2. Click on the 3-dots menu next to that task on the right
               3. Click on the Delete button

  - **Expected Result:** 
               1. The task is deleted and the UI reflects that the task no longer exists.

- **Test Case 2:** 
  - **Preconditions**: At least one task already exists in the to-do list.
  - **Steps:** 
               1. Click on the "Clear All" button

  - **Expected Result:** 
               1. All task(s) are deleted, and the UI reflects that no task(s) exists.
               2. The "You don't have any task here" message appears again.


## 6. Acceptance Criteria
- All test scenarios pass without errors
- Each feature behaves as expected in both the UI and localStorage. 