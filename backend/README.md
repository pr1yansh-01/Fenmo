# Expense Tracker Backend

Express.js API for managing personal expenses with PostgreSQL.

## Setup

```bash
npm install
```

Copy `.env.example` to `.env` and set your DATABASE_URL:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/expense_tracker"
PORT=5000
FRONTEND_URL="http://localhost:5173"
```

## Database Setup

1. Start PostgreSQL: `docker compose up -d` (from root)
2. Run migrations:

```bash
npm run prisma:migrate
```

## Run

```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### POST /api/expenses

Create a new expense.

**Headers:**
- `Idempotency-Key` (optional): UUID to prevent duplicate creation

**Request Body:**
```json
{
  "amount": "120.50",
  "category": "Food",
  "description": "Lunch",
  "date": "2026-04-30"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "amountPaise": 12050,
  "amount": "120.50",
  "category": "Food",
  "description": "Lunch",
  "date": "2026-04-30T00:00:00.000Z",
  "createdAt": "2026-04-30T12:00:00.000Z"
}
```

### GET /api/expenses

Get all expenses with optional filtering.

**Query Parameters:**
- `category` (optional): Filter by category
- `sort` (optional): `date_desc` for newest first

**Response (200):**
```json
[
  {
    "id": "uuid",
    "amountPaise": 12050,
    "amount": "120.50",
    "category": "Food",
    "description": "Lunch",
    "date": "2026-04-30T00:00:00.000Z",
    "createdAt": "2026-04-30T12:00:00.000Z"
  }
]
```

## Idempotency

The POST endpoint supports the `Idempotency-Key` header. If the same key is sent again, the existing expense is returned instead of creating a duplicate. This handles:
- Network failures causing retries
- User refreshing the page after submit
- Accidental double-clicks

## Money Handling

Amounts are stored as integers in paise (₹1 = 100 paise) to avoid floating-point precision errors. The API accepts rupees as a string (e.g., "120.50") and converts to paise internally.