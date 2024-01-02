
const bikesbody = document.getElementById('bikes-body');

fetch(`http://localhost:8000/api/bikes`)
.then(response => response.json())
.then(bikes => {(b)
    bikes.forEach(bike => {
        
    })
})


