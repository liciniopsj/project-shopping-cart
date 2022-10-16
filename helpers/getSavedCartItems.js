const getSavedCartItems = () => {
  const data = JSON.parse(localStorage.getItem('cartItems'));
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
