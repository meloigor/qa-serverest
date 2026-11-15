export const sel = {
  login: {
    email: '[data-testid="email"]',
    senha: '[data-testid="senha"]',
    entrar: '[data-testid="entrar"]',
    cadastrar: '[data-testid="cadastrar"]',
  },
  register: {
    nome: '[data-testid="nome"]',
    email: '[data-testid="email"]',
    password: '[data-testid="password"]',
    administrador: '[data-testid="checkbox"]',
    cadastrar: '[data-testid="cadastrar"]',
  },
  nav: {
    home: '[data-testid="home"]',
    listaCompras: '[data-testid="lista-de-compras"]',
    carrinho: '[data-testid="carrinho"]',
    logout: '[data-testid="logout"]',
  },
  store: {
    pesquisar: '[data-testid="pesquisar"]',
    botaoPesquisar: '[data-testid="botaoPesquisar"]',
    adicionarNaLista: '[data-testid="adicionarNaLista"]',
    productCard: '.card',
  },
  shoppingList: {
    productName: '[data-testid="shopping-cart-product-name"]',
    productQuantity: '[data-testid="shopping-cart-product-quantity"]',
    increase: '[data-testid="product-increase-quantity"]',
    decrease: '[data-testid="product-decrease-quantity"]',
    addToCart: '[data-testid="adicionar carrinho"]',
    clear: '[data-testid="limparLista"]',
  },
};
