// Data for destinations
const destinations = [
  { name: "Barcelona", image: "barcelona.jpg", description: "Explore Gaudí's architecture, relax on Barceloneta Beach, and enjoy tapas." },
  { name: "Paris", image: "paris.jpg", description: "Visit the Eiffel Tower, Louvre Museum, and enjoy a Seine River cruise." },
  { name: "Amsterdam", image: "amsterdam.jpg", description: "Cycle along canals, visit the Van Gogh Museum, and explore Anne Frank House." },
  // Add more destinations here...
];

// DOM Elements
const destinationList = document.querySelector('.destination-list');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const closeModal = document.querySelector('.close');
const progressBar = document.querySelector('.progress');
const progressText = document.querySelector('.progress-text');

// Load saved progress from local storage
let checkedItems = JSON.parse(localStorage.getItem('checkedItems')) || [];

// Render destinations
function renderDestinations() {
  destinationList.innerHTML = '';
  destinations.forEach((dest, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" id="dest-${index}" ${checkedItems.includes(index) ? 'checked' : ''}>
      <label for="dest-${index}">${dest.name}</label>
    `;
    li.addEventListener('click', () => openModal(dest));
    destinationList.appendChild(li);

    // Update checkbox state
    const checkbox = li.querySelector('input');
    checkbox.addEventListener('change', () => updateProgress(index, checkbox.checked));
  });
  updateProgressBar();
}

// Open modal with destination details
function openModal(dest) {
  modalImage.src = dest.image;
  modalTitle.textContent = dest.name;
  modalDescription.textContent = dest.description;
  modal.style.display = 'flex';
}

// Close modal
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Update progress bar and save to local storage
function updateProgress(index, isChecked) {
  if (isChecked && !checkedItems.includes(index)) {
    checkedItems.push(index);
  } else if (!isChecked && checkedItems.includes(index)) {
    checkedItems = checkedItems.filter(item => item !== index);
  }
  localStorage.setItem('checkedItems', JSON.stringify(checkedItems));
  updateProgressBar();
}

// Update progress bar
function updateProgressBar() {
  const progress = (checkedItems.length / destinations.length) * 100;
  progressBar.style.width = `${progress}%`;
  progressText.textContent = `${Math.round(progress)}% Complete`;
}

// Initial render
renderDestinations();