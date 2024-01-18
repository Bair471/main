function addFood(event) {
    event.preventDefault();

    const form = event.target;

    const food = {
        brand: form.brand.value,
    };

    fetch('http://localhost:8000/api/Food', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(food)
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.log('Failed to add food:', error);
    })
}
