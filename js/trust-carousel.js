document.querySelectorAll('.trust-block').forEach(block => {
  const items = block.querySelectorAll('.trust-item');
  let current = 0;

  function showItem(idx) {
    items.forEach((item, i) => {
      item.classList.toggle('active', i === idx);
    });
  }

  showItem(current);

  setInterval(() => {
    current = (current + 1) % items.length;
    showItem(current);
  }, 2500); // 2.5 секунды на каждый слайд
});