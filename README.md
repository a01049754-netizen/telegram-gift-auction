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
- Only one request can update the auction state for a given bid
- Balance reservation is atomic
- If a bid fails, no partial updates occur
- Auction end time extension is handled safely

---

## 🚀 API Example

### Place bid

**Endpoint**
