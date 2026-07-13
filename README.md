# 🚀 Enigma Website

A modern full-stack website built for Ambalika Institute's Enigma Platform to manage information, showcase projects, and provide an interactive contact system.

## 📌 Project Overview

The Enigma Website is a responsive and modern web application designed to:
1. Showcase Enigma club activities
2. Provide project information
3. Allow users to contact the team
4. Deliver a smooth UI with animations
5. Deploy seamlessly on Vercel

*Note: This project also helped improve backend development skills after completing the frontend for a road-safety bridge project.*

## 🛠️ Tech Stack

### Frontend
- **React.js**
- **Next.js**
- **Tailwind CSS**
- **Shadcn UI Components**
- **Framer Motion Animations**

### Backend / Services
- **EmailJS** (Contact Form Email Delivery)
- **MongoDB Atlas** (Optional – message storage)
- **JWT Authentication** (if admin panel enabled)

### Deployment
- **Vercel Hosting**
- **GitHub Version Control**

## ✨ Features

- ✔ Responsive Modern UI
- ✔ Smooth Animations
- ✔ Contact Form (Emails received at enigma@ambalika.co.in)
- ✔ Fast Deployment on Vercel
- ✔ Secure Environment Variables
- ✔ Easy to Customize Sections
- ✔ Mobile Friendly Design

## 🚀 Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and npm installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Enigma-Technical-Club-AIMT/Enigma-Website.git
   ```
2. Navigate into the project directory:
   ```bash
   cd Enigma-Website
   ```
3. Install the dependencies. **Note:** Due to some peer dependency conflicts with the UI library, use the `--legacy-peer-deps` flag:
   ```bash
   npm install --legacy-peer-deps
   ```

### Running the Development Server

Start the local development server:
```bash
npm run dev
```
Then, open [http://localhost:3000](http://localhost:3000) in your browser to view the application.
