# IndiaAssist AI

## Overview

IndiaAssist AI is an AI-powered mobile application that simplifies access to government and public services in India. Instead of navigating multiple government portals, users can discover services, understand eligibility requirements, upload important documents, receive reminders, and interact with an AI assistant that provides guidance based on verified service information.

The application follows a data-driven architecture where every government service is rendered dynamically from Firestore. Adding a new service requires only updating the database, eliminating the need to build new screens for each service.



## Features

### Government Services

- Browse services by category
- Search services instantly
- View eligibility, required documents, fees, processing time, FAQs, and official links
- Dynamic service pages generated from Firestore

### AI Assistant

- Context-aware AI chat for every government service
- Home screen AI assistant for general guidance
- AI responses are grounded only in verified service information
- Powered by Groq LLM

### Life Events

- Guided journeys for common life events
- Step-by-step checklists
- AI-assisted service recommendations

### Document Locker

- Upload PDF documents and images
- Secure Firebase Storage integration
- Rename, download, and delete documents
- User-specific document access

### Reminders

- Create reminders for important government deadlines
- Track upcoming and overdue reminders
- Firebase-backed reminder management

### User Profile

- Firebase Authentication
- Editable profile information
- Personalized experience
- Secure user data storage



## Tech Stack

### Mobile

- React Native
- Expo SDK 54

### Backend Services

- Firebase Authentication
- Cloud Firestore
- Firebase Storage

### AI

- Groq API

### Navigation

- React Navigation

### State Management

- React Hooks



## Project Structure

```
indiaassist-ai/
│
├── src/
│   ├── ai/
│   ├── components/
│   ├── data/
│   ├── firebase/
│   ├── navigation/
│   ├── screens/
│   ├── services/
│   ├── utils/
│   └── hooks/
│
├── assets/
├── scripts/
├── App.js
├── package.json
└── README.md
```



## Installation

Clone the repository

```bash
git clone <repository-url>
```

Move into the project

```bash
cd indiaassist-ai
```

Install dependencies

```bash
npm install
```

Install Expo-compatible native modules

```bash
npx expo install expo-image-picker expo-document-picker
```


## Firebase Setup

Configure the following Firebase services:

- Authentication
- Cloud Firestore
- Firebase Storage

Enable Email/Password authentication before running the application.


## Seed Sample Data

Populate Firestore with sample government services.

```bash
npm run seed
```

The seed script creates sample services and life journeys for development.

---

## Running the Application

Start the Expo development server.

```bash
npm start
```

Run on Android

```bash
npm run android
```

Run on iOS

```bash
npm run ios
```

Run on Web

```bash
npm run web
```


## Architecture

The application follows a generic service-driven architecture.

```
Firestore
      │
      ▼
Government Services
      │
      ▼
Dynamic Service Renderer
      │
      ▼
AI Context Builder
      │
      ▼
Groq AI Assistant
```

Each government service follows a common schema stored in Firestore. The UI, search functionality, and AI assistant consume this schema dynamically, making the application scalable without requiring additional screens.


## Sample Services

The project includes sample implementations for:

- Driving Licence Renewal
- PAN Card Correction
- Passport Renewal

These services demonstrate the reusable architecture and can be extended by adding new Firestore documents.


## Security

- Firebase Authentication
- User-specific Firestore access
- Firebase Storage access control
- Context-restricted AI responses
- Official government reference links



## Future Enhancements

- Push Notifications
- Multi-language Support
- Offline Mode
- OCR-based Document Scanner
- State-specific Government Services
- Advanced Search
- AI-powered Personalized Recommendations


## License

This project is intended for educational and portfolio purposes.
