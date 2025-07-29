document.addEventListener('DOMContentLoaded', function() {
      const tabs = document.querySelectorAll('.tab');
      const contentPanels = document.querySelectorAll('.content-panel');
      let currentIndex = 0;
      let autoRotateInterval;
      
      // Function to activate a specific tab and its content
      function activateTab(index) {
        // Reset all tabs and content panels
        tabs.forEach(tab => tab.classList.remove('active'));
        contentPanels.forEach(panel => panel.classList.remove('active'));
        
        // Activate the selected tab and corresponding content panel
        tabs[index].classList.add('active');
        const tabId = tabs[index].getAttribute('data-tab');
        document.querySelector(`.content-panel[data-content="${tabId}"]`).classList.add('active');
        
        // При смене таба сбрасываем выделение item и обновляем описание
        resetItemsAndDescription(tabId);
        currentIndex = index;
      }

      // Сброс выделения item и установка дефолтного описания
      function resetItemsAndDescription(tabId) {
        const activePanel = document.querySelector(`.content-panel[data-content="${tabId}"]`);
        if (!activePanel) return;
        // Сброс выделения
        activePanel.querySelectorAll('.items-wrapper_item').forEach(item => item.classList.remove('selected'));
        // Выделить первый item
        const firstItem = activePanel.querySelector('.items-wrapper_item');
        if (firstItem) firstItem.classList.add('selected');
        // Обновить описание
        updateDescription(tabId, 0);
      }

      // Обновление description-content
      function updateDescription(tabId, itemIdx) {
        const descBlock = document.querySelector('.description-content');
        if (!descBlock) return;
        // Скрыть все описания
        descBlock.querySelectorAll('.description-text').forEach(p => p.style.display = 'none');
        // Показать нужное
        const show = descBlock.querySelector(`.description-text[data-tab="${tabId}"][data-item="${itemIdx}"]`);
        if (show) show.style.display = '';
      }

      // Start auto-rotation
      function startAutoRotation() {
        // Отключаем автопереключение табов на мобильных устройствах
        if (window.innerWidth <= 900) {
          stopAutoRotation();
          return;
        }
        stopAutoRotation(); // Clear any existing interval
        autoRotateInterval = setInterval(() => {
          let nextIndex = (currentIndex + 1) % tabs.length;
          activateTab(nextIndex);
        }, 5000); // Rotate every 5 seconds
      }
      
      // Stop auto-rotation
      function stopAutoRotation() {
        if (autoRotateInterval) {
          clearInterval(autoRotateInterval);
        }
      }

      // Add click event listeners to tabs
      tabs.forEach((tab, index) => {
        tab.addEventListener('click', function() {
          activateTab(index);
          stopAutoRotation();
          startAutoRotation(); // Restart the timer after manual selection
        });
      });

      // Наведение на content-panel — пауза автопереключения
      contentPanels.forEach(panel => {
        panel.addEventListener('mouseenter', stopAutoRotation);
        panel.addEventListener('mouseleave', startAutoRotation);
      });

      // Клик по item внутри content-panel
      contentPanels.forEach(panel => {
        const tabId = panel.getAttribute('data-content');
        const items = panel.querySelectorAll('.items-wrapper_item');
        items.forEach((item, idx) => {
          item.addEventListener('click', function() {
            // Снять выделение со всех
            items.forEach(i => i.classList.remove('selected'));
            // Выделить текущий
            item.classList.add('selected');
            // Обновить описание
            updateDescription(tabId, idx);
          });
        });
      });

      // Initialize - activate the first tab and start rotation
      activateTab(0);
      startAutoRotation();
    });