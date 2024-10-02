import json
import requests
from tqdm import tqdm

with open('courses_data.json', 'r') as file:
    courses = json.load(file)

total_requests = len(courses)
user_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE3Mjc4Mjg5MDgsImV4cCI6MTcyNzgzMjUwOH0.K0vpruQ5fZfs4Cln6zBEO9oSjs5tlOQYrMVfFjAeO2I'
create_course_endpoint = '/course/create'
server = 'http://localhost:3000/'


headers = {
    'Authorization': f'Bearer {user_token}',
    'Content-Type': 'application/json'
}

for course in tqdm(courses, desc="Sending Requests", unit="request"):
    try:
        requests.post(server + create_course_endpoint, json=course, headers=headers)
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")

print("All requests have been sent.")
