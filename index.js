const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalList = document.getElementById('modalList');
const closeModal = document.getElementById('closeModal');
const kzBlock = document.querySelector('.kz');
const ruBlock = document.querySelector('.ru');
const ruBtns = document.querySelectorAll('.langRu');
const kzBtns = document.querySelectorAll('.langKz');

ruBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    localStorage.setItem('lang', 'ru');
    langChoose();
  });
});

kzBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    localStorage.setItem('lang', 'kz');
    langChoose();
  });
});

const langChoose = () => {
  let lang = localStorage.getItem('lang');
  if (!lang) {
    lang = 'ru'; // язык по умолчанию
    localStorage.setItem('lang', lang);
  }

  if (lang === 'kz') {
    kzBlock.classList.remove('hide');
    kzBlock.classList.add('show');
    ruBlock.classList.remove('show');
    ruBlock.classList.add('hide');
  } else {
    ruBlock.classList.remove('hide');
    kzBlock.classList.remove('show');
    ruBlock.classList.add('show');
    ruBlock.classList.remove('hide');
  }
};

document.querySelectorAll('.action__checkLists__detailsBtn').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.card');
    const title = card.dataset.title;
    const items = JSON.parse(card.dataset.items);

    modalTitle.textContent = title;
    modalList.innerHTML = items.map(item => `<li>${item}</li>`).join('');
    modalOverlay.classList.add('show');
  });
});

closeModal.addEventListener('click', () => {
  modalOverlay.classList.remove('show');
});

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.classList.remove('show');
  }
});

langChoose();