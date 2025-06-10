import { useContext, useMemo } from "react";
import { Grid } from "@mui/material";

import MediaContainerContext from "../../components/MediaContainer/context";

const Cell = () => {
  return <Grid size="grow" sx={{ borderRadius: '6px', backgroundColor: 'white', opacity: '.4' }} />
}

type ItemPropType = { id: string };
const Item = ({ id }: ItemPropType) => {
  const { width } = useContext(MediaContainerContext);

  const color = useMemo(() => {
    if (width < 100) {
      return 'pink';
    }
    if (width < 200) {
      return 'red';
    }
    if (width < 400) {
      return 'green';
    }
    if (width < 800) {
      return 'teal';
    }
    return 'maroon';
  }, [width]);

  return (
    <Grid size={12} container spacing="8px" direction={width < 200 ? 'column' : 'row'} id={id} sx={{ padding: '8px', background: color, height: '200px' }} >
      <Cell />
      <Cell />
      <Cell />
      <Cell />
    </Grid>
  )
}

export default Item;
