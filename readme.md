## :bookmark_tabs:  Playwright Automated Tests For To-Do List App

A test suite that tests some of the main app functionalities, such as: \
☑️ Adding a new task \
☑️ Deleting a task \
☑️ Editing a task \
☑️ Clearing all tasks 

The test results will be displayed in a report. An example report in HTML format is as follows:
![image](https://github.com/user-attachments/assets/8eeb2dcb-3675-4460-bfa8-dd4df04d0657)



## :rocket: Steps to run the automated tests:
1. Clone the repo to your local device
2. In the terminal, install dependencies through `npm install` 
3. To run the tests, `npx playwright test` 
4. Once the tests are done running, the test results report will automatically open in a browser. The test results are found under the "playwright-report" folder.


## :rocket: Steps to run the CI/CD pipeline:
1. From the Github repo provided, click on "Actions" from the top bar
2. Click on "Playwright Tests" from the left side bar
3. Click on "Run Workflow"
4. Select your branch of choice (currently only "main" is available)
5. Click on the "Run Workflow" button to run the pipeline
6. Once the pipeline is done running, you can see the status of the pipeline (successful/failed) and a breakdown of every step in the pipeline along with the tests that passed/failed
