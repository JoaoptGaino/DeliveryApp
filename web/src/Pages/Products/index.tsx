import React, { useEffect, useState } from "react";

import { Grid, Typography } from "@material-ui/core";
import Product from "../../Components/Product/index";
import { api } from "../../Services/api";
import AppWrap from "../../Components/Appwrap";
export type ProductsType = {
  id?: number;
  name: string;
  description: string;
  price: number;
};
const ProductsPage = () => {
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [items, setItems] = useState(0);
  async function getProducts() {
    try {
      const response = await api.get("products");
      console.log(response);
      setProducts(response.data.products);
    } catch (err) {
      alert(err);
    }
  }
  useEffect(() => {
    localStorage.user
      ? getProducts()
      : console.log("nao tem user no localStorage");
  }, []);
  return (
    <>
      <AppWrap cartItems={items} />
      <Grid container>
        {products.map((product) => (
          <Product
            key={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            setItems={setItems}
            items={items}
          />
        ))}
      </Grid>
    </>
  );
};
export default ProductsPage;
