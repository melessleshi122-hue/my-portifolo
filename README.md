# 🚀 Meles Silesh - Personal Developer & IT Portfolio

A modern, high-performance personal portfolio website built for **Meles Silesh**, a **23-year-old 4th-Year Senior Student in the Department of Information Technology**.

---

## ✨ Features Included

- **Modern Glassmorphic UI**: Sleek futuristic aesthetic with subtle glows, glass blur effects, and smooth micro-interactions.
- **Dark / Light Mode**: Seamless theme switcher that remembers user preference with `localStorage`.
- **Interactive Hero & Ambient Particle Canvas**:
  - Live animated typing headline showcasing IT & software capabilities.
  - Interactive constellation particle network rendered on HTML5 canvas.
  - Profile card with Year 4 and age badge highlights.
- **Education Roadmap**:
  - Detailed Year 1 to Year 4 academic progression.
  - Specific modules covering Data Structures, Networks, Databases, Security, and Cloud.
- **Skills & Tech Stack with Animated Progress**:
  - Frontend, Backend, Databases, and IT Infrastructure / Networking categories.
  - Animated progress bars triggered on viewport scroll.
  - Daily tool badge cloud (Git, Linux, Docker, VS Code, Postman, etc.).
- **Interactive Featured Projects Grid**:
  - Category filters: *All Projects*, *Full-Stack Web*, *IT & Networking*, *Database & Systems*.
  - **Full Architectural Modals**: Clicking any project opens a breakdown with system overview, tech stack, and key highlights.
- **Interactive Resume / CV Viewer & PDF Print**:
  - Built-in formatted curriculum vitae modal.
  - Dedicated **"Print / Save PDF"** button with clean print stylesheet for instant exporting.
- **Interactive Contact Section**:
  - Direct communication channels (Email, Phone, Telegram, Location).
  - One-click **Copy Email to Clipboard** with instant toast feedback.
  - Validated contact form with simulated dispatch and feedback notifications.
- **Fully Responsive**: Optimized for phones, tablets, laptops, and ultra-wide screens. Zero build tools or dependencies required to run!

---

## 📂 Project Structure

```
portifo/
├── index.html         # Main HTML5 semantic structure & modals
├── css/
│   └── style.css      # Custom styling, dark/light variables & responsive rules
├── js/
│   └── main.js        # Typewriter, canvas particles, modals, filters & toasts
└── README.md          # Project guide & instructions
```

---

## 🌐 How to View & Run Locally

### Option 1: Direct File Open (Zero Setup)
Simply navigate to your `portifo` folder on your computer and **double-click `index.html`**. It will open instantly in Google Chrome, Microsoft Edge, Mozilla Firefox, or Brave!

### Option 2: Live Server (VS Code)
1. Open this folder in **VS Code**.
2. Right-click on `index.html` and choose **"Open with Live Server"**.

### Option 3: Python or Node Server (Optional)
If you have Python installed, in PowerShell run:
```powershell
python -m http.server 3000
```
Then visit `http://localhost:3000` in your browser.

---

## 🎨 How to Personalize

1. **Profile Photo**:
   - In `index.html`, find `.avatar-placeholder` inside `.avatar-img-box`. You can replace the initials with your real photo by placing an image (e.g. `assets/meles.jpg`) and using `<img src="assets/meles.jpg" alt="Meles Silesh" class="avatar-photo" />`.
2. **Contact Details**:
   - Update your actual phone number, Telegram handle (`@melessilesh`), or LinkedIn URL in both `index.html` and the resume modal section.
3. **Projects**:
   - You can edit the project titles and descriptions in `index.html` or adjust the modal details in `js/main.js` inside the `projectData` object.

---

## 🚀 Free 1-Click Deployment

### 1. GitHub Pages (Recommended)
1. Initialize a git repository and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/meles-portfolio.git
   git push -u origin main
   ```
2. On GitHub, go to **Settings** > **Pages** > select **Deploy from branch `main`**.
3. Your site is live at `https://YOUR_USERNAME.github.io/meles-portfolio/`!

### 2. Vercel or Netlify
- Drag and drop the `portifo` folder directly onto [Netlify Drop](https://app.netlify.com/drop) or import from GitHub on [Vercel](https://vercel.com) for instantaneous deployment with a free custom SSL domain.

---

Designed for **Meles Silesh** • 4th-Year Information Technology Student.
