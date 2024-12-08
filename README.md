API Documentation

#Users

--GET /users
Query Parameters:
name (optional): Filter by user name (case-insensitive).
email (optional): Filter by user email (case-insensitive).

--POST /users
Request Body:
{
"name": "string", //required
"email": "string" //required
}

--PUT /users/:id
{
"name": "string",
"email": "string"
}

#Tasks

--GET /tasks
Query Parameters:
title (optional): Filter tasks by title (case-insensitive).
tag (optional): Filter tasks by tag (case-insensitive).
status (optional): Filter tasks by status.
due_date (optional): Filter tasks by exact due date (YYYY-MM-DD).
user_id (optional): Filter tasks assigned to a specific user.
project_id (optional): Filter by project id (case-insensitive).

--POST /tasks
Request Body:
{
"title": "string", //required
"description": "string", //required
"status": "string", //required
"tag": "string",
"order": "integer",
"due_date": "YYYY-MM-DD",
"user_ids": ["string", "string"]
}

--PUT /tasks/:id
Request Body:
{
"title": "string",
"description": "string",
"status": "string",
"tag": "string",
"order": "integer",
"due_date": "YYYY-MM-DD",
"user_ids": ["string", "string"]
}
Notes: user_ids will be updated according to the last array data
