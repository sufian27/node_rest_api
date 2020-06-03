# node_rest_api 

## URL: https://sufian-api.herokuapp.com

## This is an API based on Node.js and the Express framework and uses the Sequelize library alongside a PostgreSQL database. 

### It has the following endpoints:
* GET /API/users
* GET /API/tasks
* GET /API/projects
* POST /API/users
* POST /API/tasks
* POST /API/projects

### The database looks as follows: 
![database](https://user-images.githubusercontent.com/45672447/83695761-b5c74880-a5c8-11ea-9c91-05ea0075a8e8.PNG)

# <span style="color: green;">GET</span> /API/projects

## This endpoint can be used to get and filter all the projects stored in the database.

### It accepts the following query parameters: 
* **name**: Name of the project
* **body**: Body of the project
* **score**: Score of all tasks of the project
* **score_gt**: Score of all tasks related to this project is greater than this number
* **score_lt**: Score of all tasks related to this project is lesser than this number 
* **assignee_name**: Name of the assignee of the project
* **assignee_user_id**: User ID of the assignee of the project
* **assignee_surname**: Surname of the assignee of the project
* **assigner_name**: Name of the assigner of the project
* **assigner_user_id**: User ID of the assigner of the project
* **assigner_surname**: Surname of the assigner of the project
* **status**: Status of the project - active, inactive, declined, completed
* **page**: The page number for pagination
* **limit**: The number of records per page

# <span style="color: green;">GET</span> /API/users

## This endpoint can be used to get and filter all the users stored in the database.

### It accepts the following query parameters: 
* **email**: The email address of the user
* **name**: The name of the user
* **surname**: The surname of the user
* **page**: The page number for pagination
* **limit**: The number of records per page

# <span style="color: green;">GET</span> /API/tasks

## This endpoint can be used to get and filter all the tasks stored in the database.

### It accepts the following query parameters: 
* **name**: Name of the task
* **description**: Description of the task
* **score**: Score of the task
* **score_gt**: Score of all tasks greater than this number
* **score_lt**: Score of all tasks lesser than this number 
* **assignee_name**: Name of the assignee of the task
* **assignee_user_id**: User ID of the assignee of the task
* **assignee_surname**: Surname of the assignee of the task
* **assigner_name**: Name of the assigner of the task
* **assigner_user_id**: User ID of the assigner of the task
* **assigner_surname**: Surname of the assigner of the task
* **status**: Status of the task from - active, inactive, declined, completed
* **page**: The page number for pagination
* **limit**: The number of records per page

# <span style="color: yellow;">POST</span> /API/projects

## This endpoint can be used to add a project to the database.

### It accepts a JSON object with the following keys:
* **name**: Name of the project
* **body**: Body of the project
* **status**: Status of the project - active, inactive, declined, completed
* **user_id**: User ID of assigner

# <span style="color: yellow;">POST</span> /API/users

## This endpoint can be used to add a user to the database.

### It accepts a JSON object with the following keys:
* **name**: Name of the user
* **email**: Email of the user
* **surname**: Surname of the user

# <span style="color: yellow;">POST</span> /API/tasks

## This endpoint can be used to add a task to the database.

### It accepts a JSON object with the following keys:
* **name**: Name of the task
* **description**: description of the task
* **status**: Status of the task - active, inactive, declined, completed
* **score**: Score of the task
* **user_id**: User ID of assigner
* **assignee_id**: User ID of assignee_id
* **project_id**: ID of project this task is associated with
