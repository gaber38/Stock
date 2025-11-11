Stock Exchange Manager — README
Overview

A lightweight web application to manage stock exchanges and stocks. Backend is Java Spring Boot. Frontend is a Angular with Postgresql for database. The app supports managing stock exchanges, stocks, and their relationships while enforcing business rules.

Database Design 

<img width="780" height="622" alt="image" src="https://github.com/user-attachments/assets/e5fd239e-fad6-4cc0-9d56-e6937f60a328" />


Features

Stock Exchange management

- List with pagination & sorting
- Create 
- Update 
- Delete
- Add stock to exchange 
- Remove stock from exchange

Stock management

- List with pagination & sorting
- Create
- Update
- Delete

Auth:
- Login
- Register
- Change Password
- Refresh Token
- Logout
  
API secured — all endpoints require authorization.
so you have to add headers: { 'Authorization': `Bearer ${token}` }

API Endpoints:
You can see endpoints from attached Postman collection.

How to run (developer-friendly)

Clone repository: git clone <repo-url>

Backend (Spring Boot):
- cd backend
- mvn clean install
- mvn spring-boot:run

app runs at http://localhost:8080

For database:

in applicaton.properties in backend 
spring.datasource.url=jdbc:postgresql://localhost:5432/<db_name>
spring.datasource.username=<your_db_user>
spring.datasource.password=<your_db_password>

Frontend (Angular):
- cd frontend
- npm install
- ng serve

app runs at: http://localhost:4200
