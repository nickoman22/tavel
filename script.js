// Destinations in Greek
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

function renderDestinations() {
  destinationGrid.innerHTML = '';
  destinations.forEach((dest, index) => {
    const li = document.createElement('li');
    li.className = `destination-card ${dest.name.includes('Ιαπωνία') ? 'japan' : ''} ${checkedItems.includes(index) ? 'visited' : ''}`;
    
    li.innerHTML = `
      <div class="card-inner">
        <div class="card-front">
          <span class="checkmark">✅</span>
          <span class="emoji">${dest.name.split(' ')[0]}</span>
          <h3>${dest.name.split(' ').slice(1).join(' ')}</h3>
          ${dest.name.includes('Ιαπωνία') ? '<i class="fas fa-heart"></i>' : ''}
        </div>
        <div class="card-back">
          <img src="${dest.image}" alt="${dest.description}">
          <p>${dest.description}</p>
          <input type="checkbox" id="dest-${index}" ${checkedItems.includes(index) ? 'checked' : ''}>
          <label for="dest-${index}">Επισκέφτηκα</label>
        </div>
      </div>
    `;

    const checkbox = li.querySelector('input');
    
    // Update visited class on checkbox change
    checkbox.addEventListener('change', () => {
      li.classList.toggle('visited', checkbox.checked);
      updateProgress(index, checkbox.checked);
    });

    li.addEventListener('click', (e) => {
      if (!e.target.matches('input')) li.classList.toggle('flipped');
    });
    
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
  progressText.textContent = `${Math.round(progress)}% Ολοκληρώθηκε 🎉`;
}

renderDestinations();
