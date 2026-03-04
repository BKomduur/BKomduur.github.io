document.addEventListener('DOMContentLoaded', function () {
      const buttons = document.querySelectorAll('#filterBar [data-filter]');
      const cards = document.querySelectorAll('.card[data-tech]');
      const selected = new Set();

      function updateButtons() {
        buttons.forEach(btn => {
          const f = btn.dataset.filter;
          if (f === 'all') {
            if (selected.size === 0) {
              btn.classList.remove('btn-outline-primary'); btn.classList.add('btn-primary'); btn.classList.add('active');
            } else {
              btn.classList.remove('btn-primary'); btn.classList.add('btn-outline-primary'); btn.classList.remove('active');
            }
          } else {
            if (selected.has(f)) {
              btn.classList.remove('btn-outline-secondary'); btn.classList.add('btn-primary'); btn.classList.add('active');
            } else {
              btn.classList.remove('btn-primary'); btn.classList.add('btn-outline-secondary'); btn.classList.remove('active');
            }
          }
        });
      }

      function filterCards() {
        if (selected.size === 0) {
          cards.forEach(card => card.closest('.col').style.display = '');
          return;
        }
        const sel = Array.from(selected);
        cards.forEach(card => {
          const techs = (card.dataset.tech || '').toLowerCase().split(/\s+/);
          const show = sel.some(s => techs.includes(s));
          card.closest('.col').style.display = show ? '' : 'none';
        });
      }

      buttons.forEach(btn => {
        btn.addEventListener('click', function () {
          const f = this.dataset.filter;
          if (f === 'all') {
            selected.clear();
          } else {
            if (selected.has(f)) selected.delete(f);
            else selected.add(f);
          }
          updateButtons();
          filterCards();
        });
      });

      // initialize
      updateButtons();
    })();