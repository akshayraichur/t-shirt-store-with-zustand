import { Accordion, AccordionDetails, AccordionSummary, Button, Grid } from "@mui/material";
import Container from "../components/Container";
import Card from "../components/card";
import { useStore } from "../store/Store";
import { styled } from "styled-components";
import SearchIcon from "../assets/icons/SearchIcon";
import { useState } from "react";
import CancelIcon from "../assets/icons/CancelIcon";
import { ExpandMore } from "@mui/icons-material";
import { COLOR, GENDER, PRICE, TYPE } from "../constants/UI";

const ProductListingStyles = styled.div`
  .search-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .search-input {
    padding: 0.5rem 1rem;
    width: 65%;
    border: none;
    outline: 1px solid #f8f0e5;
    border-radius: 6px;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    font-size: 1rem;
    color: inherit;
    font-family: inherit;
  }

  .search-btn {
    margin: 0 0.4rem;
    border: 1.5px solid #f8f0e5;
    color: black;
    background-color: white;
    cursor: pointer;
    border-radius: 6px;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    height: 37px;
  }

  .filters {
    margin-top: 1rem;
  }

  .filter-container {
    border-radius: 6px;
    background-color: white;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    color: inherit;
  }

  .filter-categories {
    margin: 0.5rem 0;
  }

  .reset-filter-btn {
    color: #102c57;
    border: 1px solid #102c57;
    margin-top: 1rem;
  }
`;

const ProductListing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandAccordion, setExpandAccordion] = useState(true);
  const [colorFilter, setColorFilter] = useState({
    blue: false,
    black: false,
    pink: false,
  });
  const [genderFilter, setGenderFilter] = useState({
    men: false,
    women: false,
  });
  const [priceFilter, setPriceFilter] = useState({
    lessThan250: false,
    inBetween250_450: false,
    moreThan450: false,
  });
  const [typeFilter, setTypeFilter] = useState({
    polo: false,
    hoodie: false,
    basic: false,
  });

  const products = useStore((store) => store.products);
  const resetProducts = useStore((store) => store.resetProducts);
  const filterProducts = useStore((store) => store.filterProducts);

  const submitSearch = () => () => {
    if (searchTerm === "") {
      resetProducts();
      return;
    }
    filterProducts(colorFilter, genderFilter, priceFilter, typeFilter, searchTerm);
  };

  const resetState = () => {
    resetProducts();
    setSearchTerm("");
    setColorFilter({
      blue: false,
      black: false,
      pink: false,
    });
    setGenderFilter({
      men: false,
      women: false,
    });
    setPriceFilter({
      lessThan250: false,
      inBetween250_450: false,
      moreThan450: false,
    });
    setTypeFilter({
      polo: false,
      hoodie: false,
      basic: false,
    });
  };

  const updateFilterProducts = (type, key, value) => {
    if (type === COLOR) {
      let color = { ...colorFilter };
      color[key] = value;
      setColorFilter({ ...color });
      filterProducts(color, genderFilter, priceFilter, typeFilter, searchTerm);
    } else if (type === GENDER) {
      let gender = { ...genderFilter };
      gender[key] = value;
      setGenderFilter({ ...gender });
      filterProducts(colorFilter, gender, priceFilter, typeFilter, searchTerm);
    } else if (type === PRICE) {
      let price = { ...priceFilter };
      price[key] = value;
      setPriceFilter({ ...price });
      filterProducts(colorFilter, genderFilter, price, typeFilter, searchTerm);
    } else {
      let type = { ...typeFilter };
      type[key] = value;
      setTypeFilter({ ...type });
      filterProducts(colorFilter, genderFilter, priceFilter, type, searchTerm);
    }
  };

  return (
    <Container>
      <ProductListingStyles>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for products..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button className="search-btn" onClick={submitSearch()}>
            <SearchIcon />
          </Button>
          {searchTerm && (
            <Button className="search-btn" onClick={() => resetState()}>
              <CancelIcon />
            </Button>
          )}
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3} md={2.5} className="filters">
            <Accordion expanded={expandAccordion} className="filter-container">
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
                expandIcon={<ExpandMore />}
                onClick={() => setExpandAccordion((p) => !p)}
              >
                <h2>Filters</h2>
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  <div className="filter-categories">
                    <h3>Color</h3>
                    <label htmlFor="color-blue">
                      <input
                        type="checkbox"
                        id="color-blue"
                        value={colorFilter.blue}
                        onChange={(e) => updateFilterProducts(COLOR, "blue", e.target.checked)}
                      />{" "}
                      Blue &nbsp;
                    </label>
                    <label htmlFor="color-black">
                      <input
                        type="checkbox"
                        id="color-black"
                        value={colorFilter.black}
                        onChange={(e) => updateFilterProducts(COLOR, "black", e.target.checked)}
                      />{" "}
                      Black &nbsp;
                    </label>
                    <label htmlFor="color-pink">
                      <input
                        type="checkbox"
                        id="color-pink"
                        value={colorFilter.pink}
                        onChange={(e) => updateFilterProducts(COLOR, "pink", e.target.checked)}
                      />{" "}
                      Pink &nbsp;
                    </label>
                  </div>

                  <hr />

                  <div className="filter-categories">
                    <h3>Gender</h3>
                    <label htmlFor="gender-men">
                      <input
                        type="checkbox"
                        id="gender-men"
                        value={genderFilter.men}
                        onChange={(e) => updateFilterProducts(GENDER, "men", e.target.checked)}
                      />{" "}
                      Men &nbsp;
                    </label>

                    <label htmlFor="gender-women">
                      <input
                        type="checkbox"
                        id="gender-women"
                        value={genderFilter.women}
                        onChange={(e) => updateFilterProducts(GENDER, "women", e.target.checked)}
                      />{" "}
                      Women &nbsp;
                    </label>
                  </div>

                  <hr />

                  <div className="filter-categories">
                    <h3>Prices</h3>
                    <label htmlFor="price-less">
                      <input
                        type="checkbox"
                        id="price-less"
                        value={priceFilter.lessThan250}
                        onChange={(e) => updateFilterProducts(PRICE, "lessThan250", e.target.checked)}
                      />{" "}
                      0-Rs250 &nbsp;
                    </label>
                    <br />
                    <label htmlFor="price-between">
                      <input
                        type="checkbox"
                        id="price-between"
                        value={priceFilter.inBetween250_450}
                        onChange={(e) => updateFilterProducts(PRICE, "inBetween250_450", e.target.checked)}
                      />{" "}
                      Rs251-Rs450 &nbsp;
                    </label>
                    <br />
                    <label htmlFor="price-more">
                      <input
                        type="checkbox"
                        id="price-more"
                        value={priceFilter.moreThan450}
                        onChange={(e) => updateFilterProducts(PRICE, "moreThan450", e.target.checked)}
                      />{" "}
                      Rs450 &nbsp;
                    </label>
                  </div>

                  <hr />

                  <div className="filter-categories">
                    <h3>Type</h3>
                    <label htmlFor="type-polo">
                      <input
                        type="checkbox"
                        id="type-polo"
                        value={typeFilter.polo}
                        onChange={(e) => updateFilterProducts(TYPE, "polo", e.target.checked)}
                      />{" "}
                      Polo &nbsp;
                    </label>
                    <label htmlFor="type-hoodie">
                      <input
                        type="checkbox"
                        id="type-hoodie"
                        value={typeFilter.hoodie}
                        onChange={(e) => updateFilterProducts(TYPE, "hoodie", e.target.checked)}
                      />{" "}
                      Hoodie &nbsp;
                    </label>
                    <label htmlFor="type-basic">
                      <input
                        type="checkbox"
                        id="type-basic"
                        value={typeFilter.basic}
                        onChange={(e) => updateFilterProducts(TYPE, "basic", e.target.checked)}
                      />{" "}
                      Basic &nbsp;
                    </label>
                  </div>

                  <div>
                    <Button variant="outlined" onClick={() => resetState()} className="reset-filter-btn">
                      Reset Filters
                    </Button>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          </Grid>

          {/* Product Listing */}
          <Grid item container spacing={1} xs={12} sm={9} md={9.5}>
            {products.map((item) => (
              <Grid key={item.id} item xs={12} sm={4} md={3}>
                <Card id={item.id} title={item.name} imgURL={item.imageURL} price={item.price} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </ProductListingStyles>
    </Container>
  );
};

export default ProductListing;
