import Container from "../components/Container";
import { useStore } from "../store/Store";
import ShoppingCartCard from "../components/ShoppingCartCard";
import { styled } from "styled-components";
import { useMemo } from "react";
import { NavLink } from "react-router-dom";

const CartStyles = styled.div`
  .cart-items {
    width: 600px;
    max-width: 100%;
    margin: auto;
    padding: 1rem;
  }
`;

const Cart = () => {
  const cart = useStore((store) => store.cart);
  const totalAmount = useMemo(() => {
    let amt = cart.reduce((acc, curr) => {
      acc += curr.cartQuantity * curr.price;
      return acc;
    }, 0);
    return amt;
  }, [cart]);

  return (
    <Container>
      <CartStyles>
        <div>
          <NavLink to="/">Go back</NavLink>
        </div>
        <center>
          <h2>Shopping Cart</h2>
          {!cart.length && <h3>There are no items in the shopping cart!</h3>}
        </center>

        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id}>
              <ShoppingCartCard
                id={item.id}
                title={item.name}
                imageURL={item.imageURL}
                price={item.price}
                quantity={item.quantity}
                cartQuantity={item.cartQuantity}
              />
            </div>
          ))}

          <div>
            <hr />

            <center>
              <h2>Total Amount: Rs {totalAmount} /-</h2>
            </center>
          </div>
        </div>
      </CartStyles>
    </Container>
  );
};

export default Cart;
