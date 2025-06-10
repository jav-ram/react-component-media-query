import { Box, Grid } from '@mui/material';
import palette from '../palette';
import Menu from './Menu';
import Content from './Content';

const Documentation = () => {
  return (
    <Box display="flex" sx={{ margin: 'auto 0' }}>
      <Grid container direction="row" sx={{ margin: 'auto 0', background: palette.white }}>
        <Menu />
        <Grid sx={{ width: '650px' }}>
          <Content />
        </Grid>
      </Grid>
    </Box>
  )
};

export default Documentation;
