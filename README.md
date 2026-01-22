# telegram-gift-auction

Telegram Gift Auction backend demo for developer contest.

## 📌 Description

This project is a backend service that simulates an auction system for digital gifts.
It was implemented as part of a developer challenge.

The main focus of the project is:
- correctness of business logic
- atomic operations
- concurrency safety
- resistance to high load

---

## 🛠 Tech Stack

- Node.js
- NestJS
- TypeScript
- MongoDB (Mongoose)

---

## ⚙️ Features

- Auction creation and lifecycle management
- Bidding with validation (bid must be higher than current price)
- Atomic bid placement using MongoDB conditional updates
- Automatic auction extension if a bid is placed in the last 30 seconds
- Automatic user creation on first request
- User balance and reserved funds handling
- Concurrency-safe logic under high load

---

## 👤 User Logic

- Users are created automatically on first bid request
- A default balance is assigned on creation
- Balance checks and reservations are performed atomically
- Failed bids do not affect user balance
- No race conditions during concurrent bids

---

## 🔒 Concurrency & Atomicity

To prevent race conditions under high load:

- `findOneAndUpdate` with strict conditions is used for bids

- `findOneAndUpdate` with strict conditions is used for bid placement
- Only one request can update the auction state for a given bid
- Balance reservation is atomic
- If a bid fails, no partial updates occur
- Auction end time extension is handled safely

---

## 🚀 API Example

### Place bid

**Endpoint**
POST /auctions/:id/bid

**Request body**
```json
{
  "amount": 2000,
  "userId": "user_1"
} ```
**Validation rules**
- Amount must be greater than current auction price
- Auction must be active
- Auction must not be expired
- User must have sufficient balance

**Responses**
- 200 OK — bid accepted
- 400 Bad Request — invalid bid or insufficient balance
- 404 Not Found — auction not found
⚡ Load Testing

Load testing was performed to verify concurrency safety and system stability.

**Tool**
autocannon

**Command**
```bash
autocannon \
  -c 50 \
  -d 10 \
  -m POST \
  -H "Content-Type: application/json" \
  -b '{"amount":2000,"userId":"load_user"}' \
  http://localhost:3000/auctions/{auctionId}/bid
Test conditions
50 concurrent connections
10 seconds duration
Same auction ID
Multiple users bidding simultaneously
Result
~230 total requests processed
Backend remained stable under load
No crashes or deadlocks
Invalid bids correctly rejected
Auction state remained consistent
No user balance corruption detected
🧪 Error Handling
The API returns clear and consistent error responses:
Invalid bid amount
Insufficient user balance
Auction not found
Auction already finished
Concurrent update rejection
All errors are handled without partial database updates.
🧩 Project Structure
src/
 ├── auctions/
 │   ├── auction.controller.ts
 │   ├── auction.service.ts
 │   ├── auction.schema.ts
 │   └── dto/
 ├── users/
 │   ├── user.service.ts
 │   └── user.schema.ts
 ├── common/
 │   └── database/
 └── app.module.ts
🚀 How to Run
npm install
npm run start:dev
Environment variables
MONGODB_URI=mongodb://localhost:27017/auction
PORT=3000
✅ Conclusion
This backend implementation safely handles concurrent bidding scenarios, ensures data integrity under high load, and demonstrates correct usage of atomic database operations.
The solution satisfies the requirements of the developer challenge and can be extended for production use.
