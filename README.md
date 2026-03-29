# 🕵️ PrivaSee AI

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Puppeteer](https://img.shields.io/badge/Puppeteer-40B5A4?style=for-the-badge&logo=puppeteer&logoColor=white)
![Gemini API](https://img.shields.io/badge/Gemini_AI-8E75B2?style=for-the-badge&logo=google&logoColor=white)

**PrivaSee AI** is an intelligent, modern privacy auditing web application designed to shine a light on hidden web trackers, cookies, and data collection practices. It empowers users to understand how websites track them by generating comprehensive, easy-to-understand privacy reports. By simply entering a URL, PrivaSee AI acts as your personal privacy watchdog.

---

## ✨ What It Can Do (Key Features)

*   **🔍 Deep URL Inspection:** Enter any website URL, and our internal engine goes to work to retrieve its underlying data practices.
*   **🤖 Automated Web Scraping (Puppeteer):** Our backend utilizes Puppeteer to perform headless browser extraction—gathering active cookies, embedded third-party scripts, and assessing the presence (or lack thereof) of crucial security headers.
*   **🧠 AI-Powered "Privacy Story" (Google Gemini):** Raw data can be confusing. We use the Google Gemini API to analyze the scraped cookies and scripts, translating complex data into a human-readable "Privacy Story" that tells you exactly how a website is tracking you.
*   **📊 Comprehensive Grading System (A-F):** Instantly know a site's privacy score with our A-to-F grading system based on the severity of trackers and missing security practices.
*   **🚨 "Creepiness" Report:** A dedicated dashboard section highlighting the most intrusive tracking behaviors found on the inspected site.
*   **📱 Responsive Dashboard Interface:** A sleek, glassmorphism-inspired UI built with Next.js, Tailwind CSS, and Lucide React icons, ensuring a premium experience on both desktop and mobile devices.

---

## 🏗️ Project Architecture (Frontend & Backend)

**Yes, this project contains both a Frontend and a Backend!** 

Because PrivaSee AI is built using **Next.js (App Router)**, it is a *Full-Stack* application. This means the frontend (what the user sees) and the backend (the server logic doing the scraping and AI processing) live in the same repository, but are neatly organized into **separate folders**:

### 🎨 Frontend (Client-Side)
Handles the user interface, search bar, and displaying the beautiful results dashboard.
*   📂 `src/app/` - Contains the UI pages and global layouts (`page.tsx`, `layout.tsx`).
*   📂 `src/components/` - Contains reusable React UI components (like buttons, cards, and input fields).

### ⚙️ Backend (Server-Side)
Handles secure data scraping, API routes, and communication with the Gemini AI model. This code *never* runs on the user's browser for security.
*   📂 `src/app/api/` - Contains our backend HTTP endpoints (our server API).
*   📂 `src/services/` - Contains the heavy-lifting logic:
    *   `scraper.ts` (Puppeteer web scraping service)
    *   `gemini.ts` (Google Gemini AI integration service)
*   📂 `src/models/` - Contains our data structures and TypeScript interfaces (like `PrivacyReport.ts`).

---

## 🚀 Getting Started

First, ensure you have your `.env.local` setup with the necessary API keys (like your Google Gemini API key).

Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The application will auto-update as you edit the files.

---

## 🌍 Deployment

PrivaSee AI is designed to be easily deployed on standard cloud providers like **Vercel**. Since Puppeteer is used in the backend, special care relies on `@sparticuz/chromium` for serverless environments.
