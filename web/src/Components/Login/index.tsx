import {
  Grid,
  TextField,
  Typography,
  Paper,
  Button,
  Snackbar,
} from "@material-ui/core";
import { useContext, useState } from "react";
import { Field, Form } from "react-final-form";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextFieldRFF from "../../Utils/Components/TextField";
import PasswordField from "../../Utils/Components/PasswordField";
import { api } from "../../Services/api";
import { useHistory } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
const required = (value: any) => (value ? undefined : "Required");
const isSubmitting = (form: { getState: () => { submitting: boolean } }) =>
  form.getState().submitting;

const useStyles = makeStyles((theme) => ({
  background: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: theme.palette.primary.main,
  },

  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  passwordField: {
    width: "100%",
  },
  loading: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));
export interface UserFormData {
  email: string;
  password: string;
}
export const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const history = useHistory();
  const context = useContext(AuthContext);
  console.log(context);
  const handleSubmit = async (data: UserFormData) => {
    context.Login(data);
    // console.log(data);
    // setLoading(true);

    // if (data.email && data.password) {
    //   try {
    //     const response = await api.post("auth/login", data);
    //     console.log(response);
    //     setMessage("Logando....");
    //     history.push("/products");
    //     setOpen(true);
    //     setLoading(false);
    //   } catch (err) {
    //     setMessage("Credênciais inválidas");
    //     setOpen(true);
    //     setLoading(false);
    //   }
    // } else {
    //   setMessage("Por favor, informe suas credenciais!");
    //   setOpen(true);
    //   setLoading(false);
    // }
  };
  return (
    <div>
      <Paper style={{ padding: 20, minWidth: 300 }} elevation={4}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12}>
            <Typography align="center" variant="h4" gutterBottom>
              Delivery
            </Typography>
          </Grid>
        </Grid>
        <Form onSubmit={handleSubmit}>
          {({ handleSubmit, form }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} direction="column">
                <Grid item>
                  <Field
                    fullWidth
                    label="Usuario"
                    component={TextFieldRFF}
                    name="email"
                  />
                </Grid>
                <Grid item>
                  <Field
                    fullWidth
                    label="Senha"
                    component={PasswordField}
                    name="password"
                  />
                </Grid>
                <Grid item>
                  <Button
                    fullWidth
                    disabled={isSubmitting(form)}
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    {!loading ? (
                      "Entrar"
                    ) : (
                      <div className={classes.loading}>
                        <CircularProgress color="inherit" size={24} />
                      </div>
                    )}
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    type="button"
                    fullWidth
                    onClick={() => {
                      console.log("recover");
                    }}
                  >
                    Recuperar Senha
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Form>
      </Paper>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={3000}
        onClose={() => {
          setOpen(false);
          setMessage("");
        }}
        message={message}
      />
    </div>
  );
};
