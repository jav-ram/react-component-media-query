import { useContext, useEffect, useMemo, useRef } from "react";
import { Grid } from "@mui/material";

import ContainerContext from "../../components/ContainerProvider/context";
import { useContainerSize } from "../../components/ContainerProvider/hooks";

const Cell = () => {
  return <Grid size="grow" sx={{ borderRadius: '6px', backgroundColor: 'white', opacity: '.4' }} />
}

type ItemPropType = { id: string, size: number };
const Item = ({ id, size }: ItemPropType) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { register, unregister, getDimensions } = useContext(ContainerContext);
  // const { width } = getDimensions(id);
  const { width } = useContainerSize(id);

  useEffect(() => {
    if (containerRef.current) register(id, containerRef.current);
    return () => unregister(id);
  }, [id]);

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
    <Grid data-test="item" container direction={width < 200 ? 'column' : 'row'} padding="8px" spacing="8px" sx={{ background: color, height: '100px' }} size={size} ref={containerRef}>
      <Cell />
      <Cell />
      <Cell />
      <Cell />
    </Grid>
  )
}

export default Item;
