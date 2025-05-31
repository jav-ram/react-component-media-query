import { forwardRef, useContext, useEffect, useMemo, useRef } from "react";
import { Grid, GridProps } from "@mui/material";

import MediaContainer from "../../components/MediaContainer";
import MediaContainerContext from "../../components/MediaContainer/context";

const Cell = () => {
  return <Grid size="grow" sx={{ borderRadius: '6px', backgroundColor: 'white', opacity: '.4' }} />
}

type ItemPropType = { id: string, size: number };
const Item = ({ id, size }: ItemPropType) => {
  const { width } = useContext(MediaContainerContext);

  const color = useMemo(() => {
    if (width < 100) {
      return 'pink';
    }
    if (width < 400) {
      return 'red';
    }
    if (width < 700) {
      return 'green';
    }
    if (width < 1000) {
      return 'teal';
    }
    return 'maroon';
  }, [width]);

  return (
    <Grid container spacing="8px" direction={width < 200 ? 'column' : 'row'} id={id} sx={{ padding: '8px', background: color, height: '200px' }} >
      <Cell />
      <Cell />
      <Cell />
      <Cell />
    </Grid>
  )
}

export default Item;
