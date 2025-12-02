let cart = [];

// LISTA FIXA DE LIVROS (FRENTE)
const books = [
  {
    id: 1,
    nome: "A Sociedade do Anel",
    autor: "J.R.R. Tolkien",
    categoria: "Fantasia",
    preco: 59.9,
    descricao: "Primeiro volume de O Senhor dos Anéis.",
    estoque: 8,
    promo: true,
    imagem: "./assets/livro_sociedade.jpg"
  },
  {
    id: 2,
    nome: "It: A Coisa",
    autor: "Stephen King",
    categoria: "Terror",
    preco: 69.9,
    descricao: "Clássico do terror que inspirou o filme.",
    estoque: 5,
    promo: true,
    imagem: "./assets/livro_it..jpg"
  },
  {
    id: 3,
    nome: "Mindset",
    autor: "Carol S. Dweck",
    categoria: "Autoajuda",
    preco: 44.9,
    descricao: "Como a mentalidade influencia o sucesso.",
    estoque: 10,
    promo: false,
    imagem: "./assets/livro_mindset.jpg"
  },
  {
    id: 4,
    nome: "1984",
    autor: "George Orwell",
    categoria: "Ficção Científica",
    preco: 39.9,
    descricao: "Distopia clássica sobre vigilância e controle.",
    estoque: 7,
    promo: true,
    imagem: "./assets/livro_1984.jpg"
  },
  {
    id: 5,
    nome: "Dom Casmurro",
    autor: "Machado de Assis",
    categoria: "Clássico",
    preco: 29.9,
    descricao: "Uma das obras-primas da literatura brasileira.",
    estoque: 12,
    promo: false,
    imagem: "./assets/livro_dom.jpg"
  },
  {
    id: 6,
    nome: "Harry Potter e a Pedra Filosofal",
    autor: "J.K. Rowling",
    categoria: "Fantasia",
    preco: 49.9,
    descricao: "O começo da jornada de Harry em Hogwarts.",
    estoque: 9,
    promo: false,
    imagem: "./assets/livro_filosofal.jpg"
  },
  {
    id: 7,
    nome: "O Chamado de Cthulhu",
    autor: "H.P. Lovecraft",
    categoria: "Terror",
    preco: 34.9,
    descricao: "Contos clássicos de horror cósmico.",
    estoque: 6,
    promo: true,
    imagem: "./assets/livro_ochamado.jpg"
  },
  {
    id: 8,
    nome: "Hábitos Atômicos",
    autor: "James Clear",
    categoria: "Autoajuda",
    preco: 54.9,
    descricao: "Como construir bons hábitos e abandonar os ruins.",
    estoque: 11,
    promo: false,
    imagem: "./assets/livro_habitos.jpg"
  },
  {
    id: 9,
    nome: "Duna",
    autor: "Frank Herbert",
    categoria: "Ficção Científica",
    preco: 64.9,
    descricao: "Um épico de ficção científica em um deserto distante.",
    estoque: 4,
    promo: true,
    imagem: "./assets/livro_duna.jpg"
  },
  {
    id: 10,
    nome: "Naruto Vol. 1",
    autor: "Masashi Kishimoto",
    categoria: "Mangá",
    preco: 27.9,
    descricao: "Primeiro volume da jornada de Naruto.",
    estoque: 15,
    promo: false,
    imagem: "./assets/livro_manga.jpg"
  },
{
  id: 11,
  nome: "O Pequeno Príncipe",
  autor: "Antoine de Saint-Exupéry",
  categoria: "Literatura",
  preco: 59.90,
  descricao: "Uma fábula poética sobre a inocência e a sabedoria infantil.",
  estoque: 15,
  promo: false,
  imagem: "./assets/livro_principe.jpg"
},
{
  id: 12,
  nome: "Orgulho e Preconceito",
  autor: "Jane Austen",
  categoria: "Clássico",
  preco: 42.80,
  descricao: "Obra-prima de Jane Austen sobre costumes e relacionamentos.",
  estoque: 8,
  promo: false,
  imagem: "./assets/livro_orgulho.jpg"
},
{
  id: 13,
  nome: "Sapiens: Uma Breve História da Humanidade",
  autor: "Yuval Noah Harari",
  categoria: "História",
  preco: 58.00,
  descricao: "Da pré-história ao século XXI, por Yuval Noah Harari.",
  estoque: 10,
  promo: false,
  imagem: "./assets/livro_sapiens.jpg"
},
{
  id: 14,
  nome: "O Hobbit",
  autor: "J.R.R. Tolkien",
  categoria: "Fantasia",
  preco: 44.50,
  descricao: "A aventura fantástica de Bilbo Bolseiro por J.R.R. Tolkien.",
  estoque: 7,
  promo: true,
  imagem: "./assets/livro_hobbit.jpg"
},
{
  id: 15,
  nome: "Percy Jackson e o Ladrão de Raios",
  autor: "Rick Riordan",
  categoria: "Fantasia",
  preco: 39.90,
  descricao: "Primeiro livro da série de fantasia com mitologia grega no mundo moderno.",
  estoque: 10,
  promo: false,
  imagem: "./assets/livro_ladrao.jpg"
},
{
  id: 16,
  nome: "As Crônicas de Nárnia: O Leão, a Feiticeira e o Guarda-Roupa",
  autor: "C.S. Lewis",
  categoria: "Fantasia",
  preco: 34.50,
  descricao: "Clássico da fantasia sobre crianças que descobrem o mundo mágico de Nárnia.",
  estoque: 8,
  promo: true,
  imagem: "./assets/livro_narnia.jpg"
}

];

// ESTADO DO FILTRO ATUAL
let currentFilter = {
  categoria: "todos", 
  promo: false
};

// Carregar livros ao iniciar
document.addEventListener("DOMContentLoaded", function () {
  showSection("home");
  renderBooks();
});

// Navegação entre seções
function showSection(sectionId) {
  document.querySelectorAll(".section").forEach(section => {
    section.classList.remove("active");
  });
  const target = document.getElementById(sectionId);
  if (target) target.classList.add("active");

  if (sectionId === "books") {
    renderBooks();
  }
}

// FILTROS
function setCategoryFilter(categoria) {
  currentFilter.categoria = categoria;
  renderBooks();
}

function setPromoFilter(onlyPromo) {
  currentFilter.promo = onlyPromo;
  renderBooks();
}

// BUSCA
function searchBooks(term) {
  const value = term.toLowerCase();
  const base = getFilteredBooks();

  const filtered = base.filter(book =>
    book.nome.toLowerCase().includes(value) ||
    book.autor.toLowerCase().includes(value) ||
    book.categoria.toLowerCase().includes(value)
  );

  renderBooks(filtered);
}

// FILTRAGEM
function getFilteredBooks() {
  return books.filter(book => {
    const matchCategoria =
      currentFilter.categoria === "todos" ||
      book.categoria === currentFilter.categoria;

    const matchPromo =
      !currentFilter.promo || book.promo === true;

    return matchCategoria && matchPromo;
  });
}

// RENDERIZAÇÃO DOS LIVROS
function renderBooks(customList) {
  const booksGrid = document.getElementById("books-grid");
  if (!booksGrid) return;

  const list = customList || getFilteredBooks();

  booksGrid.innerHTML = "";

  if (!list || list.length === 0) {
    booksGrid.innerHTML = "<p>Nenhum livro encontrado.</p>";
    return;
  }

  list.forEach(book => {
    const preco = Number(book.preco) || 0;
    const estoque = Number(book.estoque) || 0;

    const bookCard = document.createElement("div");
    bookCard.className = "book-card";

    const imgSrc = book.imagem || "./assets/livros/placeholder.jpg";

    const promoBadge = book.promo
      ? '<span class="promo-badge">Black Friday</span>'
      : "";

    bookCard.innerHTML = `
      <div class="book-cover-wrapper">
        <img src="${imgSrc}" alt="Capa do livro ${escapeHtml(book.nome)}" class="book-cover">
        ${promoBadge}
      </div>
      <div class="book-title">${escapeHtml(book.nome)}</div>
      <div class="book-meta">
        ${escapeHtml(book.autor)} • ${escapeHtml(book.categoria)}
      </div>
      <div class="book-price">R$ ${preco.toFixed(2)}</div>
      <div class="book-description">${escapeHtml(book.descricao)}</div>
      <div class="book-stock">Estoque: ${estoque} unidades</div>
      <div class="book-actions">
        <button onclick="addToCart(${book.id})"
                class="btn-primary"
                ${estoque === 0 ? "disabled" : ""}>
          ${estoque === 0 ? "Esgotado" : "Adicionar ao Carrinho"}
        </button>
        <a href="detalhe.html?id=${book.id}" class="btn-secondary details-btn">
          Ver detalhes
        </a>
      </div>
    `;
    booksGrid.appendChild(bookCard);
  });
}

// Escape simples para HTML
function escapeHtml(text) {
  if (text === null || text === undefined) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// CARRINHO
function addToCart(bookId) {
  const book = books.find(b => b.id === bookId);
  if (!book || book.estoque === 0) return;

  const cartItem = cart.find(item => item.id === bookId);
  if (cartItem) {
    if (cartItem.quantity < book.estoque) {
      cartItem.quantity++;
    } else {
      alert("Estoque insuficiente!");
      return;
    }
  } else {
    cart.push({ ...book, quantity: 1 });
  }

  updateCartDisplay();
}

function updateCartDisplay() {
  const cartCount = document.getElementById("cart-count");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  if (!cartCount || !cartItems || !cartTotal) return;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + Number(item.preco) * item.quantity,
    0
  );

  cartCount.textContent = totalItems;
  cartTotal.textContent = totalPrice.toFixed(2);

  cartItems.innerHTML = "";
  cart.forEach(item => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <div>
        <div>${escapeHtml(item.nome)}</div>
        <div>R$ ${Number(item.preco).toFixed(2)} x ${item.quantity}</div>
      </div>
      <div>
        <button onclick="changeQuantity(${item.id}, -1)">-</button>
        <span style="margin: 0 10px;">${item.quantity}</span>
        <button onclick="changeQuantity(${item.id}, 1)">+</button>
        <button onclick="removeFromCart(${item.id})"
                style="margin-left: 10px; background: #dc3545; color: white; border: none; padding: 5px;">×</button>
      </div>
    `;
    cartItems.appendChild(cartItem);
  });
}

function changeQuantity(bookId, change) {
  const cartItem = cart.find(item => item.id === bookId);
  const book = books.find(b => b.id === bookId);

  if (cartItem && book) {
    const newQuantity = cartItem.quantity + change;
    if (newQuantity <= 0) {
      removeFromCart(bookId);
    } else if (newQuantity <= book.estoque) {
      cartItem.quantity = newQuantity;
      updateCartDisplay();
    } else {
      alert("Estoque insuficiente!");
    }
  }
}

function removeFromCart(bookId) {
  cart = cart.filter(item => item.id !== bookId);
  updateCartDisplay();
}

function toggleCart() {
  const cartSidebar = document.getElementById("cart");
  if (!cartSidebar) return;
  cartSidebar.classList.toggle("open");
}

// Agora o checkout chama a função para redirecionar para a página de finalização
function checkout() {
  if (cart.length === 0) {
    alert("Carrinho vazio!");
    return;
  }
  window.location.href = "checkout.html";
}




  