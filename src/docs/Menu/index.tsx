import { Grid, Link, styled, Typography } from "@mui/material";
import palette from "../../palette";

const Title = styled(Typography)`
  text-transform: uppercase;
  color: ${palette.secondary};
  font-weight: bolder;
`;

const GoToOption = styled(Link)`
  text-transform: capitalize;
  color: ${palette.dark};
  text-decoration: none;
`;

const Menu = () => {
  return (
    <Grid container direction="column" gap="8px">
      <>
        <Title>Overview</Title>
        <GoToOption>Get started</GoToOption>
      </>

      <>
        <Title>Examples</Title>
        <GoToOption>Single MediaContainers</GoToOption>
        <GoToOption>Thousands MediaContainers</GoToOption>
      </>

      <>
        <Title>Components</Title>
        <GoToOption>MediaContainer</GoToOption>
        <GoToOption>BatchMediaContainer</GoToOption>
      </>

      <>
        <Title>Hooks</Title>
        <GoToOption>useMediaContainer</GoToOption>
      </>
    </Grid>
  );
}

export default Menu;
