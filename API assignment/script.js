document.addEventListener('DOMContentLoaded', async () => {
    const userContainer = document.getElementById('person-container');
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();

    users.forEach(user => {
        const card = document.createElement('div');
        card.className = 'person';

        const personUrl = `https://robohash.org/${user.id}`;
        //this part is with the help of AI
        card.innerHTML = `
            <img src="${personUrl}" alt="${user.name}" />
            <h2>${user.name}</h2>
            <p>Username: ${user.username}</p>
            <p>Email: ${user.email}</p>
        `;

        userContainer.appendChild(card);
    });
});
