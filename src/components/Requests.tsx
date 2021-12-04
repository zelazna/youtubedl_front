import { Grid, Paper, Toolbar, Typography } from '@mui/material';
import { useEffect } from 'react';

import { useRequestActionsContext, useRequestContext } from '../context/RequestsContext';
import { Container } from './TableWithPagination/Container';


export default function Requests() {
  const setRequestActionsContext = useRequestActionsContext();
  const requests = useRequestContext();

  useEffect(() => {
    (async () => {
      const result = await fetch(
        "/requests/?skip=0&orderby=id%20desc"
      );
      const data = await result.json();
      setRequestActionsContext(data);
    })();
  }, [setRequestActionsContext]);

  return (
    <Grid item xs={12}>
      <Paper sx={{ width: '100%', mb: 2, mt: 3 }}>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 }
          }}
        >
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
            color="primary"
          >
            Recent Downloads
          </Typography>
        </Toolbar>
        <Container requests={requests} />
      </Paper>
    </Grid>
  );
}
