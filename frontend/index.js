function handleSave() {
   const info = document.getElementById(`info`)
   alert(info.value)
   const brand = document.getElementById(`brand`)
   alert(brand.value)
fetch(`http://localhost:8080/info`,{method:'POST',
headers: {
    'Content-Type': 'application/json'
},
body: JSON.stringify({
    information: info.value, 
    brand: brand.value,
    
})
})
.then(response => response.text())
.then(result => console.log(`Tochno? ${result}`))
.catch(error => console.log('error', error));
}



