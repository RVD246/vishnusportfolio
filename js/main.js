/* ─────────────────────────────────────────────────────────────
   main.js  —  Vishnu Raveendran Portfolio
───────────────────────────────────────────────────────────── */

let lightboxItems = [];
let lightboxIndex = 0;

/* ─── Constants ──────────────────────────────────────────────── */
const IMG_EXTS = ['webp', 'jpg'];

/* ─── Utilities ──────────────────────────────────────────────── */

function projectURL(id) {
  return `project?id=${id}`;
}

function currentPage() {
  const path = window.location.pathname;
  const p = path.split('/').pop() || 'index.html';
  if (p === '' || p === 'index.html' || p === 'index') return 'home';
  if (p === 'projects.html' || p === 'projects')       return 'projects';
  if (p === 'project.html'  || p === 'project')        return 'project';
  if (p === 'about.html'    || p === 'about')          return 'about';
  if (p === 'contact.html'  || p === 'contact')        return 'contact';
  return 'home';
}

// Try a queue of src paths on an img element until one loads.
// Reads fallbacks from data-fallbacks attribute.
function imgFallback(img) {
  const queue = JSON.parse(img.dataset.fallbacks || '[]');
  function next() {
    if (!queue.length) {
      img.style.display = 'none';
      if (img.nextElementSibling) img.nextElementSibling.style.display = 'flex';
      return;
    }
    img.onerror = next;
    img.src = queue.shift();
  }
  next();
}

// Build array of src paths for a base name across all extensions
function extSrcs(dir, name, exts) {
  return exts.map(e => `${dir}${name}.${e}`);
}

// Probe a single image name across all extensions, returns src or null
function probeImage(dir, name) {
  return new Promise(resolve => {
    const queue = [...IMG_EXTS];
    function next() {
      if (!queue.length) return resolve(null);
      const src = `${dir}${name}.${queue.shift()}`;
      const img = new Image();
      img.onload  = () => resolve(src);
      img.onerror = next;
      img.src = src;
    }
    next();
  });
}

// Probe ss1..ss50 all in parallel, return found ones in order
async function probeScreenshots(dir) {
  const MAX = 50;
  const promises = [];

  for (let n = 1; n <= MAX; n++) {
    promises.push(probeImage(dir, `ss${n}`));
  }

  const results = await Promise.all(promises);

  // Filter out nulls but preserve order
  return results.filter(Boolean);
}

// YouTube helpers
function youtubeThumbnail(id) {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}
function youtubeEmbed(id) {
  return `https://www.youtube.com/embed/${id}?autoplay=1&controls=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&color=white`;
}

/* ─── Nav dropdown ───────────────────────────────────────────── */

function buildDropdown() {
  const menu = document.getElementById('dropdownMenu');
  if (!menu) return;

  const full  = PROJECTS.filter(p => p.tier === 'full');
  const minor = PROJECTS.filter(p => p.tier === 'minor');

  let html = `<div class="nav-dropdown-section">Projects</div>`;
  full.forEach(p => {
    const trophy = p.awards.length
      ? `<i class="ti ti-trophy nav-dropdown-item-trophy" aria-hidden="true"></i>` : '';
    html += `
      <a href="${projectURL(p.id)}" class="nav-dropdown-item">
        <span class="nav-dropdown-item-name">${p.title}</span>
        ${trophy}
        <span class="nav-dropdown-item-tag">${p.genre}</span>
      </a>`;
  });

  if (minor.length) {
    html += `<div class="nav-dropdown-divider"></div>
             <div class="nav-dropdown-section">Earlier Work</div>`;
    minor.forEach(p => {
      html += `
        <a href="${projectURL(p.id)}" class="nav-dropdown-item">
          <span class="nav-dropdown-item-name">${p.title}</span>
          <span class="nav-dropdown-item-tag">${p.genre}</span>
        </a>`;
    });
  }

  menu.innerHTML = html;
}

function toggleDropdown() {
  document.getElementById('workDropdown').classList.toggle('open');
}

document.addEventListener('click', e => {
  const dd = document.getElementById('workDropdown');
  if (dd && !dd.contains(e.target)) dd.classList.remove('open');
});

/* ─── Mobile nav ─────────────────────────────────────────────── */

function buildMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (!menu) return;

  const full  = PROJECTS.filter(p => p.tier === 'full');
  const minor = PROJECTS.filter(p => p.tier === 'minor');

  // Main level
  const mainHTML = `
    <div class="mob-main">
      <a href="/">Home</a>
      <button class="mob-projects-btn" onclick="mobileMenuShowProjects()">
        Work <i class="ti ti-chevron-right" style="font-size:12px;float:right;margin-top:2px;"></i>
      </button>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
      <a href="cv.pdf" target="_blank">CV ↗</a>
    </div>`;

  // Projects sub-level
  let projHTML = `
    <div class="mob-projects" style="display:none;">
      <button class="mob-back-btn" onclick="mobileMenuShowMain()">
        <i class="ti ti-arrow-left" style="font-size:12px;margin-right:6px;"></i> Back
      </button>
      <div class="nav-mobile-section">Professional</div>`;

  full.forEach(p => { projHTML += `<a href="${projectURL(p.id)}">${p.title}</a>`; });
  projHTML += `<div class="nav-mobile-section">Earlier Work</div>`;
  minor.forEach(p => { projHTML += `<a href="${projectURL(p.id)}">${p.title}</a>`; });
  projHTML += `</div>`;

  menu.innerHTML = mainHTML + projHTML;
}

function mobileMenuShowProjects() {
  document.querySelector('.mob-main').style.display = 'none';
  document.querySelector('.mob-projects').style.display = 'block';
}

function mobileMenuShowMain() {
  document.querySelector('.mob-projects').style.display = 'none';
  document.querySelector('.mob-main').style.display = 'block';
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const isOpen = menu.classList.toggle('open');
  // Always reset to main level when opening
  if (isOpen) {
    const main = menu.querySelector('.mob-main');
    const proj = menu.querySelector('.mob-projects');
    if (main) main.style.display = 'block';
    if (proj) proj.style.display = 'none';
  }
}

/* ─── Footer ─────────────────────────────────────────────────── */

function buildFooter() {
  const copy  = document.getElementById('footerCopy');
  const links = document.getElementById('footerLinks');
  if (copy)  copy.textContent = `${SITE.name} · © ${new Date().getFullYear()}`;
  if (links) links.innerHTML  = `
    <a href="${SITE.linkedin}" target="_blank" rel="noopener">
      <i class="ti ti-brand-linkedin" aria-hidden="true"></i> LinkedIn
    </a>
    <a href="mailto:${SITE.email}">
      <i class="ti ti-mail" aria-hidden="true"></i> Email
    </a>`;
}

/* ─── Featured carousel ──────────────────────────────────────── */

function buildFeatured() {
  const wrap = document.getElementById('featured');
  if (!wrap) return;

  const featured = PROJECTS
    .filter(p => p.featured)
    .sort((a, b) => a.featuredOrder - b.featuredOrder)
    .slice(0, FEATURED_COUNT);

  let slidesHTML = '';
  let dotsHTML   = '';

  featured.forEach((p, i) => {
    const trophyHTML = p.awards.length
      ? `<div class="feat-trophy">
           <i class="ti ti-trophy" aria-hidden="true"></i> ${p.awards[0]}
         </div>` : '';

    const keySrcs = extSrcs(`images/${p.id}/`, 'keyart', IMG_EXTS);
    const keyartHTML = `
      <img src="${keySrcs[0]}" alt="${p.title}" loading="eager"
        data-fallbacks='${JSON.stringify(keySrcs.slice(1))}'
        onerror="imgFallback(this)">
      <div class="feat-keyart-placeholder" style="display:none">
        <span>[ ${p.title} ]</span>
      </div>`;

    slidesHTML += `
      <div class="feat-slide${i === 0 ? ' active' : ''}">
        <div class="feat-keyart">${keyartHTML}</div>
        <div class="feat-grad"></div>
        ${trophyHTML}
        <div class="feat-content">
          <div class="feat-eyebrow">Featured Project</div>
          <div class="feat-title">${p.title}</div>
          <div class="feat-tags">
            <span class="tag tag-accent">${p.platforms[0]}</span>
            <span class="tag">${p.genre}</span>
            <span class="tag">${p.engine}</span>
            <span class="tag">${p.role}</span>
          </div>
        </div>
        <a href="${projectURL(p.id)}" class="feat-view">View Project →</a>
      </div>`;

    dotsHTML += `<button class="feat-dot${i === 0 ? ' active' : ''}"
                   onclick="featGoTo(${i})"
                   aria-label="Go to slide ${i + 1}"></button>`;
  });

  wrap.innerHTML = slidesHTML + `<div class="feat-dots">${dotsHTML}</div>`;

  let current = 0;
  let timer   = setInterval(() => featGoTo((current + 1) % featured.length), 4500);

  window.featGoTo = function(n) {
    const slides = wrap.querySelectorAll('.feat-slide');
    const dots   = wrap.querySelectorAll('.feat-dot');
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = n;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    clearInterval(timer);
    timer = setInterval(() => featGoTo((current + 1) % featured.length), 4500);
  };
}

/* ─── Drift strip ────────────────────────────────────────────── */

function buildDriftStrip() {
  const track   = document.getElementById('driftTrack');
  const countEl = document.getElementById('driftCount');
  if (!track) return;

  if (countEl) countEl.textContent = `${PROJECTS.length} projects`;

  const items = [...PROJECTS, ...PROJECTS];
  let html = '';

  items.forEach(p => {
    const srcs = [
      ...extSrcs(`images/${p.id}/`, 'cover',  IMG_EXTS),
      ...extSrcs(`images/${p.id}/`, 'keyart', IMG_EXTS)
    ];
    html += `
      <div class="drift-item">
        <img src="${srcs[0]}" alt="${p.title}" loading="lazy"
          data-fallbacks='${JSON.stringify(srcs.slice(1))}'
          onerror="imgFallback(this)">
      </div>`;
  });

  track.innerHTML = html;
}

/* ─── CD Shelf ───────────────────────────────────────────────── */

function buildShelf() {
  const fullCases  = document.getElementById('fullCases');
  const minorCases = document.getElementById('minorCases');
  const countEl    = document.getElementById('projectsCount');
  const filterBar  = document.getElementById('filterBar');
  if (!fullCases) return;

  if (countEl) countEl.textContent = `${PROJECTS.length} projects`;

  const full  = PROJECTS.filter(p => p.tier === 'full');
  const minor = PROJECTS.filter(p => p.tier === 'minor');

  fullCases.innerHTML  = full.map(p  => caseHTML(p, false)).join('');
  if (minorCases) minorCases.innerHTML = minor.map(p => caseHTML(p, true)).join('');

  if (filterBar) {
    const filters = ['All', 'VR', 'PC', 'Shipped', 'In Development', 'Jam', 'Client'];
    filterBar.innerHTML = filters.map((f, i) =>
      `<button class="filter-btn${i === 0 ? ' active' : ''}"
         onclick="applyFilter('${f}', this)">${f}</button>`
    ).join('');
  }
}

function caseHTML(p, isMinor) {
  const trophy = p.awards.length
    ? `<div class="case-trophy"><i class="ti ti-trophy" aria-hidden="true"></i></div>` : '';

  const srcs = [
    ...extSrcs(`images/${p.id}/`, 'cover',  IMG_EXTS),
    ...extSrcs(`images/${p.id}/`, 'keyart', IMG_EXTS)
  ];

  const artHTML = `
    <img class="case-img" src="${srcs[0]}" alt="${p.title}" loading="lazy"
      data-fallbacks='${JSON.stringify(srcs.slice(1))}'
      onerror="imgFallback(this)">
    <div class="case-placeholder" style="display:none">${p.title}</div>`;

  const filterTags = [
    p.platforms.some(pl => pl.toLowerCase().includes('vr')) ? 'vr' : '',
    p.platforms.some(pl => pl.toLowerCase() === 'pc')       ? 'pc' : '',
    p.type.toLowerCase().includes('shipped')                 ? 'shipped' : '',
    p.type.toLowerCase().includes('dev')                     ? 'in development' : '',
    p.type.toLowerCase().includes('jam')                     ? 'jam' : '',
    p.type.toLowerCase().includes('client')                  ? 'client' : '',
  ].filter(Boolean).join(' ');

  return `
    <a href="${projectURL(p.id)}"
       class="case-wrap${isMinor ? ' minor' : ''}"
       data-filter="${filterTags}">
      <div class="case">
        <div class="case-cover">
          ${artHTML}
          <div class="case-spine"></div>
          <div class="case-shine"></div>
          ${trophy}
        </div>
      </div>
      <div class="case-label">${p.title}</div>
    </a>`;
}

function applyFilter(filter, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  document.querySelectorAll('.case-wrap').forEach(el => {
    if (filter === 'All') {
      el.classList.remove('hidden');
    } else {
      const tags = el.dataset.filter || '';
      el.classList.toggle('hidden', !tags.includes(filter.toLowerCase()));
    }
  });

  const minorShelf = document.getElementById('minorShelf');
  if (minorShelf) {
    const visible = minorShelf.querySelectorAll('.case-wrap:not(.hidden)');
    minorShelf.style.display = visible.length === 0 ? 'none' : '';
  }
}

/* ─── Project page ───────────────────────────────────────────── */

function buildProjectPage() {
  const container = document.getElementById('projectPage');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const p  = PROJECTS.find(proj => proj.id === id);

  if (!p) {
    container.innerHTML = `
      <div style="padding:80px 36px; text-align:center;">
        <div style="font-size:12px; letter-spacing:2px; text-transform:uppercase;
             color:var(--text-dim); margin-bottom:16px;">404</div>
        <div style="font-family:var(--font-display); font-size:28px;
             color:#fff; margin-bottom:20px;">Project not found</div>
        <a href="projects.html" style="font-size:12px; color:var(--accent);">
          ← Back to all work</a>
      </div>`;
    return;
  }

  document.title = `${p.title} — Vishnu Raveendran`;

  const keySrcs = extSrcs(`images/${p.id}/`, 'keyart', IMG_EXTS);
  const keyartHTML = `
    <img src="${keySrcs[0]}" alt="${p.title}" loading="eager"
      data-fallbacks='${JSON.stringify(keySrcs.slice(1))}'
      onerror="imgFallback(this)">
    <div class="project-keyart-placeholder" style="display:none">
      <span>[ Key Art ]</span>
    </div>`;

  const platformsHTML = p.platforms
    .map(pl => `<span class="tag">${pl}</span>`).join('');

  const awardsHTML = p.awards.length
    ? `<div class="project-awards">
        ${p.awards.map(a => `
          <div class="award-row">
            <div class="award-icon">
              <i class="ti ti-trophy" aria-hidden="true"></i>
            </div>
            <div class="award-text">${a}</div>
          </div>`).join('')}
       </div>` : '';

  const linksHTML = p.links.length
    ? `<div class="project-links">
        ${p.links.map(l => `
          <a href="${l.url}" target="_blank" rel="noopener" class="link-btn">
            <i class="ti ${l.icon}" aria-hidden="true"></i> ${l.label}
          </a>`).join('')}
       </div>` : '';

  container.innerHTML = `
    <div class="breadcrumb">
      <a href="projects.html">Work</a>
      <span class="breadcrumb-sep">›</span>
      <span style="color:var(--text-muted);">${p.title}</span>
    </div>

    <div class="project-split">
      <div class="project-keyart">${keyartHTML}</div>
      <div class="project-details">
        <div class="project-type">${p.type} · ${p.genre}</div>
        <div class="project-title">${p.title}</div>
        <div class="project-divider"></div>

        <div class="meta-row">
          <div class="meta-label">Engine</div>
          <div class="meta-value meta-value-strong">${p.engine}</div>
        </div>
        <div class="meta-row">
          <div class="meta-label">Role</div>
          <div class="meta-value meta-value-strong">${p.role}</div>
        </div>
        <div class="meta-row">
          <div class="meta-label">Platforms</div>
          <div class="platform-tags">${platformsHTML}</div>
        </div>

        ${awardsHTML}
        ${linksHTML}
      </div>
    </div>

    <div class="project-body">
      <div class="body-label">About the project</div>
      <p class="project-desc">${p.description}</p>

      <div class="body-label">Screenshots &amp; Media</div>
      <div class="strip-wrap">
        <div class="strip" id="mediaStrip">
          <div style="color:var(--text-dim);font-size:11px;letter-spacing:1px;">
            Loading media…
          </div>
        </div>
      </div>
    </div>

    <footer class="footer" style="margin-top:36px;">
      <div class="footer-copy" id="footerCopy"></div>
      <div class="footer-links" id="footerLinks"></div>
    </footer>`;

  buildFooter();

  // Populate media strip: YouTube videos first, then screenshots
  lightboxItems = [];
  const dir = `images/${p.id}/`;

  // Add YouTube videos to lightboxItems immediately (no probing needed)
  const youtubeIds = p.youtube || [];
  youtubeIds.forEach(ytId => {
    lightboxItems.push({ type: 'youtube', id: ytId });
  });

  // Then probe screenshots async
  (async () => {
    const imageSrcs = await probeScreenshots(dir);
    imageSrcs.forEach(src => lightboxItems.push({ type: 'image', src }));

    const strip = document.getElementById('mediaStrip');
    if (!strip) return;

    if (!lightboxItems.length) {
      strip.innerHTML = `<div style="color:var(--text-dim);font-size:11px;
        letter-spacing:1px;">No media yet</div>`;
      return;
    }

    strip.innerHTML = lightboxItems.map((item, i) => {
      if (item.type === 'youtube') {
        const thumb = youtubeThumbnail(item.id);
        return `<div class="strip-item" onclick="openLightbox(${i})">
          <img class="strip-item-img" src="${thumb}" alt="Video ${i + 1}" loading="lazy">
          <div class="strip-item-play">
            <i class="ti ti-brand-youtube" aria-hidden="true"></i>
          </div>
        </div>`;
      }
      return `<div class="strip-item" onclick="openLightbox(${i})">
        <img class="strip-item-img" src="${item.src}"
          alt="Screenshot ${i + 1}" loading="lazy">
      </div>`;
    }).join('');
  })();
}

/* ─── About page ─────────────────────────────────────────────── */

function buildAboutPage() {
  const photo    = document.getElementById('aboutPhoto');
  const greeting = document.getElementById('aboutGreeting');
  const name     = document.getElementById('aboutName');
  const role     = document.getElementById('aboutRole');
  const bio      = document.getElementById('aboutBio');
  const links    = document.getElementById('aboutLinks');
  if (!photo) return;

  const profileSrcs = IMG_EXTS.map(e => `images/profile.${e}`);
  photo.innerHTML = `
    <img src="${profileSrcs[0]}" alt="${SITE.name}"
      data-fallbacks='${JSON.stringify(profileSrcs.slice(1))}'
      onerror="imgFallback(this)">
    <div class="about-photo-placeholder" style="display:none">
      <span>Drop profile.jpg into images/</span>
    </div>`;

  if (greeting) greeting.textContent = 'നമസ്കാരം · नमस्ते · أهلاً · سلام';
  if (name) {
    const parts = SITE.name.split(' ');
    name.innerHTML = `${parts[0]} <span>${parts.slice(1).join(' ')}</span>`;
  }
  if (role)  role.textContent  = `${SITE.role} · ${SITE.location}`;
  if (bio)   bio.textContent   = SITE.bio;
  if (links) links.innerHTML   = `
    <a href="${SITE.linkedin}" target="_blank" rel="noopener" class="about-link-btn">
      <i class="ti ti-brand-linkedin" aria-hidden="true"></i> LinkedIn
    </a>
    <a href="mailto:${SITE.email}" class="about-link-btn">
      <i class="ti ti-mail" aria-hidden="true"></i> ${SITE.email}
    </a>
    <a href="cv.pdf" target="_blank" class="about-link-btn">
      <i class="ti ti-file-cv" aria-hidden="true"></i> Download CV
    </a>`;
}

/* ─── Contact page ───────────────────────────────────────────── */

function buildContactPage() {
  const opts = document.getElementById('contactOptions');
  if (!opts) return;
  opts.innerHTML = `
    <a href="mailto:${SITE.email}" class="contact-option">
      <div class="contact-option-icon">
        <i class="ti ti-mail" aria-hidden="true"></i>
      </div>
      <div>
        <div class="contact-option-label">Email</div>
        <div class="contact-option-value">${SITE.email}</div>
      </div>
      <i class="ti ti-arrow-right contact-option-arrow" aria-hidden="true"></i>
    </a>
    <a href="${SITE.linkedin}" target="_blank" rel="noopener" class="contact-option">
      <div class="contact-option-icon">
        <i class="ti ti-brand-linkedin" aria-hidden="true"></i>
      </div>
      <div>
        <div class="contact-option-label">LinkedIn</div>
        <div class="contact-option-value">vishnu-raveendran</div>
      </div>
      <i class="ti ti-arrow-right contact-option-arrow" aria-hidden="true"></i>
    </a>
    <a href="cv.pdf" target="_blank" class="contact-option">
      <div class="contact-option-icon">
        <i class="ti ti-file-cv" aria-hidden="true"></i>
      </div>
      <div>
        <div class="contact-option-label">CV / Resume</div>
        <div class="contact-option-value">Download PDF</div>
      </div>
      <i class="ti ti-arrow-right contact-option-arrow" aria-hidden="true"></i>
    </a>

    <div class="contact-form-wrap">
      <form id="contactForm" action="${SITE.formspree}" method="POST">
        <div class="contact-form-row">
          <div class="contact-form-field">
            <label class="contact-form-label">Name</label>
            <input class="contact-form-input" type="text" name="name" placeholder="Your name" required>
          </div>
          <div class="contact-form-field">
            <label class="contact-form-label">Email</label>
            <input class="contact-form-input" type="email" name="email" placeholder="your@email.com" required>
          </div>
        </div>
        <div class="contact-form-field">
          <label class="contact-form-label">Subject</label>
          <select class="contact-form-input contact-form-select" name="subject">
            <option value="Hiring">Hiring</option>
            <option value="Collaboration">Collaboration</option>
            <option value="General">General</option>
          </select>
        </div>
        <div class="contact-form-field">
          <label class="contact-form-label">Message</label>
          <textarea class="contact-form-input contact-form-textarea" name="message" placeholder="What's on your mind?" required></textarea>
        </div>
        <button type="submit" class="contact-form-submit" id="contactSubmit">
          Send Message <i class="ti ti-send" aria-hidden="true"></i>
        </button>
        <div class="contact-form-status" id="contactStatus"></div>
      </form>
    </div>`;

  // Handle submission via fetch to avoid page redirect
  const form = document.getElementById('contactForm');
  const btn  = document.getElementById('contactSubmit');
  const status = document.getElementById('contactStatus');

  form.addEventListener('submit', async e => {
    e.preventDefault();
    btn.disabled = true;
    btn.textContent = 'Sending…';
    status.textContent = '';
    status.className = 'contact-form-status';

    try {
      const res = await fetch(SITE.formspree, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        form.reset();
        btn.textContent = 'Sent!';
        status.textContent = 'Message received — I\'ll get back to you soon.';
        status.classList.add('contact-form-status--ok');
        setTimeout(() => {
          btn.disabled = false;
          btn.innerHTML = 'Send Message <i class="ti ti-send" aria-hidden="true"></i>';
        }, 3000);
      } else {
        throw new Error('Server error');
      }
    } catch {
      btn.disabled = false;
      btn.innerHTML = 'Send Message <i class="ti ti-send" aria-hidden="true"></i>';
      status.textContent = 'Something went wrong. Try emailing directly.';
      status.classList.add('contact-form-status--err');
    }
  });
}

/* ─── Lightbox ───────────────────────────────────────────────── */

function openLightbox(index) {
  lightboxIndex = index;
  renderLightboxItem();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
  document.getElementById('lightboxInner').innerHTML = '';
}

function closeLightboxOutside(e) {
  if (e.target === document.getElementById('lightbox')) closeLightbox();
}

function lightboxNav(dir) {
  if (!lightboxItems.length) return;
  // Stop any playing YouTube iframe by clearing inner before switching
  document.getElementById('lightboxInner').innerHTML = '';
  lightboxIndex = (lightboxIndex + dir + lightboxItems.length) % lightboxItems.length;
  renderLightboxItem();
}

function renderLightboxItem() {
  const inner   = document.getElementById('lightboxInner');
  const counter = document.getElementById('lightboxCounter');
  const item    = lightboxItems[lightboxIndex];
  if (!item) return;

  if (item.type === 'youtube') {
    if (window.location.protocol === 'file:') {
      window.open(`https://www.youtube.com/watch?v=${item.id}`, '_blank');
      closeLightbox();
      return;
    }
    inner.innerHTML = `
      <div style="position:relative; width:85vw; max-width:1200px;">
        <iframe
          src="${youtubeEmbed(item.id)}"
          style="width:100%; aspect-ratio:16/9; border:none; border-radius:6px; display:block;"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen>
        </iframe>
      </div>`;
  } else {
    inner.innerHTML = `<img src="${item.src}" alt="Screenshot ${lightboxIndex + 1}">`;
  }

  if (counter) counter.textContent = `${lightboxIndex + 1} / ${lightboxItems.length}`;
}

document.addEventListener('keydown', e => {
  const lb = document.getElementById('lightbox');
  if (!lb || !lb.classList.contains('open')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  lightboxNav(-1);
  if (e.key === 'ArrowRight') lightboxNav(1);
});

// Touch swipe for lightbox
(function() {
  let touchStartX = 0;
  let touchStartY = 0;

  document.addEventListener('touchstart', e => {
    const lb = document.getElementById('lightbox');
    if (!lb || !lb.classList.contains('open')) return;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  document.addEventListener('touchend', e => {
    const lb = document.getElementById('lightbox');
    if (!lb || !lb.classList.contains('open')) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    // Only trigger if horizontal swipe is dominant and long enough
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      lightboxNav(dx < 0 ? 1 : -1);
    }
    // Swipe down to close
    if (dy > 80 && Math.abs(dy) > Math.abs(dx) * 1.5) {
      closeLightbox();
    }
  }, { passive: true });
})();

/* ─── Init ───────────────────────────────────────────────────── */

function init() {
  buildDropdown();
  buildMobileMenu();
  buildFooter();

  const pg = currentPage();
  if      (pg === 'home')     { buildFeatured(); buildDriftStrip(); }
  else if (pg === 'projects') { buildShelf(); }
  else if (pg === 'project')  { buildProjectPage(); }
  else if (pg === 'about')    { buildAboutPage(); buildFooter(); }
  else if (pg === 'contact')  { buildContactPage(); buildFooter(); }
}

document.addEventListener('DOMContentLoaded', init);
