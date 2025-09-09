const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalList = document.getElementById('modalList');
const closeModal = document.getElementById('closeModal');

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
