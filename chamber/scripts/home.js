// Home Page JavaScript: Weather API Integration & Member Spotlights

// ============================================================================
// 1. Weather Data via OpenWeatherMap API
// ============================================================================

const apiKey = '34480b98aa332da53123a0ac63a4ea9d';
// Coordinates for Lagos, Nigeria
const lat = 6.5244;
const lon = 3.3792;

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

// Elements
const currentTempEl = document.querySelector('#current-temp');
const weatherDescEl = document.querySelector('#weather-desc');
const weatherIconEl = document.querySelector('#weather-icon');
const humidityEl = document.querySelector('#humidity');
const forecastContainer = document.querySelector('#forecast-container');

async function getWeatherData() {
  try {
    const [weatherRes, forecastRes] = await Promise.all([
      fetch(currentWeatherUrl),
      fetch(forecastUrl)
    ]);

    if (!weatherRes.ok || !forecastRes.ok) {
      throw new Error(`Weather API response error: ${weatherRes.status} / ${forecastRes.status}`);
    }

    const weatherData = await weatherRes.json();
    const forecastData = await forecastRes.json();

    displayCurrentWeather(weatherData);
    displayForecast(forecastData);
  } catch (error) {
    console.error('Weather data fetch failed:', error);
    displayFallbackWeather();
  }
}

function displayCurrentWeather(data) {
  if (!currentTempEl || !weatherDescEl || !weatherIconEl) return;

  const temp = Math.round(data.main.temp);
  const desc = data.weather[0].description;
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  currentTempEl.textContent = `${temp}°C`;
  // Capitalize description words
  weatherDescEl.textContent = desc.replace(/\b\w/g, char => char.toUpperCase());
  weatherIconEl.setAttribute('src', iconUrl);
  weatherIconEl.setAttribute('alt', desc);

  if (humidityEl) {
    humidityEl.textContent = `${data.main.humidity}%`;
  }
}

function displayForecast(data) {
  if (!forecastContainer) return;
  forecastContainer.innerHTML = '';

  const today = new Date().toISOString().split('T')[0];
  const dailyMap = new Map();

  data.list.forEach(item => {
    const [date, time] = item.dt_txt.split(' ');
    if (date !== today) {
      if (!dailyMap.has(date)) {
        dailyMap.set(date, item);
      } else if (time === '12:00:00') {
        dailyMap.set(date, item);
      }
    }
  });

  const next3Days = Array.from(dailyMap.values()).slice(0, 3);

  next3Days.forEach((item, index) => {
    const dateObj = new Date(item.dt * 1000);
    const dayLabel = index === 0 ? 'Tomorrow' : dateObj.toLocaleDateString('en-US', { weekday: 'short' });
    const temp = Math.round(item.main.temp);
    const desc = item.weather[0].description;
    const iconCode = item.weather[0].icon;

    const dayCard = document.createElement('div');
    dayCard.classList.add('forecast-day');
    dayCard.innerHTML = `
      <span class="forecast-label">${dayLabel}</span>
      <img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="${desc}" width="44" height="44" loading="lazy">
      <span class="forecast-temp">${temp}&deg;C</span>
      <span class="forecast-desc">${desc}</span>
    `;
    forecastContainer.appendChild(dayCard);
  });
}

function displayFallbackWeather() {
  if (currentTempEl) currentTempEl.textContent = '31°C';
  if (weatherDescEl) weatherDescEl.textContent = 'Partly Cloudy';
  if (humidityEl) humidityEl.textContent = '68%';
  if (forecastContainer) {
    forecastContainer.innerHTML = `
      <div class="forecast-day">
        <span class="forecast-label">Tomorrow</span>
        <span class="forecast-temp">32&deg;C</span>
        <span class="forecast-desc">Clear Sky</span>
      </div>
      <div class="forecast-day">
        <span class="forecast-label">Day 2</span>
        <span class="forecast-temp">30&deg;C</span>
        <span class="forecast-desc">Scattered Clouds</span>
      </div>
      <div class="forecast-day">
        <span class="forecast-label">Day 3</span>
        <span class="forecast-temp">29&deg;C</span>
        <span class="forecast-desc">Light Rain</span>
      </div>
    `;
  }
}

// ============================================================================
// 2. Member Spotlight Ads via data/members.json
// ============================================================================

const spotlightContainer = document.querySelector('#spotlight-container');

async function getSpotlights() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) {
      throw new Error(`Failed to load members JSON: ${response.status}`);
    }
    const members = await response.json();
    displaySpotlights(members);
  } catch (error) {
    console.error('Error fetching spotlights:', error);
    if (spotlightContainer) {
      spotlightContainer.innerHTML = '<p class="error-msg">Unable to load business spotlights.</p>';
    }
  }
}

function displaySpotlights(members) {
  if (!spotlightContainer) return;
  spotlightContainer.innerHTML = '';

  // Filter only Gold (3) and Silver (2) members
  const qualifiedMembers = members.filter(m => m.membership === 3 || m.membership === 2);

  // Shuffle randomly
  const shuffled = [...qualifiedMembers].sort(() => 0.5 - Math.random());

  // Select 3 random spotlight members (or 2-3 per requirements)
  const selected = shuffled.slice(0, 3);

  selected.forEach(member => {
    const card = document.createElement('article');
    card.classList.add('spotlight-card');

    const levelBadgeClass = member.membership === 3 ? 'level-gold' : 'level-silver';
    const levelText = member.membership === 3 ? 'Gold Partner' : 'Silver Partner';

    card.innerHTML = `
      <div class="spotlight-header">
        <div class="spotlight-title-group">
          <h3 class="spotlight-title">${member.name}</h3>
          <span class="spotlight-category">${member.category || 'Commerce'}</span>
        </div>
        <span class="membership-badge ${levelBadgeClass}">${levelText}</span>
      </div>
      <div class="spotlight-image-wrap">
        <img src="images/${member.image}" alt="${member.name} logo" width="400" height="240" loading="lazy">
      </div>
      <div class="spotlight-body">
        <div class="spotlight-detail-item">
          <span class="detail-label">Address:</span>
          <span class="detail-text">${member.address}</span>
        </div>
        <div class="spotlight-detail-item">
          <span class="detail-label">Phone:</span>
          <a href="tel:${member.phone.replace(/[^0-9+]/g, '')}" class="spotlight-link">${member.phone}</a>
        </div>
        <div class="spotlight-website">
          <a href="${member.website}" target="_blank" rel="noopener noreferrer" class="btn-website">
            Visit Company Website &rarr;
          </a>
        </div>
      </div>
    `;

    spotlightContainer.appendChild(card);
  });
}

// Initial calls
getWeatherData();
getSpotlights();
