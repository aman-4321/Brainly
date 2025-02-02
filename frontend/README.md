## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:
   Create `.env.local` and add:

```bash
NEXT_PUBLIC_NODE_ENV="dev"
NEXT_PUBLIC_API_URL=""
```

3. Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

- `/app` - Next.js 13 app directory structure
  - `/dashboard` - Main content management interface
  - `/shared` - Public sharing functionality
  - `/signin` & `/signup` - Authentication pages
- `/components` - Reusable React components
- `/lib` - Utility functions and configurations

## Routes

### Public Routes

- `/` - Landing page
- `/signin` - User login
- `/signup` - New user registration
- `/shared/[hash]` - View shared content

### Protected Routes

- `/dashboard` - Main content management interface
  - Add new content
  - View saved content
  - Share brain
  - Manage content

## Authentication

- JWT-based authentication
- Protected route middleware
- Automatic redirects for unauthorized access
- Persistent sessions with cookies
