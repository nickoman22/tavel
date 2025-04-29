<script>
    // Destination Data
    const destinations = [
      { name: "🇪🇸 Βαρκελώνη", image: "barcelona.jpg", description: "Βαρκελώνη, Ισπανία" },
      // ... keep all your existing destinations array ...
      { name: "🇯🇵 Ιαπωνία", image: "japan.jpg", description: "Ιαπωνία" }
    ];

    // DOM Elements
    const destinationGrid = document.querySelector('.destination-grid');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    let checkedItems = JSON.parse(localStorage.getItem('checkedItems')) || [];

    // Render Destinations
    function renderDestinations() {
      destinationGrid.innerHTML = '';
      destinations.forEach((dest, index) => {
        const card = document.createElement('li');
        card.className = `destination-card ${checkedItems.includes(index) ? 'visited' : ''}`;
        card.innerHTML = `
          <div class="card-inner">
            <div class="card-front">
              <span class="checkmark">✅</span>
              <h3>${dest.name.split(' ')[0]}</h3>
            </div>
            <div class="card-back">
              <img src="${dest.image}" alt="${dest.description}">
              <p>${dest.description}</p>
              <input type="checkbox" id="dest-${index}" ${checkedItems.includes(index) ? 'checked' : ''}>
              <label for="dest-${index}">Επισκέφτηκα</label>
            </div>
          </div>
        `;
        destinationGrid.appendChild(card);
      });
      updateProgressBar();
    }

    // Progress Updates
    function updateProgressBar() {
      const progress = (checkedItems.length / destinations.length) * 100;
      progressFill.style.width = `${progress}%`;
      progressText.textContent = `${Math.round(progress)}% Ολοκληρώθηκε ${progress === 100 ? '🎉' : ''}`;
    }

    // Event Listeners
    document.addEventListener('change', (e) => {
      if (e.target.matches('input[type="checkbox"]')) {
        const card = e.target.closest('.destination-card');
        const index = Array.from(destinationGrid.children).indexOf(card);
        checkedItems = e.target.checked ? [...checkedItems, index] : checkedItems.filter(i => i !== index);
        localStorage.setItem('checkedItems', JSON.stringify(checkedItems));
        card.classList.toggle('visited', e.target.checked);
        updateProgressBar();
      }
    });

    document.addEventListener('click', (e) => {
      const card = e.target.closest('.destination-card');
      if (card && !e.target.matches('input')) {
        card.classList.toggle('flipped');
      }
    });

    // Initial Render
    renderDestinations();
  </script>
