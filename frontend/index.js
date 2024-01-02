
const bikesbody = document.getElementById('bikes-body');

fetch(`http://localhost:8000/api/bikes`)
.then(response => response.json())
.then(bikes => {(b)
    bikes.forEach(bike => {
        const row = document.createElement('tr');

    
        const id = document.createElement('td');
        const brand = document.createElement('td');
        const model = document.createElement('td');
        const year = document.createElement('td');
        const price = document.createElement('td');
        const actions = document.createElement('td');

        
        id.innerText = bike._id;
        brand.innerText = bike.brand;
        model.innerText = bike.model;
        year.innerText = bike.year;
        price.innerText = bike.price;

        
        const editButton = document.createElement('button');
        editButton.className = 'btn btn-primary';
        editButton.innerText = 'Edit';
        editButton.addEventListener('click', () => {
            window.location.href = `../edit-bike/edit-bike.html?id=${bike._id}`;
        });
    })
})


