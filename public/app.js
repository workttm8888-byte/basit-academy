// Global Data Storage
let ACCOUNTS = [];
let MASTER_PROMPTS = [];
let PROMPT_BOOK = [];

// Auth State Check
function checkAuthState() {
  const user = JSON.parse(localStorage.getItem('basit_student') || 'null');
  const loginBtns = document.querySelectorAll('.nav-login');
  if (user && user.name) {
    loginBtns.forEach(btn => {
      btn.textContent = `👤 ${user.name}`;
      btn.href = 'learn.html';
    });
  }
}

// Clean and sanitize any brand text
function sanitizeBrand(text) {
  if (!text) return '';
  return String(text)
    .replace(/UMAIR\s+TIKTOK\s+WALA/gi, 'BASIT ACADEMY')
    .replace(/Umair\s+TikTok\s+Wala/gi, 'Basit Academy')
    .replace(/umairtiktokwala\.com/gi, 'basitacademy.com')
    .replace(/umairtiktokwala/gi, 'basitacademy')
    .replace(/Umair/gi, 'Basit');
}

// CSV Parser
function parseCSV(text) {
  const rows = [];
  let row = [], cell = '', inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { cell += '"'; i++; }
        else inQuotes = false;
      } else cell += c;
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ',') { row.push(cell.trim()); cell = ''; }
      else if (c === '\n') { row.push(cell.trim()); rows.push(row); row = []; cell = ''; }
      else if (c !== '\r') cell += c;
    }
  }
  if (cell || row.length) { row.push(cell.trim()); rows.push(row); }
  return rows;
}

function esc(str) {
  if (!str) return '';
  const d = document.createElement('div');
  d.textContent = String(str);
  return d.innerHTML;
}

function fmtFollowers(n) {
  if (!n) return '—';
  if (n >= 1e6) return (n / 1e6).toFixed(n >= 1e7 ? 0 : 1).replace(/\.0$/, '') + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(n >= 1e5 ? 0 : 1).replace(/\.0$/, '') + 'K';
  return String(n);
}

function getCategoryIcon(cat) {
  const c = (cat || '').toLowerCase();
  if (c.includes('3d') || c.includes('macro') || c.includes('health') || c.includes('fruit')) return '🍓';
  if (c.includes('anime') || c.includes('cyber') || c.includes('gaming')) return '⚡';
  if (c.includes('car') || c.includes('luxury') || c.includes('money')) return '🏎️';
  if (c.includes('cinematic') || c.includes('dark') || c.includes('horror')) return '🎬';
  if (c.includes('nature') || c.includes('animal') || c.includes('earth')) return '🌿';
  if (c.includes('asmr') || c.includes('satisfy')) return '✨';
  if (c.includes('history') || c.includes('doc')) return '🏺';
  if (c.includes('kid')) return '🧸';
  if (c.includes('fun') || c.includes('comedy')) return '😂';
  if (c.includes('family') || c.includes('story')) return '👨‍👩‍👧';
  if (c.includes('podcast')) return '🎙️';
  if (c.includes('interview')) return '🎤';
  if (c.includes('ai content') || c.includes('ai stories')) return '🤖';
  if (c.includes('aviation') || c.includes('army') || c.includes('military') || c.includes('fitness')) return '🇺🇸';
  return '💎';
}

function renderThematicImageCover(title, cat) {
  const icon = getCategoryIcon(cat);
  const cleanTitle = esc(title || 'AI System');
  const cleanCat = esc(cat || 'Visual Generation');
  
  return `
    <div class="prompt-fallback-cover" style="padding:16px; text-align:center">
      <span style="font-size:38px; line-height:1">${icon}</span>
      <em style="color:var(--indigo); font-size:12px; font-weight:800; text-transform:uppercase; letter-spacing:0.06em; margin-top:6px">${cleanTitle}</em>
      <span style="font-size:10.5px; font-family:var(--font-mono); color:var(--text-dim); background:#fff; padding:2px 8px; border-radius:4px; border:1px solid var(--border); margin-top:4px">${cleanCat}</span>
    </div>
  `;
}

// Clipboard copy helper
async function copyToClipboard(text, btnElement) {
  const clean = sanitizeBrand(text);
  try {
    await navigator.clipboard.writeText(clean);
  } catch (err) {
    const ta = document.createElement('textarea');
    ta.value = clean;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }
  if (btnElement) {
    const originalText = btnElement.innerHTML;
    btnElement.innerHTML = 'Copied ✓';
    btnElement.classList.add('copied');
    setTimeout(() => {
      btnElement.innerHTML = originalText;
      btnElement.classList.remove('copied');
    }, 1500);
  }
}

// Download Prompt Text File
function downloadPromptFile(title, content) {
  const cleanContent = sanitizeBrand(content);
  const blob = new Blob([cleanContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${(title || 'Basit_Academy_Prompt').replace(/[^a-zA-Z0-9_-]/g, '_')}_System.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// 1-Click Prompt Sharing Engine
async function sharePrompt(title, snippet, pageType, index, btnElement) {
  const cleanTitle = sanitizeBrand(title);
  const shareUrl = `${window.location.origin}${window.location.pathname}?prompt=${index}`;
  const shareText = `🔥 Check out this AI Master Prompt: "${cleanTitle}" on Basit Academy!\n\n${shareUrl}`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: cleanTitle,
        text: shareText,
        url: shareUrl
      });
      return;
    } catch (e) {
      // fallback
    }
  }

  const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
  window.open(waUrl, '_blank');
  
  if (btnElement) {
    const orig = btnElement.innerHTML;
    btnElement.innerHTML = 'Shared ✓';
    btnElement.classList.add('copied');
    setTimeout(() => {
      btnElement.innerHTML = orig;
      btnElement.classList.remove('copied');
    }, 1500);
  }
}

// Modal Sheet helpers
function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add('active');
}

function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove('active');
}

window.addEventListener('click', (e) => {
  if (e.target.classList && e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
  }
});

/* ==========================================================================
   TOP SLIDERS ENGINE (FOR INDEX.HTML)
   ========================================================================== */
function renderTopSliders() {
  const pbBox = document.getElementById('sldPb');
  if (pbBox && PROMPT_BOOK.length) {
    const items = PROMPT_BOOK.slice(0, 30);
    pbBox.innerHTML = items.map((p, idx) => `
      <div class="sld-card sld-pb" onclick="openPromptModalByIndex(${idx})" style="cursor:pointer">
        <div class="sld-img">
          ${p.img ? `<img src="${esc(p.img)}" alt="${esc(p.title)}" loading="lazy" onerror="this.outerHTML='${esc(renderThematicImageCover(p.title, p.category)).replace(/'/g, "\\'")}'">` : renderThematicImageCover(p.title, p.category)}
        </div>
        <div class="sld-cap">
          <b>${esc(p.title || 'AI Visual Prompt')}</b>
          <span>${esc(p.category || 'Visual Generation')}</span>
        </div>
      </div>
    `).join('');
    setupAutoSlider(pbBox, 'pbPrevBtn', 'pbNextBtn');
  }

  const mpBox = document.getElementById('sldMp');
  if (mpBox && MASTER_PROMPTS.length) {
    // Show distinct system items
    const items = MASTER_PROMPTS.slice(0, 30);
    mpBox.innerHTML = items.map((p, idx) => `
      <div class="sld-card sld-mp" onclick="openMasterModalByIndex(${idx})" style="cursor:pointer; border-color:rgba(79, 70, 229, 0.25)">
        <div class="sld-img" style="background:linear-gradient(135deg, #0F172A 0%, #1E1B4B 100%); display:flex; flex-direction:column; align-items:center; justify-content:center; position:relative; overflow:hidden">
          <div style="font-size:36px; line-height:1; z-index:1; margin-bottom:6px">${getCategoryIcon(p.category)}</div>
          <span style="font-size:11px; font-family:var(--font-mono); color:#93C5FD; font-weight:700; text-transform:uppercase; z-index:1; letter-spacing:0.04em">${esc(p.category || 'System')}</span>
          <span class="free-badge-tag" style="background:var(--grad-primary); border:none; color:#fff; top:8px; right:8px">💎 23-SECTION SYSTEM</span>
        </div>
        <div class="sld-cap">
          <b style="color:var(--text); font-size:13.5px">${esc(p.title)}</b>
          <span style="color:var(--indigo); font-weight:600">⚡ Full AI Production Architecture</span>
        </div>
      </div>
    `).join('');
    setupAutoSlider(mpBox, 'mpPrevBtn', 'mpNextBtn');
  }
}

function setupAutoSlider(box, prevBtnId, nextBtnId) {
  if (!box) return;
  const prev = document.getElementById(prevBtnId);
  const next = document.getElementById(nextBtnId);

  const getStep = () => {
    const card = box.querySelector('.sld-card');
    return card ? card.getBoundingClientRect().width + 14 : 240;
  };

  if (prev) {
    prev.onclick = () => {
      box.scrollBy({ left: -getStep() * 2, behavior: 'smooth' });
    };
  }

  if (next) {
    next.onclick = () => {
      box.scrollBy({ left: getStep() * 2, behavior: 'smooth' });
    };
  }

  let isPaused = false;
  let resumeTimer = null;

  const pauseSlider = () => {
    isPaused = true;
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => { isPaused = false; }, 5000);
  };

  box.addEventListener('mouseenter', () => isPaused = true);
  box.addEventListener('mouseleave', () => isPaused = false);
  box.addEventListener('touchstart', pauseSlider, { passive: true });
  box.addEventListener('wheel', pauseSlider, { passive: true });

  setInterval(() => {
    if (isPaused || document.hidden) return;
    const step = getStep();
    const maxScroll = box.scrollWidth - box.clientWidth - 10;
    if (box.scrollLeft >= maxScroll) {
      box.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      box.scrollBy({ left: step, behavior: 'smooth' });
    }
  }, 2400);
}

/* ==========================================================================
   ACCOUNTS PAGE LOGIC (DIVIDED BY CATEGORIES)
   ========================================================================== */
const accState = {
  plat: 'All',
  lang: 'All',
  cat: 'All',
  fol: 'All',
  sort: 'high',
  query: '',
  limit: 36
};

function folMatch(fol, range) {
  if (range === 'All') return true;
  const [min, max] = range.split('-').map(Number);
  return fol >= min && (!max || fol < max);
}

function filterAccounts() {
  const q = accState.query.trim().toLowerCase().replace(/^@/, '');
  let list = ACCOUNTS.filter(acc => {
    const matchPlat = accState.plat === 'All' || acc.plat.toLowerCase() === accState.plat.toLowerCase();
    const matchLang = accState.lang === 'All' || acc.lang.toLowerCase() === accState.lang.toLowerCase();
    const matchCat  = accState.cat === 'All'  || acc.cat.toLowerCase() === accState.cat.toLowerCase();
    const matchFol  = folMatch(acc.fol, accState.fol);
    const matchQ    = !q || (acc.name + ' ' + acc.user + ' ' + acc.cat).toLowerCase().includes(q);
    return matchPlat && matchLang && matchCat && matchFol && matchQ;
  });

  if (accState.sort === 'az') {
    list.sort((a, b) => a.name.localeCompare(b.name));
  } else if (accState.sort === 'low') {
    list.sort((a, b) => (a.fol || 0) - (b.fol || 0));
  } else {
    list.sort((a, b) => (b.fol || 0) - (a.fol || 0));
  }
  return list;
}

function renderAccounts(resetLimit = true) {
  const grid = document.getElementById('accGrid');
  if (!grid) return;

  if (resetLimit) accState.limit = 36;
  const list = filterAccounts();
  const count = list.length;
  const currentShow = Math.min(accState.limit, count);
  const countInfo = document.getElementById('accCountInfo');
  const loadMoreBtn = document.getElementById('accLoadMore');

  if (countInfo) {
    countInfo.textContent = `Showing ${currentShow.toLocaleString()} of ${count.toLocaleString()} accounts in ${accState.cat === 'All' ? 'All Niches' : accState.cat}`;
  }

  if (count === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:50px 20px; color:var(--text-muted); font-size:15px">No viral creators found in this category matching criteria.</div>';
    if (loadMoreBtn) loadMoreBtn.style.display = 'none';
    return;
  }

  const itemsToRender = list.slice(0, currentShow);
  grid.innerHTML = itemsToRender.map(acc => {
    const isIg = /insta/i.test(acc.plat);
    const initial = (acc.name[0] || acc.user[1] || 'V').toUpperCase();
    const catIcon = getCategoryIcon(acc.cat);
    return `
      <div class="account-card">
        <div class="card-top">
          <div class="avatar ${isIg ? 'ig' : 'tt'}">${esc(initial)}</div>
          <div class="card-info">
            <div class="card-name" title="${esc(acc.name)}">${esc(acc.name)}</div>
            <div class="card-user">${esc(acc.user)}</div>
          </div>
        </div>

        <div class="card-meta">
          <div>
            <span style="font-size:10.5px; font-family:var(--font-mono); color:var(--text-dim); display:block; font-weight:700">FOLLOWERS</span>
            <span class="meta-fol">${fmtFollowers(acc.fol)}</span>
          </div>
          <span class="meta-niche">${catIcon} ${esc(acc.cat || 'Creator')}</span>
        </div>

        <div class="card-actions">
          <a href="${esc(acc.link)}" target="_blank" rel="noopener" class="btn-card-action">
            <span>Visit Profile ↗</span>
          </a>
          <button type="button" class="btn-card-action" onclick="copyToClipboard('${esc(acc.link)}', this)">
            <span>Copy Link</span>
          </button>
        </div>
      </div>
    `;
  }).join('');

  if (loadMoreBtn) {
    if (currentShow < count) {
      loadMoreBtn.style.display = 'inline-block';
      loadMoreBtn.onclick = () => {
        accState.limit += 36;
        renderAccounts(false);
      };
    } else {
      loadMoreBtn.style.display = 'none';
    }
  }
}

function initAccountsPage() {
  const searchInput = document.getElementById('accSearch');
  const platGroup = document.getElementById('accPlatGroup');
  const langSelect = document.getElementById('accLangSelect');
  const folSelect = document.getElementById('accFolSelect');
  const sortSelect = document.getElementById('accSortSelect');
  const catDividers = document.getElementById('accCatDividers');

  if (!searchInput || !ACCOUNTS.length) return;

  const catCounts = {};
  ACCOUNTS.forEach(a => {
    if (a.cat) catCounts[a.cat] = (catCounts[a.cat] || 0) + 1;
  });

  const sortedCategories = Object.keys(catCounts).sort((a, b) => catCounts[b] - catCounts[a]);

  if (catDividers) {
    catDividers.innerHTML = `
      <button class="cat-tab-btn active" data-cat="All">
        <span>🔥 All Categories</span>
        <span class="cat-tab-badge">${ACCOUNTS.length.toLocaleString()}</span>
      </button>
      ${sortedCategories.map(c => `
        <button class="cat-tab-btn" data-cat="${esc(c)}">
          <span>${getCategoryIcon(c)} ${esc(c)}</span>
          <span class="cat-tab-badge">${catCounts[c]}</span>
        </button>
      `).join('')}
    `;

    catDividers.querySelectorAll('.cat-tab-btn').forEach(btn => {
      btn.onclick = () => {
        catDividers.querySelectorAll('.cat-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        accState.cat = btn.dataset.cat;
        renderAccounts();
      };
    });
  }

  const langs = ['All', ...new Set(ACCOUNTS.map(a => a.lang).filter(Boolean))];
  if (langSelect) {
    langSelect.innerHTML = langs.map(l => `<option value="${esc(l)}">${esc(l === 'All' ? 'All Languages' : l)}</option>`).join('');
    langSelect.onchange = (e) => { accState.lang = e.target.value; renderAccounts(); };
  }

  if (platGroup) {
    platGroup.querySelectorAll('.seg-btn').forEach(btn => {
      btn.onclick = () => {
        platGroup.querySelectorAll('.seg-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        accState.plat = btn.dataset.val;
        renderAccounts();
      };
    });
  }

  if (folSelect) {
    folSelect.onchange = (e) => { accState.fol = e.target.value; renderAccounts(); };
  }
  if (sortSelect) {
    sortSelect.onchange = (e) => { accState.sort = e.target.value; renderAccounts(); };
  }

  searchInput.oninput = (e) => {
    accState.query = e.target.value;
    renderAccounts();
  };

  renderAccounts();
}

/* ==========================================================================
   MASTER PROMPTS PAGE LOGIC (WITH REAL PHOTOS & 1-CLICK SHARE)
   ========================================================================== */
let mpQuery = '';
let mpCategory = 'All';

function renderMasterPrompts() {
  const grid = document.getElementById('mpGrid');
  if (!grid) return;

  const countInfo = document.getElementById('mpCountInfo');
  const q = mpQuery.toLowerCase().trim();

  const filtered = MASTER_PROMPTS.filter(p => {
    const matchCat = mpCategory === 'All' || (p.category && p.category.toLowerCase() === mpCategory.toLowerCase());
    const matchQ = !q || (p.title + ' ' + p.category + ' ' + (p.prompt || '')).toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  if (countInfo) {
    countInfo.textContent = `Showing ${filtered.length} Complete Master AI Video Systems`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:50px 20px; color:var(--text-muted)">No master prompts found matching criteria.</div>';
    return;
  }

  grid.innerHTML = filtered.map((p, idx) => {
    const globalIdx = MASTER_PROMPTS.indexOf(p);
    const icon = getCategoryIcon(p.category);
    const cleanPrompt = sanitizeBrand(p.prompt || '');
    const descSnippet = cleanPrompt 
      ? cleanPrompt.replace(/[#*`━]/g, '').slice(0, 160) + '...'
      : 'Complete multi-stage AI video generation blueprint for ChatGPT and Google Flow.';

    return `
      <div class="mp-card">
        <!-- Top Real Photo / Image Header Banner -->
        <div class="mp-card-media" onclick="openMasterModalByIndex(${globalIdx})" style="cursor:pointer">
          ${p.img ? `<img src="${esc(p.img)}" alt="${esc(p.title)}" loading="lazy" onerror="this.outerHTML='${esc(renderThematicImageCover(p.title, p.category)).replace(/'/g, "\\'")}'">` : renderThematicImageCover(p.title, p.category)}
          <span class="mp-card-badge">${icon} ${esc(p.category || 'System')}</span>
          <span class="mp-card-engine">ChatGPT → Flow</span>
        </div>

        <div class="mp-card-body">
          <h3 class="mp-card-title">${esc(p.title)}</h3>
          <p class="mp-card-desc">${esc(descSnippet)}</p>

          <div class="mp-card-footer">
            <button type="button" class="btn-primary" style="flex:1.4; padding:8px 12px; font-size:12.5px" onclick="openMasterModalByIndex(${globalIdx})">
              <span>View System ↗</span>
            </button>
            <button type="button" class="btn-ghost" style="flex:1; padding:8px 10px; font-size:12px" title="Copy Prompt" onclick="copyToClipboard(decodeURIComponent('${encodeURIComponent(cleanPrompt)}'), this)">
              <span>📋 Copy</span>
            </button>
            <button type="button" class="btn-ghost" style="padding:8px 12px; font-size:12px" title="Share via WhatsApp" onclick="sharePrompt('${esc(p.title)}', '${esc(descSnippet)}', 'master', ${globalIdx}, this)">
              <span>↗ Share</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function initMasterPromptsPage() {
  const search = document.getElementById('mpSearch');
  const chipsBox = document.getElementById('mpChips');
  if (!search || !MASTER_PROMPTS.length) return;

  const cats = ['All', ...new Set(MASTER_PROMPTS.map(p => p.category).filter(Boolean))];
  if (chipsBox) {
    chipsBox.innerHTML = cats.map(c => `
      <button class="chip-btn ${c === 'All' ? 'active' : ''}" data-cat="${esc(c)}">${esc(c)}</button>
    `).join('');

    chipsBox.querySelectorAll('.chip-btn').forEach(btn => {
      btn.onclick = () => {
        chipsBox.querySelectorAll('.chip-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        mpCategory = btn.dataset.cat;
        renderMasterPrompts();
      };
    });
  }

  search.oninput = (e) => {
    mpQuery = e.target.value;
    renderMasterPrompts();
  };

  renderMasterPrompts();

  const urlParams = new URLSearchParams(window.location.search);
  const promptId = urlParams.get('prompt');
  if (promptId !== null && MASTER_PROMPTS[promptId]) {
    setTimeout(() => openMasterModalByIndex(parseInt(promptId)), 300);
  }
}

function openMasterModalByIndex(idx) {
  const p = MASTER_PROMPTS[idx];
  if (!p) return;

  const modal = document.getElementById('mpModal');
  const title = document.getElementById('mpModalTitle');
  const body = document.getElementById('mpModalBody');
  const cleanPrompt = sanitizeBrand(p.prompt || '');

  if (modal && title && body) {
    title.textContent = p.title || 'Master Video Production System';
    body.innerHTML = `
      <div style="display:grid; grid-template-columns: ${p.img ? '220px 1fr' : '1fr'}; gap:20px; margin-bottom:20px; align-items:start">
        ${p.img ? `<div style="border-radius:12px; overflow:hidden; border:1px solid var(--border)"><img src="${esc(p.img)}" alt="${esc(p.title)}" style="width:100%; height:auto; display:block" onerror="this.outerHTML='${esc(renderThematicImageCover(p.title, p.category)).replace(/'/g, "\\'")}'"></div>` : ''}
        <div>
          <span style="font-family:var(--font-mono); font-size:12px; color:var(--indigo); font-weight:800; text-transform:uppercase">${getCategoryIcon(p.category)} ${esc(p.category || 'AI Video Blueprint')}</span>
          <h2 style="font-family:var(--font-display); font-size:22px; font-weight:800; color:var(--text-heading); margin-top:4px">${esc(p.title)}</h2>
          <span style="font-family:var(--font-mono); font-size:11px; font-weight:700; padding:3px 10px; background:rgba(67, 56, 202, 0.08); border:1px solid rgba(67, 56, 202, 0.2); border-radius:var(--radius-full); color:var(--indigo); display:inline-block; margin-top:8px">ChatGPT + Google Flow Engine</span>
        </div>
      </div>

      <div style="margin-bottom:24px">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; flex-wrap:wrap; gap:8px">
          <b style="font-family:var(--font-mono); font-size:12.5px; color:var(--indigo)">COMPLETE SYSTEM PROMPT & SCRIPT BLUEPRINT:</b>
          <div style="display:flex; gap:8px">
            <button type="button" class="btn-ghost" style="padding:6px 12px; font-size:12px" onclick="sharePrompt('${esc(p.title)}', '', 'master', ${idx}, this)">↗ Share</button>
            <button type="button" class="btn-ghost" style="padding:6px 12px; font-size:12px" onclick="downloadPromptFile('${esc(p.title)}', decodeURIComponent('${encodeURIComponent(cleanPrompt)}'))">💾 Download .txt</button>
            <button type="button" class="btn-primary" style="padding:6px 14px; font-size:12px" onclick="copyToClipboard(decodeURIComponent('${encodeURIComponent(cleanPrompt)}'), this)">📋 Copy Full System</button>
          </div>
        </div>
        <div class="code-block" style="max-height:450px">${esc(cleanPrompt || 'No prompt script provided.')}</div>
      </div>

      <div style="display:flex; gap:12px; justify-content:flex-end">
        <button type="button" class="btn-ghost" onclick="closeModal('mpModal')">Close</button>
        <button type="button" class="btn-primary" onclick="copyToClipboard(decodeURIComponent('${encodeURIComponent(cleanPrompt)}'), this)">Copy Master Prompt</button>
      </div>
    `;
    openModal('mpModal');
  }
}

/* ==========================================================================
   PROMPT BOOK PAGE LOGIC (WITH REAL PHOTOS & 1-CLICK SHARE)
   ========================================================================== */
let pbQuery = '';
let pbCategory = 'All';
let pbLimit = 36;

function renderPromptBook(resetLimit = true) {
  const grid = document.getElementById('pbGrid');
  if (!grid) return;

  if (resetLimit) pbLimit = 36;
  const countInfo = document.getElementById('pbCountInfo');
  const loadMoreBtn = document.getElementById('pbLoadMore');
  const q = pbQuery.toLowerCase().trim();

  const filtered = PROMPT_BOOK.filter(p => {
    const matchCat = pbCategory === 'All' || (p.category && p.category.toLowerCase() === pbCategory.toLowerCase());
    const matchQ = !q || (p.title + ' ' + p.category + ' ' + (p.prompt || '')).toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  const count = filtered.length;
  const currentShow = Math.min(pbLimit, count);

  if (countInfo) {
    countInfo.textContent = `Showing ${currentShow.toLocaleString()} of ${count.toLocaleString()} AI visual prompts`;
  }

  if (count === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:50px 20px; color:var(--text-muted)">No visual prompts found matching your criteria.</div>';
    if (loadMoreBtn) loadMoreBtn.style.display = 'none';
    return;
  }

  const items = filtered.slice(0, currentShow);
  grid.innerHTML = items.map((p, idx) => {
    const globalIdx = PROMPT_BOOK.indexOf(p);
    const cleanPrompt = sanitizeBrand(p.prompt || '');
    return `
      <div class="pb-card">
        <div class="pb-card-media" onclick="openPromptModalByIndex(${globalIdx})" style="cursor:pointer">
          ${p.img ? `<img src="${esc(p.img)}" alt="${esc(p.title)}" loading="lazy" onerror="this.outerHTML='${esc(renderThematicImageCover(p.title, p.category)).replace(/'/g, "\\'")}'">` : renderThematicImageCover(p.title, p.category)}
        </div>
        <div class="pb-card-body">
          <span class="pb-card-cat">${esc(p.category || 'Visual Generation')}</span>
          <h3 class="pb-card-title">${esc(p.title)}</h3>
          <p class="pb-card-prompt-preview">${esc(cleanPrompt)}</p>
          <div class="pb-card-footer">
            <button type="button" class="btn-ghost" style="flex:1; padding:8px 10px; font-size:12px" onclick="openPromptModalByIndex(${globalIdx})">Preview</button>
            <button type="button" class="btn-primary" style="flex:1.2; padding:8px 10px; font-size:12px" onclick="copyToClipboard(decodeURIComponent('${encodeURIComponent(cleanPrompt)}'), this)">📋 Copy</button>
            <button type="button" class="btn-ghost" style="padding:8px 12px; font-size:12px" title="Share Prompt" onclick="sharePrompt('${esc(p.title)}', '${esc(cleanPrompt)}', 'book', ${globalIdx}, this)">
              <span>↗</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (loadMoreBtn) {
    if (currentShow < count) {
      loadMoreBtn.style.display = 'inline-block';
      loadMoreBtn.onclick = () => {
        pbLimit += 36;
        renderPromptBook(false);
      };
    } else {
      loadMoreBtn.style.display = 'none';
    }
  }
}

function initPromptBookPage() {
  const search = document.getElementById('pbSearch');
  const chipsBox = document.getElementById('pbChips');
  if (!search || !PROMPT_BOOK.length) return;

  const cats = ['All', ...new Set(PROMPT_BOOK.map(p => p.category).filter(Boolean))].slice(0, 16);
  if (chipsBox) {
    chipsBox.innerHTML = cats.map(c => `
      <button class="chip-btn ${c === 'All' ? 'active' : ''}" data-cat="${esc(c)}">${esc(c)}</button>
    `).join('');

    chipsBox.querySelectorAll('.chip-btn').forEach(btn => {
      btn.onclick = () => {
        chipsBox.querySelectorAll('.chip-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        pbCategory = btn.dataset.cat;
        renderPromptBook();
      };
    });
  }

  search.oninput = (e) => {
    pbQuery = e.target.value;
    renderPromptBook();
  };

  renderPromptBook();

  const urlParams = new URLSearchParams(window.location.search);
  const promptId = urlParams.get('prompt');
  if (promptId !== null && PROMPT_BOOK[promptId]) {
    setTimeout(() => openPromptModalByIndex(parseInt(promptId)), 300);
  }
}

function openPromptModalByIndex(idx) {
  const p = PROMPT_BOOK[idx];
  if (!p) return;

  const modal = document.getElementById('pbModal');
  const title = document.getElementById('pbModalTitle');
  const body = document.getElementById('pbModalBody');
  const cleanPrompt = sanitizeBrand(p.prompt || '');

  if (modal && title && body) {
    title.textContent = p.title || 'AI Visual Generation Prompt';
    body.innerHTML = `
      <div style="display:grid; grid-template-columns: ${p.img ? '240px 1fr' : '1fr'}; gap:20px; margin-bottom:20px; align-items:start">
        ${p.img ? `<div style="border-radius:12px; overflow:hidden; border:1px solid var(--border)"><img src="${esc(p.img)}" alt="${esc(p.title)}" style="width:100%; height:auto; display:block" onerror="this.outerHTML='${esc(renderThematicImageCover(p.title, p.category)).replace(/'/g, "\\'")}'"></div>` : ''}
        <div>
          <span style="font-family:var(--font-mono); font-size:11px; color:var(--indigo); font-weight:800; text-transform:uppercase; display:block; margin-bottom:4px">${esc(p.category || 'Visual Generation')}</span>
          <h2 style="font-family:var(--font-display); font-size:20px; font-weight:800; color:var(--text-heading); line-height:1.25">${esc(p.title)}</h2>
        </div>
      </div>

      <div style="margin-bottom:20px">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px">
          <b style="font-family:var(--font-mono); font-size:12px; color:var(--indigo)">EXACT VISUAL PROMPT:</b>
          <div style="display:flex; gap:6px">
            <button type="button" class="btn-ghost" style="padding:4px 10px; font-size:11.5px" onclick="sharePrompt('${esc(p.title)}', '', 'book', ${idx}, this)">↗ Share</button>
            <button type="button" class="btn-ghost" style="padding:4px 10px; font-size:11.5px" onclick="copyToClipboard(decodeURIComponent('${encodeURIComponent(cleanPrompt)}'), this)">📋 Copy</button>
          </div>
        </div>
        <div class="code-block">${esc(cleanPrompt)}</div>
      </div>

      <div style="display:flex; gap:12px; justify-content:flex-end">
        <button type="button" class="btn-ghost" onclick="closeModal('pbModal')">Close</button>
        <button type="button" class="btn-primary" onclick="copyToClipboard(decodeURIComponent('${encodeURIComponent(cleanPrompt)}'), this)">Copy Full Prompt</button>
      </div>
    `;
    openModal('pbModal');
  }
}

/* ==========================================================================
   AI VIDEO PROMPT EXTRACTOR ENGINE
   ========================================================================== */
function initExtractorStudio() {
  const btnExtract = document.getElementById('btnExtract');
  const extUrl = document.getElementById('extUrl');
  const extDesc = document.getElementById('extDesc');
  const extApiKey = document.getElementById('extApiKey');
  const extOutput = document.getElementById('extOutput');
  const btnCopyAll = document.getElementById('btnCopyAll');

  if (!btnExtract) return;

  // Restore saved API Key if previously entered
  if (extApiKey) {
    const savedKey = localStorage.getItem('basit_extractor_api_key');
    if (savedKey) extApiKey.value = savedKey;
    extApiKey.addEventListener('change', () => {
      if (extApiKey.value.trim()) {
        localStorage.setItem('basit_extractor_api_key', extApiKey.value.trim());
      } else {
        localStorage.removeItem('basit_extractor_api_key');
      }
    });
  }

  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.onclick = () => {
      const preset = btn.dataset.preset;
      if (preset === '3d-macro') {
        extDesc.value = 'A cute 3D miniature fruit character transforming inside a glass container with macro camera and realistic water droplets';
      } else if (preset === 'cinematic-dark') {
        extDesc.value = 'Cinematic grim dark 8K hyperrealistic battlefield warrior looking at burning sunset in ancient armor, anamorphic lens 35mm';
      } else if (preset === 'luxury-car') {
        extDesc.value = 'Midnight hypercar neon reflections drifting through Tokyo rainy highway, ultra-fast shutter cinematic commercial style';
      } else if (preset === 'satisfying-asmr') {
        extDesc.value = 'Kinetic ASMR rainbow geometric layered soap cutting with precise knife, soft studio illumination and sound cues';
      } else if (preset === 'anime-action') {
        extDesc.value = 'Cyberpunk anime protagonist unleashing glowing electric katana strike in futuristic neo-shibuya alleyway';
      } else if (preset === 'historical-doc') {
        extDesc.value = 'Ancient Roman legion march through stormy alpine mountain pass, historical documentary style, gritty atmospheric dust';
      }
    };
  });

  btnExtract.onclick = async () => {
    const urlVal = extUrl ? extUrl.value.trim() : '';
    const descVal = extDesc ? extDesc.value.trim() : '';
    const keyVal = extApiKey ? extApiKey.value.trim() : '';

    if (!urlVal && !descVal) {
      alert('Please enter a video URL or describe a video scene concept.');
      return;
    }

    if (keyVal) {
      localStorage.setItem('basit_extractor_api_key', keyVal);
    }

    btnExtract.innerHTML = '<span>⚡ Deconstructing Neural Video Layers...</span>';
    btnExtract.disabled = true;

    try {
      const res = await fetch('/api/extract-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: urlVal, description: descVal, apiKey: keyVal })
      });

      let data;
      if (res.ok) {
        data = await res.json();
      } else {
        throw new Error('Fallback to local synthesis');
      }

      displayExtractorOutput(data);
    } catch (err) {
      const synthesized = synthesizePromptFromInput(descVal || urlVal);
      displayExtractorOutput(synthesized);
    } finally {
      btnExtract.innerHTML = '<span>⚡ Deconstruct & Generate Master AI Blueprint</span>';
      btnExtract.disabled = false;
    }
  };

  if (btnCopyAll) {
    btnCopyAll.onclick = () => {
      const imgP = document.getElementById('outImgPrompt').textContent;
      const vidP = document.getElementById('outVidPrompt').textContent;
      const hookP = document.getElementById('outHook').textContent;
      const fullPackage = `=== BASIT ACADEMY MASTER AI VIDEO BLUEPRINT ===\n\n1. VISUAL GENERATION PROMPT (Midjourney/Flux):\n${imgP}\n\n2. VIDEO ANIMATION PROMPT (Kling/Runway):\n${vidP}\n\n3. VIRAL SCRIPT & HOOK:\n${hookP}\n`;
      copyToClipboard(fullPackage, btnCopyAll);
    };
  }
}

function displayExtractorOutput(data) {
  const extOutput = document.getElementById('extOutput');
  const outTitle = document.getElementById('outTitle');
  const outImgPrompt = document.getElementById('outImgPrompt');
  const outVidPrompt = document.getElementById('outVidPrompt');
  const outHook = document.getElementById('outHook');

  if (outTitle) outTitle.textContent = sanitizeBrand(data.title || 'Master Video Production Blueprint');
  if (outImgPrompt) outImgPrompt.textContent = sanitizeBrand(data.image_prompt || '');
  if (outVidPrompt) outVidPrompt.textContent = sanitizeBrand(data.video_prompt || '');
  if (outHook) outHook.textContent = sanitizeBrand(data.viral_hook || '');

  if (extOutput) {
    extOutput.style.display = 'block';
    extOutput.scrollIntoView({ behavior: 'smooth' });
  }
}

function synthesizePromptFromInput(input) {
  return {
    title: 'Extracted Master AI Video Production Blueprint',
    image_prompt: `Hyper-realistic 8K vertical 9:16 composition: ${input}, cinematic studio lighting, volumetric rim light, ultra-detailed micro textures, shallow depth of field, anamorphic 35mm lens --ar 9:16 --v 6.1 --style raw`,
    video_prompt: `Start with static close-up shot of ${input}. Continuous smooth 8-second forward slow dolly camera movement, organic fluid transformation micro-movements, high shutter speed, zero distortion, perfect loop --motion 5`,
    viral_hook: `Urdu/Hindi Hook: "Ye video internet par million views cross kar chuki hai, lekin iska real master prompt koi nahi batata..."\nEnglish Hook: "Stop scrolling — here is the exact secret AI system behind this viral video style."`
  };
}

/* ==========================================================================
   MOBILE NAVIGATION DRAWER & BOTTOM BAR
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.querySelector('.nav-toggle-btn');
  const drawer = document.getElementById('mobileDrawer');
  
  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleBtn.classList.toggle('active');
      drawer.classList.toggle('open');
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!drawer.contains(e.target) && !toggleBtn.contains(e.target)) {
        drawer.classList.remove('open');
        toggleBtn.classList.remove('active');
      }
    });

    // Close on link click
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        toggleBtn.classList.remove('active');
      });
    });
  }

  // Active state for bottom nav bar
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.mobile-tab-item').forEach(item => {
    const href = item.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

/* ==========================================================================
   FAVORITES / SAVED SYSTEM
   ========================================================================== */
function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem('basit_favorites') || '[]');
  } catch (e) {
    return [];
  }
}

function toggleFavorite(id, title, category, type = 'prompt', btn = null) {
  let favs = getFavorites();
  const existingIdx = favs.findIndex(f => f.id === id);
  let isSaved = false;

  if (existingIdx >= 0) {
    favs.splice(existingIdx, 1);
    isSaved = false;
  } else {
    favs.push({ id, title, category, type, date: new Date().toISOString() });
    isSaved = true;
  }

  localStorage.setItem('basit_favorites', JSON.stringify(favs));

  if (btn) {
    btn.innerHTML = isSaved ? '❤️ Saved' : '🤍 Save';
    btn.classList.toggle('active', isSaved);
  }

  return isSaved;
}

/* ==========================================================================
   OFFICIAL SUPPORT NUMBER & WHATSAPP SAFETY SYSTEM
   ========================================================================== */
const SUPPORT_PHONE_RAW = '923279497232';
const SUPPORT_PHONE_DISPLAY = '+92 327 9497232';

function openSupportModal() {
  let modal = document.getElementById('supportSafetyModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'supportSafetyModal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-sheet support-modal-sheet">
        <div class="support-modal-header">
          <div class="support-avatar-wrap">
            <img src="img/basit.jpg?v=9.0" alt="Basit - Official Support" onerror="this.src='img/logo.png?v=9.0'">
          </div>
          <h3>Basit Academy Support <span style="color:#10B981; font-size:17px">✓</span></h3>
          <p>Official Creator & Student Help Desk</p>
        </div>

        <div class="support-modal-body">
          <div class="support-alert-box">
            <span class="support-alert-icon">⚠️</span>
            <div class="support-alert-text">
              <b>Important Notice (Must Read):</b><br>
              Before sending a message, please make sure to save our official WhatsApp number in your phone contacts so that WhatsApp does not flag or restrict communications.
            </div>
          </div>

          <div class="support-number-box" style="justify-content:center; text-align:center; padding:14px 18px">
            <div>
              <span style="font-size:10.5px; font-family:var(--font-mono); color:var(--text-dim); display:block; font-weight:700; margin-bottom:4px">OFFICIAL WHATSAPP NUMBER</span>
              <span class="support-num-val" style="font-size:20px; font-weight:800; color:var(--text); letter-spacing:0.02em">${SUPPORT_PHONE_DISPLAY}</span>
            </div>
          </div>

          <a href="https://wa.me/${SUPPORT_PHONE_RAW}?text=Assalam%20o%20alaikum%20Basit%20Academy%2C%20I%20need%20free%20support%20and%20monetization%20guidance."
             target="_blank"
             rel="noopener"
             class="btn-chat-whatsapp"
             onclick="closeModal('supportSafetyModal')">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.898 9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z"/>
            </svg>
            <span>Contact on WhatsApp</span>
          </a>

          <button type="button" class="btn-ghost" style="width:100%; justify-content:center; padding:10px" onclick="closeModal('supportSafetyModal')">Close</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal('supportSafetyModal');
    });
  }

  modal.classList.add('active');
}

function initMobileNav() {
  const toggleBtn = document.querySelector('.nav-toggle-btn');
  const drawer = document.getElementById('mobileDrawer');
  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleBtn.classList.toggle('active');
      drawer.classList.toggle('open');
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        toggleBtn.classList.remove('active');
        drawer.classList.remove('open');
      });
    });

    document.addEventListener('click', (e) => {
      if (drawer.classList.contains('open') && !drawer.contains(e.target) && !toggleBtn.contains(e.target)) {
        toggleBtn.classList.remove('active');
        drawer.classList.remove('open');
      }
    });
  }
}

function initSupportInterceptors() {
  document.addEventListener('click', (e) => {
    const waLink = e.target.closest('a[href*="wa.me"], .wa-float, .btn-support-modal');
    if (waLink) {
      e.preventDefault();
      openSupportModal();
    }
  });
}

/* ==========================================================================
   INITIALIZATION PIPELINE
   ========================================================================== */
async function loadAllDatasets() {
  try {
    initMobileNav();
  } catch (e) {
    console.warn('initMobileNav error:', e);
  }

  try {
    initSupportInterceptors();
    checkAuthState();
  } catch (e) {
    console.warn('init support/auth error:', e);
  }

  try {
    const [accRes, mpRes, pbRes] = await Promise.all([
      fetch('data/accounts.csv').then(r => r.ok ? r.text() : '').catch(() => ''),
      fetch('data/master-prompts.csv').then(r => r.ok ? r.text() : '').catch(() => ''),
      fetch('data/prompt-book.csv').then(r => r.ok ? r.text() : '').catch(() => '')
    ]);

    // Parse Accounts: [Platform, Language, Category, Name, Username, Followers, Profile Link]
    const accRows = parseCSV(accRes);
    if (accRows.length > 1) {
      ACCOUNTS = accRows.slice(1).map(r => ({
        plat: sanitizeBrand(r[0] || 'TikTok'),
        lang: sanitizeBrand(r[1] || 'English'),
        cat: sanitizeBrand(r[2] || 'Creator'),
        name: sanitizeBrand(r[3] || 'Creator'),
        user: sanitizeBrand(r[4] || '@creator'),
        fol: parseInt(r[5]) || 0,
        link: r[6] || '#'
      }));
    }

    // Parse Prompt Book: [Image URL, Title, Prompt, Category, Tool, Home]
    const pbRows = parseCSV(pbRes);
    if (pbRows.length > 1) {
      PROMPT_BOOK = pbRows.slice(1).map(r => ({
        img: (r[0] || '').trim(),
        title: sanitizeBrand(r[1] || 'AI Visual Prompt'),
        prompt: sanitizeBrand(r[2] || ''),
        category: sanitizeBrand(r[3] || 'Visual')
      }));
    }

    // Parse Master Prompts: [Title, Category, Image, Master Prompt]
    const mpRows = parseCSV(mpRes);
    if (mpRows.length > 1) {
      MASTER_PROMPTS = mpRows.slice(1).map((r, i) => {
        const cat = sanitizeBrand(r[1] || 'System');
        const title = sanitizeBrand(r[0] || 'AI Video System');
        const rawImg = (r[2] || '').trim();
        const hasDirectImg = rawImg.startsWith('http') || rawImg.startsWith('img/') || rawImg.endsWith('.jpg') || rawImg.endsWith('.png');
        // Map matching image from Prompt Book
        const matchedPB = PROMPT_BOOK.find(p => p.category && p.category.toLowerCase() === cat.toLowerCase()) || PROMPT_BOOK[i % PROMPT_BOOK.length];
        return {
          title: title,
          category: cat,
          img: hasDirectImg ? rawImg : (matchedPB ? matchedPB.img : ''),
          prompt: sanitizeBrand(r[3] || r[1] || '')
        };
      });
    }

    // Initialize Active Page
    renderTopSliders();
    initAccountsPage();
    initMasterPromptsPage();
    initPromptBookPage();
    initExtractorStudio();
  } catch (err) {
    console.error('Data loading error:', err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadAllDatasets();
});
