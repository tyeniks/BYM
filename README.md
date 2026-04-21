# 🎵 CONCERT EXPERIENCE — Setup & Deployment Guide

## Folder Structure

```
concert-experience/
├── index.html         ← Main page (don't rename)
├── style.css          ← Styles
├── script.js          ← Logic + CONFIG
├── audio/
│   └── concert-song.mp3   ← Your music file
└── images/
    ├── photo1.jpg
    ├── photo2.jpg
    └── ... (up to 40 photos)
```

---

## Step 1 — Add Your Content

### Music
- Encode your song as MP3, 128kbps, max 5MB
- Save it as `audio/concert-song.mp3`

### Photos
- Resize to max 1200px wide
- Save as JPG or WebP, 100–200KB each
- Name them: `photo1.jpg`, `photo2.jpg`, etc.
- Place in the `images/` folder

---

## Step 2 — Update script.js CONFIG

Open `script.js` and edit the top CONFIG block:

```js
const CONFIG = {
  songName: "Your Artist – Song Name",   // Shown in the UI
  audioSrc: "audio/concert-song.mp3",

  images: [
    "images/photo1.jpg",
    "images/photo2.jpg",
    // list ALL your image filenames here
  ],

  slideDuration: 4000,  // milliseconds per slide (4000 = 4 seconds)
};
```

---

## Step 3 — Deploy to Vercel (Free)

1. Create a free account at [vercel.com](https://vercel.com)
2. Create a new GitHub repository
3. Upload all project files (maintaining folder structure)
4. Go to Vercel → New Project → Import your GitHub repo
5. Click Deploy — done!
6. Your live URL will look like: `https://your-project.vercel.app`

---

## Step 4 — Generate QR Code

1. Go to [qrcode-monkey.com](https://qrcode-monkey.com)
2. Paste your Vercel URL
3. Set error correction: **High**
4. Download as **SVG** (best for printing)

---

## Step 5 — Print on T-Shirts

- Minimum QR code size: **3–4 cm**
- Print on flat area of shirt (avoid seams/curves)
- Test scan before mass production!

---

## Customization Tips

### Change Event Title
In `index.html`, find and update:
- `FEEL THE NIGHT` → your event name (3 short words work best)
- `LIVE TONIGHT` in the ticker → your event tagline
- `FEEL THE NIGHT` in the HUD center → your event name

### Change Slide Duration
In `script.js` CONFIG: `slideDuration: 4000` (milliseconds)

### Change Slide Transition Speed
In `style.css`, find `.slide` and adjust `transition: opacity 1s`

---

## Performance Tips

- Keep total image folder under 8MB
- Use WebP format when possible (30% smaller than JPG)
- Test on real phones before the event!
- Vercel CDN handles thousands of simultaneous scans 🚀
