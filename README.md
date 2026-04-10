<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Razorpay-Payments-0C2451?logo=razorpay&logoColor=white" alt="Razorpay" />
  <img src="https://img.shields.io/badge/Deployed-Render-46E3B7?logo=render&logoColor=white" alt="Render" />
</p>

# 🏛️ Delhi 6 — Heritage Tours & Food Walks

> A full-stack booking platform for curated heritage tours, food walks, cooking classes, and cultural experiences in Old Delhi.

**🌐 Live:** [delhi06.onrender.com](https://delhi06.onrender.com)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [License](#license)

---

## Overview

Delhi 6 is a production-grade web application that connects travellers with authentic Old Delhi experiences. Users can browse curated tours, book time slots, make payments via Razorpay, and manage their bookings — all through a responsive single-page frontend served by an Express backend.

---

## Features

### 👤 Authentication
- Email/password registration and login with JWT
- Google OAuth 2.0 sign-in
- Protected routes with role-based access control (user/admin)

### 🗺️ Experience Browsing
- 6 curated experiences (Food Walk, Heritage Walk, Cooking Class, Spice Tour, Craft Workshop, Night Walk)
- Activity detail pages with highlights, inclusions, and meeting points
- Category-based filtering

### 📅 Booking System
- Real-time time slot availability
- Guest count selection with live price calculation
- Multi-step checkout flow with form validation
- Booking confirmation with unique reference codes

### 💳 Payments
- Razorpay integration for secure payments
- Order creation and signature verification
- Support for Card, UPI, and Net Banking

### 📊 User Dashboard
- View upcoming and past bookings
- Profile management
- Review and rating system with star ratings

### 🛡️ Security & Performance
- Helmet CSP with fine-grained directives
- Rate limiting (API-wide + stricter on auth routes)
- Gzip compression
- Input validation via `express-validator`
- Graceful shutdown handling

### 📱 Admin Panel
- Dashboard statistics
- User management
- Booking status management
- Activity and time slot CRUD

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Runtime** | Node.js 18+ |
| **Framework** | Express 4.x |
| **Database** | MongoDB Atlas (Mongoose 8.x ODM) |
| **Auth** | JWT + Google OAuth 2.0 |
| **Payments** | Razorpay |
| **Security** | Helmet, CORS, express-rate-limit |
| **Frontend** | Vanilla HTML/CSS/JS (SPA pattern) |
| **Fonts** | Playfair Display, DM Sans (Google Fonts) |
| **Icons** | Iconify (Lucide icon set) |
| **Hosting** | Render (Free Tier) |

---

## Architecture

```
┌─────────────────────────────────────────────────┐
│                   Client (Browser)               │
│         Vanilla JS SPA  ←→  REST API             │
└──────────────────────┬──────────────────────────┘
                       │ HTTPS
┌──────────────────────▼──────────────────────────┐
│              Express.js Server                    │
│  ┌──────────┐  ┌────────┐  ┌──────────────────┐ │
│  │ Helmet   │  │ CORS   │  │ Rate Limiter     │ │
│  │ CSP      │  │ Config │  │ (300 req/15min)  │ │
│  └──────────┘  └────────┘  └──────────────────┘ │
│  ┌──────────────────────────────────────────────┐│
│  │           API Routes (/api/*)                ││
│  │  auth · activities · bookings · payments     ││
│  │  reviews · timeslots · admin                 ││
│  └──────────────────────────────────────────────┘│
│  ┌──────────────────────────────────────────────┐│
│  │         Static Files (public/)               ││
│  │  index.html · app.js · styles.css · images/  ││
│  └──────────────────────────────────────────────┘│
└──────────────────────┬──────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────┐
│            MongoDB Atlas (Cloud)                  │
│   Users · Activities · Bookings · TimeSlots      │
│   Reviews                                        │
└──────────────────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────┐
│            Razorpay Payment Gateway               │
└──────────────────────────────────────────────────┘
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18.0.0
- **MongoDB** Atlas cluster (or local instance)
- **Razorpay** account (for payments)
- **Google Cloud** project (for OAuth — optional)

### Installation

```bash
# Clone the repository
git clone https://github.com/whyabhiiiii/DELHI06.git
cd DELHI06

# Install dependencies
npm install

# Create environment file
cp .env.example .env   # Then fill in your values (see below)

# Start development server
npm run dev
```

The server will start at `http://localhost:5000`.

---

## Environment Variables

Create a `.env` file in the root directory with the following:

```env
# Server
NODE_ENV=development
PORT=5000

# MongoDB
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# Razorpay
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5000

# Admin
ADMIN_SECRET=your_admin_secret

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
```

---

## API Reference

Base URL: `/api`

### Auth

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/auth/register` | ✗ | Create new account |
| `POST` | `/auth/login` | ✗ | Login with email/password |
| `POST` | `/auth/google` | ✗ | Google OAuth sign-in |
| `GET` | `/auth/me` | ✓ | Get current user profile |
| `PUT` | `/auth/update-profile` | ✓ | Update profile info |
| `PUT` | `/auth/change-password` | ✓ | Change password |

### Activities

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/activities` | ✗ | List all activities |
| `GET` | `/activities/:idOrSlug` | ✗ | Get activity details |
| `POST` | `/activities` | Admin | Create activity |
| `PUT` | `/activities/:id` | Admin | Update activity |
| `DELETE` | `/activities/:id` | Admin | Delete activity |

### Bookings

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/bookings` | ✓ | Create a booking |
| `GET` | `/bookings/my` | ✓ | Get user's bookings |
| `GET` | `/bookings/:id` | ✓ | Get booking details |
| `PUT` | `/bookings/:id/confirm` | ✓ | Confirm a booking |
| `PUT` | `/bookings/:id/cancel` | ✓ | Cancel a booking |

### Payments

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/payments/create-order` | ✓ | Create Razorpay order |
| `POST` | `/payments/verify` | ✓ | Verify payment signature |

### Time Slots

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/timeslots?activity=<id>&date=<date>` | ✗ | Get available slots |
| `POST` | `/timeslots` | Admin | Create time slot |
| `PUT` | `/timeslots/:id` | Admin | Update time slot |
| `DELETE` | `/timeslots/:id` | Admin | Delete time slot |

### Reviews

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/reviews?activity=<id>` | ✗ | Get reviews for activity |
| `POST` | `/reviews` | ✓ | Submit a review |
| `DELETE` | `/reviews/:id` | ✓ | Delete own review |

### Admin

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/admin/stats` | Admin | Dashboard statistics |
| `GET` | `/admin/users` | Admin | List all users |
| `GET` | `/admin/bookings` | Admin | List all bookings |
| `PUT` | `/admin/bookings/:id` | Admin | Update booking status |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Server status, DB connection, uptime |

---

## Project Structure

```
delhi6-backend/
├── config/
│   └── db.js                  # MongoDB connection config
├── controllers/
│   ├── activityController.js  # Activity CRUD logic
│   ├── adminController.js     # Admin dashboard logic
│   ├── authController.js      # Auth (register, login, Google OAuth)
│   ├── bookingController.js   # Booking lifecycle management
│   ├── paymentController.js   # Razorpay order & verification
│   ├── reviewController.js    # Review CRUD logic
│   └── timeslotController.js  # Time slot management
├── middleware/
│   └── auth.js                # JWT verification & role authorization
├── models/
│   ├── Activity.js            # Tour/experience schema
│   ├── Booking.js             # Booking schema with status tracking
│   ├── Review.js              # Review with ratings
│   ├── TimeSlot.js            # Time slot availability
│   └── User.js                # User schema with bcrypt hashing
├── public/                    # Frontend (served as static files)
│   ├── images/                # Tour and hero images
│   ├── index.html             # SPA entry point
│   ├── styles.css             # Full stylesheet
│   ├── app.js                 # Application logic & routing
│   └── api.js                 # API service layer (fetch wrapper)
├── routes/
│   ├── activityRoutes.js
│   ├── adminRoutes.js
│   ├── authRoutes.js
│   ├── bookingRoutes.js
│   ├── paymentRoutes.js
│   ├── reviewRoutes.js
│   └── timeslotRoutes.js
├── utils/
│   └── seed.js                # Database seeding script
├── server.js                  # Express app entry point
├── package.json
└── .gitignore
```

---

## Deployment

The app is deployed on **[Render](https://render.com)** (Free Tier).

### Deploy your own

1. Push to a GitHub repository
2. Create a **Web Service** on Render
3. Set **Build Command**: `npm install`
4. Set **Start Command**: `npm start`
5. Add all environment variables in the Render dashboard
6. Whitelist Render's outbound IPs in MongoDB Atlas (`0.0.0.0/0` for free tier)

> **Note:** Free tier instances spin down after 15 minutes of inactivity. The first request after idle will take ~30-50 seconds.

---

## License

This project is proprietary. All rights reserved.

---

<p align="center">
  Made with ♥ in Old Delhi
</p>
