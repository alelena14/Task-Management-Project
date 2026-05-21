# Task Management Platform

Spring Boot backend application for enterprise-style task and project management featuring JWT security, role-based authorization, auditing, Docker deployment and PostgreSQL persistence.

---

## Quick Start

```bash
docker compose -f docker-compose.demo.yml up --build
```

Then open Swagger: [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

Register a user — the **first registered user automatically receives the `ADMIN` role**.

---

## Features

- JWT Authentication & Authorization
- Role-based access control (`ADMIN` / `USER`)
- User profile management & role administration
- Project creation, member management and project statistics
- Task creation, assignment and status tracking
- Filtering, pagination and sorting
- Audit logging
- Global exception handling
- Swagger / OpenAPI documentation
- Flyway database migrations
- Dockerized deployment

---

## Tech Stack

- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA / Hibernate
- PostgreSQL
- Flyway
- Docker & Docker Compose
- Swagger / OpenAPI

---

## Prerequisites

- Docker 24+
- Java 21 (only for local development without Docker)

---

## Project Structure

```text
src/
└── main/java/com/example/
    ├── auth/
    ├── user/
    ├── project/
    ├── task/
    ├── audit/
    ├── security/
    └── exception/
```

---

## Running the Application

### Demo setup (recommended)

Self-contained Docker setup — PostgreSQL is included and pre-configured. No additional configuration needed.

```bash
docker compose -f docker-compose.demo.yml up --build
```

Swagger UI: [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

---

### Local development setup

Uses an external database (e.g. Supabase or any cloud PostgreSQL). Create a `.env` file in the project root:

```env
SPRING_DATASOURCE_URL=jdbc:postgresql://<host>:<port>/<dbname>
SPRING_DATASOURCE_USERNAME=your_username
SPRING_DATASOURCE_PASSWORD=your_password
JWT_SECRET=your-secret-key-min-256-bits
```

Then run:

```bash
docker compose -f docker-compose.local.yml up --build
```

---

## Authentication

### Register

`POST /auth/register`

```json
{
  "firstName": "Admin",
  "lastName": "User",
  "email": "admin@test.com",
  "password": "admin123"
}
```

### Login

`POST /auth/login`

```json
{
  "email": "admin@test.com",
  "password": "admin123"
}
```

Returns a JWT token. Use it in all subsequent requests:

```text
Authorization: Bearer <JWT_TOKEN>
```

---

## Example Endpoints

### Tasks

```text
GET  /tasks
GET  /tasks/my-tasks
GET  /tasks?status=TODO
GET  /tasks?priority=HIGH
GET  /tasks?page=0&size=5&sort=createdAt,desc
```

### Projects

```text
GET  /projects/{id}/stats
```

### Users

```text
GET  /users/me
```

Full API reference available in Swagger UI.

---

## Architecture

The application follows a layered architecture:

```text
Controller Layer
       ↓
Service Interface Layer
       ↓
Service Implementation Layer
       ↓
Repository Layer
       ↓
PostgreSQL Database
```

---

## Validation & Error Handling

The application uses:

- Jakarta Bean Validation (`@Valid`, `@NotBlank`, `@Email`, `@Size`)
- Global exception handling
- Custom business exceptions
- Proper HTTP status codes

---

## Docker Setup

| File | Purpose |
|---|---|
| `Dockerfile` | Base image definition |
| `docker-compose.demo.yml` | Self-contained setup with PostgreSQL — for reviewers/testing |
| `docker-compose.local.yml` | Local development setup using Supabase |

---

## API Documentation

Swagger UI: [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)
