# Customer Management System

This project is a Customer Management System for a residential cleaning company, developed with the following technologies:

## Technologies Used

### Frontend (React)
- React
- React Router DOM
- Axios
- Tailwind CSS
- Web Vitals

### Backend (Node.js)
- Express
- PostgreSQL (pg and pg-promise)
- CORS
- Dotenv

### Development Tools
- Faker-js
- Chai
- Mocha
- Supertest

## Configuration and Execution

By running the command below, the project will be built, the database will be generated, migrations will be applied, and integration tests will be performed:

```bash
docker-compose up --build
```

# Application Availability

The application will be available at:

- **Frontend**: [http://localhost:80](http://localhost:80)
- **Backend**: [http://localhost:4000](http://localhost:4000)

## Features

- Listing and filtering of customers
- Adding, editing, and deleting customers (name, email, phone)
- Button to calculate optimized route for customer visits

