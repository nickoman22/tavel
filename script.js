  <script>
    const destinations = [
      { name: "🇪🇸 Βαρκελώνη", image: "barcelona.jpg", description: "Βαρκελώνη, Ισπανία" },
      { name: "🇫🇷 Παρίσι", image: "paris.jpg", description: "Παρίσι, Γαλλία" },
      { name: "🇳🇱 Άμστερνταμ", image: "amsterdam.jpg", description: "Άμστερνταμ, Ολλανδία" },
      { name: "🇮🇹 Μιλάνο", image: "milan.jpg", description: "Μιλάνο, Ιταλία" },
      { name: "🇮🇹 Βενετία", image: "venice.jpg", description: "Βενετία, Ιταλία" },
      { name: "🇦🇹 Βιέννη", image: "vienna.jpg", description: "Βιέννη, Αυστρία" },
      { name: "🇭🇺 Βουδαπέστη", image: "budapest.jpg", description: "Βουδαπέστη, Ουγγαρία" },
      { name: "🇸🇪 Σουηδία", image: "sweden.jpg", description: "Σουηδία" },
      { name: "🇨🇭 Ελβετία", image: "switzerland.jpg", description: "Ελβετία" },
      { name: "🇫🇮 Φινλανδία", image: "finland.jpg", description: "Φινλανδία" },
      { name: "🇳🇴 Νορβηγία", image: "norway.jpg", description: "Νορβηγία" },
      { name: "🇮🇸 Ισλανδία", image: "iceland.jpg", description: "Ισλανδία" },
      { name: "🇵🇹 Πορτογαλία", image: "portugal.jpg", description: "Πορτογαλία" },
      { name: "🇦🇪 Ντουμπάι", image: "dubai.jpg", description: "Ντουμπάι, ΗΑΕ" },
      { name: "🇲🇻 Μαλδίβες", image: "maldives.jpg", description: "Μαλδίβες" },
      { name: "🇧🇷 Βραζιλία", image: "brazil.jpg", description: "Βραζιλία" },
      { name: "🇪🇬 Αίγυπτος", image: "egypt.jpg", description: "Αίγυπτος" },
      { name: "🇯🇵 Ιαπωνία", image: "japan.jpg", description: "Ιαπωνία - Ο Προορισμός των Ονείρων Μας ✨" }
    ];

    const destinationGrid = document.querySelector('.destination-grid');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    let checkedItems = JSON.parse(localStorage.getItem('checkedItems')) || [];

    function handleImageError(img) {
      img.style.display = 'none';
      const errorMsg = document.createElement('p');
      errorMsg.className = 'image-error';
      errorMsg.textContent = '🚨 Η εικόνα δεν φορτώθηκε!';
      img.parentNode.insertBefore(errorMsg, img.nextSibling);
    }

    function renderDestinations() {
      destinationGrid.innerHTML = '';
      destinations.forEach((dest, index) => {
        const li = document.createElement('li');
        li.className = `destination-card ${dest.name.includes('Ιαπωνία') ? 'japan' : ''} ${checkedItems.includes(index) ? 'visited' : ''}`;
        
        // Extract flag emoji correctly
        const flagEmoji = dest.name.split(' ')[0];
        
        li.innerHTML = `
          <div class="card-inner">
            <div class="card-front">
              <span class="checkmark">✅</span>
              <h3>${flagEmoji}</h3>
            </div>
            <div class="card-back">
              <img src="${dest.image}" alt="${dest.description}">
              <p>${dest.description}</p>
              <input type="checkbox" id="dest-${index}" ${checkedItems.includes(index) ? 'checked' : ''}>
              <label for="dest-${index}">Επισκέφτηκα</label>
            </div>
          </div>
        `;

        const img = li.querySelector('img');
        img.onerror = () => handleImageError(img);
        destinationGrid.appendChild(li);
      });
      updateProgressBar();
    }

    function updateProgress(index, isChecked) {
      if (isChecked && !checkedItems.includes(index)) {
        checkedItems.push(index);
      } else if (!isChecked && checkedItems.includes(index)) {
        checkedItems = checkedItems.filter(item => item !== index);
      }
      localStorage.setItem('checkedItems', JSON.stringify(checkedItems));
      updateProgressBar();
    }

    function updateProgressBar() {
      const progress = (checkedItems.length / destinations.length) * 100;
      progressFill.style.width = `${progress}%`;
      progressText.textContent = `${Math.round(progress)}% Ολοκληρώθηκε ${progress === 100 ? '🎉🎊' : '🎉'}`;
    }

    // Event Delegation
    document.addEventListener('change', (e) => {
      if (e.target.matches('input[type="checkbox"]')) {
        const card = e.target.closest('.destination-card');
        const index = Array.from(destinationGrid.children).indexOf(card);
        card.classList.toggle('visited', e.target.checked);
        updateProgress(index, e.target.checked);
      }
    });

    document.addEventListener('click', (e) => {
      const card = e.target.closest('.destination-card');
      if (card && !e.target.matches('input')) {
        card.classList.toggle('flipped');
      }
    });

    // Cleanup localStorage
    window.addEventListener('beforeunload', () => {
      if (checkedItems.length === 0) {
        localStorage.removeItem('checkedItems');
      }
    });

    // Initial render
    renderDestinations();
  </script>
</body>
</html>
