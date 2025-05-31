import { createContext } from "react";
import { ContainterContextValueType } from "./types";

const BatchMediaContainerContext = createContext<ContainterContextValueType>({
  register: (_id, _node) => { },
  unregister: (_id) => { },
  getDimensions: (_id) => ({ width: 0, height: 0 }),
  containers: {},
});

export default BatchMediaContainerContext;