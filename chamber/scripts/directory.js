// Directory JavaScript: Fetch members and toggle Grid / List view

const directoryContainer = document.querySelector('#directory-container');
const gridBtn = document.querySelector('#grid-btn');
const listBtn = document.querySelector('#list-btn');

// Async function to fetch members data
async function getMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error('Failed to fetch chamber members:', error);
    if (directoryContainer) {
      directoryContainer.innerHTML = '<p class="error-msg">Unable to load member directory at this time. Please try again later.</p>';
    }
  }
}

// Function to render members into the container
function displayMembers(members) {
  if (!directoryContainer) return;
  directoryContainer.innerHTML = '';

  members.forEach(member => {
    const card = document.createElement('article');
    card.classList.add('member-card');

    // Membership level text and class
    let levelText = 'Member';
    let levelClass = 'level-member';
    if (member.membership === 3) {
      levelText = 'Gold Member';
      levelClass = 'level-gold';
    } else if (member.membership === 2) {
      levelText = 'Silver Member';
      levelClass = 'level-silver';
    }

    card.innerHTML = `
      <div class="card-image-wrap">
        <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="400" height="240">
      </div>
      <div class="card-content">
        <div class="card-header">
          <h2 class="member-name">${member.name}</h2>
          <span class="membership-badge ${levelClass}">${levelText}</span>
        </div>
        <p class="member-tagline">${member.tagline || ''}</p>
        <p class="member-category"><strong>Category:</strong> ${member.category || 'General'}</p>
        <p class="member-address"><strong>Address:</strong> ${member.address}</p>
        <p class="member-phone"><strong>Phone:</strong> <a href="tel:${member.phone.replace(/[^0-9+]/g, '')}">${member.phone}</a></p>
        <p class="member-website"><a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website &rarr;</a></p>
      </div>
    `;

    directoryContainer.appendChild(card);
  });
}

// Toggle layout view listeners
if (gridBtn && listBtn && directoryContainer) {
  gridBtn.addEventListener('click', () => {
    directoryContainer.classList.remove('list-view');
    directoryContainer.classList.add('grid-view');
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
    gridBtn.setAttribute('aria-pressed', 'true');
    listBtn.setAttribute('aria-pressed', 'false');
  });

  listBtn.addEventListener('click', () => {
    directoryContainer.classList.remove('grid-view');
    directoryContainer.classList.add('list-view');
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
    gridBtn.setAttribute('aria-pressed', 'false');
    listBtn.setAttribute('aria-pressed', 'true');
  });
}

// Initial fetch call
getMembers();

