// Redireciona para checkout (usado no botão do carrinho)
function checkoutRedirect() {
  window.location.href = "checkout.html";
}

// Código para checkout.html
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("checkout-section")) {
    renderCheckoutSummary();
    setupCheckoutForm();
    updateCartDisplay();
  }
});

function renderCheckoutSummary() {
  const summary = document.getElementById("checkout-summary");
  const cartList = window.cart || [];
  if (!summary) return;

  if (cartList.length === 0) {
    summary.innerHTML = "<p>Seu carrinho está vazio.</p>";
    return;
  }

  let total = 0;

  const itemsHtml = cartList.map(item => {
    const subtotal = Number(item.preco) * item.quantity;
    total += subtotal;
    return `
      <div class="checkout-item">
        <div class="checkout-item-name">${item.nome} (x${item.quantity})</div>
        <div class="checkout-item-price">R$ ${subtotal.toFixed(2)}</div>
      </div>
    `;
  }).join("");

  summary.innerHTML = `
    <h3>Resumo do pedido</h3>
    <div class="checkout-items">${itemsHtml}</div>
    <div class="checkout-total"><strong>Total: R$ ${total.toFixed(2)}</strong></div>
  `;
}

function setupCheckoutForm() {
  const form = document.getElementById("checkout-form");
  const confirmation = document.getElementById("confirmation-message");
  if (!form || !confirmation) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    // Pega a forma de pagamento selecionada
    const paymentMethod = form.payment.value;

    // Monta a mensagem personalizada
    let paymentMsg = "";
    switch (paymentMethod) {
      case "pix":
        paymentMsg = "Você escolheu pagar via PIX. Esperamos que seja rápido e prático!";
        break;
      case "boleto":
        paymentMsg = "Você escolheu boleto bancário. Aguarde o vencimento para pagar.";
        break;
      case "cartao":
        paymentMsg = "Você escolheu cartão. Um dos métodos mais usados!";
        break;
      default:
        paymentMsg = "";
    }

    // Esconde o formulário e mostra a mensagem + pagamento
    form.style.display = "none";
    confirmation.style.display = "block";
    confirmation.querySelector("p").textContent = `Seu pedido foi registrado com sucesso. ${paymentMsg}`;

    // Limpa o carrinho
    window.cart = [];
    if (window.updateCartDisplay) updateCartDisplay();
  });
}

