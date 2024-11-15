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

function loadProductDetail() {
  const productId = getProductIdFromURL()
  fetch(`${apiUrl}/${productId}`)
    .then((response) => response.json())
    .then((product) => {
      const productDetail = document.getElementById('productDetail')
      productDetail.innerHTML = `
                <h2>${product.name}</h2>
                <p><strong>Descrizione:</strong> ${product.description}</p>
                <p><strong>Marca:</strong> ${product.brand}</p>
                <p><strong>Prezzo:</strong> ${product.price.toFixed(2)} €</p>
                <a href="backoffice.html" class="btn btn-secondary">Torna al Back Office</a>
            `
    })
    .catch((error) => console.error('Errore:', error))
}

window.onload = loadProductDetail
