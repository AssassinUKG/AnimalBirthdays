// ===== Animal Birthdays App - Main JS =====

// ===== Animal Data =====
const ANIMALS = [
  { value: 'cat',        label: 'Cat',        emoji: '🐱' },
  { value: 'dog',        label: 'Dog',        emoji: '🐶' },
  { value: 'hamster',    label: 'Hamster',    emoji: '🐹' },
  { value: 'guinea-pig', label: 'Guinea Pig', emoji: '🐾' },
  { value: 'rabbit',     label: 'Rabbit',     emoji: '🐰' },
  { value: 'gerbil',     label: 'Gerbil',     emoji: '🐭' },
  { value: 'rat',        label: 'Rat',        emoji: '🐀' },
  { value: 'mouse',      label: 'Mouse',      emoji: '🐁' },
  { value: 'ferret',     label: 'Ferret',     emoji: '🦡' },
  { value: 'parrot',     label: 'Parrot',     emoji: '🦜' },
  { value: 'goldfish',   label: 'Goldfish',   emoji: '🐟' },
  { value: 'tortoise',   label: 'Tortoise',   emoji: '🐢' },
  { value: 'chinchilla', label: 'Chinchilla', emoji: '🐿️' },
];

/**
 * Convert animal age (in fractional years) to human-equivalent years.
 * Returns a Number.
 */
function animalToHumanYears(animalType, animalAgeYears) {
  const age = Math.max(0, animalAgeYears);
  switch (animalType) {
    case 'dog': {
      // AKC/popular formula: year 1 = 15, year 2 = 9, each extra year = 5
      if (age <= 0) return 0;
      if (age <= 1) return age * 15;
      if (age <= 2) return 15 + (age - 1) * 9;
      return 24 + (age - 2) * 5;
    }
    case 'cat': {
      // Popular formula: year 1 = 15, year 2 = 9, each extra year = 4
      if (age <= 0) return 0;
      if (age <= 1) return age * 15;
      if (age <= 2) return 15 + (age - 1) * 9;
      return 24 + (age - 2) * 4;
    }
    case 'hamster':
      // Hamsters live ~2-3 years; 1 year ≈ 25 human years
      return age * 25;
    case 'guinea-pig':
      // Guinea pigs live ~5-7 years; 1 year ≈ 10.5 human years
      return age * 10.5;
    case 'rabbit': {
      // Year 1 = 12, year 2 = 8, each extra = 5
      if (age <= 0) return 0;
      if (age <= 1) return age * 12;
      if (age <= 2) return 12 + (age - 1) * 8;
      return 20 + (age - 2) * 5;
    }
    case 'gerbil':
      // Gerbils live ~3-5 years; 1 year ≈ 14 human years
      return age * 14;
    case 'rat':
      // Rats live ~2-3 years; 1 year ≈ 30 human years
      return age * 30;
    case 'mouse':
      // Mice live ~2-3 years; 1 year ≈ 25 human years
      return age * 25;
    case 'ferret':
      // Ferrets live ~6-10 years; 1 year ≈ 12 human years
      return age * 12;
    case 'parrot':
      // Small parrots (budgies) live ~5-10 years; 1 year ≈ 8 human years
      return age * 8;
    case 'goldfish':
      // Goldfish live ~10-15 years; 1 year ≈ 5 human years
      return age * 5;
    case 'tortoise':
      // Tortoises can live 50-100+ years; 1 year ≈ 3 human years
      return age * 3;
    case 'chinchilla':
      // Chinchillas live ~10-15 years; 1 year ≈ 5.5 human years
      return age * 5.5;
    default:
      return age * 7;
  }
}

/**
 * Inverse of animalToHumanYears: given a human-equivalent age (integer),
 * returns the animal age in fractional calendar years when that milestone is reached.
 * This lets us compute the actual calendar date of each "animal birthday".
 */
function humanYearsToAnimalAge(animalType, humanAge) {
  const H = Math.max(0, humanAge);
  switch (animalType) {
    case 'dog': {
      if (H <= 15) return H / 15;
      if (H <= 24) return 1 + (H - 15) / 9;
      return 2 + (H - 24) / 5;
    }
    case 'cat': {
      if (H <= 15) return H / 15;
      if (H <= 24) return 1 + (H - 15) / 9;
      return 2 + (H - 24) / 4;
    }
    case 'rabbit': {
      if (H <= 12) return H / 12;
      if (H <= 20) return 1 + (H - 12) / 8;
      return 2 + (H - 20) / 5;
    }
    case 'hamster':    return H / 25;
    case 'guinea-pig': return H / 10.5;
    case 'gerbil':     return H / 14;
    case 'rat':        return H / 30;
    case 'mouse':      return H / 25;
    case 'ferret':     return H / 12;
    case 'parrot':     return H / 8;
    case 'goldfish':   return H / 5;
    case 'tortoise':   return H / 3;
    case 'chinchilla': return H / 5.5;
    default:           return H / 7;
  }
}

/**
 * Given an animal's DOB and type, compute what date corresponds to a given
 * number of human years before today.
 * i.e., if a dog is 3 years old = 29 human years, the "human equivalent birthday"
 * would be today's date shifted back 29 years, then set to same month/day as actual DOB.
 */
function getHumanEquivalentBirthday(animalType, dob) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dobDate = new Date(dob);
  dobDate.setHours(0, 0, 0, 0);

  // Animal age in fractional years
  const ageMs = today - dobDate;
  const ageYears = ageMs / (365.25 * 24 * 3600 * 1000);

  const humanYears = animalToHumanYears(animalType, ageYears);

  // Human equivalent birthday: go back humanYears from today, keep same month/day as DOB
  const humanBirthYear = today.getFullYear() - Math.round(humanYears);
  const humanBirthday = new Date(humanBirthYear, dobDate.getMonth(), dobDate.getDate());
  return humanBirthday;
}

// ===== Animal lookup helpers =====
function getAnimalData(value) {
  return ANIMALS.find(a => a.value === value) || { value, label: value, emoji: '🐾' };
}

function getAnimalEmoji(value) {
  return getAnimalData(value).emoji;
}

function getAnimalLabel(value) {
  return getAnimalData(value).label;
}

// ===== Local Storage =====
const STORAGE_KEY = 'animal_birthdays_pets';

function loadPets() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function savePets(pets) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pets));
}

function addPet(pet) {
  const pets = loadPets();
  pet.id = Date.now().toString();
  pets.push(pet);
  savePets(pets);
  return pets;
}

function removePet(id) {
  const pets = loadPets().filter(p => p.id !== id);
  savePets(pets);
  return pets;
}

// ===== Date Utilities =====
function formatDate(date) {
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}

function formatShortDate(date) {
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

function daysUntilNextBirthday(dob) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dobDate = new Date(dob);
  const next = new Date(today.getFullYear(), dobDate.getMonth(), dobDate.getDate());
  if (next < today) next.setFullYear(next.getFullYear() + 1);
  return Math.round((next - today) / (24 * 3600 * 1000));
}

function getAge(dob) {
  const today = new Date();
  const dobDate = new Date(dob);
  let years = today.getFullYear() - dobDate.getFullYear();
  let months = today.getMonth() - dobDate.getMonth();
  if (months < 0 || (months === 0 && today.getDate() < dobDate.getDate())) {
    years--;
    months += 12;
  }
  if (today.getMonth() === dobDate.getMonth() && today.getDate() === dobDate.getDate()) months = 0;
  return { years, months };
}

function getAgeInYears(dob) {
  const { years, months } = getAge(dob);
  return years + months / 12;
}

function formatAge({ years, months }) {
  if (years === 0 && months === 0) return 'Born today!';
  if (years === 0) return `${months} month${months !== 1 ? 's' : ''}`;
  if (months === 0) return `${years} year${years !== 1 ? 's' : ''}`;
  return `${years} yr${years !== 1 ? 's' : ''} ${months} mo`;
}

function isBirthdayToday(dob) {
  const today = new Date();
  const dobDate = new Date(dob);
  return today.getMonth() === dobDate.getMonth() && today.getDate() === dobDate.getDate();
}

// ===== iCalendar (.ics) Generation =====
function generateICS(name, dob, animalType) {
  const dobDate = new Date(dob);
  const month = String(dobDate.getMonth() + 1).padStart(2, '0');
  const day = String(dobDate.getDate()).padStart(2, '0');
  const year = dobDate.getFullYear();
  const dtStart = `${year}${month}${day}`;

  // Next day for DTEND
  const nextDay = new Date(dobDate);
  nextDay.setDate(nextDay.getDate() + 1);
  const dtEnd = `${nextDay.getFullYear()}${String(nextDay.getMonth() + 1).padStart(2, '0')}${String(nextDay.getDate()).padStart(2, '0')}`;

  const uid = `animal-birthday-${Date.now()}@animalbirthdays.app`;
  const label = getAnimalLabel(animalType);
  const emoji = getAnimalEmoji(animalType);
  const summary = `${emoji} ${name}'s Birthday`;
  const description = `Celebrate ${name}'s birthday! ${name} is a ${label}. Remember to give them extra love today!`;

  const now = new Date();
  const dtstamp = now.toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Animal Birthdays App//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART;VALUE=DATE:${dtStart}`,
    `DTEND;VALUE=DATE:${dtEnd}`,
    `RRULE:FREQ=YEARLY`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    'TRANSP:TRANSPARENT',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    `DESCRIPTION:Reminder: ${name}'s Birthday is tomorrow!`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

function downloadICS(name, dob, animalType) {
  const ics = generateICS(name, dob, animalType);
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${name.replace(/\s+/g, '_')}_birthday.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ===== Google Calendar URL =====
function getGoogleCalendarURL(name, dob, animalType) {
  const dobDate = new Date(dob);
  const month = String(dobDate.getMonth() + 1).padStart(2, '0');
  const day = String(dobDate.getDate()).padStart(2, '0');
  const year = dobDate.getFullYear();
  const dateStr = `${year}${month}${day}`;

  const nextDay = new Date(dobDate);
  nextDay.setDate(nextDay.getDate() + 1);
  const nextDateStr = `${nextDay.getFullYear()}${String(nextDay.getMonth() + 1).padStart(2, '0')}${String(nextDay.getDate()).padStart(2, '0')}`;

  const label = getAnimalLabel(animalType);
  const emoji = getAnimalEmoji(animalType);
  const text = encodeURIComponent(`${emoji} ${name}'s Birthday`);
  const details = encodeURIComponent(`Celebrate ${name}'s birthday! ${name} is a ${label}. Give them extra love today! 🎉`);
  const dates = `${dateStr}/${nextDateStr}`;
  const recur = encodeURIComponent('RRULE:FREQ=YEARLY');

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&recur=${recur}&details=${details}`;
}

// ===== Calendar Rendering =====
let calendarDate = new Date();

function getBirthdaysForMonth(pets, year, month) {
  // Returns an object: { [day]: [{pet, type: 'actual', humanAge}] }
  const map = {};
  const MS_PER_YEAR = 365.25 * 24 * 3600 * 1000;

  pets.forEach(pet => {
    const dob = new Date(pet.dob);
    dob.setHours(0, 0, 0, 0);

    // Show the "Born" event in the birth month/year
    if (dob.getFullYear() === year && dob.getMonth() === month) {
      const d = dob.getDate();
      if (!map[d]) map[d] = [];
      map[d].push({ pet, type: 'actual', humanAge: 0 });
    }

    // Find all human-equivalent age milestones that fall in this month/year.
    // Determine the maximum H to check based on animal age at end of displayed month.
    const monthEnd = new Date(year, month + 1, 0);
    monthEnd.setHours(23, 59, 59, 999);
    if (monthEnd < dob) return; // month is entirely before birth

    const monthEndAnimalAge = (monthEnd - dob) / MS_PER_YEAR;
    const maxH = Math.ceil(animalToHumanYears(pet.animalType, monthEndAnimalAge)) + 1;

    for (let H = 1; H <= maxH; H++) {
      const animalAgeAtH = humanYearsToAnimalAge(pet.animalType, H);
      const milestoneDate = new Date(dob.getTime() + animalAgeAtH * MS_PER_YEAR);
      milestoneDate.setHours(0, 0, 0, 0);

      if (milestoneDate.getFullYear() === year && milestoneDate.getMonth() === month) {
        const d = milestoneDate.getDate();
        if (!map[d]) map[d] = [];
        const isDupe = map[d].some(e => e.pet.id === pet.id && e.humanAge === H);
        if (!isDupe) {
          map[d].push({ pet, type: 'actual', humanAge: H });
        }
      }
    }
  });
  return map;
}

function renderCalendar(pets) {
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const today = new Date();

  const titleEl = document.getElementById('calendar-title');
  titleEl.textContent = calendarDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const birthdayMap = getBirthdaysForMonth(pets, year, month);
  const daysContainer = document.getElementById('calendar-days');
  daysContainer.innerHTML = '';

  // Fill leading empty days (previous month)
  for (let i = 0; i < firstDay; i++) {
    const dayEl = document.createElement('div');
    dayEl.className = 'calendar-day other-month';
    const dayNum = document.createElement('div');
    dayNum.className = 'day-number';
    dayNum.textContent = daysInPrevMonth - firstDay + 1 + i;
    dayEl.appendChild(dayNum);
    daysContainer.appendChild(dayEl);
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const dayEl = document.createElement('div');
    dayEl.className = 'calendar-day';

    const isToday =
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === d;
    if (isToday) dayEl.classList.add('today');

    if (birthdayMap[d] && birthdayMap[d].length > 0) {
      dayEl.classList.add('has-birthday');
    }

    const dayNum = document.createElement('div');
    dayNum.className = 'day-number';
    dayNum.textContent = d;
    dayEl.appendChild(dayNum);

    if (birthdayMap[d]) {
      const eventsContainer = document.createElement('div');
      eventsContainer.className = 'day-events';

      // Limit display to 3 events per day to avoid overflow
      birthdayMap[d].slice(0, 3).forEach(({ pet, type, humanAge }) => {
        const ev = document.createElement('div');
        ev.className = `day-event ${type === 'actual' ? 'actual-birthday' : 'human-birthday'}`;
        const emoji = getAnimalEmoji(pet.animalType);
        if (type === 'actual') {
          const ageLabel = humanAge === 0 ? '🎉' : `age ${humanAge}`;
          ev.textContent = `${emoji} ${pet.name} (${ageLabel})`;
          ev.title = humanAge === 0
            ? `${pet.name} was born!`
            : `${pet.name} turns human age ${humanAge}!`;
        } else {
          ev.textContent = `${emoji} ${pet.name}`;
          ev.title = `${pet.name}'s human-equivalent birthday`;
        }
        eventsContainer.appendChild(ev);
      });

      if (birthdayMap[d].length > 3) {
        const more = document.createElement('div');
        more.className = 'day-event actual-birthday';
        more.textContent = `+${birthdayMap[d].length - 3} more`;
        eventsContainer.appendChild(more);
      }

      dayEl.appendChild(eventsContainer);
    }

    daysContainer.appendChild(dayEl);
  }

  // Fill trailing days (next month)
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
  let nextMonthDay = 1;
  for (let i = firstDay + daysInMonth; i < totalCells; i++) {
    const dayEl = document.createElement('div');
    dayEl.className = 'calendar-day other-month';
    const dayNum = document.createElement('div');
    dayNum.className = 'day-number';
    dayNum.textContent = nextMonthDay++;
    dayEl.appendChild(dayNum);
    daysContainer.appendChild(dayEl);
  }
}

// ===== Birthday Timeline =====
// Maximum number of past milestones shown in the timeline per pet (Born is always shown first)
const TIMELINE_MAX_PAST = 5;

/**
 * Returns an array of human-equivalent age milestone events for a pet,
 * from birth up to the next 2 upcoming milestones.
 * Each entry: { date, humanAge, isPast, isToday, isNext }
 *
 * Instead of showing one birthday per calendar year, this shows the actual
 * calendar dates when the animal reaches each human-equivalent age milestone —
 * so fast-aging animals (e.g. hamsters at 25×) correctly show multiple
 * birthdays within a single calendar year.
 *
 * To keep the list readable, at most the last TIMELINE_MAX_PAST past milestones
 * are included (the Born event is always first).
 */
function getAnimalBirthdayTimeline(pet) {
  const dob = new Date(pet.dob);
  dob.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const MS_PER_YEAR = 365.25 * 24 * 3600 * 1000;
  const ageMs = Math.max(0, today - dob);
  const currentAnimalAge = ageMs / MS_PER_YEAR;
  const currentHumanAge = animalToHumanYears(pet.animalType, currentAnimalAge);

  // Generate milestones for human ages 1, 2, 3, ... up to 2 beyond current age
  const maxHumanAge = Math.ceil(currentHumanAge) + 2;
  const allMilestones = [];
  let nextFound = false;

  for (let H = 1; H <= maxHumanAge; H++) {
    const animalAgeAtH = humanYearsToAnimalAge(pet.animalType, H);
    const milestoneDate = new Date(dob.getTime() + animalAgeAtH * MS_PER_YEAR);
    milestoneDate.setHours(0, 0, 0, 0);

    const isToday = milestoneDate.getTime() === today.getTime();
    const isPast = !isToday && milestoneDate < today;
    const isNext = !isPast && !isToday && !nextFound;
    if (isNext) nextFound = true;

    allMilestones.push({ date: milestoneDate, humanAge: H, isPast, isToday, isNext });
  }

  // Born event (always shown first)
  const isBornToday = dob.getTime() === today.getTime();
  const bornEvent = {
    date: new Date(dob),
    humanAge: 0,
    isPast: !isBornToday && dob < today,
    isToday: isBornToday,
    isNext: false,
  };

  // Limit past milestones to last TIMELINE_MAX_PAST to keep the list manageable
  const pastMilestones = allMilestones.filter(e => e.isPast);
  const nonPastMilestones = allMilestones.filter(e => !e.isPast);
  const recentPast = pastMilestones.slice(-TIMELINE_MAX_PAST);

  return [bornEvent, ...recentPast, ...nonPastMilestones];
}

function renderBirthdayTimeline(pets) {
  const container = document.getElementById('birthday-timeline');
  if (!container) return;
  container.innerHTML = '';

  if (pets.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">🗓️</span>
        <p>Add pets above to see their birthday timeline across the years!</p>
      </div>
    `;
    return;
  }

  const wrapper = document.createElement('div');
  wrapper.className = 'timeline-pets';

  pets.forEach(pet => {
    const events = getAnimalBirthdayTimeline(pet);
    const emoji = getAnimalEmoji(pet.animalType);
    const animalLabel = getAnimalLabel(pet.animalType);

    const section = document.createElement('div');
    section.className = 'timeline-pet';

    const header = document.createElement('div');
    header.className = 'timeline-pet-header';
    header.innerHTML = `
      <span class="timeline-emoji">${emoji}</span>
      <strong>${escapeHtml(pet.name)}</strong>
      <span class="timeline-species">(${animalLabel})</span>
    `;
    section.appendChild(header);

    const list = document.createElement('div');
    list.className = 'timeline-events';

    events.forEach(ev => {
      const stateClass = ev.isToday ? 'today' : ev.isPast ? 'past' : 'upcoming';
      const item = document.createElement('div');
      item.className = `timeline-event ${stateClass}`;

      const icon = ev.isToday ? '🎉' : ev.isPast ? '✓' : '🎂';
      const dateStr = ev.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
      const ageLabel = ev.humanAge === 0 ? 'Born' : `Human Age ${ev.humanAge}`;
      let badge = '';
      if (ev.isToday) badge = `<span class="timeline-badge today-badge">🎉 Today!</span>`;
      else if (ev.isNext) badge = `<span class="timeline-badge next">Next 🔔</span>`;

      item.innerHTML = `
        <span class="timeline-event-icon">${icon}</span>
        <span class="timeline-date">${dateStr}</span>
        <span class="timeline-age">${ageLabel}</span>
        ${badge}
      `;
      list.appendChild(item);
    });

    section.appendChild(list);
    wrapper.appendChild(section);
  });

  container.appendChild(wrapper);
}

// ===== Pet Card Rendering =====
function renderPetCard(pet) {
  const age = getAge(pet.dob);
  const ageYears = getAgeInYears(pet.dob);
  const humanYears = animalToHumanYears(pet.animalType, ageYears);
  const daysLeft = daysUntilNextBirthday(pet.dob);
  const isBirthday = isBirthdayToday(pet.dob);
  const humanBirthday = getHumanEquivalentBirthday(pet.animalType, pet.dob);
  const emoji = getAnimalEmoji(pet.animalType);
  const label = getAnimalLabel(pet.animalType);

  const card = document.createElement('div');
  card.className = `pet-card${isBirthday ? ' birthday-today' : ''}`;
  card.dataset.id = pet.id;

  const countdownHTML = isBirthday
    ? `<div class="countdown-badge today">🎉 Happy Birthday ${pet.name}!</div>`
    : `<div class="countdown-badge">🎂 ${daysLeft === 0 ? 'Today!' : daysLeft === 1 ? 'Tomorrow!' : `${daysLeft} days until birthday`}</div>`;

  card.innerHTML = `
    <div class="pet-card-header">
      <div class="pet-avatar">${emoji}</div>
      <div>
        <div class="pet-name">${escapeHtml(pet.name)}</div>
        <div class="pet-species">${label}</div>
      </div>
      <button class="btn btn-ghost pet-delete" data-id="${pet.id}" aria-label="Remove ${escapeHtml(pet.name)}">
        ✕
      </button>
    </div>
    <div class="pet-card-body">
      ${countdownHTML}
      <div class="pet-stats">
        <div class="stat-item">
          <span class="stat-label">🐾 Animal Age</span>
          <span class="stat-value">${formatAge(age)}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">🧑 Human Years</span>
          <span class="stat-value highlight">~${Math.round(humanYears)} yrs</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">🎂 Birthday</span>
          <span class="stat-value">${formatShortDate(new Date(pet.dob))}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">👤 Human B-Day</span>
          <span class="stat-value">${formatShortDate(humanBirthday)}</span>
        </div>
      </div>
      <div class="pet-actions">
        <button class="btn btn-google btn-sm" data-action="google" data-id="${pet.id}">
          📅 Google Calendar
        </button>
        <button class="btn btn-apple btn-sm" data-action="apple" data-id="${pet.id}">
           🍎 Apple/iCal
        </button>
      </div>
    </div>
  `;

  return card;
}

function renderPets(pets) {
  const container = document.getElementById('pets-container');
  container.innerHTML = '';

  if (pets.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">🐾</span>
        <p>No pets added yet.<br>Add your first furry friend above!</p>
      </div>
    `;
    return;
  }

  const grid = document.createElement('div');
  grid.className = 'pets-grid';
  pets.forEach(pet => grid.appendChild(renderPetCard(pet)));
  container.appendChild(grid);
}

// ===== Escape HTML =====
function escapeHtml(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// ===== Toast =====
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `${type === 'success' ? '✅' : '❌'} ${message}`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// ===== Form Handling =====
function handleAddPet(e) {
  e.preventDefault();
  const name = document.getElementById('pet-name').value.trim();
  const animalType = document.getElementById('animal-type').value;
  const dob = document.getElementById('pet-dob').value;

  if (!name) { showToast('Please enter your pet\'s name.', 'error'); return; }
  if (!animalType) { showToast('Please select an animal type.', 'error'); return; }
  if (!dob) { showToast('Please enter a date of birth.', 'error'); return; }

  const dobDate = new Date(dob);
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  if (dobDate > today) { showToast('Date of birth cannot be in the future.', 'error'); return; }

  const pets = addPet({ name, animalType, dob });
  renderPets(pets);
  renderCalendar(pets);
  renderBirthdayTimeline(pets);

  document.getElementById('pet-form').reset();
  showToast(`${getAnimalEmoji(animalType)} ${name} added! 🎉`);

  // Scroll to pets section
  document.getElementById('pets-section').scrollIntoView({ behavior: 'smooth' });
}

// ===== Delete Pet =====
function handleDeletePet(id) {
  const pets = removePet(id);
  renderPets(pets);
  renderCalendar(pets);
  renderBirthdayTimeline(pets);
  showToast('Pet removed.');
}

// ===== Event Delegation =====
function handlePetActions(e) {
  const target = e.target.closest('[data-action], [data-id].pet-delete');
  if (!target) return;

  const id = target.dataset.id;
  const pets = loadPets();
  const pet = pets.find(p => p.id === id);
  if (!pet) return;

  if (target.classList.contains('pet-delete')) {
    if (confirm(`Remove ${pet.name} from your list?`)) {
      handleDeletePet(id);
    }
    return;
  }

  const action = target.dataset.action;
  if (action === 'google') {
    const url = getGoogleCalendarURL(pet.name, pet.dob, pet.animalType);
    window.open(url, '_blank', 'noopener,noreferrer');
    showToast(`Opening Google Calendar for ${pet.name}...`);
  } else if (action === 'apple') {
    downloadICS(pet.name, pet.dob, pet.animalType);
    showToast(`Downloading calendar file for ${pet.name}!`);
  }
}

// ===== Populate animal dropdown =====
function populateAnimalDropdown() {
  const select = document.getElementById('animal-type');
  ANIMALS.forEach(animal => {
    const option = document.createElement('option');
    option.value = animal.value;
    option.textContent = `${animal.emoji}\u00A0 ${animal.label}`;
    select.appendChild(option);
  });
}

// ===== Initialise app =====
document.addEventListener('DOMContentLoaded', () => {
  populateAnimalDropdown();

  const pets = loadPets();
  renderPets(pets);
  renderCalendar(pets);
  renderBirthdayTimeline(pets);

  // Set max date for DOB to today
  const dobInput = document.getElementById('pet-dob');
  const todayStr = new Date().toISOString().split('T')[0];
  dobInput.setAttribute('max', todayStr);

  // Form submit
  document.getElementById('pet-form').addEventListener('submit', handleAddPet);

  // Pet card actions (delegation)
  document.getElementById('pets-container').addEventListener('click', handlePetActions);

  // Calendar navigation
  document.getElementById('cal-prev').addEventListener('click', () => {
    calendarDate.setMonth(calendarDate.getMonth() - 1);
    renderCalendar(loadPets());
  });

  document.getElementById('cal-next').addEventListener('click', () => {
    calendarDate.setMonth(calendarDate.getMonth() + 1);
    renderCalendar(loadPets());
  });

  document.getElementById('cal-today').addEventListener('click', () => {
    calendarDate = new Date();
    renderCalendar(loadPets());
  });
});
