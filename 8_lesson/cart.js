'use strict';

const cartEl = document.querySelector('.cart');
const cartCounter = document.querySelector('.cartIconWrap span');
const cartTotal = document.querySelector('.total_price');
const basket = {};

document.querySelector('.cartIconWrap').addEventListener('click', () => {
    cartEl.classList.toggle('hidden');
});



document.querySelector('.featuredItems').addEventListener('click', event => {
    if (!event.target.classList.contains('addToCart')) {
        return;
    }
    const featuredElem = event.target.closest('.featuredItem')
    const id = +featuredElem.dataset.id;
    const name = featuredElem.dataset.name;
    const price = featuredElem.dataset.price;
    addToCart(id, name, price)
});


function addToCart(id, name, price) {
    if (!(id in basket)) {
        basket[id] = { id: id, name: name, price: price, count: 0 };
    }
    basket[id].count += 1;
    cartCounter.textContent = cartTotalItems().toString();
    cartTotal.textContent = `Total price $: ${cartTotalPrice().toFixed(2)}`;
    renderItem(id);
};

function cartTotalItems() {
    return Object
        .values(basket)
        .reduce((result, item) => result + item.count, 0);
}

function cartTotalPrice() {
    return Object
        .values(basket)
        .reduce((result, item) => result + item.price * item.count, 0);
}

function renderItem(id) {
    console.log(cartEl.querySelector(`.cartColumn[data-id="${id}"]`))
    const inCart = cartEl.querySelector(`.cartColumn[data-id="${id}"]`);
    if (!inCart) {
        renderNewItem(id);
    }
    const item = basket[id];
    inCart.querySelector('.itemCount').textContent = item.count;
    inCart.querySelector('.itemTotal').textContent = (item.count * item.price).toFixed(2);
};

function renderNewItem(id) {
    const cartNewEl = `
    <div class="cartColumn" data-id="${id}">
      <div>${basket[id].name}</div>
      <div>
        <span class="itemCount">${basket[id].count}</span> шт.
      </div>
      <div>$${basket[id].price}</div>
      <div>
        $<span class="itemTotal">${(basket[id].price * basket[id].count).toFixed(2)}</span>
      </div>
    </div>
    `;
    cartTotal.insertAdjacentHTML("beforebegin", cartNewEl);
};




