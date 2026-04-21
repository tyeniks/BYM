# 🎵 CONCERT EXPERIENCE v2 — Setup Guide

## Folder Structure

```
concert-experience/
├── index.html
├── style.css
├── script.js
├── audio/
│   └── concert-song.mp3
└── images/
    ├── company-logo.png       ← Your company logo (top left of intro page)
    ├── sponsor1.png           ← Sponsor logos (white/transparent background recommended)
    ├── sponsor2.png
    ├── sponsor3.png
    ├── sponsor4.png
    ├── sponsor5.png
    ├── person1/
    │   ├── cover.jpg          ← Thumbnail shown on main grid
    │   ├── photo1.jpg
    │   └── photo2.jpg
    ├── person2/
    │   ├── cover.jpg
    │   └── photo1.jpg
    └── ...
```

---

## Step 1 — Company Logo
- Save as `images/company-logo.png`
- Use a white or transparent-background version
- It will appear top-left on the intro screen

## Step 2 — Sponsor Logos
- Save as `images/sponsor1.png` through `sponsor5.png`
- White or transparent background works best
- They scroll automatically in a loop

## Step 3 — Nav Buttons
- Open `index.html` and find the `.nav-links` section
- Replace the `href="#"` placeholders with your real URLs

## Step 4 — Person Galleries
- Create one subfolder per person inside `/images/`
- Add a `cover.jpg` (grid thumbnail) and all their photos
- Edit the `CONFIG.persons` array in `script.js`:

```js
persons: [
  {
    name: "AMARA",
    cover: "images/amara/cover.jpg",
    photos: [
      "images/amara/photo1.jpg",
      "images/amara/photo2.jpg",
    ]
  },
  // ... add one block per person
]
```

## Step 5 — Music
- Save as `audio/concert-song.mp3` (MP3, 128kbps, max 5MB)
- Update `CONFIG.songName` in `script.js`

## Step 6 — Deploy to Vercel (Free)
1. Push all files to a GitHub repository
2. Go to vercel.com → New Project → Import repo
3. Click Deploy → get your live URL

## Step 7 — QR Code
1. Go to qrcode-monkey.com
2. Paste your Vercel URL
3. Download as SVG
4. Print on shirts (min 3–4cm size, flat surface)
