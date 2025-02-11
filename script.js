class TravelList {
  constructor() {
    this.destinations = [
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
    this.init();
  }

  init() {
    this.cacheDOM();
    this.bindEvents();
    this.render();
  }

  cacheDOM() {
    this.destinationGrid = document.querySelector('.destination-grid');
    this.progressFill = document.querySelector('.progress-fill');
    this.progressText = document.querySelector('.progress-text');
    this.checkedItems = JSON.parse(localStorage.getItem('checkedItems')) || [];
  }

  bindEvents() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('.destination-card')) this.handleCardClick(e);
    });
  }

  handleCardClick(e) {
    const card = e.target.closest('.destination-card');
    const checkbox = card.querySelector('input[type="checkbox"]');
    
    if (e.target === checkbox) {
      this.toggleVisited(card, checkbox.checked);
      return;
    }
    
    if (!checkbox.checked) card.classList.toggle('flipped');
  }

  toggleVisited(card, isChecked) {
    const index = Array.from(card.parentNode.children).indexOf(card);
    card.classList.toggle('visited', isChecked);
    this.updateProgress(index, isChecked);
  }

  render() {
    this.destinationGrid.innerHTML = this.destinations
      .map((dest, i) => this.createCardHTML(dest, i))
      .join('');
    this.updateProgressBar();
  }

  createCardHTML(dest, index) {
    const isJapan = dest.name.includes('Ιαπωνία');
    return `
      <li class="destination-card ${isJapan ? 'japan' : ''} ${this.checkedItems.includes(index) ? 'visited' : ''}">
        <div class="card-inner">
          <div class="card-front">
            <i class="fas fa-check-circle checkmark"></i>
            <span class="emoji">${dest.name.split(' ')[0]}</span>
            <h3>${dest.name.split(' ').slice(1).join(' ')}</h3>
            ${isJapan ? '<i class="fas fa-heart pulse"></i>' : ''}
          </div>
          <div class="card-back">
            <img src="${dest.image}" alt="${dest.description}" loading="lazy">
            <p>${dest.description}</p>
            <div class="checkbox-wrapper">
              <input type="checkbox" id="dest-${index}" ${this.checkedItems.includes(index) ? 'checked' : ''}>
              <label for="dest-${index}">Επισκέφτηκα</label>
            </div>
          </div>
        </div>
      </li>
    `;
  }

  updateProgressBar() {
    const progress = (this.checkedItems.length / this.destinations.length) * 100;
    this.progressFill.style.width = `${progress}%`;
    this.progressText.innerHTML = `
      ${Math.round(progress)}% Ολοκληρώθηκε 
      ${progress === 100 ? '🎉🎊' : '🎉'}
    `;
  }
}

new TravelList();
