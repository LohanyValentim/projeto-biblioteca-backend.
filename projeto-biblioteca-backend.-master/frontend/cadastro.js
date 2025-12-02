// cadastro.js
const form = document.getElementById('formProduto');
const mensagem = document.getElementById('mensagem');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    nome: form.nome.value.trim(),
    preco: parseFloat(form.preco.value),
    descricao: form.descricao.value.trim(),
    estoque: parseInt(form.estoque.value, 10)
  };

  try {
    // A URL do backend foi removida para evitar erros CORS na demonstração.
    // No ambiente com backend configurado, faça fetch POST para a API correta.

    // Exemplo de fetch (commented out):
    /*
    const response = await fetch('http://localhost:3000/livros', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status} ${response.statusText}`);
    }
    */

    // Simula sucesso do cadastro para demonstração
    mensagem.style.color = 'green';
    mensagem.textContent = "Produto cadastrado com sucesso! (Simulado devido a CORS)";
    form.reset();

  } catch (error) {
    mensagem.style.color = 'red';
    mensagem.textContent = "Erro ao cadastrar produto.";
    console.error(error);
  }
});
