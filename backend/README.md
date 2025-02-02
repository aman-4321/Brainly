# Brainly Backend API Documentation

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```bash
DATABASE_URL="postgresql://username:password@localhost:5432/brainly"
FRONTEND_URL="http://localhost:3000"
PORT=8082
NODE_ENV="development"
JWT_SECRET="your-super-secret-key"
COOKIE_DOMAIN="localhost"
```

### 3. Database Setup

```bash
npx prisma migrate dev
```

### 4. Start Development Server

```bash
npm run dev
```

## API Routes

### Authentication Routes

#### Input Validation

| Field    | Type   | Required | Validation Rules              |
| -------- | ------ | -------- | ----------------------------- |
| username | string | Yes      | Minimum length: 2 characters  |
| email    | string | Yes      | Must be valid email format    |
| password | string | Yes      | Min length: 6, Max length: 20 |

#### Available Routes

1. **Sign Up**

- **Route:** `POST /api/v1/user/signup`
- **Description:** Register a new user
- **Request Body:**

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

- **Response (200):**

```json
{
  "message": "User Created Successfully",
  "username": "john_doe",
  "email": "john@example.com"
}
```

2. **Sign In**

- **Route:** `POST /api/v1/user/signin`
- **Description:** Authenticate user
- **Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

- **Response (200):**

```json
{
  "message": "Logged in successfully",
  "userId": "1",
  "email": "john@example.com"
}
```

3. **Logout**

- **Route:** `POST /api/v1/user/logout`
- **Description:** Logout user
- **Response (200):**

```json
{
  "message": "Logged out Successfully"
}
```

### Content Routes

#### Input Validation

| Field | Type           | Required | Validation Rules                              |
| ----- | -------------- | -------- | --------------------------------------------- |
| type  | string         | Yes      | Must be: "document", "tweet", "video", "link" |
| link  | string         | Yes      | Must be valid URL format                      |
| title | string         | Yes      | Minimum length: 1 character                   |
| tags  | array<string\> | No       | Optional                                      |

#### Available Routes

1. **Add Content**

- **Route:** `POST /api/v1/content/add`
- **Auth:** Required
- **Request Body:**

```json
{
  "type": "document",
  "link": "https://example.com/doc",
  "title": "Example Document",
  "tags": ["work", "documentation"]
}
```

- **Response (201):**

```json
{
  "message": "Content added successfully",
  "id": 1,
  "content": {
    "id": 1,
    "title": "Example Document",
    "link": "https://example.com/doc",
    "type": "document",
    "tags": [
      { "id": 1, "title": "work" },
      { "id": 2, "title": "documentation" }
    ]
  }
}
```

2. **Get All Content**

- **Route:** `GET /api/v1/content/get`
- **Auth:** Required
- **Response (200):**

```json
{
  "content": [
    {
      "id": 1,
      "link": "https://example.com/doc",
      "type": "document",
      "title": "Example Document",
      "tags": [
        {
          "id": 1,
          "title": "work"
        }
      ],
      "userId": 1
    }
  ]
}
```

3. **Get Content by ID**

- **Route:** `GET /api/v1/content/get/:id`
- **Auth:** Required
- **Response (200):**

```json
{
  "content": {
    "id": 1,
    "link": "https://example.com/doc",
    "type": "document",
    "title": "Example Document",
    "tags": [
      {
        "id": 1,
        "title": "work"
      }
    ],
    "userId": 1
  }
}
```

4. **Get Content by Type**

- **Route:** `GET /api/v1/content/type/:type`
- **Auth:** Required
- **Valid Types:** "document", "tweet", "video", "link"
- **Response (200):**

```json
{
  "content": [
    {
      "id": 1,
      "link": "https://example.com/doc",
      "type": "document",
      "title": "Example Document",
      "tags": [
        {
          "id": 1,
          "title": "work"
        }
      ],
      "userId": 1
    }
  ]
}
```

5. **Get Tags**

- **Route:** `GET /api/v1/content/tags`
- **Auth:** Required
- **Query Params:** ?search=work (optional)
- **Response (200):**

```json
{
  "tags": ["work", "documentation", "research"]
}
```

### Share Routes

#### Input Validation

| Endpoint                    | Field | Type    | Required | Validation Rules |
| --------------------------- | ----- | ------- | -------- | ---------------- |
| POST /api/v1/share/openall  | share | boolean | Yes      | Must be true     |
| POST /api/v1/share/closeall | share | boolean | Yes      | Must be false    |

#### Available Routes

1. **Share All Content**

- **Route:** `POST /api/v1/share/openall`
- **Auth:** Required
- **Request Body:**

```json
{
  "share": true
}
```

- **Response (200):**

```json
{
  "message": "Global sharing link created successfully",
  "link": "uuid-generated-hash"
}
```

2. **Get Shared Content**

- **Route:** `GET /api/v1/share/getall/:hash`
- **Response (200):**

```json
{
  "message": "Content retrieved successfully",
  "contents": [
    {
      "id": 1,
      "title": "Example Document",
      "link": "https://example.com/doc",
      "type": "document",
      "tags": [
        {
          "title": "work"
        }
      ]
    }
  ],
  "user": {
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

3. **Close All Sharing**

- **Route:** `POST /api/v1/share/closeall`
- **Auth:** Required
- **Request Body:**

```json
{
  "share": false
}
```

- **Response (200):**

```json
{
  "message": "Global sharing link closed successfully"
}
```

4. **Get Sharing Status**

- **Route:** `GET /api/v1/share/status`
- **Auth:** Required
- **Response (200):**

```json
{
  "message": "Sharing status retrieved successfully",
  "status": true
}
```

## Error Responses

### Validation Errors (Status: 411)

```json
{
  "message": "Invalid inputs",
  "error": []
}
```

### Authentication Errors (Status: 401)

```json
{
  "message": "No Token Provided"
}
```

### Resource Not Found (Status: 404)

```json
{
  "message": "Content not found"
}
```

### Server Errors (Status: 500)

```json
{
  "message": "Error while processing request",
  "error": "error details"
}
```

## Security Features

- JWT Authentication
- HTTP-only Cookies
- Rate Limiting (Production)
- Helmet Security Headers
- CORS Configuration
- Request Compression
