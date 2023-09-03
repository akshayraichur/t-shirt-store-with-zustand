import { styled } from "styled-components";
import { string, number } from "prop-types";
import { useStore } from "../store/Store";

const CardStyles = styled.div`
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  padding: 1rem;
  margin: 1rem 0;
  background-color: white;
  border-radius: 6px;

  .img-container {
    height: 200px;
    width: 100%;
    object-fit: contain;
  }

  .img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }

  .cta-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.4rem 0;
  }

  .cart-btn {
    background-color: #f8f0e5;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 6px;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    font-family: inherit;
  }
`;

const Card = ({
  id,
  title,
  price,
  imgURL = "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/black-polo-men.png",
}) => {
  const setCart = useStore((store) => store.setCart);

  const addToCart = () => () => {
    setCart(id);
  };
  return (
    <CardStyles key={id}>
      <div className="card-container">
        <div className="img-container">
          <img className="img" src={imgURL} alt="img" loading="lazy" />
        </div>

        <div className="detail-container">
          <h4 className="card-title">{title || "Hi there"}</h4>
          <span className="cta-details">
            <p>Rs: {price || 500} /-</p>
            <button className="cart-btn" onClick={addToCart()}>
              Add to cart
            </button>
          </span>
        </div>
      </div>
    </CardStyles>
  );
};

Card.propTypes = {
  id: number,
  imgURL: string,
  title: string,
  price: number,
};

export default Card;
