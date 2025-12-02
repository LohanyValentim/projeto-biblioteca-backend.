// Carrega dados do livro baseado no ID da URL
document.addEventListener("DOMContentLoaded", function() {
  loadBookDetails();
  updateCartDisplay(); // Carrega carrinho se tiver salvo
});

function getParameterByName(name) {
  const url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function loadBookDetails() {
  const bookId = Number(getParameterByName("id"));
  const bookDetailsSection = document.getElementById("book-details");
  
  if (!bookDetailsSection || !bookId || !books) {
    bookDetailsSection.innerHTML = `
      <div class="error-message">
        <h2>Livro não encontrado</h2>
        <p>Verifique se o link está correto ou <a href="index.html#books">volte ao catálogo</a>.</p>
      </div>
    `;
    return;
  }

  const book = books.find(b => b.id === bookId);
  
  if (!book) {
    bookDetailsSection.innerHTML = `
      <div class="error-message">
        <h2>Livro não encontrado</h2>
        <p>O livro pode ter sido removido. <a href="index.html#books">Volte ao catálogo</a>.</p>
      </div>
    `;
    return;
  }

  // Renderiza detalhes completos do livro + comentários ao lado
  bookDetailsSection.innerHTML = `
    <div class="book-details-container">
      <a href="index.html#books" class="back-btn">← Voltar ao catálogo</a>
      
      <div class="book-detail-layout">
        <article class="book-detail-card">
          <div class="book-detail-image">
            <img src="${book.imagem || './assets/livros/placeholder.jpg'}" 
                 alt="Capa de ${book.nome}" 
                 class="book-detail-cover">
          </div>
          
          <div class="book-detail-content">
            <h1 class="book-detail-title">${book.nome}</h1>
            <div class="book-detail-meta">
              <span class="book-detail-author">${book.autor}</span>
              <span class="book-detail-category">${book.categoria}</span>
              ${book.promo ? '<span class="promo-badge-detail">Black Friday</span>' : ''}
            </div>
            
            <div class="book-detail-price">R$ ${Number(book.preco).toFixed(2)}</div>
            
            <div class="book-detail-description">
              <h3>Sobre o livro</h3>
              <p>${book.descricao}</p>
            </div>
            
            <div class="book-detail-stock">
              <strong>Estoque disponível:</strong> ${book.estoque} unidades
            </div>
            
            <div class="book-detail-actions">
              <button onclick="addToCart(${book.id})" 
                      class="btn-primary btn-large ${book.estoque === 0 ? 'disabled' : ''}">
                ${book.estoque === 0 ? 'Esgotado' : 'Adicionar ao Carrinho'}
              </button>
              <a href="index.html#books" class="btn-secondary btn-large">Continuar comprando</a>
            </div>
          </div>
        </article>

        <aside class="book-comments">
          <h3>Opiniões dos leitores</h3>
          <div class="comment-card">
            <strong>Ana Souza</strong>
            <span class="comment-stars">⭐⭐⭐⭐⭐</span>
            <p>Livro incrível, a história prende do começo ao fim!</p>
          </div>
          <div class="comment-card">
            <strong>Carlos Lima</strong>
            <span class="comment-stars">⭐⭐⭐⭐</span>
            <p>Gostei bastante, recomendaria para quem curte o gênero.</p>
          </div>
          <div class="comment-card">
            <strong>Mariana Oliveira</strong>
            <span class="comment-stars">⭐⭐⭐⭐⭐</span>
            <p>Um dos meus favoritos, vale cada página.</p>
          </div>
        </aside>
      </div>
      
      <section class="related-books">
        <h3>Outros livros que você pode gostar</h3>
        <div id="related-books-grid" class="related-grid"></div>
      </section>
    </div>
  `;

  // Carrega sugestões relacionadas
  loadRelatedBooks(book.categoria, bookId);
}

// Carrega livros relacionados (mesma categoria, exceto o atual)
function loadRelatedBooks(category, excludeId) {
  const relatedGrid = document.getElementById("related-books-grid");
  if (!relatedGrid) return;

  const related = books
    .filter(b => b.categoria === category && b.id !== excludeId)
    .slice(0, 4);

  if (related.length === 0) {
    relatedGrid.innerHTML = '<p>Nenhum livro relacionado disponível.</p>';
    return;
  }

  related.forEach(book => {
    const card = document.createElement("div");
    card.className = "related-card";
    card.innerHTML = `
      <a href="detalhe.html?id=${book.id}">
        <img src="${book.imagem || './assets/livros/placeholder.jpg'}" alt="${book.nome}">
        <h4>${book.nome}</h4>
        <p>R$ ${Number(book.preco).toFixed(2)}</p>
      </a>
    `;
    relatedGrid.appendChild(card);
  });
}
