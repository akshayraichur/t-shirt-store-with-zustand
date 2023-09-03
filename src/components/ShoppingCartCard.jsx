import { styled } from "styled-components";
import { string, number } from "prop-types";
import { Button } from "@mui/material";
import { useStore } from "../store/Store";
import { DECREASE, INCREASE } from "../constants/UI";

const ShoppingCartCardStyles = styled.div`
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  padding: 1rem;
  margin: 1rem 0;
  background-color: white;
  border-radius: 6px;
  display: flex;
  column-gap: 1rem;

  .img-container {
    width: 150px;
  }

  .img-container .img {
    width: 100%;
  }

  .price {
    font-size: 1.1rem;
    font-weight: 600;
  }

  .quantity-container {
    display: flex;
    column-gap: 1rem;
  }
`;

const ShoppingCartCard = ({ id, title, price, imageURL, quantity, cartQuantity }) => {
  const updateItemQuantity = useStore((store) => store.updateItemQuantity);
  const deleteItemFromCart = useStore((store) => store.deleteItemFromCart);

  const updateQuantity = (type) => () => {
    updateItemQuantity(type, id);
  };

  const deleteItem = (id) => () => {
    deleteItemFromCart(id);
  };

  return (
    <ShoppingCartCardStyles key={id}>
      <div className="img-container">
        <img className="img" src={imageURL} alt="img" loading="lazy" />
      </div>
      <div className="details">
        <h2 className="title">{title}</h2>
        <p className="price">Rs {price}/-</p>

        <br />

        <div className="quantity-container">
          {cartQuantity !== 0 && (
            <Button variant="contained" color="primary" onClick={updateQuantity(DECREASE, id)}>
              -
            </Button>
          )}
          <h2>{cartQuantity}</h2>
          {quantity !== cartQuantity && (
            <Button variant="contained" color="primary" onClick={updateQuantity(INCREASE, id)}>
              +
            </Button>
          )}
        </div>

        <br />
        <Button variant="contained" color="secondary" onClick={deleteItem(id)}>
          Delete
        </Button>
      </div>
    </ShoppingCartCardStyles>
  );
};

ShoppingCartCard.propTypes = {
  id: number,
  imageURL: string,
  title: string,
  price: number,
  quantity: number,
  cartQuantity: number,
};

export default ShoppingCartCard;
