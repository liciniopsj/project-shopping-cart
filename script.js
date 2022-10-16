const CART = 'cart__items';

// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
// const getIdFromProductItem = (product) => product.querySelector('span.id').innerText;

const liElementEvent = (event) => {
  const cart = document.querySelector('.cart__items');
  cart.removeChild(event.srcElement);
};

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */
const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', liElementEvent);
  return li;
};

const emptyCart = () => {
  const emptyCartButton = document.querySelector('.empty-cart');
  emptyCartButton.addEventListener('click', () => {
    const cart = document.querySelector('ol');
    cart.innerHTML = '';
    console.log(cart);
  });
};

const saveCartItemsAux = ({ id, title, price }) => {
   if (localStorage.getItem('cartItems') === null) {
    localStorage.setItem('cartItems', JSON.stringify([]));
  }
  const newCart = JSON.parse(localStorage.getItem('cartItems'));
  newCart.push({ id, title, price });
  return newCart;
};

const addToCart = async (event) => {
  const product = event.path[1];
  const cart = document.querySelector('.cart__items');
  // console.log(product.firstChild.innerText);
  const fethedItem = await fetchItem(product.firstChild.innerText);
  // console.log(fethedItem);
  const { id, title, price } = fethedItem;
  const li = createCartItemElement({ id, title, price });
  saveCartItems(saveCartItemsAux({ id, title, price }));
  cart.appendChild(li);
};

const attachEventListiner = async () => {
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((button) => {
    button.addEventListener('click', addToCart);
  });
};

const buildProductSection = async () => {
  const productData = {};
  const productSection = document.querySelector('.items');
  productData.data = await fetchProducts('computador');
  const { results } = productData.data;
  results.forEach((result) => {
    const { id, title, thumbnail } = result;
    const item = createProductItemElement({ id, title, thumbnail });
    productSection.appendChild(item);
 });
};

const renderStoragedCartList = () => {
  const cartItems = getSavedCartItems('cartItems');
  if (cartItems !== null) {
    const cart = document.querySelector('ol');
    cartItems.forEach((item) => {
      const { id, title, price } = item;
      const li = createCartItemElement({ id, title, price });
      cart.appendChild(li);
    });
  }
};

window.onload = async () => { 
  await buildProductSection(); 
  await attachEventListiner();
  renderStoragedCartList();
  emptyCart();
 };
