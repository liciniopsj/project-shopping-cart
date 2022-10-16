const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

const cartItem = {
  id: "MLB2855931212",
  title: "Cpu Gamer Intel I7 16gb Ssd240gb Com Placa De Video 2gb",
  price: 2399
}
const { id, title, price } = cartItem;

describe('3 - Teste a função saveCartItems', () => {
  test('se, ao executar saveCartItems com um cartItem como argumento, o método localStorage.setItem é chamado', () => {
    saveCartItems({ id, title, price });
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  test('se, ao executar saveCartItems com um cartItem como argumento, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro a chave \'cartItems\' e o segundo sendo o valor passado como argumento para saveCartItems.', () => {
    saveCartItems({ id, title, price });
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', JSON.stringify(cartItem));
  });
});
