import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { ProductsType } from "../../Pages/Products";
import img from "../../Utils/Images/esfiha.jpg";
type ProductProps = {
  name: string;
  description: string;
  price: number;
  setItems: any;
  items: any;
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: 200,
    maxWidth: 335,
    margin: theme.spacing(2),
  },
  media: {
    height: 140,
  },
}));
export default function Product({
  name,
  price,
  description,
  setItems,
  items,
}: ProductProps) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader title={name} />
      <CardMedia className={classes.media} image={img} title={name} />
      <CardContent>
        <Typography gutterBottom variant="h6" component="h5">
          R${price}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton>
          <ShoppingCartIcon onClick={() => setItems(items + 1)} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
