const taskForm = document.getElementById('task-form');
const taskTitleInput = document.getElementById('task-title');
const taskList = document.getElementById('task-list');

const API_URL = 'http://localhost:3000/tasks';

// Charger les tâches existantes au démarrage
document.addEventListener('DOMContentLoaded', fetchTasks);

// Soumission du formulaire
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = taskTitleInput.value.trim();
    if (!title) return;

    try {
        const newTask = await createTask(title);
        if (newTask) {
            addTaskToDOM(newTask);
            taskTitleInput.value = '';
        }
    } catch (error) {
        alert('Erreur lors de la création de la tâche.');
        console.error(error);
    }
});

// Gestion des actions sur les tâches (event delegation)
taskList.addEventListener('click', async (e) => {
    const li = e.target.closest('li[data-id]');
    if (!li) return;
    const id = li.dataset.id;

    if (e.target.matches('.toggle-btn')) {
        const completed = !li.classList.contains('completed');
        try {
            await toggleTask(id, completed);
        } catch (error) {
            alert('Erreur lors de la mise à jour de la tâche.');
            console.error(error);
        }
    }

    if (e.target.matches('.delete-btn')) {
        try {
            await deleteTask(id);
        } catch (error) {
            alert('Erreur lors de la suppression de la tâche.');
            console.error(error);
        }
    }
    if (e.target.matches('.edit-btn')) {
        const span = li.querySelector('.task-title');
        const currentTitle = span.textContent;
        const newTitle = prompt('Modifier le titre de la tâche :', currentTitle);

        if (newTitle && newTitle.trim() && newTitle !== currentTitle) {
            try {
                await updateTaskTitle(id, newTitle.trim());
                span.textContent = newTitle.trim();
            } catch (error) {
                alert('Erreur lors de la modification du titre.');
                console.error(error);
            }
        }
    }
});

// Récupération des tâches depuis l'API
async function fetchTasks() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Erreur réseau');
        const tasks = await res.json();
        tasks.forEach(addTaskToDOM);
    } catch (error) {
        alert('Impossible de charger les tâches.');
        console.error(error);
    }
}

// Ajouter une tâche dans le DOM
function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.dataset.id = task.id;
    if (task.completed) li.classList.add('completed');

    li.innerHTML = `
    <span class="task-title">${escapeHtml(task.title)}</span>
    <div class="actions">
        <button class="edit-btn" title="Modifier">✎</button>
        <button class="toggle-btn" title="Marquer comme ${task.completed ? 'non terminée' : 'terminée'}">✓</button>
        <button class="delete-btn" title="Supprimer">✕</button>
    </div>
    `;
    taskList.appendChild(li);
}

// Créer une nouvelle tâche (POST)
async function createTask(title) {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, completed: false }),
    });
    if (!res.ok) throw new Error('Erreur lors de la création');
    return await res.json();
}

// Mettre à jour une tâche (PUT)
async function toggleTask(id, completed) {
    const li = document.querySelector(`li[data-id="${id}"]`);
    if (!li) throw new Error('Tâche introuvable');
    const title = li.querySelector('span').textContent;

    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, completed }),
    });
    if (!res.ok) throw new Error('Erreur lors de la mise à jour');
    const updated = await res.json();
    li.classList.toggle('completed', updated.completed);
}

// Mettre à jour le titre d'une tâche (PUT)
async function updateTaskTitle(id, newTitle) {
    const li = document.querySelector(`li[data-id="${id}"]`);
    if (!li) throw new Error('Tâche introuvable');
    const completed = li.classList.contains('completed');

    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, completed }),
    });

    if (!res.ok) throw new Error('Erreur lors de la mise à jour du titre');
    return await res.json();
}

// Supprimer une tâche (DELETE)
async function deleteTask(id) {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Erreur lors de la suppression');
    const li = document.querySelector(`li[data-id="${id}"]`);
    if (li) li.remove();
}

// Sécuriser l'affichage du texte
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
