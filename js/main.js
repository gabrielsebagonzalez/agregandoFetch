const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()
let carrito = {}

document.addEventListener('DOMContentLoaded', () => {
  fetchData()
})



cards.addEventListener('click', e => {
  agregarAlCarrito(e)
})

const fetchData = async() => {
    try {
        const res = await fetch('./productos.json')
        const data = await res.json()
        crearCards(data)
    } catch (error) {
        console.log('error');
      
    }
}

const crearCards = (data) => {
  console.log(data);
  data.forEach(producto => {
    templateCard.querySelector('h2').textContent = producto.nombre
    templateCard.querySelector('h4').textContent = producto.marca
    templateCard.querySelector('p').textContent = producto.precio
    templateCard.querySelector('img').setAttribute('src', producto.imagen)
    templateCard.querySelector('.btn').dataset.id = producto.id

    const clone = templateCard.cloneNode(true)
    fragment.appendChild(clone)
  })
  cards.appendChild(fragment)  
}

const agregarAlCarrito = e => {
  if(e.target.classList.contains('btn')) {
    setCarrito(e.target.parentElement)
  }
  e.stopPropagation()
}



const setCarrito = objeto => {
  const producto = {
    id: objeto.querySelector('.btn').dataset.id,
    nombre: objeto.querySelector('h2').textContent,
    marca: objeto.querySelector('h4').textContent,
    precio: objeto.querySelector('p').textContent,
    cantidad: 1
  }
  if(carrito.hasOwnProperty(producto.id)) {
    producto.cantidad = carrito[producto.id].cantidad + 1 
  }
  carrito[producto.id] = {...producto}
  crearCarrito()
}

const crearCarrito = () => {
  console.log(carrito);
  Object.values(carrito).forEach(producto => {
    templateCarrito.querySelector('th').textContent = producto.id
    templateCarrito.querySelectorAll('td')[0].textContent = producto.nombre
    templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
    templateCarrito.querySelector('.btn-info').dataset.id = producto.id
    templateCarrito.querySelector('.btn-danger').dataset.id = producto.id 
    templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio
    const clone = templateCarrito.cloneNode(true)
    fragment.appendChild(clone)
  })
  items.appendChild(fragment)
}







