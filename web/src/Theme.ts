import { createMuiTheme } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

export default createMuiTheme({
  typography: {
    fontFamily: "Gilroy, Roboto, Helvetica, Arial, sans-serif",
  },
  palette: {
    background: {
      default: "#EED400",
    },
    primary: {
      main: "#224568",
    },
    secondary: {
      main: "#485687",
    },
    grey: grey,
    text: {
      primary: "#3A3A3A",
      secondary: "#676767",
    },
  },
});
