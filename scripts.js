document.addEventListener('DOMContentLoaded', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let total = carrito.reduce((acc, item) => acc + item.price, 0);

    function agregarAlCarrito(itemName, itemPrice) {
        const item = { name: itemName, price: itemPrice };
        carrito.push(item);
        total += item.price;
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
    }

    function eliminarDelCarrito(index) {
        total -= carrito[index].price;
        carrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
    }

    function actualizarCarrito() {
        const cartContainer = document.getElementById('cart-container');
        cartContainer.innerHTML = '';

        carrito.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price}`;
            
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Eliminar';
            removeButton.onclick = () => eliminarDelCarrito(index);
            
            li.appendChild(removeButton);
            cartContainer.appendChild(li);
        });

        document.getElementById('total-price').textContent = `Total: $${total}`;
        
        // Actualizar icono del carrito
        const cartCount = document.getElementById('cart-count');
        cartCount.textContent = carrito.length;
    }

    // Manejo del formulario de contacto
    document.getElementById('form-contacto').addEventListener('submit', (event) => {
        event.preventDefault();
        
        const nombre = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const mensaje = document.getElementById('message').value;

        alert(`Formulario enviado por ${nombre}.`);
        
        // Limpiar el formulario
        document.getElementById('form-contacto').reset();
    });

    // Inicializar el carrito al cargar la página
    actualizarCarrito();
});

