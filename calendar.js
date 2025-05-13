document.addEventListener('DOMContentLoaded', function() {
    const noteTextarea = document.getElementById('note-text');
    const saveButton = document.getElementById('save-button');
    const entriesDiv = document.getElementById('entries');

    // Загрузка существующих записей из localStorage при загрузке страницы
    loadEntries();

    saveButton.addEventListener('click', function() {
        const note = noteTextarea.value;

        if (note.trim() !== '') {
            saveEntry(note);
            noteTextarea.value = ''; // Очистить поле ввода
        }
    });

    function saveEntry(note) {
        const now = new Date();
        const dateString = formatDate(now);
        const entry = { date: dateString, text: note };

        let entries = JSON.parse(localStorage.getItem('diaryEntries') || '[]');
        entries.push(entry);
        localStorage.setItem('diaryEntries', JSON.stringify(entries));

        displayEntry(entry);
    }

     function displayEntry(entry) {
         const entryDiv = document.createElement('div');
         entryDiv.classList.add('entry');

         const dateDiv = document.createElement('div');
         dateDiv.classList.add('date');
         dateDiv.textContent = entry.date;

         const textDiv = document.createElement('div');
         textDiv.textContent = entry.text;

         const editButton = document.createElement('button');
         editButton.textContent = 'Редактировать';
         editButton.classList.add('edit-button'); // Добавляем класс

         editButton.addEventListener('click', function() {
             noteTextarea.value = entry.text; // Заполняем текстовое поле для редактирования
             deleteEntry(entry); // Удаляем старую запись
             entryDiv.remove(); // Удаляем запись из интерфейса
         });

         const deleteButton = document.createElement('button');
         deleteButton.textContent = 'Удалить';
         deleteButton.classList.add('delete-button'); // Добавляем класс

         deleteButton.addEventListener('click', function() {
             deleteEntry(entry);
             entryDiv.remove();
         });

         entryDiv.appendChild(dateDiv);
         entryDiv.appendChild(textDiv);
         entryDiv.appendChild(editButton);
         entryDiv.appendChild(deleteButton);

         entriesDiv.prepend(entryDiv);
     }

     function deleteEntry(entryToDelete) {
       let entries = JSON.parse(localStorage.getItem('diaryEntries') || '[]');
       entries = entries.filter(entry => !(entry.date === entryToDelete.date && entry.text === entryToDelete.text));
       localStorage.setItem('diaryEntries', JSON.stringify(entries));
     }

     function loadEntries() {
       const entries = JSON.parse(localStorage.getItem('diaryEntries') || '[]');
       entries.forEach(entry => displayEntry(entry));
     }

     function formatDate(date) {
       const day = String(date.getDate()).padStart(2, '0');
       const month = String(date.getMonth() + 1).padStart(2, '0');
       const year = date.getFullYear();
       const hours = String(date.getHours()).padStart(2, '0');
       const minutes = String(date.getMinutes()).padStart(2, '0');

       return `${day}.${month}.${year} ${hours}:${minutes}`;
     }
});
