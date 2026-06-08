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
      ? `<i class="ti ${p.awards.some(a => !a.startsWith('[star]')) ? 'ti-trophy' : 'ti-star'} nav-dropdown-item-trophy" aria-hidden="true"></i>` : '';
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

  menu.innerHTML = `
    <a href="/" onclick="closeMobileMenu()">Home</a>
    <a href="/projects" onclick="closeMobileMenu()">Work</a>
    <a href="/about" onclick="closeMobileMenu()">About</a>
    <a href="/contact" onclick="closeMobileMenu()">Contact</a>
    <a href="cv.pdf" target="_blank" onclick="closeMobileMenu()">CV ↗</a>`;
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const isOpen = menu.classList.toggle('open');
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.remove('open');
  document.body.style.overflow = '';
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const isOpen = menu.classList.toggle('open');
  document.body.style.overflow = isOpen ? 'hidden' : '';
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
  if (copy)  copy.textContent = `${SITE.name} · © 2018`;
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
      ? (() => {
          const a = p.awards[0];
          const icon = a.startsWith('[star]') ? 'ti-star' : 'ti-trophy';
          const text = a.replace(/^\[(trophy|star)\]/, '');
          return `<div class="feat-trophy"><i class="ti ${icon}" aria-hidden="true"></i> ${text}</div>`;
        })() : '';

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

  fullCases.innerHTML  = full.map((p, i)  => caseHTML(p, false, i + 1)).join('');
  if (minorCases) minorCases.innerHTML = minor.map((p, i) => caseHTML(p, true, i + 1)).join('');

  if (filterBar) {
    const filters = ['All', 'VR', 'PC', 'Shipped', 'In Development', 'Jam', 'Client'];
    filterBar.innerHTML = filters.map((f, i) =>
      `<button class="filter-btn${i === 0 ? ' active' : ''}"
         onclick="applyFilter('${f}', this)">${f}</button>`
    ).join('');
  }
}

function caseHTML(p, isMinor, index) {
  const trophy = p.awards.length
    ? `<div class="case-trophy"><i class="ti ${p.awards.some(a => !a.startsWith('[star]')) ? 'ti-trophy' : 'ti-star'}" aria-hidden="true"></i></div>` : '';
  const numStr = index ? String(index).padStart(2, '0') : '';
  const numHTML = numStr ? `<div class="case-num">${numStr}</div>` : '';

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
       class="case-wrap reveal${isMinor ? ' minor' : ''}"
       data-filter="${filterTags}">
      <div class="case">
        <div class="case-cover">
          ${artHTML}
          <div class="case-spine"></div>
          <div class="case-shine"></div>
          ${trophy}
        </div>
      </div>
      <div class="case-label">
        ${numHTML}
        <span>${p.title}</span>
      </div>
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
        ${p.awards.map(a => {
          const icon = a.startsWith('[star]') ? 'ti-star' : 'ti-trophy';
          const text = a.replace(/^\[(trophy|star)\]/, '');
          return `<div class="award-row">
            <div class="award-icon">
              <i class="ti ${icon}" aria-hidden="true"></i>
            </div>
            <div class="award-text">${text}</div>
          </div>`;
        }).join('')}
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

    ${p.projectStats ? `
    <div class="project-stats">
      ${p.projectStats.map(s => `
        <div class="project-stat">
          <div class="project-stat-num count-up" data-count="${s.value.replace(/[^0-9]/g,'') || '0'}" data-suffix="${s.suffix || ''}">${s.value}${s.suffix || ''}</div>
          <div class="project-stat-lbl">${s.label}</div>
        </div>`).join('')}
    </div>` : ''}

    <div class="project-body">
      ${(() => {
        const d = p.description;
        if (typeof d === 'object' && d !== null) {
          let html = '';
          if (d.about) {
            html += `<div class="body-label">About the Project</div>
              <p class="project-desc">${d.about}</p>
              <div class="section-divider"></div>`;
          }
          if (d.contributions) {
            const paras = d.contributions.split('\n\n');
            const cards = paras.map((para, i) => {
              const techKeywords = ['hardware', 'integration', 'system', 'protocol', 'engine', 'network', 'shader', 'api', 'sdk', 'serial', 'binary', 'pcg', 'procedural', 'ai ', 'physics', 'platform'];
              const lower = para.toLowerCase();
              const isTechnical = i > 0 && techKeywords.some(k => lower.includes(k));
              if (isTechnical) {
                return `<div class="contrib-card reveal">
                  <div class="contrib-card-label">Technical</div>
                  <div class="contrib-card-prefix">+</div>
                  <p>${para}</p>
                </div>`;
              }
              return `<div class="contrib-card reveal"><div class="contrib-card-prefix">+</div><p>${para}</p></div>`;
            }).join('');
            html += `<div class="body-label">My Contributions</div>
              <div class="contrib-list">${cards}</div>
              <div class="section-divider"></div>`;
          }
          if (d.problem) {
            html += `<div class="body-label">The Problem</div>
              <div class="contrib-card"><p class="project-desc">${d.problem}</p></div>
              <div class="section-divider"></div>`;
          }
          if (d.solution) {
            html += `<div class="body-label">How I Solved It</div>
              <div class="contrib-card"><p class="project-desc">${d.solution}</p></div>
              <div class="section-divider"></div>`;
          }
          if (d.notable) {
            const items = d.notable.split(' · ').map(item => {
              let icon = 'ti-star';
              let text = item;
              if (item.startsWith('[trophy]')) { icon = 'ti-trophy'; text = item.slice(8); }
              else if (item.startsWith('[star]')) { icon = 'ti-star'; text = item.slice(6); }
              return `<div class="notable-item"><i class="ti ${icon}" aria-hidden="true"></i><span>${text}</span></div>`;
            }).join('');
            html += `<div class="body-label">Notable</div><div class="notable-list">${items}</div>`;
          }
          return html;
        }
        return `<div class="body-label">About the Project</div><p class="project-desc">${d}</p>`;
      })()}

      <div class="section-divider"></div>
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
  if (role)  role.textContent  = SITE.role;
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

/* ─── About stats ────────────────────────────────────────────── */

function buildAboutStats() {
  const wrap = document.getElementById('aboutStats');
  if (!wrap || !SITE.stats) return;
  wrap.innerHTML = `
    <div class="about-stats">
      ${SITE.stats.map(s => `
        <div class="stat-item${s.bar > 0 ? ' has-bar' : ''}">
          <div class="stat-value">${s.value}</div>
          <div class="stat-label">${s.label}</div>
          ${s.bar > 0 ? `<div class="stat-bar-wrap"><div class="stat-bar-fill" data-fill="${s.bar}"></div></div>` : ''}
        </div>`).join('')}
    </div>`;
  initXPBars();
}

/* ─── Events attended ────────────────────────────────────────── */

const EVENTS = [
  {
    name: "Heritage Gameathon",
    pass: "Attendee",
    year: "2026",
    location: "Abu Dhabi",
    desc: "AD Gaming x Unity x Abu Dhabi Heritage Authority jam. Built Atlantis of the Sands, placed Runner-Up.",
    img: "attended/heritage-gameathon-2026"
  },
  {
    name: "Middle East Film & Comic Con",
    pass: "Exhibitor",
    year: "April 2025",
    location: "Abu Dhabi",
    desc: "Exhibited Shadow Dreams and Glitchcore. 3-day exhibitor at ADNEC.",
    img: "attended/mefcc-2025"
  },
  {
    name: "Unity U/Day 2025",
    pass: "Attendee",
    year: "2025",
    location: "Abu Dhabi",
    desc: "Unity x Abu Dhabi Gaming developer conference.",
    img: "attended/uday-2025"
  },
  {
    name: "Tokyo Game Show 2024",
    pass: "Exhibitor",
    year: "Sept 2024",
    location: "Tokyo",
    desc: "Exhibited Shadow Dreams under Abu Dhabi Gaming. PlayStation visited the booth. Shown in English, Arabic, and Japanese.",
    img: "attended/tgs-2024"
  },
  {
    name: "Middle East Film & Comic Con",
    pass: "Exhibitor",
    year: "Feb 2024",
    location: "Abu Dhabi",
    desc: "Exhibited Box To The Beat and Shadow Dreams. 3-day exhibitor at ADNEC.",
    img: "attended/mefcc-2024"
  },
  {
    name: "Unity U/Day Abu Dhabi",
    pass: "Attendee",
    year: "2024",
    location: "Abu Dhabi",
    desc: "Unity x Abu Dhabi Gaming developer conference.",
    img: "attended/uday-abu-dhabi"
  },
  {
    name: "Sawalef Gaming",
    pass: "Attendee",
    year: "2024",
    location: "Abu Dhabi",
    desc: "AD Gaming x Epic Games x Unreal Engine developer event.",
    img: "attended/sawalef-gaming"
  },
  {
    name: "BLAST Premier World Final",
    pass: "Production AAA",
    year: "Dec 2023",
    location: "Abu Dhabi",
    desc: "$1M CS2 World Final at Etihad Arena. Showcased Box To The Beat at the event.",
    img: "attended/blast-premier-2023"
  },
  {
    name: "Middle East Film & Comic Con",
    pass: "Exhibitor",
    year: "March 2023",
    location: "Abu Dhabi",
    desc: "Exhibited Box To The Beat. 3-day exhibitor at ADNEC.",
    img: "attended/mefcc-2023"
  },
  {
    name: "MENA Gaming & eSports Summit",
    pass: "Delegate",
    year: "May 2023",
    location: "Dubai",
    desc: "2nd Annual MENA Gaming & eSports Summit delegate.",
    img: "attended/mena-gaming-summit-2023"
  },
  {
    name: "WN Conference",
    pass: "Standard Pass",
    year: "2023",
    location: "Abu Dhabi",
    desc: "Global game industry dealmaking event. 1,500+ publishers and investors. Showcased Box To The Beat.",
    img: "attended/wn-conference-2023"
  },
  {
    name: "Games for Change Summit",
    pass: "Attendee",
    year: "2023",
    location: "Abu Dhabi",
    desc: "International summit on social impact through gaming. Showcased Box To The Beat at the event.",
    img: "attended/games-for-change-2023"
  },
  {
    name: "PlayStation Develop",
    pass: "Develop Path",
    year: "2023",
    location: "Dubai",
    desc: "Sony PlayStation developer conference. Attended the Develop path alongside commercial PSVR2 release.",
    img: "attended/playstation-develop-2023"
  },
  {
    name: "GITEX Global 2021",
    pass: "Exhibitor",
    year: "Oct 2021",
    location: "Dubai",
    desc: "World's largest tech event at Dubai World Trade Centre. Showcased Box To The Beat around its launch.",
    img: "attended/gitex-2021"
  },
  {
    name: "Unity x AD Gaming",
    pass: "Attendee",
    year: "2022",
    location: "Abu Dhabi",
    desc: "First Unity x Abu Dhabi Gaming developer event held in Abu Dhabi.",
    img: "attended/unity-adgaming-2022"
  },
  {
    name: "Program Your Idea",
    pass: "Cycle 3",
    year: "School",
    location: "Abu Dhabi",
    desc: "Injazat x Dept. of Education coding programme. Where it all started — first game ever built. <a href='https://scratch.mit.edu/projects/163267059/' target='_blank' rel='noopener' style='color:var(--accent);'>View on Scratch</a>",
    img: "attended/program-your-idea"
  }
];

function buildAboutEvents() {
  const wrap = document.getElementById('aboutEvents');
  if (!wrap) return;

  const badgesHTML = EVENTS.map((ev, i) => {
    const srcs = IMG_EXTS.map(e => `images/${ev.img}.${e}`);
    return `
      <div class="ev-badge" onclick="hideEvTooltip(); openEventsLightbox(${i})"
        onmouseenter="showEvTooltip(event,${i})"
        onmouseleave="hideEvTooltip()">
        <img src="${srcs[0]}" alt="${ev.name}" loading="lazy"
          data-fallbacks='${JSON.stringify(srcs.slice(1))}'
          onerror="imgFallback(this)">
        <div class="ev-badge-placeholder" style="display:none">${ev.name}</div>
      </div>`;
  }).join('');

  wrap.innerHTML = `
    <div class="about-events-inner">
      <div style="height:0.5px; background:var(--border); margin-bottom:28px;"></div>
      <button class="ev-toggle" onclick="toggleEvents(this)" aria-expanded="false">
        <div class="ev-toggle-left">
          <i class="ti ti-ticket" aria-hidden="true"></i>
          <span class="ev-toggle-label">Events Attended</span>
          <span class="ev-toggle-count">${EVENTS.length} events</span>
        </div>
        <i class="ti ti-chevron-down ev-toggle-arrow" aria-hidden="true"></i>
      </button>
      <div class="ev-body" id="evBody">
        <div class="ev-strip-wrap" id="evStripWrap">
          <div class="ev-strip">${badgesHTML}</div>
        </div>
      </div>
    </div>`;

  // Create global tooltip element attached to body
  if (!document.getElementById('evGlobalTooltip')) {
    const tip = document.createElement('div');
    tip.id = 'evGlobalTooltip';
    tip.className = 'ev-tooltip-global';
    document.body.appendChild(tip);
  }
}

function toggleEvents(btn) {
  const body = document.getElementById('evBody');
  const arrow = btn.querySelector('.ev-toggle-arrow');
  const isOpen = body.classList.toggle('open');
  arrow.classList.toggle('open', isOpen);
  btn.setAttribute('aria-expanded', isOpen);
}

function showEvTooltip(e, index) {
  if (window.matchMedia('(hover: none)').matches) return;
  const ev = EVENTS[index];
  const tip = document.getElementById('evGlobalTooltip');
  if (!tip) return;
  tip.innerHTML = `
    <span class="ev-tooltip-pass">${ev.pass}</span>
    <div class="ev-tooltip-name">${ev.name}</div>
    <div class="ev-tooltip-year">${ev.year} · ${ev.location}</div>
    <div class="ev-tooltip-desc">${ev.desc}</div>`;
  tip.style.opacity = '1';
  tip.style.pointerEvents = ev.desc.includes('<a') ? 'auto' : 'none';
  positionEvTooltip(e, tip);
}

function positionEvTooltip(e, tip) {
  const rect = e.currentTarget.getBoundingClientRect();
  const tipW = 200;
  let left = rect.left + rect.width / 2 - tipW / 2 + window.scrollX;
  let top = rect.top - 10 + window.scrollY;
  if (left < 8) left = 8;
  if (left + tipW > window.innerWidth - 8) left = window.innerWidth - tipW - 8;
  tip.style.left = left + 'px';
  tip.style.top = top + 'px';
  tip.style.transform = 'translateY(-100%)';
}

function hideEvTooltip() {
  const tip = document.getElementById('evGlobalTooltip');
  if (tip) tip.style.opacity = '0';
}

let evLightboxIndex = 0;

function openEventsLightbox(index) {
  evLightboxIndex = index;
  renderEvLightbox();
  document.getElementById('evLightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function renderEvLightbox() {
  const inner = document.getElementById('evLightboxInner');
  if (!inner) return;
  const ev = EVENTS[evLightboxIndex];
  const srcs = IMG_EXTS.map(e => `images/${ev.img}.${e}`);
  inner.innerHTML = `
    <div class="ev-lb-img-wrap">
      <img src="${srcs[0]}" alt="${ev.name}"
        data-fallbacks='${JSON.stringify(srcs.slice(1))}'
        onerror="imgFallback(this)">
      <div class="ev-lb-counter">${evLightboxIndex + 1} / ${EVENTS.length}</div>
    </div>
    <div class="ev-lb-info">
      <span class="ev-tooltip-pass">${ev.pass}</span>
      <div class="ev-lb-name">${ev.name}</div>
      <div class="ev-lb-year">${ev.year} · ${ev.location}</div>
      <div class="ev-lb-desc">${ev.desc}</div>
    </div>`;
}

function closeEvLightbox() {
  const lb = document.getElementById('evLightbox');
  if (lb) lb.classList.remove('open');
  document.body.style.overflow = '';
}

function closeEvLightboxOutside(e) {
  if (e.target === document.getElementById('evLightbox')) closeEvLightbox();
}

function evLightboxNav(dir) {
  evLightboxIndex = (evLightboxIndex + dir + EVENTS.length) % EVENTS.length;
  renderEvLightbox();
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
  if (lb && lb.classList.contains('open')) {
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  lightboxNav(-1);
    if (e.key === 'ArrowRight') lightboxNav(1);
  }
  const evLb = document.getElementById('evLightbox');
  if (evLb && evLb.classList.contains('open')) {
    if (e.key === 'Escape')     closeEvLightbox();
    if (e.key === 'ArrowLeft')  evLightboxNav(-1);
    if (e.key === 'ArrowRight') evLightboxNav(1);
  }
});

// Touch swipe for featured carousel
(function() {
  let touchStartX = 0;
  let touchStartY = 0;
  let featLen = 0;

  document.addEventListener('touchstart', e => {
    const featured = document.getElementById('featured');
    if (!featured || !featured.contains(e.target)) return;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    featLen = featured.querySelectorAll('.feat-slide').length;
  }, { passive: true });

  document.addEventListener('touchend', e => {
    const featured = document.getElementById('featured');
    if (!featured || !featured.contains(e.target) || !featLen) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      const active = featured.querySelector('.feat-dot.active');
      const dots = Array.from(featured.querySelectorAll('.feat-dot'));
      const current = dots.indexOf(active);
      const next = (current + (dx < 0 ? 1 : -1) + featLen) % featLen;
      if (window.featGoTo) window.featGoTo(next);
    }
  }, { passive: true });
})();

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
  buildThemePanel();

  const pg = currentPage();
  if      (pg === 'home')     { buildFeatured(); buildDriftStrip(); }
  else if (pg === 'projects') { buildShelf(); }
  else if (pg === 'project')  { buildProjectPage(); setTimeout(initCountUp, 100); }
  else if (pg === 'about')    { buildAboutPage(); buildAboutStats(); buildAboutEvents(); buildFooter(); }
  else if (pg === 'contact')  { buildContactPage(); buildFooter(); }

  initScrollReveal();
}

document.addEventListener('DOMContentLoaded', init);

/* ─── Scroll reveal ──────────────────────────────────────────── */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  if (!('IntersectionObserver' in window)) {
    els.forEach(e => e.classList.add('in-view'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en, i) => {
      if (en.isIntersecting) {
        setTimeout(() => en.target.classList.add('in-view'), i * 60);
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(e => io.observe(e));
}

/* ─── XP bar animation ───────────────────────────────────────── */
function initXPBars() {
  const bars = document.querySelectorAll('.stat-bar-fill[data-fill]');
  if (!bars.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.style.width = en.target.dataset.fill + '%';
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.5 });
  bars.forEach(b => io.observe(b));
}

/* ─── Count-up numbers ───────────────────────────────────────── */
function initCountUp() {
  const nums = document.querySelectorAll('.count-up[data-count]');
  if (!nums.length) return;
  const run = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const dur = 850, start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) { run(en.target); io.unobserve(en.target); }
    });
  }, { threshold: 0.5 });
  nums.forEach(n => io.observe(n));
}

/* ─── Appearance panel ───────────────────────────────────────── */

const ACCENTS = [
  { color: '#F5C400', label: 'Gold'   },
  { color: '#00E5FF', label: 'Cyan'   },
  { color: '#FF4D8D', label: 'Pink'   },
  { color: '#D6FF3F', label: 'Acid'   },
  { color: '#B388FF', label: 'Violet' },
  { color: '#FF8A3D', label: 'Orange' },
  { color: '#FF3B3B', label: 'Red'    },
  { color: '#FFFFFF', label: 'White'  },
];

const EFFECTS = [
  { id: 'glitch', label: 'Glitch',  icon: '⚡' },
  { id: 'matrix', label: 'Matrix',  icon: '⬇' },
  { id: 'pulse',  label: 'Pulse',   icon: '◉' },
  { id: 'neon',   label: 'Neon',    icon: '✦' },
];

const activeEffects = new Set();
let effectCleanups = {};

const PREFS_KEY = 'vr_prefs';

function savePrefs() {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify({
      accent: document.documentElement.style.getPropertyValue('--accent').trim() || '#F5C400',
      effects: [...activeEffects]
    }));
  } catch(e) {}
}

function loadPrefs() {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch(e) { return null; }
}

function buildThemePanel() {
  const btn = document.createElement('button');
  btn.id = 'themePanelBtn';
  btn.innerHTML = '<i class="ti ti-palette"></i>';
  btn.setAttribute('aria-label', 'Appearance');
  document.body.appendChild(btn);

  const panel = document.createElement('div');
  panel.id = 'themePanel';
  panel.innerHTML = `
    <div class="tp-header">
      <span class="tp-title">// appearance</span>
      <button class="tp-close" id="tpClose"><i class="ti ti-x"></i></button>
    </div>
    <div class="tp-section-label">Accent</div>
    <div class="tp-accents" id="tpAccents">
      ${ACCENTS.map(a => `
        <button class="tp-accent"
          style="background:${a.color}" data-color="${a.color}"
          title="${a.label}" aria-label="${a.label}"></button>`).join('')}
    </div>
    <div class="tp-section-label">Effects</div>
    <div class="tp-effects" id="tpEffects">
      ${EFFECTS.map(e => `
        <button class="tp-effect" data-effect="${e.id}">
          <span class="tp-effect-icon">${e.icon}</span>
          <span class="tp-effect-label">${e.label}</span>
        </button>`).join('')}
    </div>`;
  document.body.appendChild(panel);

  // Restore saved prefs
  const prefs = loadPrefs();
  const savedAccent = prefs?.accent || '#F5C400';
  setAccent(savedAccent);
  // Mark active swatch
  document.querySelectorAll('.tp-accent').forEach(b => {
    b.classList.toggle('active', b.dataset.color.toUpperCase() === savedAccent.toUpperCase());
  });
  // Restore effects
  if (prefs?.effects) {
    prefs.effects.forEach(id => {
      activeEffects.add(id);
      effectCleanups[id] = startEffect(id);
      const btn = document.querySelector(`.tp-effect[data-effect="${id}"]`);
      if (btn) btn.classList.add('active');
    });
  }

  let open = false;
  btn.addEventListener('click', e => { e.stopPropagation(); open = !open; panel.classList.toggle('open', open); btn.classList.toggle('active', open); });
  document.getElementById('tpClose').addEventListener('click', () => { open = false; panel.classList.remove('open'); btn.classList.remove('active'); });
  document.addEventListener('click', e => { if (open && !panel.contains(e.target) && e.target !== btn) { open = false; panel.classList.remove('open'); btn.classList.remove('active'); } });

  document.getElementById('tpAccents').addEventListener('click', e => {
    const ab = e.target.closest('.tp-accent');
    if (!ab) return;
    document.querySelectorAll('.tp-accent').forEach(b => b.classList.remove('active'));
    ab.classList.add('active');
    setAccent(ab.dataset.color);
    savePrefs();
  });

  document.getElementById('tpEffects').addEventListener('click', e => {
    const eb = e.target.closest('.tp-effect');
    if (!eb) return;
    const id = eb.dataset.effect;
    eb.classList.toggle('active');
    if (eb.classList.contains('active')) {
      activeEffects.add(id);
      effectCleanups[id] = startEffect(id);
    } else {
      activeEffects.delete(id);
      if (effectCleanups[id]) { effectCleanups[id](); delete effectCleanups[id]; }
      stopEffect(id);
    }
    savePrefs();
  });
}

function setAccent(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  const root = document.documentElement;
  root.style.setProperty('--accent',        hex);
  root.style.setProperty('--accent-dim',    `rgba(${r},${g},${b},0.08)`);
  root.style.setProperty('--accent-border', `rgba(${r},${g},${b},0.25)`);
  root.style.setProperty('--border-hover',  `rgba(${r},${g},${b},0.5)`);
  document.querySelectorAll('.bg-glow').forEach(el => el.style.background = hex);
}

function startEffect(id) {
  document.body.classList.add(`fx-${id}`);
  if (id === 'glitch') return startGlitch();
  if (id === 'matrix') return startRain();
  return null;
}

function stopEffect(id) {
  document.body.classList.remove(`fx-${id}`);
  document.querySelectorAll(`.theme-canvas.fx-${id}`).forEach(c => c.remove());
}


/* ── Glitch animation ── */
function startGlitch() {
  const glyphs = '!<>-_\\/[]{}=+*^?#01__%&@';
  const SELECTOR = '.nav-name, .feat-title, .project-title, .case-label span, .about-name, .projects-title';
  let timer = null;
  function scramble() {
    const targets = document.querySelectorAll(SELECTOR);
    targets.forEach(el => {
      if (Math.random() > 0.55) return;
      const orig = el.textContent;
      el.textContent = orig.replace(/\S/g, () => glyphs[Math.floor(Math.random() * glyphs.length)]);
      setTimeout(() => el.textContent = orig, 100);
    });
  }
  timer = setInterval(scramble, 800);
  return () => clearInterval(timer);
}

/* ── Rain animation ── */
function startRain() {
  const canvas = document.createElement('canvas');
  canvas.className = 'theme-canvas fx-matrix';
  canvas.style.cssText = 'position:fixed;inset:0;z-index:1;pointer-events:none;opacity:0.15;';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let raf, cols, drops;
  // English, Malayalam, Hindi (Devanagari), Arabic
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' +
    'നമസ്കാരംകേരളംഭാഷമലയാളം' +
    'नमस्तेहिन्दीभारतअक्षर' +
    'أهلاًسلامعربيةحروف';
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.floor(canvas.width / 18);
    drops = Array(cols).fill(1);
  }
  resize();
  window.addEventListener('resize', resize);
  function draw() {
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff41';
    ctx.font = '15px monospace';
    drops.forEach((y, i) => {
      const ch = [...chars][Math.floor(Math.random() * [...chars].length)];
      ctx.fillText(ch, i * 18, y * 18);
      if (y * 18 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
    raf = requestAnimationFrame(draw);
  }
  draw();
  return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); canvas.remove(); };
}

/* ── Glare animation ── */
function startGlare() {
  const el = document.createElement('div');
  el.className = 'theme-canvas glare-sweep';
  document.body.appendChild(el);
  return () => el.remove();
}




