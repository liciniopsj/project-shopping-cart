const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  test('se, ao executar getSavedCartItems, o método localStorage.getItem é chamado', () => {
    getSavedCartItems('cartItems');
    expect(localStorage.getItem).toHaveBeenCalled();
  });
  test('se, ao executar getSavedCartItems, o método localStorage.getItem é chamado com o \'cartItems\' como parâmetro.', () => {
    getSavedCartItems('cartItems');
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});
