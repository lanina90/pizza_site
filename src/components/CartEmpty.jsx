import React from 'react';

const CartEmpty = () => {
  return (
    <div className="cart cart--empty">
      <h2>Your cart is empty <span>😕</span></h2>
      <p>It's likely that you haven't ordered pizza yet<br />
        To order pizza, please go to the homepage.</p>
      <img
      src="/img/empty-cart.png" alt="Empty cart"/>
        <a className="button button--black" href="/"><span>Go back</span></a>
    </div>
);
};

export default CartEmpty;