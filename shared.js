/* ============================================
   GUEST PORTAL -- NextGen Realtors
   Shared JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initAccordions();
  initCopyButtons();
  initLangToggle();
  initCategoryFilters();
});

/* --- Accordion --- */
function initAccordions() {
  document.querySelectorAll('.section-header').forEach(header => {
    header.addEventListener('click', () => {
      const section = header.closest('.section');
      section.classList.toggle('open');
    });
  });
}

/* --- Copy to Clipboard --- */
function initCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const text = btn.dataset.copy;
      if (!text) return;

      navigator.clipboard.writeText(text).then(() => {
        const originalHTML = btn.innerHTML;
        btn.classList.add('copied');
        btn.innerHTML = svgCheck + ' <span data-en="Copied!" data-hu="Másolva!">Copied!</span>';
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = originalHTML;
        }, 2000);
      }).catch(() => {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        const originalHTML = btn.innerHTML;
        btn.classList.add('copied');
        btn.innerHTML = svgCheck + ' <span data-en="Copied!" data-hu="Másolva!">Copied!</span>';
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = originalHTML;
        }, 2000);
      });
    });
  });
}

const svgCheck = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>';

/* --- Language Toggle --- */
function initLangToggle() {
  const savedLang = localStorage.getItem('guestPortalLang') || 'en';
  setLanguage(savedLang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      setLanguage(lang);
      localStorage.setItem('guestPortalLang', lang);
    });
  });
}

function setLanguage(lang) {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  document.querySelectorAll('[data-en]').forEach(el => {
    if (lang === 'en' && el.dataset.en) {
      el.textContent = el.dataset.en;
    } else if (lang === 'hu' && el.dataset.hu) {
      el.textContent = el.dataset.hu;
    }
  });

  document.documentElement.lang = lang;
}

/* --- Category Filters --- */
function initCategoryFilters() {
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      const container = btn.closest('.section-content');
      if (!container) return;

      container.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      container.querySelectorAll('.place-card').forEach(card => {
        if (filter === 'all' || card.dataset.cat === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --- Google Maps Link Helper --- */
function mapsUrl(address) {
  return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(address);
}
