import { createContext } from "react";
import { ContainerDimensions } from "../BatchMediaContainer/types";

const MediaContainerContext = createContext<ContainerDimensions>({
  width: 0,
  height: 0,
});

export default MediaContainerContext;