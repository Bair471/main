function addFood(event) {
    event.prevenetDefault();

    const form = event.target;

    const food = {
        brand: form.brand.value
    };

    fetch('http://localhost:8000/api/Food', {
        method: 'POST',
        body: JSON.stringify(food)
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
        window.location.href = '../SANDBOX/sandbox-list2.html';
    })
    .catch(error => {
        console.log('Failed to add food:', error);
    })
}
