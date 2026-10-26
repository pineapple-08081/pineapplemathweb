// 鳳梨老師的數學小教室：各頁共用的互動（深淺色、導覽列、進場動畫、照片牆）
(function(){
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = id => document.getElementById(id);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  /* ---------- 深淺色 ---------- */
  try { const t = localStorage.getItem('pm-theme'); if (t) document.documentElement.dataset.theme = t; } catch(e){}
  const themeBtn = $('themeBtn');
  if (themeBtn) themeBtn.addEventListener('click', () => {
    const cur = document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('pm-theme', next); } catch(e){}
  });

  /* ---------- 導覽列：捲動時變色、往下捲時收起、手機版選單 ---------- */
  const nav = $('nav'), menuBtn = $('menuBtn'), menu = $('menu');
  let lastY = 0;
  function onScroll(){
    const y = scrollY;
    if (!nav) return;
    const menuOpen = menu && menu.classList.contains('open');
    nav.classList.toggle('scrolled', y > 20 || menuOpen);
    nav.classList.toggle('hide', y > 500 && y > lastY && !menuOpen && !document.querySelector('dialog[open]'));
    lastY = y;
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  function setMenu(open){
    if (!menu) return;
    menu.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open);
    onScroll();
  }
  if (menuBtn) menuBtn.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  if (menu) menu.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  const toTop = $('toTop');
  if (toTop) toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));

  /* ---------- 進場動畫 ---------- */
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: .12, rootMargin: '0px 0px -40px 0px' }) : null;
  function observe(root = document){
    root.querySelectorAll('.reveal:not(.in), .pop:not(.in), .draw-on:not(.in)').forEach(n => io ? io.observe(n) : n.classList.add('in'));
  }
  // 等頁面自己的程式把內容畫好之後（DOMContentLoaded 會在所有同步 script 執行完才觸發）再開始觀察
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => observe());
  else setTimeout(() => observe(), 0);

  /* ---------- 照片牆與放大瀏覽 ---------- */
  // 依照片數量循環使用不同的版型，讓排版有大有小、有直有橫
  const LAYOUT = ['big', 'tall', 'small', 'wide', 'small', 'tall', 'wide', 'small', 'big', 'small'];
  const TILT = [-3, 2, -1.5, 3, -2, 1.5, -2.5, 2.5, -1, 1];
  const DECOR = ['tape', 'pin', 'tape-corner', 'none', 'pin', 'tape'];
  const PLACEHOLDER_ART = [
    '<svg viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="40" r="26" fill="#FFC83D" stroke="#3A2E1F" stroke-width="4"/><path d="M28 34h0M52 34h0" stroke="#3A2E1F" stroke-width="8" stroke-linecap="round"/><path d="M30 48q10 9 20 0" fill="none" stroke="#3A2E1F" stroke-width="4" stroke-linecap="round"/></svg>',
    '<svg viewBox="0 0 80 80" aria-hidden="true"><rect x="14" y="22" width="52" height="40" rx="8" fill="#7ECDF0" stroke="#3A2E1F" stroke-width="4"/><circle cx="40" cy="42" r="11" fill="#FFF9EC" stroke="#3A2E1F" stroke-width="4"/><rect x="26" y="14" width="16" height="10" rx="3" fill="#3A2E1F"/></svg>',
    '<svg viewBox="0 0 80 80" aria-hidden="true"><path d="M40 12l8 18 20 2-15 13 5 20-18-11-18 11 5-20-15-13 20-2z" fill="#FF8E6E" stroke="#3A2E1F" stroke-width="4" stroke-linejoin="round"/></svg>',
    '<svg viewBox="0 0 80 80" aria-hidden="true"><path d="M26 16h28v14a14 14 0 0 1-28 0z" fill="#FFC83D" stroke="#3A2E1F" stroke-width="4" stroke-linejoin="round"/><path d="M26 20H16a10 10 0 0 0 10 12M54 20h10a10 10 0 0 1-10 12M40 44v10M28 64h24l-3-10H31z" fill="none" stroke="#3A2E1F" stroke-width="4" stroke-linejoin="round"/></svg>'
  ];

  function renderGallery(el, photos, opts = {}){
    if (!el) return;
    const list = (photos || []).filter(p => p && p.src);
    const empty = !list.length;
    const items = empty
      ? Array.from({ length: opts.placeholders || 6 }, (_, i) => ({ caption: (opts.placeholderCaptions || [])[i] || '照片即將貼上', placeholder: true }))
      : list;
    el.classList.toggle('is-empty', empty);
    el.classList.toggle('few', !empty && list.length <= 2);
    el.innerHTML = items.map((p, i) => {
      const size = p.size || LAYOUT[i % LAYOUT.length];
      const decor = DECOR[i % DECOR.length];
      const inner = p.placeholder
        ? `<div class="ph-empty" data-c="${['yellow','sky','coral','leaf'][i % 4]}">${PLACEHOLDER_ART[i % PLACEHOLDER_ART.length]}<span>${esc(p.caption)}</span></div>`
        : `<img src="${esc(p.src)}" alt="${esc(p.alt || p.caption || '')}" loading="lazy">`;
      const tag = p.placeholder ? 'div' : 'button';
      return `<${tag} class="snap snap-${size}${p.fit === 'contain' ? ' fit-contain' : ''} reveal" ${tag === 'button' ? `type="button" data-i="${i}" aria-label="放大照片：${esc(p.caption || '')}"` : ''} style="--tilt:${TILT[i % TILT.length]}deg;--d:${(i % 6) * .07}s">
        <span class="decor decor-${decor}" aria-hidden="true"></span>
        <span class="frame">${inner}</span>
        ${p.caption && !p.placeholder ? `<span class="cap">${esc(p.caption)}</span>` : ''}
      </${tag}>`;
    }).join('');
    if (!empty) el.onclick = e => { const b = e.target.closest('[data-i]'); if (b) openLightbox(list, +b.dataset.i); };
    observe(el);
  }

  let lb = null, lbList = [], lbIdx = 0;
  function ensureLightbox(){
    if (lb) return lb;
    lb = document.createElement('dialog');
    lb.className = 'lightbox';
    lb.innerHTML = `
      <button class="icon-btn lb-close" type="button" aria-label="關閉"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      <button class="icon-btn lb-prev" type="button" aria-label="上一張"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M15 18l-6-6 6-6"/></svg></button>
      <figure><img alt=""><figcaption></figcaption></figure>
      <button class="icon-btn lb-next" type="button" aria-label="下一張"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M9 18l6-6-6-6"/></svg></button>`;
    document.body.appendChild(lb);
    lb.querySelector('.lb-close').onclick = () => lb.close();
    lb.querySelector('.lb-prev').onclick = () => showLb(lbIdx - 1);
    lb.querySelector('.lb-next').onclick = () => showLb(lbIdx + 1);
    lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });
    lb.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') showLb(lbIdx - 1); if (e.key === 'ArrowRight') showLb(lbIdx + 1); });
    return lb;
  }
  function showLb(i){
    lbIdx = (i + lbList.length) % lbList.length;
    const p = lbList[lbIdx];
    const img = lb.querySelector('img');
    img.src = p.src; img.alt = p.alt || p.caption || '';
    lb.querySelector('figcaption').textContent = p.caption || '';
    lb.querySelector('.lb-prev').hidden = lb.querySelector('.lb-next').hidden = lbList.length < 2;
  }
  function openLightbox(list, i){
    ensureLightbox();
    lbList = list;
    showLb(i);
    if (!lb.open) lb.showModal();
  }

  window.PM = { esc, reduce, observe, renderGallery, openLightbox };
})();
