# Solidithai

Welcome to Tanabut's assignment

A full-stack application consisting of a NestJS backend API and a React frontend web application.

## Technology Stack

### Frontend
- **Framework**: ReactJS with TypeScript
  - Modern JavaScript framework with functional components
  - TypeScript for type safety and better developer experience
  - Component-based architecture for reusability and maintainability

### Backend
- **Framework**: NestJS
  - Familiar and robust Node.js framework
  - Built-in support for TypeScript
  - Modular architecture with dependency injection

### Database & ORM
- **Database**: Supabase
  - PostgreSQL-based database service
  - Easy setup and deployment
  - Built-in authentication service (not implemented in this project)
- **ORM**: Prisma
  - Type-safe database client
  - Schema migrations and management
  - Alternative to TypeORM and Drizzle

## Architecture Decisions

### Frontend Structure
The frontend follows a domain-driven design approach:
- **Pages**: Each page represents a domain (e.g., UserPage)
- **Components**: 
  - Domain-specific components are nested within their respective page modules
  - Shared components are stored in the components directory
  - Base components (e.g., FormTextField, DataTable) are reusable across domains

### Backend Structure
The backend follows a clean architecture pattern:
```
src/
├── domain/                      # Domain-specific code
│   ├── user/                    # User domain
│   │   ├── controllers/         # API endpoints
│   │   ├── dto/                 # Data Transfer Objects
│   │   │   ├── domains/         # Base domain models
│   │   │   ├── request/         # Request-specific DTOs
│   │   │   └── response/        # Response-specific DTOs
│   │   ├── interfaces/          # Repository interfaces
│   │   ├── mappers/             # Data transformation logic
│   │   ├── repositories/        # Database queries
│   │   ├── services/            # Business logic
│   │   └── validators/          # Data validation
```

## Project Structure

```
SolidiThai/
├── solidithai-api/                          # Backend API (NestJS)
│   ├── src/                                 # Source code
|   |   └── authentication                   # Authentication of the project
|   |   └── common                           # Common things e.g. decorators, types, utils
|   |   └── domain                           # Domain of API
|   |   |      └── auth                      # Auth domain 
|   |   |      └── user                      # User domain
|   |   |           └── controllers          # Domain controller
|   |   |           └── dto                  # Domain DTO
|   |   |           └── interface            # Domain interface
|   |   |           └── mapper               # Domain mapper
|   |   |           └── repositories         # Domain repository
|   |   |           └── services             # Domain services
|   |   |           └── types                # Domain types
|   |   |           └── validators           # Domain validators
|   |   |           └── module.ts            # Domain module.ts
|   |   └── services                         # Service to use in each modules
│   ├── prisma/                              # Database schema and migrations
│   └── ...                                  # Configuration files
│              
└── solidithai-web/                          # Frontend Web App (React + Vite)
    ├── src/                                 # Source code
    |   └── api                              # Base API configuration and API in every modules
    |   └── assets                           # Assets of project
    |   └── components                       # Shared components
    |   └── constants                        # Constants
    |   └── context                          # Contexts
    |   └── enums                            # Enums
    |   └── hooks                            # Hooks
    |   └── pages                            # Pages in project
    |   |      └── login                     # Login page module
    |   |      └── user                      # Users page module
    |   |      └── user-settings             # User settings page module
    |   |      └── index                     # Index page
    |   └── theme                            # Theme config
    |   └── types                            # Types
    |   └── utils                            # Utils
    ├── public/                              # Static assets
    └── ...                                  # Configuration files
```

## Prerequisites

- Node.js (v18 or higher)
- pnpm (Package manager)
  - $ npm install -g pnpm@latest-10 or (https://pnpm.io/installation)


## Getting Started


### Project Setup
  1. Clone the repository
   ```bash
   git clone https://github.com/kt-tnbns/SolidiThai.git
   ```

  2. Navigate to the SolidiThai directory
   ```bash
   cd SolidiThai
   ```

  3. Install dependencies:
   ```bash
   pnpm install -r
   ```
   This command will install dependencies in all subdirectories
  

### Backend Setup (solidithai-api)

1. Navigate to the API directory:
   ```bash
   cd solidithai-api
   ```

2. Generate Prisma client:
   ```bash
   pnpm prisma generate
   ```

3. Copy the environment template:
   ```bash
   cp .env.template .env
   ```

4. Update the `.env` file with your Supabase credentials and other configurations.

5. Start the development server:
   ```bash
   pnpm start:dev
   ```

### Frontend Setup (solidithai-web)

1. Navigate to the web directory:
   ```bash
   cd solidithai-web
   ```

2. Copy the environment template:
   ```bash
   cp .env.template .env
   ```

3. Update the `.env` file with your API endpoint.

4. Start the development server:
   ```bash
   pnpm dev
   ```

## Development

- Backend runs on: `http://localhost:3000`
- Frontend runs on: `http://localhost:5173`

## API Documents
- Swagger : `BACKEND_URL/api/docs`

## Available Scripts

### Backend (solidithai-api)
- `pnpm start:dev`: Start development server
- `pnpm build`: Build the application
- `pnpm test`: Run tests
- `pnpm prisma:generate`: Generate Prisma client
- `pnpm prisma:migrate`: Run database migrations

### Frontend (solidithai-web)
- `pnpm dev`: Start development server
- `pnpm build`: Build the application
- `pnpm preview`: Preview production build
- `pnpm lint`: Run ESLint

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request
