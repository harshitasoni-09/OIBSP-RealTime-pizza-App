import axios from 'axios';
import Noty from 'noty';

document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.order-1');

  addToCartButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const pizzaContainer = event.currentTarget.closest('.w-64');
      const pizzaName = pizzaContainer.querySelector('.text-lg').innerText;
      const pizzaSize = pizzaContainer.querySelector('.bg-gray-400').innerText;
      const pizzaPrice = pizzaContainer.querySelector('.ml-2').innerText;
      let cartCounter = document.querySelector('#cartCounter');

      console.log('Pizza Name:', pizzaName);
      console.log('Pizza Size:', pizzaSize);
      console.log('Pizza Price:', pizzaPrice);

      // Example: Call the updateCart function with Axios
      axios.post('/update-cart', { name: pizzaName, size: pizzaSize, price: pizzaPrice })
        .then((res) => {
          cartCounter.innerText = res.data.totalQty;

          cartCounter.style.backgroundColor = 'red'; // Example background color
          cartCounter.style.color = 'white'; // Example text color
          cartCounter.style.padding = '5px';
          cartCounter.style.borderRadius = '40%';

          new Noty({
            text: 'Item added to cart'
          }).show();
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    });
  });
});
