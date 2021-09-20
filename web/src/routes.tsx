import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ProductsPage from "./Pages/Products";
import theme from "./Theme";
import { AuthProvider } from "./contexts/AuthContext";
export const Routes = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <Route path="/" exact component={Home} />
          <Route path="/products" exact component={ProductsPage} />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};
