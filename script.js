/* ==========================================
   CONCERT EXPERIENCE — script.js
   ========================================== */

// ---- CONFIG ----
// Update these to match your actual files.
const CONFIG = {
  songName: "Your Song Title Here",  // Display name shown in the UI
  audioSrc: "audio/concert-song.mp3",

  // Add your image filenames here.
  // Place images in /images/ folder.
  images: [
    "images/photo1.jpg",
    "images/photo2.jpg",
    "images/photo3.jpg",
    "images/photo4.jpg",
    "images/photo5.jpg",
    "images/photo6.jpg",
    "images/photo7.jpg",
    "images/photo8.jpg",
    "images/photo9.jpg",
    "images/photo10.jpg",
    // ... add more as needed
  ],

  // How long each slide shows (milliseconds)
  slideDuration: 4000,

  // If true, generates placeholder slides when images fail to load
  usePlaceholderFallback: true,
};

// ---- STATE ----
let currentSlide = 0;
let slideInterval = null;
let slides = [];
let totalSlides = 0;

// ---- DOM REFS ----
const introScreen = document.getElementById('intro-screen');
const experienceScreen = document.getElementById('experience-screen');
const slideshow = document.getElementById('slideshow');
const audioPlayer = document.getElementById('audio-player');
const progressBar = document.getElementById('progress-bar');
const hudCounter = document.getElementById('hud-counter');
const dotsContainer = document.getElementById('dots-container');
const songNameEl = document.getElementById('song-name');

// ---- ENTER EXPERIENCE ----
function enterExperience() {
  // Update audio source & display name from config
  audioPlayer.src = CONFIG.audioSrc;
  songNameEl.textContent = CONFIG.songName;

  // Attempt audio play (requires user gesture — this button IS the gesture)
  audioPlayer.play().catch(() => {
    // Audio blocked — show a gentle indicator but don't break experience
    console.warn('Audio autoplay blocked.');
  });

  // Animate intro out
  introScreen.classList.add('exit');

  // Build and show experience after short delay
  setTimeout(() => {
    introScreen.style.display = 'none';
    buildSlideshow();
    experienceScreen.style.display = 'block';
    // Trigger reflow for transition
    experienceScreen.offsetHeight;
    experienceScreen.classList.add('active');
    startSlideshow();
  }, 700);
}

// ---- BUILD SLIDESHOW ----
function buildSlideshow() {
  slideshow.innerHTML = '';
  dotsContainer.innerHTML = '';
  slides = [];

  const imageList = CONFIG.images;
  totalSlides = imageList.length;

  imageList.forEach((src, i) => {
    // Create slide element
    const slide = document.createElement('div');
    slide.className = 'slide';

    if (CONFIG.usePlaceholderFallback) {
      // Try loading the image; fall back to placeholder on error
      const img = new Image();
      img.onload = () => {
        slide.style.backgroundImage = `url('${src}')`;
        slide.innerHTML = ''; // remove placeholder if it was set
      };
      img.onerror = () => {
        // Show styled placeholder
        slide.innerHTML = `
          <div class="slide-placeholder">
            <div class="slide-placeholder-num">${String(i + 1).padStart(2, '0')}</div>
            <div class="slide-placeholder-label">Photo ${i + 1}</div>
          </div>
        `;
      };

      // Set placeholder immediately, then check image
      slide.innerHTML = `
        <div class="slide-placeholder">
          <div class="slide-placeholder-num">${String(i + 1).padStart(2, '0')}</div>
          <div class="slide-placeholder-label">Photo ${i + 1}</div>
        </div>
      `;
      img.src = src;
    } else {
      slide.style.backgroundImage = `url('${src}')`;
    }

    slideshow.appendChild(slide);
    slides.push(slide);

    // Create dot
    const dot = document.createElement('div');
    dot.className = 'dot';
    dotsContainer.appendChild(dot);
  });

  updateCounter();
}

// ---- SLIDESHOW CONTROLS ----
function startSlideshow() {
  showSlide(0);
  slideInterval = setInterval(nextSlide, CONFIG.slideDuration);
}

function showSlide(index) {
  // Bounds check
  if (index < 0) index = totalSlides - 1;
  if (index >= totalSlides) index = 0;

  // Remove active from old
  slides.forEach((s, i) => {
    s.classList.remove('active');
    const dot = dotsContainer.children[i];
    if (dot) {
      dot.classList.remove('active');
      if (i < index) dot.classList.add('visited');
    }
  });

  // Activate new
  currentSlide = index;
  slides[currentSlide].classList.add('active');
  const activeDot = dotsContainer.children[currentSlide];
  if (activeDot) {
    activeDot.classList.add('active');
    activeDot.classList.remove('visited');
  }

  updateCounter();
}

function nextSlide() {
  showSlide((currentSlide + 1) % totalSlides);
}

function updateCounter() {
  hudCounter.textContent =
    `${String(currentSlide + 1).padStart(2, '0')} / ${String(totalSlides).padStart(2, '0')}`;
}

// ---- AUDIO PROGRESS ----
audioPlayer.addEventListener('timeupdate', () => {
  if (!audioPlayer.duration) return;
  const pct = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.style.width = pct + '%';
});

// ---- TOUCH NAVIGATION (optional swipe) ----
let touchStartX = 0;

document.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });

document.addEventListener('touchend', (e) => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    clearInterval(slideInterval);
    if (diff > 0) {
      nextSlide();
    } else {
      showSlide(currentSlide - 1);
    }
    slideInterval = setInterval(nextSlide, CONFIG.slideDuration);
  }
}, { passive: true });
