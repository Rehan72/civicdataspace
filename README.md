# CivicDataSpace

A modern, responsive dataset listing application built with **Next.js**, **Tailwind CSS**, and **Zustand**. This application allows users to discover, search, and filter datasets from the CivicDataSpace API with a focus on high performance, smooth interactivity, and premium accessibility.

## 🚀 Key Features

- **Dynamic Dataset Views**: Seamlessly toggle between a high-impact **Grid View** and a detailed **List View**.
- **Advanced Filtering System**: Easily filter datasets by **Sectors**, **Formats**, **Tags**, and **Geographies**.
- **Real-time Search**: Instant search functionality to find specific datasets by keywords.
- **Smart URL State**: All search and filter states are automatically synced with URL parameters, making it easy to share specific filtered views.
- **Premium Interactivity**: Integrated with **GSAP** and **Lenis** for smooth, cinematic scrolling and micro-animations.
- **Fully Responsive**: Optimized for all devices, from mobile phones to large desktop monitors.
- **Accessible & Semantic**: Built using semantic HTML5 and appropriate ARIA roles for screen readers.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Smooth Scrolling**: [Lenis](https://lenis.darkroom.engineering/)
- **Animations**: [GSAP](https://greensock.com/gsap/)

## 📦 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Rehan72/CivicDataSpace.git
   cd CivicDataSpace
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application in action.

## 📂 Project Structure

- `src/app`: Page layouts, global styles, and routing.
- `src/components`: Reusable UI components (Filters, Search, Cards, etc.).
- `src/lib`: API integration layer and utility functions.
- `src/store`: Global state management logic using Zustand.

## 📄 License

This project is licensed under the MIT License.

---
Built with ❤️ by [Rehan72](https://github.com/Rehan72)
