let cart = [];
let books = [];

// Carregar livros ao iniciar
document.addEventListener('DOMContentLoaded', function() {
    loadBooks();
    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('book-form').addEventListener('submit', handleBookSubmit);
}

// Navegação entre seções
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    
    if (sectionId === 'books') {
        loadBooks();
    }
}

// Carregar livros do servidor
async function loadBooks() {
    try {
        const response = await fetch('livraria/routes/livros.js');
        books = await response.json();
        displayBooks();
    } catch (error) {
        console.error('Erro ao carregar livros:', error);
        // Dados de exemplo se não conseguir conectar ao servidor
        books = [
            {id: 1, nome: 'Dom Casmurro', preco: 25.90, descricao: 'Clássico da literatura brasileira', estoque: 10},
            {id: 2, nome: 'O Cortiço', preco: 22.50, descricao: 'Romance naturalista brasileiro', estoque: 8},
            {id: 3, nome: '1984', preco: 35.00, descricao: 'Distopia de George Orwell', estoque: 15},
            {id: 4, nome: 'O homem mais rico da Babilônia', preco: 25.50, descricao: 'Clássico que ajuda a solucionar problemas finaceiros', estoque: 3},
            {id: 5, nome: 'Acuado, Escrevo!', preco: 30.00, descricao: 'Poesia brasileira', estoque: 1},
            {id: 6, nome: 'Fortaleza Digital', preco: 40.00, descricao: 'Ficção científica da era digital', estoque: 1}
        ];
        displayBooks();
    }
}

// Exibir livros na tela
function displayBooks() {
    const booksGrid = document.getElementById('books-grid');
    booksGrid.innerHTML = '';
    
    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <div class="book-title">${book.nome}</div>
            <div class="book-price">R$ ${book.preco.toFixed(2)}</div>
            <div class="book-description">${book.descricao}</div>
            <div class="book-stock">Estoque: ${book.estoque} unidades</div>
            <button onclick="addToCart(${book.id})" class="btn-primary" ${book.estoque === 0 ? 'disabled' : ''}>
                ${book.estoque === 0 ? 'Esgotado' : 'Adicionar ao Carrinho'}
            </button>
            <button onclick="editBook(${book.id})" style="margin-left: 10px; background: #ffc107; color: #000;">
                Editar
            </button>
            <button onclick="deleteBook(${book.id})" style="margin-left: 5px; background: #dc3545;">
                Excluir
            </button>
        `;
        booksGrid.appendChild(bookCard);
    });
}

// Adicionar ao carrinho
function addToCart(bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book || book.estoque === 0) return;
    
    const cartItem = cart.find(item => item.id === bookId);
    if (cartItem) {
        if (cartItem.quantity < book.estoque) {
            cartItem.quantity++;
        } else {
            alert('Estoque insuficiente!');
            return;
        }
    } else {
        cart.push({...book, quantity: 1});
    }
    
    updateCartDisplay();
}

// Atualizar exibição do carrinho
function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.preco * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrice.toFixed(2);
    
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div>
                <div>${item.nome}</div>
                <div>R$ ${item.preco.toFixed(2)} x ${item.quantity}</div>
            </div>
            <div>
                <button onclick="changeQuantity(${item.id}, -1)">-</button>
                <span style="margin: 0 10px;">${item.quantity}</span>
                <button onclick="changeQuantity(${item.id}, 1)">+</button>
                <button onclick="removeFromCart(${item.id})" style="margin-left: 10px; background: #dc3545; color: white; border: none; padding: 5px;">×</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
}

// Alterar quantidade no carrinho
function changeQuantity(bookId, change) {
    const cartItem = cart.find(item => item.id === bookId);
    const book = books.find(b => b.id === bookId);
    
    if (cartItem) {
        const newQuantity = cartItem.quantity + change;
        if (newQuantity <= 0) {
            removeFromCart(bookId);
        } else if (newQuantity <= book.estoque) {
            cartItem.quantity = newQuantity;
            updateCartDisplay();
        } else {
            alert('Estoque insuficiente!');
        }
    }
}

// Remover do carrinho
function removeFromCart(bookId) {
    cart = cart.filter(item => item.id !== bookId);
    updateCartDisplay();
}

// Toggle carrinho
function toggleCart() {
    const cartSidebar = document.getElementById('cart');
    cartSidebar.classList.toggle('open');
}

// Finalizar compra
function checkout() {
    if (cart.length === 0) {
        alert('Carrinho vazio!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.preco * item.quantity), 0);
    alert(`Compra finalizada! Total: R$ ${total.toFixed(2)}\nObrigado pela preferência!`);
    cart = [];
    updateCartDisplay();
    toggleCart();
}
