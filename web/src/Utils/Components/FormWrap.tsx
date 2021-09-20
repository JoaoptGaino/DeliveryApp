import Grid from "@material-ui/core/Grid";
import { ReactNode, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      "& > * + *": {
        marginLeft: theme.spacing(2),
      },
    },
  })
);

export const FormWrap = ({
  children,
  handleSubmit,
  nameButton,
  disabeSubmit = false,
  disableBack = false,
  loading = false,
  hideConfirmButton = false,
}: {
  children: ReactNode;
  handleSubmit: any;
  disableBack?: boolean;
  loading?: boolean;
  disabeSubmit?: boolean;
  hideConfirmButton?: boolean;
  nameButton?: string;
}) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} direction="column">
        <Grid item>{children}</Grid>

        <Grid item xs={12}>
          <Grid justify="flex-end" container spacing={2}>
            <Grid item style={{ width: 160 }}>
              <Button
                fullWidth
                type="button"
                variant="outlined"
                onClick={() => history.goBack()}
                disabled={disableBack}
              >
                Voltar
              </Button>
            </Grid>
            <Grid item style={{ width: 160 }}>
              <Button
                data-testid="salvar"
                fullWidth
                type="submit"
                disabled={disabeSubmit}
                variant="contained"
                color="primary"
              >
                {!loading ? (
                  nameButton ?? "Salvar"
                ) : (
                  <div className={classes.root}>
                    <CircularProgress color="inherit" size={24} />
                  </div>
                )}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
