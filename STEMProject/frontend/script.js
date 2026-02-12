// Configuration
const API_BASE_URL = 'http://localhost:3001/api';

// State management
let currentProject = null;
let selectedAgeRange = 'any';

// DOM Elements
const landingPage = document.getElementById('landingPage');
const projectPage = document.getElementById('projectPage');
const getProjectBtn = document.getElementById('getProjectBtn');
const ageRangeSelect = document.getElementById('ageRange');
const backBtn = document.getElementById('backBtn');
const similarBtn = document.getElementById('similarBtn');
const newBtn = document.getElementById('newBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const projectContainer = document.getElementById('projectContainer');
const errorMessage = document.getElementById('errorMessage');

// Event Listeners
getProjectBtn.addEventListener('click', () => {
  selectedAgeRange = ageRangeSelect.value || 'any';
  generateProject();
});

// Update selectedAgeRange whenever the dropdown changes
ageRangeSelect.addEventListener('change', (e) => {
  selectedAgeRange = e.target.value || 'any';
  console.log('Age range selected:', selectedAgeRange);
});

backBtn.addEventListener('click', () => goBackToLanding());
similarBtn.addEventListener('click', () => generateProject('similar'));
newBtn.addEventListener('click', () => generateProject('new'));

// Navigate to project page
function showProjectPage() {
  landingPage.classList.remove('active');
  projectPage.classList.add('active');
  window.scrollTo(0, 0);
}

// Show loading state
function showLoading() {
  projectContainer.style.display = 'none';
  loadingSpinner.style.display = 'flex';
  errorMessage.style.display = 'none';
}

// Show project content
function showProjectContent() {
  loadingSpinner.style.display = 'none';
  projectContainer.style.display = 'block';
}

// Show error message
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
  loadingSpinner.style.display = 'none';
  projectContainer.style.display = 'block';
}

// Go back to landing page
function goBackToLanding() {
  landingPage.classList.add('active');
  projectPage.classList.remove('active');
  currentProject = null;
  errorMessage.style.display = 'none';
  // Restore the age range dropdown to the previously selected value
  ageRangeSelect.value = selectedAgeRange;
  window.scrollTo(0, 0);
}

// Render project data to the page
function renderProject(project) {
  console.log('Rendering project:', project);
  console.log('Selected age range was:', selectedAgeRange);
  
  // Set header info
  document.getElementById('projectName').textContent = project.projectName;
  
  // Show filter info
  const filterInfo = document.getElementById('filterInfo');
  if (filterInfo) {
    const ageLabel = {
      'any': 'Any Age',
      '6-8': 'Ages 6-8',
      '9-11': 'Ages 9-11',
      '12-14': 'Ages 12-14',
      '15-17': 'Ages 15-17'
    }[selectedAgeRange] || selectedAgeRange;
    
    filterInfo.textContent = `🎯 Filtered for: ${ageLabel}`;
    filterInfo.style.fontSize = '0.9em';
    filterInfo.style.color = '#667eea';
    filterInfo.style.marginTop = '8px';
    filterInfo.style.fontWeight = '500';
  }
  
  // Set age range badge - show what the API returned
  const ageRangeBadge = document.getElementById('projectAgeRange');
  if (ageRangeBadge) {
    const displayAge = project.ageRange || 'Age not specified';
    ageRangeBadge.textContent = displayAge;
    console.log('Setting age range badge to:', displayAge);
  }
  
  document.getElementById('difficulty').textContent = project.difficulty;
  document.getElementById('timeRequired').textContent = project.timeRequired;

  // Render materials
  const materialsList = document.getElementById('materialsList');
  materialsList.innerHTML = '';
  project.materials.forEach((material) => {
    const li = document.createElement('li');
    li.textContent = material;
    materialsList.appendChild(li);
  });

  // Render instructions
  const instructionsList = document.getElementById('instructionsList');
  instructionsList.innerHTML = '';
  project.instructions.forEach((instruction) => {
    const li = document.createElement('li');
    li.textContent = instruction;
    instructionsList.appendChild(li);
  });

  // Set other info
  document.getElementById('learningConcepts').textContent = project.learningConcepts;
  document.getElementById('funFact').textContent = project.funFact;

  // Apply difficulty styling
  const difficultyBadge = document.getElementById('difficulty');
  difficultyBadge.classList.remove('difficulty');
  if (project.difficulty.toLowerCase() === 'easy') {
    difficultyBadge.style.background = '#d4edda';
    difficultyBadge.style.color = '#155724';
  } else if (project.difficulty.toLowerCase() === 'medium') {
    difficultyBadge.style.background = '#fff3cd';
    difficultyBadge.style.color = '#856404';
  } else {
    difficultyBadge.style.background = '#f8d7da';
    difficultyBadge.style.color = '#721c24';
  }
}

// Generate project with optional feedback
async function generateProject(feedbackType = null) {
  // Always capture the current dropdown value
  selectedAgeRange = ageRangeSelect.value || 'any';
  
  showProjectPage();
  showLoading();

  try {
    const payload = {
      ageRange: selectedAgeRange,
    };

    if (feedbackType && currentProject) {
      payload.feedback = feedbackType;
      payload.previousProject = currentProject;
    }

    console.log('Generating project with age range:', selectedAgeRange);

    const response = await fetch(`${API_BASE_URL}/generate-project`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to generate project');
    }

    currentProject = data.project;
    renderProject(currentProject);
    showProjectContent();
  } catch (error) {
    console.error('Error:', error);
    showError(`Error generating project: ${error.message}`);
  }
}

// Check if backend is available
async function checkBackendHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) {
      throw new Error('Backend is not responding');
    }
    console.log('✓ Backend connection successful');
  } catch (error) {
    console.error(
      '✗ Cannot connect to backend. Make sure the server is running on port 3001',
      error
    );
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  checkBackendHealth();
  console.log('STEM Project Generator loaded');
});
