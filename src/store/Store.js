import { create } from "zustand";
import { DECREASE, INCREASE, PRODUCTS } from "../constants/UI";
import { toast } from "react-hot-toast";

const filterByColor = (array, colorFilter) => {
  let products = [...array];

  let result = [];
  let keyCount = 0;
  for (let key in colorFilter) {
    if (colorFilter[key] === true) {
      result.push(...products.filter((item) => item.color.toLowerCase() === key));
    } else {
      keyCount++;
    }
  }
  if (Object.keys(colorFilter).length === keyCount) {
    result = [...array];
  }

  return result;
};

const filterByGender = (array, genderFilter) => {
  let products = [...array];

  let result = [];
  let keyCount = 0;
  for (let key in genderFilter) {
    if (genderFilter[key] === true) {
      result.push(...products.filter((item) => item.gender.toLowerCase() === key));
    } else {
      keyCount++;
    }
  }
  if (Object.keys(genderFilter).length === keyCount) {
    return [...array];
  } else {
    return result;
  }
};

const filterByPrice = (array, priceFilter) => {
  let products = [...array];
  let result = [];
  let keyCount = 0;

  for (let key in priceFilter) {
    if (key === "lessThan250" && priceFilter[key] === true) {
      result.push(...products.filter((item) => item.price <= 250));
    } else if (key === "inBetween250_450" && priceFilter[key] === true) {
      result.push(...products.filter((item) => item.price > 250 && item.price <= 450));
    } else if (key === "moreThan450" && priceFilter[key] === true) {
      result.push(...products.filter((item) => item.price > 450));
    } else {
      keyCount++;
    }
  }

  if (Object.keys(priceFilter).length === keyCount) {
    return [...array];
  } else {
    return result;
  }
};

const filterByType = (array, typeFilter) => {
  let products = [...array];
  let result = [];
  let keyCount = 0;

  for (let key in typeFilter) {
    if (typeFilter[key] === true) {
      result.push(...products.filter((item) => item.type.toLowerCase() === key));
    } else {
      keyCount++;
    }
  }

  if (Object.keys(typeFilter).length === keyCount) {
    return [...array];
  } else {
    return result;
  }
};

const store = (set) => ({
  products: PRODUCTS,
  cart: [],
  resetProducts: () =>
    set(() => ({
      products: PRODUCTS,
    })),
  filterProducts: (colorFilter, genderFilter, priceFilter, typeFilter, searchTerm = "") =>
    set((store) => {
      let result = [...PRODUCTS];

      if (searchTerm) {
        result = store.products.filter(
          (item) => item.name.toLowerCase().includes(searchTerm) || item.color.toLowerCase().includes(searchTerm)
        );
      }

      result = filterByColor(result, colorFilter);
      result = filterByGender(result, genderFilter);
      result = filterByPrice(result, priceFilter);
      result = filterByType(result, typeFilter);

      return {
        products: [...result],
      };
    }),
  setCart: (id) =>
    set((store) => {
      let cart = [...store.cart];
      let product = store.products.find((i) => i.id === id);

      if (!product) {
        return {
          cart,
        };
      }

      if (product.cartQuantity) {
        if (product.cartQuantity >= product.quantity) {
          toast.error("All Item quantity added to cart");
          return { cart };
        } else {
          product.cartQuantity += 1;
          toast.success("Item added to cart");
          return { cart };
        }
      } else {
        product.cartQuantity = 1;
        toast.success("Item added to cart");
        return {
          cart: [...cart, product],
        };
      }
    }),
  updateItemQuantity: (type, id) =>
    set((store) => {
      let cartItems = store.cart;
      if (type === INCREASE) {
        let item = cartItems.find((i) => i.id === id);
        if (item.cartQuantity > 0) {
          item.cartQuantity += 1;
          toast.success("Item Updated");
        }
      }
      if (type === DECREASE) {
        let item = cartItems.find((i) => i.id === id);
        if (item.cartQuantity === 1) {
          // remove from the cart
          cartItems = cartItems.filter((i) => i.id !== id);
          toast.success("Item Updated");
          return { cart: [...cartItems] };
        }
        if (item.cartQuantity > 0) {
          item.cartQuantity -= 1;
          toast.success("Item Updated");
        } else {
          toast.error("Item quantity cannot be 0");
        }
      }
      return { cart: [...cartItems] };
    }),

  deleteItemFromCart: (id) =>
    set((store) => {
      let cartItems = [...store.cart];
      toast.success("Item deleted from cart");

      return {
        cart: cartItems.filter((i) => i.id !== id),
      };
    }),
});

export const useStore = create(store);
