# Course Management System

Course Management System built using Nest.js for the backend, React.js for the frontend, and MongoDB as the database. The system allows users to create and search for courses.

## Features

- **User Authentication**: Secure login and register with JWT-based authentication.
- **Course Management**: Create and search courses.
- **Pagination**: Efficiently loads courses with pagination to enhance performance.

## Build
### Prerequisites:
- docker
- docker-compose
- make

### Steps:
1. Clone the Repository
```bash
git clone git@github.com:Cr4CK3DD/Course-Management-System.git
cd Course-Management-System
```
2. Create .env file and add the following environment variables
```c
DATABASE_URL=mongodb://root:rootpassword@mongo:27017

JWT_SECRET=secret_key
JWT_EXPIRATION=1h

MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=rootpassword
```

3. Run
```sh
# build & run
make

# restart
make restart
```


## Testing
For testing i wrote a python script that will iterate through all the courses in `courses_data.json` and send requests to course management system course endpoint to create new courses
### Steps:
1. Ensure you have the necessary Python packages installed:
```bash
pip install requests tqdm
```
2. Get your jwt token by login in
```bash
curl -X POST http://localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d '{
  "username": "admin",
  "password": "5up3r_53cr3t"
}'
```
3. Add your jwt token to the variable with the name `user_token`
```python
user_token = "jwt_token_here"
```
4. Run
```
python test/test_script.py
```

# Details
## Authentication Endpoints
### Register
- Endpoint: `POST /auth/register`
- Description: Registers a new user to the system.
- Request Body:
```json
{
  "username": "admin",
  "password": "5up3r_53cr3t"
}
```

### Login
- Endpoint: `POST /auth/login`
- Description: Logs in with an existing usernaem and password. and provides a JWT token.
- Request Body:

```json
{
  "username": "admin",
  "password": "5up3r_53cr3t"
}
```
Response:

```json
{
  "access_token": "jwt_token_here"
}
```

## Course Endpoints
### Create Course (Requires JWT token)
- Endpoint: `POST /course/create`
- Description: Creates a new course
- Request Body:
```json
{
  "title": "Open-architected bandwidth-monitored contingency",
  "description": "Theory president share Republican soon figure. She skill his as bit raise. Bring notice every big onto institution behind listen. Character will way old.",
  "instructor": "Beth Williamson",
  "schedule": "Tuesday 10:00"
}
```
### Get Courses (Requires JWT token)
- Endpoint: `GET /course?page=(number)`
- Description: Get course using pagination
- Reqeust:
```bash
curl http://localhost:3000/courses?page=<index>
```
- Response:
```json
{
  "statusCode": 200,
  "data": [
      {
        "title": "Example",
        "description": "Example",
        "instructor": "Example",
        "schedule": "Tuesday 10:00",
      },
      ...
    ],
  "totalPages": 1,
  "currentPage": 1,
  "totalCourses": 16,
  "statusCode": 200
}
```

### Get Course By Title (Requires JWT token)
- Endpoint: `POST /course/getByTitle`
- Description: Get course with specific title
- Request:
```json
{
        "title": "Example"
}
```
- Response:
```json
{
    "statusCode": 200,
    "data": {
        "title": "Example",
        "description": "Example",
        "instructor": "Example",
        "schedule": "Monday 15:00"
    }
}
```

### Get Course By Instructor (Requires JWT token)
- Endpoint: `POST /course/getByInstructor`
- Description: Get course with specific instructor name
- Request:
```json
{
    "instructor": "Example"
}

```
- Response:
```json
{
    "statusCode": 200,
    "data": {
        "title": "Example",
        "description": "Example",
        "instructor": "Example",
        "schedule": "Monday 15:00"
    }
}
```
