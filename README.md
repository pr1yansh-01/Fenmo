# Expense Tracker

A full-stack personal finance application that allows users to record, view, filter, and analyze their expenses.

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Validation**: Zod
- **API Client**: Axios

## Project Overview

This application provides:
- Create new expenses with amount, category, description, and date
- View list of all expenses
- Filter expenses by category
- Sort expenses by date (newest/oldest first)
- Display running total of visible expenses
- Handle duplicate expense creation via idempotency

## Folder Structure

```
expense-tracker/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma      # Database schema
│   └── src/
│       ├── controllers/    # Request handlers
│       ├── middleware/    # Express middleware
│       ├── routes/         # Route definitions
│       ├── services/      # Business logic
│       ├── utils/         # Utility functions
│       ├── validators/    # Zod schemas
│       ├── lib/           # Prisma client
│       ├── app.js         # Express app
│       └── server.js      # Server entry
├── frontend/
│   ├── src/
│   │   ├── api/          # API calls
│   │   ├── components/   # React components
│   │   ├── App.jsx       # Main app
│   │   └── index.css     # Global styles
│   └── package.json
└── README.md
```

## Local Setup

### Prerequisites

- Node.js >= 18
- PostgreSQL >= 14

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your database credentials:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/expense_tracker"
   PORT=5000
   ```

5. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

6. Start the server:
   ```bash
   npm run dev
   ```

The backend runs at `http://localhost:5000`.

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file (if needed):
   ```bash
   cp .env.example .env
   ```

4. Update API base URL if backend is on different port:
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The frontend runs at `http://localhost:5173`.

### Database Setup

1. Create the database:
   ```bash
   createdb expense_tracker
   ```

2. Run Prisma migration:
   ```bash
   cd backend
   npx prisma migrate dev --name init
   ```

3. Verify the tables were created:
   ```bash
   npx prisma studio
   ```

## Design Decisions

### Money as Paise

The application stores all monetary values in **paise** (1/100 of a rupee) to avoid floating-point precision issues:

```
Amount: ₹123.45 → amountPaise: 12345
```

This approach:
- **Pros**: Avoids floating-point errors (e.g., 0.1 + 0.2 ≠ 0.3 in floating-point)
- **Pros**: Integer arithmetic is exact and faster
- **Cons**: Requires conversion when displaying to users
- **Cons**: Less intuitive for developers used to decimal amounts

Backend utilities in `backend/src/utils/money.js` handle the conversion.

### Idempotency

Duplicate expense submissions are prevented using an **Idempotency-Key** header:

1. Client generates a unique key (UUID) before each POST request
2. Key is sent in the `Idempotency-Key` header
3. Server checks if key exists in database
4. If new: creates expense, stores key with response
5. If exists: returns cached response without creating duplicate

This is critical for flaky networks where users might retry submissions.

### Trade-offs

| Decision | Trade-off |
|----------|-----------|
| Using Prisma | Easier to reason about, but slight overhead vs raw SQL |
| Storing money as paise | Safe for integers, requires conversion for display |
| Idempotency keys | Prevents duplicates, uses extra DB storage |
| No authentication | Simpler to build, not suitable for multi-user |
| No complex caching | Simpler app, potential re-fetch on navigation |

## Future Improvements

- **Authentication**: Add user login/signup
- **Multiple users**: Individual expense lists per user
- **Pagination**: Handle large expense lists
- **Charts**: Visual expense breakdown
- **Export**: CSV/PDF export
- **Recurring expenses**: Auto-create recurring entries
- **Budget alerts**: Notify when approaching limits

## Deployment Plan

### Backend

1. **Render** (recommended):
   - Connect GitHub repository
   - Set build command: `npm install`
   - Set start command: `npm start`
   - Add environment variables

2. **Railway**:
   - Deploy from GitHub
   - Add PostgreSQL plugin
   - Configure environment vars

3. **Heroku**:
   - `heroku create`
   - `heroku addons:add heroku-postgresql`
   - `git push heroku main`

### Frontend

1. **Vercel** (recommended for React):
   - Import GitHub repository
   - Set output directory: `dist`
   - Add environment variables

2. **Netlify**:
   - Connect repository
   - Build command: `npm run build`
   - Publish directory: `dist`

### Database

1. **Neon** (recommended):
   - Create project
   - Copy connection string
   - Use in backend `DATABASE_URL`

2. **Supabase**:
   - Create new project
   - Get connection string from settings

### Environment Variables

**Backend (.env)**:
```
DATABASE_URL=postgresql://...
PORT=5000
NODE_ENV=production
```

**Frontend (.env)**:
```
VITE_API_BASE_URL=https://your-backend.onrender.com/api
```