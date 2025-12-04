document.addEventListener('DOMContentLoaded', () => {
  const overlays = {
    ru: document.getElementById('modalOverlay'),
    kz: document.getElementById('modalOverlayKz'),
  };
  const modalTitle = document.getElementById('modalTitle');
  const modalTitleKz = document.getElementById('modalTitleKz');
  const modalList  = document.getElementById('modalList');
  const modalListKz  = document.getElementById('modalListKz');
  const closeBtns  = document.querySelectorAll('.close-btn');

  const blocks = {
    ru: document.querySelector('.ru'),
    kz: document.querySelector('.kz'),
  };
  const langBtns = {
    ru: document.querySelectorAll('.langRu'),
    kz: document.querySelectorAll('.langKz'),
  };

  function getLang() {
    return localStorage.getItem('lang') || 'ru';
  }

  function setLang(lang) {
    localStorage.setItem('lang', lang);
    langChoose();
  }

  function langChoose() {
    const lang = getLang();

    Object.entries(blocks).forEach(([key, block]) => {
      block.classList.toggle('show', key === lang);
      block.classList.toggle('hide', key !== lang);
    });

    Object.entries(langBtns).forEach(([key, btns]) => {
      btns.forEach(btn => btn.classList.toggle('active', key === lang));
    });
  }

  langBtns.ru.forEach(btn => btn.addEventListener('click', () => setLang('ru')));
  langBtns.kz.forEach(btn => btn.addEventListener('click', () => setLang('kz')));

  document.addEventListener('click', e => {
    if (!e.target.matches('.action__checkLists__detailsBtn')) return;
    const card = e.target.closest('.card');
    const title = card.dataset.title;
    let items;
    try {
      items = JSON.parse(card.dataset.items);
    } catch {
      return;
    }
    if(getLang() === "ru"){
      modalTitle.textContent = title;
      modalList.innerHTML = items.map(i => `<li>${i}</li>`).join('');
      overlays[getLang()].classList.add('show');
    }
    if(getLang() === "kz"){
      modalTitleKz.textContent = title;
      modalListKz.innerHTML = items.map(i => `<li>${i}</li>`).join('');
      overlays[getLang()].classList.add('show');
    }
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      Object.values(overlays).forEach(o => o.classList.remove('show'));
    });
  });

  Object.values(overlays).forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) {
        overlay.classList.remove('show');
      }
    });
  });

  langChoose();
});
// Находим все кнопки "Купить / Сатып алу"
document.querySelectorAll(".action__checkLists__buyBtn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    // Проверяем, в каком блоке находится кнопка
    if (btn.closest(".ru")) {
      document.getElementById("buyModal").classList.add("show");
    } else if (btn.closest(".kz")) {
      document.getElementById("buyModalKz").classList.add("show");
    }
  });
});

// Закрытие русского окна
document.getElementById("closeBuyModal").addEventListener("click", () => {
  document.getElementById("buyModal").classList.remove("show");
});

// Закрытие казахского окна
document.getElementById("closeBuyModalKz").addEventListener("click", () => {
  document.getElementById("buyModalKz").classList.remove("show");
});

// Закрытие по клику вне окна
document.getElementById("buyModal").addEventListener("click", (e) => {
  if (e.target.id === "buyModal") {
    document.getElementById("buyModal").classList.remove("show");
  }
});

document.getElementById("buyModalKz").addEventListener("click", (e) => {
  if (e.target.id === "buyModalKz") {
    document.getElementById("buyModalKz").classList.remove("show");
  }
});