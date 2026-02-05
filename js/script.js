(function () {
  'use strict';

  const THEME_KEY = 'todolist-theme';
  const TASKS_KEY = 'todolist-tasks';
  const THEMES = ['minimalist', 'cyberpunk', 'dark', 'light', 'rgb', 'vintage'];

  let tasks = [];
  let currentFilter = 'all';

  const $themeSelect = document.getElementById('theme-select');
  const $taskForm = document.getElementById('task-form');
  const $taskName = document.getElementById('task-name');
  const $taskDate = document.getElementById('task-date');
  const $formError = document.getElementById('form-error');
  const $filterSelect = document.getElementById('filter-select');
  const $taskList = document.getElementById('task-list');
  const $deleteAll = document.getElementById('delete-all');

  function loadTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    const theme = THEMES.includes(saved) ? saved : 'minimalist';
    document.body.setAttribute('data-theme', theme);
    $themeSelect.value = theme;
  }

  function saveTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
  }

  $themeSelect.addEventListener('change', function () {
    const theme = $themeSelect.value;
    document.body.setAttribute('data-theme', theme);
    saveTheme(theme);
  });

  function loadTasks() {
    try {
      const raw = localStorage.getItem(TASKS_KEY);
      tasks = raw ? JSON.parse(raw) : [];
    } catch (_) {
      tasks = [];
    }
  }

  function saveTasks() {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }

  function showError(msg) {
    $formError.textContent = msg || '';
  }

  function getFilteredTasks() {
    let list = tasks.slice();
    if (currentFilter === 'completed') {
      list = list.filter(function (t) { return t.completed; });
    } else if (currentFilter === 'uncompleted') {
      list = list.filter(function (t) { return !t.completed; });
    } else if (currentFilter === 'due-date') {
      list.sort(function (a, b) {
        const d1 = a.dueDate || '';
        const d2 = b.dueDate || '';
        if (!d1 && !d2) return 0;
        if (!d1) return 1;
        if (!d2) return -1;
        return d1.localeCompare(d2);
      });
    }
    return list;
  }

  function toggleCompleted(id) {
    const t = tasks.find(function (task) { return task.id === id; });
    if (t) {
      t.completed = !t.completed;
      saveTasks();
      render();
    }
  }

  function deleteTask(id) {
    tasks = tasks.filter(function (t) { return t.id !== id; });
    saveTasks();
    render();
  }

  function deleteAllTasks() {
    if (tasks.length === 0) return;
    if (typeof alert !== 'undefined' && !window.confirm('Delete all tasks?')) return;
    tasks = [];
    saveTasks();
    render();
  }

  function render() {
    const list = getFilteredTasks();
    $taskList.innerHTML = '';
    if (list.length === 0) {
      const emptyMsg = document.createElement('li');
      emptyMsg.style.textAlign = 'center';
      emptyMsg.style.marginTop = '2rem';
      emptyMsg.style.color = 'var(--text-muted)';
      emptyMsg.textContent = 'No tasks found. Enjoy your day! 😎';
      $taskList.appendChild(emptyMsg);
      return;
    }
    list.forEach(function (task) {
      const li = document.createElement('li');
      li.className = 'task-item' + (task.completed ? ' completed' : '');
      if (document.body.getAttribute('data-theme') === 'cyberpunk') {
        li.classList.add('glitch');
      }
      li.setAttribute('data-id', task.id);

      const check = document.createElement('input');
      check.type = 'checkbox';
      check.className = 'task-check';
      check.checked = task.completed;
      check.setAttribute('aria-label', 'Mark as ' + (task.completed ? 'incomplete' : 'complete'));
      check.addEventListener('change', function () { toggleCompleted(task.id); });

      const content = document.createElement('div');
      content.className = 'task-content';

      const nameEl = document.createElement('p');
      nameEl.className = 'task-name';
      nameEl.textContent = task.name || 'Untitled';

      const dateEl = document.createElement('p');
      dateEl.className = 'task-date';
      dateEl.textContent = task.dueDate ? 'Due: ' + task.dueDate : 'No due date';

      content.appendChild(nameEl);
      content.appendChild(dateEl);

      const delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.className = 'btn btn-icon';
      delBtn.setAttribute('aria-label', 'Delete task');
      delBtn.textContent = '×';
      delBtn.addEventListener('click', function () { deleteTask(task.id); });

      const actions = document.createElement('div');
      actions.className = 'task-actions';
      actions.appendChild(delBtn);

      li.appendChild(check);
      li.appendChild(content);
      li.appendChild(actions);
      $taskList.appendChild(li);
    });
  }

  $taskForm.addEventListener('submit', function (e) {
    e.preventDefault();
    showError('');
    const name = ($taskName.value || '').trim();
    const dueDate = $taskDate.value || '';
    if (!name) {
      showError('Task name is required.');
      if (typeof alert === 'function') alert('Task name is required.');
      $taskName.focus();
      return;
    }
    tasks.push({
      id: Date.now().toString(36) + Math.random().toString(36).slice(2),
      name: name,
      dueDate: dueDate,
      completed: false
    });
    saveTasks();
    $taskName.value = '';
    $taskDate.value = '';
    $taskName.focus();
    render();
  });

  $filterSelect.addEventListener('change', function () {
    currentFilter = $filterSelect.value;
    render();
  });

  $deleteAll.addEventListener('click', deleteAllTasks);

  loadTheme();
  loadTasks();
  render();
})();
