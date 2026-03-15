# 🐾 Animal Birthdays

A fun, friendly single-page web app for tracking and celebrating your pet's birthdays!

## Features

- 🐶 Add pets with a name, species, and date of birth (or the day you got them)
- 🧑 Automatically converts animal age to human-equivalent years using species-specific formulas (dogs, cats, hamsters, guinea pigs, rabbits, gerbils, rats, mice, ferrets, parrots, goldfish, tortoises, chinchillas)
- 📅 Visual monthly calendar showing each pet's **actual birthday** and their **human-equivalent birthday**
- 📆 **Add to Google Calendar** — opens a pre-filled, yearly recurring event
- 🍎 **Add to Apple / iCal** — downloads a `.ics` file with a yearly recurring reminder (also works with Outlook and any other calendar app that supports iCalendar)
- 💾 Pets are saved in your browser's local storage — no account needed
- 🎉 Special birthday banner when today is your pet's birthday

## Screenshots

### Empty state — add your first pet
![Animal Birthdays empty state](https://github.com/user-attachments/assets/257fd150-f6d2-43c2-889c-a78b150acdd2)

### Populated — pets, calendar & timeline
![Animal Birthdays with pets, calendar and timeline](https://github.com/user-attachments/assets/1da327fa-c3df-4aa2-9f01-c66ec2d520aa)

## Live Site

The app is automatically deployed to GitHub Pages on every push to `main`:

**👉 https://assassinukg.github.io/AnimalBirthdays/**

## Project Structure

```
index.html        # Main single-page application
css/style.css     # All styles
js/app.js         # Application logic (year conversions, calendar, iCal, storage)
.github/workflows/
  deploy.yml      # GitHub Actions workflow — deploys to GitHub Pages on push to main
```

## Deployment

The site is a pure static app (HTML + CSS + vanilla JS) — no build step required.
The GitHub Actions workflow in `.github/workflows/deploy.yml` uses the official
`actions/deploy-pages` action to publish the repository root to GitHub Pages automatically
whenever code is merged into `main`.

To enable GitHub Pages on a fork:
1. Go to **Settings → Pages**
2. Set **Source** to **GitHub Actions**
3. Push to `main` — the workflow handles the rest
