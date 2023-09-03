import { NavLink, useLocation } from "react-router-dom";
import CartIcon from "../assets/icons/CartIcon";
import { css, styled } from "styled-components";

const NavbarStyles = styled.nav`
  padding: 1rem;
  background-color: #f8f0e5;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  margin-bottom: 0.5rem;
  color: #102c57;

  .nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1600px;
    margin: auto;
    padding: 0 0.5rem;
  }

  .title {
    font-weight: 900;
    font-size: 1.2rem;
  }

  .icon {
    cursor: pointer;
  }

  .icon-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 1rem;
  }

  .product-title {
    font-weight: 500;
    font-size: 1rem;

    ${(props) =>
      props.isProductListingPage &&
      css`
        text-decoration: underline;
      `}
  }

  .nav-link {
    text-decoration: none;
    color: inherit;
  }
`;

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <NavbarStyles isProductListingPage={pathname == "/" ? true : false}>
      <div className="nav-container">
        <div>
          <h1 className="title">
            <NavLink to="/" className="nav-link">
              TeeRex Store
            </NavLink>
          </h1>
        </div>

        <div className="icon-container">
          <span className="product-title">
            <NavLink to="/" className="nav-link">
              Products
            </NavLink>
          </span>
          <span className="icon">
            <NavLink to="/cart" className="nav-link">
              <CartIcon />
            </NavLink>
          </span>
        </div>
      </div>
    </NavbarStyles>
  );
};

export default Navbar;
