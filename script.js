/* ==========================================
   CONCERT EXPERIENCE v2 — script.js
   ========================================== */

// ============================================================
// CONFIG — Edit this section to match your content
// ============================================================

const CONFIG = {
  songName: "Your Song Title Here",
  audioSrc: "audio/concert-song.mp3",

  /*
    PERSONS array — define each individual who has a gallery.
    - name:   Display name shown on card and gallery header
    - cover:  Path to the cover/thumbnail image for the main grid
    - photos: Array of paths to all photos of this person

    Example:
    {
      name: "AMARA",
      cover: "images/amara/cover.jpg",
      photos: [
        "images/amara/photo1.jpg",
        "images/amara/photo2.jpg",
        "images/amara/photo3.jpg",
      ]
    }

    FOLDER STRUCTURE TIP:
    Create one subfolder per person inside /images/:
      images/
        amara/cover.jpg
        amara/photo1.jpg
        amara/photo2.jpg
        kojo/cover.jpg
        kojo/photo1.jpg
        ...
  */
  persons: [
    {
      name: "PERSON 1",
      cover: "images/person1/cover.jpg",
      photos: [
        "images/person1/photo1.jpg",
        "images/person1/photo2.jpg",
        "images/person1/photo3.jpg",
        "images/person1/photo4.jpg",
      ]
    },
    {
      name: "PERSON 2",
      cover: "images/person2/cover.jpg",
      photos: [
        "images/person2/photo1.jpg",
        "images/person2/photo2.jpg",
        "images/person2/photo3.jpg",
      ]
    },
    {
      name: "PERSON 3",
      cover: "images/person3/cover.jpg",
      photos: [
        "images/person3/photo1.jpg",
        "images/person3/photo2.jpg",
        "images/person3/photo3.jpg",
        "images/person3/photo4.jpg",
        "images/person3/photo5.jpg",
      ]
    },
    {
      name: "PERSON 4",
      cover: "images/person4/cover.jpg",
      photos: [
        "images/person4/photo1.jpg",
        "images/person4/photo2.jpg",
        "images/person4/photo3.jpg",
      ]
    },
    {
      name: "PERSON 5",
      cover: "images/person5/cover.jpg",
      photos: [
        "images/person5/photo1.jpg",
        "images/person5/photo2.jpg",
        "images/person5/photo3.jpg",
        "images/person5/photo4.jpg",
      ]
    },
    {
      name: "PERSON 6",
      cover: "images/person6/cover.jpg",
      photos: [
        "images/person6/photo1.jpg",
        "images/person6/photo2.jpg",
      ]
    },
  ],
};

// ============================================================
// DOM REFS
// ============================================================

const introScreen      = document.getElementById('intro-screen');
const experienceScreen = document.getElementById('experience-screen');
const audioPlayer      = document.getElementById('audio-player');
const progressBar      = document.getElementById('progress-bar');
const songNameEl       = document.getElementById('song-name');
const personGrid       = document.getElementById('person-grid');
const mainGridView     = document.getElementById('main-grid-view');
const galleryView      = document.getElementById('gallery-view');
const individualGrid   = document.getElementById('individual-grid');
const galleryPersonName = document.getElementById('gallery-person-name');
const hudTitle         = document.getElementById('hud-title');
const hudBackBtn       = document.getElementById('hud-back-btn');
const lightbox         = document.getElementById('lightbox');
const lightboxImg      = document.getElementById('lightbox-img');

// ============================================================
// ENTER EXPERIENCE
// ============================================================

function enterExperience() {
  // Set song info
  audioPlayer.src = CONFIG.audioSrc;
  songNameEl.textContent = CONFIG.songName;

  // Start audio (requires user gesture — the button is the gesture)
  audioPlayer.play().catch(() => {
    console.warn('Audio autoplay blocked by browser.');
  });

  // Animate intro out
  introScreen.classList.add('exit');

  setTimeout(() => {
    introScreen.style.display = 'none';
    buildPersonGrid();
    experienceScreen.style.display = 'flex';
    experienceScreen.offsetHeight; // reflow
    experienceScreen.classList.add('active');
  }, 700);
}

// ============================================================
// BUILD MAIN PERSON GRID
// ============================================================

function buildPersonGrid() {
  personGrid.innerHTML = '';

  CONFIG.persons.forEach((person, index) => {
    const card = document.createElement('div');
    card.className = 'person-card';
    card.onclick = () => openGallery(index);

    // Try image; fall back to placeholder
    const imgEl = new Image();
    imgEl.className = 'person-card-img';
    imgEl.alt = person.name;

    imgEl.onerror = () => {
      card.innerHTML = `
        <div class="person-card-placeholder">
          <div class="person-card-num">${String(index + 1).padStart(2, '0')}</div>
        </div>
        <div class="person-card-label">
          ${person.name}
          <span class="person-card-count">${person.photos.length} PHOTO${person.photos.length !== 1 ? 'S' : ''}</span>
        </div>
        <div class="person-card-tap">👆</div>
      `;
    };

    imgEl.onload = () => {
      card.innerHTML = '';
      card.appendChild(imgEl);
      card.insertAdjacentHTML('beforeend', `
        <div class="person-card-label">
          ${person.name}
          <span class="person-card-count">${person.photos.length} PHOTO${person.photos.length !== 1 ? 'S' : ''}</span>
        </div>
        <div class="person-card-tap">👆</div>
      `);
    };

    // Set placeholder first, then attempt load
    card.innerHTML = `
      <div class="person-card-placeholder">
        <div class="person-card-num">${String(index + 1).padStart(2, '0')}</div>
      </div>
      <div class="person-card-label">
        ${person.name}
        <span class="person-card-count">${person.photos.length} PHOTO${person.photos.length !== 1 ? 'S' : ''}</span>
      </div>
      <div class="person-card-tap">👆</div>
    `;

    imgEl.src = person.cover;

    personGrid.appendChild(card);
  });
}

// ============================================================
// OPEN INDIVIDUAL GALLERY
// ============================================================

function openGallery(personIndex) {
  const person = CONFIG.persons[personIndex];
  if (!person) return;

  // Build individual gallery
  individualGrid.innerHTML = '';
  galleryPersonName.textContent = person.name;

  person.photos.forEach((photoSrc, i) => {
    const cell = document.createElement('div');
    cell.className = 'gallery-cell';
    cell.onclick = () => openLightbox(photoSrc);

    const img = new Image();
    img.alt = `${person.name} – photo ${i + 1}`;

    img.onload = () => {
      cell.innerHTML = '';
      cell.appendChild(img);
    };

    img.onerror = () => {
      cell.innerHTML = `<div class="gallery-cell-placeholder">${String(i + 1).padStart(2, '0')}</div>`;
    };

    cell.innerHTML = `<div class="gallery-cell-placeholder">${String(i + 1).padStart(2, '0')}</div>`;
    img.src = photoSrc;

    individualGrid.appendChild(cell);
  });

  // Switch views
  mainGridView.style.display = 'none';
  galleryView.style.display = 'block';
  galleryView.scrollTop = 0;

  // Animate in
  requestAnimationFrame(() => {
    galleryView.style.opacity = '1';
    galleryView.style.transition = 'opacity 0.35s ease';
  });

  // Update HUD
  hudTitle.textContent = person.name;
  hudBackBtn.classList.add('visible');
}

// ============================================================
// CLOSE GALLERY — BACK TO MAIN GRID
// ============================================================

function closeGallery() {
  galleryView.style.opacity = '0';
  galleryView.style.transition = 'opacity 0.25s ease';

  setTimeout(() => {
    galleryView.style.display = 'none';
    mainGridView.style.display = 'block';
    mainGridView.scrollTop = 0;
    hudTitle.textContent = 'FEEL THE NIGHT';
    hudBackBtn.classList.remove('visible');
    individualGrid.innerHTML = '';
  }, 260);
}

// ============================================================
// LIGHTBOX
// ============================================================

function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightboxImg.src = '';
}

// ============================================================
// AUDIO PROGRESS
// ============================================================

audioPlayer.addEventListener('timeupdate', () => {
  if (!audioPlayer.duration) return;
  const pct = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.style.width = pct + '%';
});
