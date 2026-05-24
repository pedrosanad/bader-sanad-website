# Photography Portfolio & Booking Website

## Overview
A professional photography portfolio and session booking website built for photographers. Features a stunning portfolio showcase with category filtering, image lightbox viewing, and an integrated booking system for clients to schedule photography sessions.

## Tech Stack
- **Frontend**: React + TypeScript, Tailwind CSS, Shadcn UI components
- **Backend**: Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **State Management**: TanStack React Query

## Project Structure
```
client/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Navigation.tsx
│   │   ├── HeroSection.tsx
│   │   ├── CategoryCard.tsx
│   │   ├── PortfolioGrid.tsx
│   │   ├── BookingCalendar.tsx
│   │   ├── BookingForm.tsx
│   │   ├── AboutSection.tsx
│   │   ├── Footer.tsx
│   │   └── ThemeToggle.tsx
│   ├── pages/
│   │   └── admin.tsx      # Admin dashboard
│   ├── App.tsx            # Main app with routing
│   └── index.css          # Global styles
server/
├── routes.ts              # API endpoints
├── storage.ts             # Database operations
└── db.ts                  # Database connection
shared/
└── schema.ts              # Database schema & types
```

## Features

### Public Features
- **Portfolio Homepage**: Hero section with stunning photography background
- **Category Galleries**: Portrait, Events, Commercial, Headshots
- **Image Lightbox**: Full-screen image viewing with navigation
- **Booking Form**: Multi-step form with calendar and time slot selection
- **Dark/Light Theme**: Toggle between themes

### Admin Features (Access via gear icon)
- **Bookings Management**: View, complete, cancel, or delete bookings
- **Availability Management**: Add available time slots by date
- **Stats Dashboard**: Total bookings, upcoming sessions, available slots

## Database Schema

### Bookings
- id, name, email, phone, sessionType, date, time, message, status, createdAt

### Availability Slots
- id, date, time, isAvailable

### Portfolio Images
- id, src, alt, category, displayOrder

## API Endpoints

### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create new booking
- `PATCH /api/bookings/:id/status` - Update booking status
- `DELETE /api/bookings/:id` - Delete booking

### Availability
- `GET /api/availability` - Get available slots
- `POST /api/availability` - Add single slot
- `POST /api/availability/bulk` - Add multiple slots
- `DELETE /api/availability/:id` - Remove slot

### Portfolio
- `GET /api/portfolio` - Get portfolio images
- `POST /api/portfolio` - Add image
- `DELETE /api/portfolio/:id` - Remove image

## Time Format
All times stored in 24-hour format (HH:mm) for consistency:
- 09:00, 10:00, 11:00, 13:00, 14:00, 15:00, 16:00

## Running the Project
```bash
npm run dev  # Start development server on port 5000
npm run db:push  # Push schema to database
```

## Recent Changes
- Dec 17, 2024: Initial implementation with portfolio, booking system, and admin dashboard
- Fixed time format consistency (24-hour format)
- Added slot availability restoration when bookings are cancelled/deleted
- Added duplicate slot prevention in admin

## Future Enhancements
- Email notifications for booking confirmations
- Payment integration for session deposits
- Portfolio image upload functionality
- Client photo gallery access
- Automated reminder system
