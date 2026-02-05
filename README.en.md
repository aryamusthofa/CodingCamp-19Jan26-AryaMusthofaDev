# To-Do List Web Application — "The Switcher Edition"

**🌐 English** · [Bahasa Indonesia](README.md)

A responsive, themeable to-do list app with CRUD, filters, and 6 visual themes. Built with vanilla HTML, CSS, and JavaScript. Data and theme preference persist in `localStorage`.

![App Preview](preview.jpg)
> *Preview: RGB Mode & Cyberpunk Theme in Action*

**🌐 Live Demo:** [https://aryamusthofa.github.io/CodingCamp-19Jan26-AryaMusthofaDev/](https://aryamusthofa.github.io/CodingCamp-19Jan26-AryaMusthofaDev/)

---

## 📌 About This Project

This is a **To-Do List Web Application** focused on **CRUD**, **task filtering**, and **multi-theme** support. All logic and styles are packed into 3 files only (one HTML, one CSS, one JS) per project constraints. You can switch themes anytime; your theme choice and task list are saved in the browser (localStorage) and persist after reload.

---

## ✨ Features

| Feature | Description |
|--------|-------------|
| **Add Task** | Enter task name and due date. Validation: name is required (alert + in-page error message if empty). |
| **Display List** | Each task shows: name, due date, completion checkbox, and delete button. |
| **Mark Completed** | Check the box → task text is struck through. |
| **Delete** | Remove a single task or **Delete All** (with confirmation). |
| **Filter** | Dropdown: **All**, **Completed**, **Uncompleted**, **Due Date** (sort by nearest date first). |
| **Theme Switcher** | 6 themes (dropdown top right). Selection is saved in localStorage. |
| **Responsive** | Centered card layout, works on mobile and desktop. |

---

## 🎨 Themes

All themes are controlled via **CSS Variables** and a `data-theme` attribute on `<body>` in a single `css/style.css` file.

| Theme | Vibe |
|-------|--------|
| **Minimalist** (default) | Clean white/gray, Inter font, subtle shadows. |
| **Cyberpunk** | Dark background, neon pink/blue accents, glitch effect on hover, Courier font. |
| **Dark** | Dark gray, soft white text, easy on the eyes. |
| **Light** | High contrast white background, black text, sharp borders. |
| **RGB** | Animated RGB borders/gradients, gaming feel. |
| **Vintage** | Sepia/beige background, brown text, serif/typewriter font. |

![Theme Switcher](preview-themes.png)
> *Theme dropdown — choose one of 6 themes (Minimalist, Cyberpunk, Dark, Light, RGB, Vintage).*

---

## 📋 Filter

Filter dropdown to view tasks: **All**, **Completed**, **Uncompleted**, or **Due Date** (sorted by nearest date first).

![Filter](preview-filter.png)
> *Filter dropdown — Due Date option sorts tasks by due date.*

---

## 📅 Due Date (dd/mm/yyyy)

Each task can have a **due date**. The date input uses `type="date"`; the browser shows a date picker (calendar) to choose the date.

![Date Picker](preview-datepicker.png)
> *Date picker — choose due date when adding or editing a task.*

---

## 🛠 Tech Stack & Structure

- **HTML5** — semantic structure, form, filter, theme switcher.
- **CSS3** — variables (`:root` + `[data-theme="..."]`), card layout, responsive.
- **Vanilla JavaScript** — CRUD, filter, theme logic, localStorage (no framework).

**File structure (per constraint):**

```
todolist-web-app/
├── index.html      # Main UI (form, filter, theme select, task list)
├── css/
│   └── style.css   # All styles + 6 themes (single file)
├── js/
│   └── script.js   # All logic (theme, CRUD, filter, localStorage)
└── README.md
```

---

## 🚀 How to Run

1. Clone or download this repo.
2. Open in a browser:
   - **Via server (e.g. XAMPP):** put the folder in `htdocs`, then visit `http://localhost/todolist-web-app/`
   - **Direct:** open `index.html` (double-click or drag into the browser).
3. Add tasks, try filters, switch themes — your theme and task list will persist after refresh.

No dependencies; a modern browser is enough.

---

## 📂 Repo Naming (GitHub)

When pushing to GitHub, the repo name should follow this format:

```text
CodingCamp-19Jan26-[YourFullName]
```

Replace `[YourFullName]` with your name.

---

## 📋 Spec Reference (Original Brief)

- **Constraint:** Only 3 main files: `index.html`, `css/style.css`, `js/script.js`. No extra files.
- **Validation:** Task name is required; if empty → show alert and/or in-page error.
- **Persistence:** Task list and theme are stored in `localStorage`.
- **Theme:** Must use CSS Variables and `data-theme` on body; all themes in one `style.css`.

---

To add features or change themes, edit `style.css` and `script.js`. Enjoy. 🚀
