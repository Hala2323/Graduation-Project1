# Interactive Web App for Teaching Programming

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![License](https://img.shields.io/badge/License-Educational-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)

An interactive, browser-based learning platform designed to teach programming concepts through **hands-on challenges, visual interfaces, and sandbox-style experimentation**.  
This app helps **students** learn and **teachers** demonstrate programming principles in a fun, accessible, and engaging way — all without needing to install anything.

---

## Overview

**Interactive Web App for Teaching Programming** is a self-contained educational platform built entirely with HTML, CSS, and JavaScript.  
It supports:
- Learning through guided challenges  
- Experimenting with code in an interactive sandbox  
- Watching educational media (video lessons)  
- Tracking progress in a challenge-based format  

It runs **fully client-side**, meaning it works directly in the browser — no server setup required.

---

## Features

- **Block- or text-based coding challenges** loaded dynamically from `challenges.json`  
- **Interactive sandbox** for real-time code execution  
- **Integrated instructional media** (`Explore_Programming_Challenges_in_a_Block_Based_Coding_Platform.mp4`)  
- **Multi-page learning flow:**  
  - `index.html` → home/intro  
  - `interactive.html` → interactive tutorials  
  - `sandbox.html` → coding sandbox  
- **Completely offline-compatible** — runs in any modern web browser  

---

## Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | HTML5, CSS3, JavaScript (Vanilla JS) |
| Data Storage | JSON (`challenges.json`) |
| Media | MP4 video integration |
| Execution | Client-side (no backend dependencies) |

---

## 🗂️ Project Structure

```
Interactive Web App for Teaching Programming/
└── Graduation-Project1-edit (2)/
    └── Graduation-Project1-f/
        └── Graduation-Project1-f548cef14605d4bd7f9bece2b85352c617be01a3/
            ├── app.js                     # Core logic for interactivity
            ├── challenges.json             # Challenge data and exercises
            ├── index.html                  # Main landing page
            ├── interactive.html            # Interactive learning interface
            ├── sandbox.html                # Coding sandbox environment
            ├── README.md                   # Existing project notes
            ├── Explore_Programming_Challenges_in_a_Block_Based_Coding_Platform.mp4 # Tutorial video
```

---

## Getting Started

### Option 1: Run Locally (Recommended for Students or Teachers)
1. **Download or clone** the project.  
2. Open the main project folder in your file explorer.  
3. Double-click `index.html` — it will open in your browser.  
4. Explore lessons, challenges, and the sandbox interactively!

### Option 2: Host on a Web Server (For Classroom or Public Use)
You can deploy the app on:
- GitHub Pages  
- Netlify  
- Vercel  
- Any static web hosting provider  

**Deployment Steps:**
1. Upload all files inside the main folder (`index.html`, `app.js`, etc.) to your hosting service.  
2. Ensure `challenges.json` and media files remain in the same directory.  
3. Access your hosted link — the app runs instantly in the browser.

---

## For Teachers

- Use the **video and interactive lessons** to explain programming fundamentals.  
- Modify `challenges.json` to create **custom exercises** or quizzes.  
- Host the app on a classroom intranet or web server for easy access by students.  
- Students can work individually on exercises without any software installation.

---

## For Students

- Launch the app via your browser (`index.html`).  
- Navigate through lessons and attempt coding challenges.  
- Use the **sandbox** to experiment with your own code.  
- All code runs locally — safe and instant feedback!

---

## Customization for Developers

- Edit `app.js` to modify or expand the challenge logic.  
- Update `challenges.json` to add new exercises, problem sets, or difficulty levels.  
- Style the interface by editing `style.css` (if present) or embedding new CSS in HTML files.  
- Integrate new media or instructional videos by placing them in the project folder and linking them within `index.html`.

---

## Future Enhancements (Suggested)

- Add student progress tracking via localStorage  
- Support for multiple programming languages  
- Drag-and-drop block-based coding (Blockly or Scratch integration)  
- User interface theme customization (light/dark mode)  

---

## License

This project is intended for **educational and non-commercial use**.  
If you wish to reuse or extend it for public deployment, please include attribution to the original author(s).

---

## Contribution

Contributions are welcome!  
If you’d like to improve challenges, UI design, or features:
1. Fork the project  
2. Make your changes  
3. Submit a pull request  
