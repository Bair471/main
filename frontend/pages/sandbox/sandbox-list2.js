const foodBody = document.getElementById('food-body');

fetch('http://localhost:8000/api/Food')
.then(response => response.json())
.then(foods => {
    foods.forEach(food => {
        const row = document.createElement('tr');
        const id = document.createElement('td');
        const brand = document.createElement('td');
        const actions = document.createElement('td');

        id.innerText = food.id;
        brand.innerText = food.brand;

        const editButton = document.createElement('button');
        editButton.className = 'btn btn-primary';
        editButton.innerText = 'Edit';
        editButton.addEventListener('click', () => {
            window.location.href = `../SANDBOX/sandbox2.html?id=${food.id}`;

        });
        actions.appendChild(editButton);

        row.appendChild(id);
        row.appendChild(brand);
        row.appendChild(actions);

        foodBody.appendChild(row);
    });
});