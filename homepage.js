const apiUrl = 'https://striveschool-api.herokuapp.com/api/product/'

const products = [
  {
    id: 1,
    name: 'Caramel Candy Delight',
    description:
      'Deliziose caramelle al caramello morbido, perfette per ogni momento.',
    price: 3.99,
    image: 'https://example.com/images/caramel_candy_delight.jpg',
  },
  {
    id: 2,
    name: 'Gummy Bears',
    description:
      'Colorate caramelle gommose a forma di orsetto, disponibili in vari gusti.',
    price: 2.49,
    image: 'https://example.com/images/gummy_bears.jpg',
  },
  {
    id: 3,
    name: 'Lollipop Frenzy',
    description: 'Lecca-lecca assortiti con gusti fruttati e divertenti forme.',
    price: 5.99,
    image: 'https://example.com/images/lollipop_frenzy.jpg',
  },
  {
    id: 4,
    name: 'Chewy Fruit Slices',
    description:
      "Fette di frutta morbide, ricoperte di zucchero per un'esperienza dolce.",
    price: 4.49,
    image: 'https://example.com/images/chewy_fruit_slices.jpg',
  },
  {
    id: 5,
    name: 'Sour Patch Kids',
    description:
      'Caramelle acide che diventano dolci! Una vera delizia per il palato.',
    price: 3.99,
    image: 'https://example.com/images/sour_patch_kids.jpg',
  },
  {
    id: 6,
    name: 'Chocolate Covered Caramels',
    description:
      'Caramelle di caramello ricoperte di cioccolato fondente, irresistibili!',
    price: 6.99,
    image: 'https://example.com/images/chocolate_covered_caramels.jpg',
  },
  {
    id: 7,
    name: 'Classic Jelly Beans',
    description:
      'Fagioli di gelatina classici, disponibili in una vasta gamma di gusti.',
    price: 2.99,
    image: 'https://example.com/images/jelly_beans.jpg',
  },
  {
    id: 8,
    name: 'Minty Fresh Candy',
    description: "Caramelle alla menta fresche per rinfrescare l'alito.",
    price: 1.99,
    image: 'https://example.com/images/minty_fresh_candy.jpg',
  },
  {
    id: 9,
    name: 'Cotton Candy Fluff',
    description:
      "Una dolce nuvola di zucchero filato per un'esperienza golosa!",
    price: 3.49,
    image: 'https://example.com/images/cotton_candy_fluff.jpg',
  },
  {
    id: 10,
    name: 'Fruit Chews',
    description: 'Morbide caramelle alla frutta che si sciolgono in bocca.',
    price: 4.99,
    image: 'https://example.com/images/fruit_chews.jpg',
  },
]

const fetchProducts = async () => {
  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer YOUR_API_TOKEN`,
      },
    })

    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText)
    }

    const data = await response.json()
    console.log('Dati ottenuti:', data)
    displayProducts(data)
  } catch (error) {
    console.error('Errore:', error)
  }
}

const displayProducts = (products) => {
  const productListElement = document.getElementById('productList')
  productListElement.innerHTML = ''

  products.forEach((product) => {
    const productCard = `
      <div class="col-md-4 mb-4">
        <div class="card">
          <img src="${product.image}" class="card-img-top" alt="${product.name}" />
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-text"><strong>$${product.price}</strong></p>
            <a href="#" class="btn btn-primary">Add to Cart</a>
          </div>
        </div>
      </div>
    `
    productListElement.innerHTML += productCard
  })
}

const addProducts = async () => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer YOUR_API_TOKEN`,
      },
      body: JSON.stringify(products),
    })

    if (!response.ok) {
      throw new Error('Errore nella risposta della rete')
    }

    const data = await response.json()
    console.log('Prodotti aggiunti:', data)
    alert('Prodotti aggiunti con successo!')
  } catch (error) {
    console.error(
      "Si è verificato un errore durante l'aggiunta dei prodotti:",
      error
    )
    alert("Si è verificato un errore durante l'aggiunta dei prodotti.")
  }
}

document
  .getElementById('addProductsButton')
  .addEventListener('click', addProducts)

fetchProducts()
