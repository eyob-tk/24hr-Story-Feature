# 24hr Instagram Story Feature Clone

A lightweight, responsive, client-side web application replicating the core functionality of Instagram and WhatsApp Stories. Built with **React**, **Vite**, and **CSS3**, this project handles file uploads, Base64 image encoding, local data persistence, and auto-expiring ephemeral content without requiring a backend server.

---

## 🌟 Features

* **Ephemeral Content (24-Hour Expiration):** Uploaded stories automatically expire and clear out after 24 hours ($86,400,000\text{ ms}$).
* **Client-Side Persistence:** Stories are saved in `localStorage` as Base64 strings, persisting across browser reloads until they expire.
* **Segmented Dynamic Progress Bar:** A custom CSS/React progress bar split per story that fills up automatically over 3 seconds.
* **Auto-Advancement:** Stories auto-advance to the next item when the timer finishes and automatically close after the last story.
* **Tap Controls:** Tap or click the left or right sides of the story viewer modal to navigate backward or forward manually.
* **Responsive Design:** Optimized for both mobile devices and desktop views.

---

## 🛠️ Tech Stack

* **Frontend Framework:** [React](https://react.dev/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Styling:** CSS3 (Flexbox, CSS Animations)
* **Storage:** Web Storage API (`localStorage`) & Web APIs (`FileReader`)

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

Ensure you have **Node.js** (v16 or higher) installed on your system.

### Installation

1. **Clone the Repository**
   ```bash
   git clone [https://github.com/eyob-tk/24hr-story-feature.git](https://github.com/eyob-tk/24hr-story-feature.git)
   cd 24hr-story-feature
   ```

2. **Install Dependencies**

   `npm install`

3. **Run the Development Server**

   `npm run dev`

4. **Open your browser and navigate to the local URL displayed in your terminal** (`usually http://localhost:5173`).

---

## 📂 Project Structure

```
story-feature/
├── src/
│   ├── App.jsx        # Main application logic & state management
│   ├── App.css        # Modal, animations, and container styles
│   └── main.jsx       # React entry point
├── package.json       # Project dependencies and scripts
└── README.md          # Project documentation
```

---

## ⚙️ How It Works

1. **File Conversion:** When a user selects an image via the `+` button, JavaScript's `FileReader` converts the raw file to a Base64 encoded string.

2. **Object Creation:** A new story object is created containing a unique `id`, the `imageBase64` string, and a `createdAt` timestamp (Date.now()).

3. **Filtering Expired Date:** Upon load, the application checks `Date.now() - story.createdAt`. Any item older than 24 hours is automatically filtered out before rendering.

---

## 📄 License

This project is open source and available under the [MIT License](https://opensource.org/license/MIT).