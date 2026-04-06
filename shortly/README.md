# Shortly — URL Shortener App

A responsive URL shortener built with React + Axios, using the TinyURL API.

---

## 📁 File Structure

```
src/
├── App.js           ← Root component — all state & logic
├── App.css          ← All styles (CSS variables, responsive)
├── Components.js    ← ALL UI components in one file
├── api.js           ← TinyURL API calls (axios)
└── images/          ← All SVG/PNG assets go here
    ├── logo.svg
    ├── illustration-working.svg
    ├── icon-brand-recognition.svg
    ├── icon-detailed-records.svg
    ├── icon-fully-customizable.svg
    ├── icon-facebook.svg
    ├── icon-twitter.svg
    ├── icon-pinterest.svg
    ├── icon-instagram.svg
    ├── bg-shorten-desktop.svg
    ├── bg-shorten-mobile.svg
    ├── bg-boost-desktop.svg
    └── bg-boost-mobile.svg
```

---

## 🚀 Setup

### 1. Create the app & install axios

```bash
npx create-react-app shortly
cd shortly
npm install axios
```

### 2. Replace src/ with these files

Copy `App.js`, `App.css`, `Components.js`, and `api.js` into `src/`.

### 3. Add your images

Create `src/images/` and put all SVG/PNG assets inside it.

### 4. Add your TinyURL API token

Get your free token at **tinyurl.com → Profile → API → Create key**.

Option A — edit `api.js` directly:
```js
const TINYURL_TOKEN = 'your_token_here';
```

Option B — use a `.env` file (recommended):
```
REACT_APP_TINYURL_TOKEN=your_token_here
```

### 5. Run

```bash
npm start
```

---

## ✅ Features

- Responsive layout — desktop (1440 px) & mobile (375 px)
- Mobile hamburger navigation
- URL shortening via TinyURL REST API (POST `/create`)
- Axios instance with Bearer auth + error handling
- Empty-field validation with styled error message
- Links persist across refreshes via `localStorage`
- One-click copy — button turns purple for 2 s
- Loading spinner during API call
- Enter key support

---

## 🔌 TinyURL API Used

| Method | Endpoint              | Purpose             |
|--------|-----------------------|---------------------|
| POST   | `/create`             | Shorten a URL       |
| GET    | `/alias/{domain}/{alias}` | Look up a short URL |

Base URL: `https://api.tinyurl.com`  
Auth: `Authorization: Bearer <token>`
