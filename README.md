[![My Skills](https://skillicons.dev/icons?i=nodejs,express,postgresql,azure,prisma)](https://skillicons.dev)

# TernakAja Backend

**TernakAja Backend** adalah REST API server berbasis Express.js dan Node.js yang berfungsi sebagai backend service untuk sistem monitoring kesehatan hewan ternak. Server ini mengelola data ternak, integrasi IoT, autentikasi pengguna, dan komunikasi dengan AI service untuk deteksi anomali.

## Fitur Utama

- REST API untuk manajemen data ternak dan kesehatan
- Autentikasi dan autorisasi berbasis JWT
- Real-time WebSocket untuk data IoT streaming
- Integrasi dengan Azure IoT Hub untuk data sensor
- Role-based access control (Peternak, Dokter Hewan, Admin)
- AI service integration untuk anomaly detection
- Database management dengan PostgreSQL
- File upload dan storage management
- Email notification service
- API documentation dengan Swagger/OpenAPI

## Struktur Proyek

```
src/
├── controllers/          // Controller untuk handle request
│   ├── auth.js          // Authentication endpoints
│   ├── livestock.js     // Livestock management
│   ├── health.js        // Health data management
│   └── user.js          // User management
├── middleware/          // Custom middleware
│   ├── auth.js          // JWT authentication
│   ├── validation.js    // Request validation
│   └── errorHandler.js  // Error handling
├── models/              // Database models (Prisma)
│   ├── User.js          // User model
│   ├── Livestock.js     // Livestock model
│   └── HealthData.js    // Health data model
├── routes/              // API route definitions
│   ├── auth.js          // Auth routes
│   ├── livestock.js     // Livestock routes
│   └── health.js        // Health data routes
├── services/            // Business logic services
│   ├── iotService.js    // IoT data processing
│   ├── aiService.js     // AI integration
│   └── emailService.js  // Email notifications
├── utils/               // Utility functions
│   ├── database.js      // Database connection
│   ├── validators.js    // Data validation
│   └── helpers.js       // Helper functions
└── config/              // Configuration files
    ├── database.js      // DB configuration
    └── azure.js         // Azure services config
```

## Setup & Konfigurasi

### 1. Clone Repositori
```bash
git clone https://github.com/TernakAja/TernakAja-Backend.git
cd TernakAja-Backend
```

### 2. Install Dependencies
```bash
npm install
# atau
yarn install
```

### 3. Konfigurasi Environment
Buat file `.env` dan isi dengan konfigurasi yang diperlukan:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/ternakaja"
AZURE_POSTGRESQL_URL="your-azure-postgresql-connection-string"

# JWT
JWT_SECRET="your-jwt-secret-key"
JWT_EXPIRES_IN="7d"

# Azure Services
AZURE_IOT_CONNECTION_STRING="your-azure-iot-hub-connection"
AZURE_STORAGE_CONNECTION_STRING="your-azure-storage-connection"

# AI Service
AI_SERVICE_URL="http://localhost:5000"
HUGGINGFACE_API_KEY="your-huggingface-api-key"

# Email Service
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Server Configuration
PORT=3000
NODE_ENV="development"
```

### 4. Setup Database
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed database (optional)
npm run db:seed
```

### 5. Jalankan Development Server
```bash
npm run dev
# atau
yarn dev
```

## Scripts yang Tersedia

```bash
npm run dev          # Jalankan development server dengan nodemon
npm run start        # Jalankan production server
npm run build        # Build aplikasi untuk production
npm run test         # Jalankan unit tests
npm run db:studio    # Buka Prisma Studio untuk database management
npm run db:migrate   # Jalankan database migrations
npm run db:seed      # Seed database dengan data awal
npm run lint         # Jalankan ESLint
```

## Teknologi yang Digunakan

### Core Technologies
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web framework untuk Node.js
- **TypeScript** - Type safety dan better DX
- **Prisma** - ORM dan database toolkit

### Database & Storage
- **PostgreSQL** - Primary database
- **Azure PostgreSQL** - Cloud database service
- **Azure Blob Storage** - File storage service
- **Redis** - Caching dan session storage

### Authentication & Security
- **JWT (JSON Web Tokens)** - Authentication
- **bcrypt** - Password hashing
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing

### External Integrations
- **Azure IoT Hub** - IoT device management
- **Nodemailer** - Email service
- **Socket.io** - Real-time communication
- **Axios** - HTTP client untuk AI service calls

## API Endpoints

### Authentication
```
POST /api/auth/register     # User registration
POST /api/auth/login        # User login
POST /api/auth/logout       # User logout
GET  /api/auth/profile      # Get user profile
PUT  /api/auth/profile      # Update user profile
```

### Livestock Management
```
GET    /api/livestock           # Get all livestock
GET    /api/livestock/:id       # Get livestock by ID
POST   /api/livestock           # Create new livestock
PUT    /api/livestock/:id       # Update livestock
DELETE /api/livestock/:id       # Delete livestock
GET    /api/livestock/:id/health # Get health history
```

### Health Data
```
GET  /api/health               # Get health data
POST /api/health               # Create health record
GET  /api/health/analytics     # Get health analytics
GET  /api/health/alerts        # Get health alerts
POST /api/health/iot-data      # Receive IoT sensor data
```

### User Management (Admin only)
```
GET    /api/users              # Get all users
GET    /api/users/:id          # Get user by ID
PUT    /api/users/:id/role     # Update user role
DELETE /api/users/:id          # Delete user
```

## Database Schema

### Core Models
- **User** - Peternak, Dokter Hewan, Admin
- **Livestock** - Data profil hewan ternak
- **HealthData** - Data kesehatan dari sensor IoT
- **Alert** - Notifikasi anomali kesehatan
- **VaccinationRecord** - Riwayat vaksinasi
- **FeedingSchedule** - Jadwal pemberian pakan

### Relationships
- User memiliki banyak Livestock
- Livestock memiliki banyak HealthData
- HealthData dapat generate Alert
- Livestock memiliki VaccinationRecord dan FeedingSchedule

## Integrasi dengan Services Lain

Backend ini terintegrasi dengan:
- **[TernakAja Frontend](https://github.com/TernakAja/TernakAja-Frontend)** - React dashboard
- **[TernakAja AI](https://github.com/StyNW7/TernakAja-AI)** - ML models untuk anomaly detection  
- **[TernakAja IoT](https://github.com/StyNW7/TernakAja-IoT)** - ESP32 sensor devices
- **Azure IoT Hub** - IoT device management dan data ingestion
- **Azure PostgreSQL** - Cloud database service

## WebSocket Events

### Real-time Data Streaming
```javascript
// Client connection
socket.on('connect', () => {
  socket.emit('join-livestock', { livestockId });
});

// Server events
socket.emit('health-data-update', healthData);
socket.emit('anomaly-detected', alertData);
socket.emit('device-status-change', statusData);
```

## Rencana Pengembangan

- Implementasi GraphQL untuk flexible data querying
- Microservices architecture dengan Docker containers
- Advanced caching strategy dengan Redis
- Message queue implementation dengan Azure Service Bus
- API rate limiting dan throttling
- Advanced logging dan monitoring dengan Azure Application Insights
- Automated testing dengan Jest dan Supertest
- CI/CD pipeline dengan GitHub Actions

## Live API Documentation

API documentation tersedia di: `http://localhost:3000/api-docs` (saat development)
