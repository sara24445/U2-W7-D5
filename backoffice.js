fetch('https://striveschool-api.herokuapp.com/api/product/', {
  method: 'GET',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MjI2YjhhZDEyOTAwMTU4NzZjODIiLCJpYXQiOjE3MzE2ODE0NjYsImV4cCI6MTczMjg5MTA2Nn0.TsIt0upO0WEOLe6B6qZ_W0rBelWqy56pOWrIVwLMM4g`, // Sostituisci con il tuo token
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText)
    }
    return response.json()
  })
  .then((data) => {
    // Gestisci i dati
  })
  .catch((error) => console.error('Errore:', error))

const apiUrl = 'https://striveschool-api.herokuapp.com/api/product/'

document
  .getElementById('productForm')
  .addEventListener('submit', function (event) {
    event.preventDefault() // Prevenire il comportamento di invio predefinito

    const id = document.getElementById('productId').value
    const name = document.getElementById('productName').value
    const description = document.getElementById('productDescription').value
    const brand = document.getElementById('productBrand').value
    const price = parseFloat(document.getElementById('productPrice').value)

    const payload = { name, description, brand, price }

    if (id) {
      // Modifica prodotto esistente
      fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          loadProducts() // Ricarica la lista prodotti
          displayMessage('Prodotto modificato con successo!')
          resetForm()
        })
        .catch((error) => console.error('Errore:', error))
    } else {
      // Crea nuovo prodotto
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          loadProducts() // Ricarica la lista prodotti
          displayMessage('Prodotto creato con successo!')
          resetForm()
        })
        .catch((error) => console.error('Errore:', error))
    }
  })

function loadProducts() {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((products) => {
      const tableBody = document
        .getElementById('productTable')
        .querySelector('tbody')
      tableBody.innerHTML = '' // Pulisce la tabella
      products.forEach((product) => {
        const row = document.createElement('tr')
        row.innerHTML = `
                    <td>${product._id}</td>
                    <td>${product.name}</td>
                    <td>${product.description}</td>
                    <td>${product.brand}</td>
                    <td>${product.price.toFixed(2)} €</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editProduct('${
                          product._id
                        }')">Modifica</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteProduct('${
                          product._id
                        }')">Elimina</button>
                    </td>
                `
        tableBody.appendChild(row)
      })
    })
    .catch((error) => console.error('Errore:', error))
}

function editProduct(productId) {
  fetch(`${apiUrl}/${productId}`)
    .then((response) => response.json())
    .then((product) => {
      document.getElementById('productId').value = product._id
      document.getElementById('productName').value = product.name
      document.getElementById('productDescription').value = product.description
      document.getElementById('productBrand').value = product.brand
      document.getElementById('productPrice').value = product.price
    })
    .catch((error) => console.error('Errore:', error))
}

function deleteProduct(productId) {
  if (confirm('Sei sicuro di voler eliminare questo prodotto?')) {
    fetch(`${apiUrl}/${productId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          loadProducts() // Ricarica la lista prodotti
          displayMessage('Prodotto eliminato con successo!')
        }
      })
      .catch((error) => console.error('Errore:', error))
  }
}

function displayMessage(message) {
  document.getElementById('message').innerText = message
  setTimeout(() => {
    document.getElementById('message').innerText = ''
  }, 3000)
}

function resetForm() {
  document.getElementById('productId').value = ''
  document.getElementById('productName').value = ''
  document.getElementById('productDescription').value = ''
  document.getElementById('productBrand').value = ''
  document.getElementById('productPrice').value = ''
}

// Carica i prodotti quando la pagina è caricata
window.onload = loadProducts
