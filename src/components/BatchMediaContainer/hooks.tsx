import { useContext, useMemo } from "react"
import BatchMediaContainerContext from "./context"


export const useContainerSize = (id: string) => {
  const { getDimensions, containers } = useContext(BatchMediaContainerContext);

  const { width, height } = useMemo(() => {
    return getDimensions(id);
  }, [containers[id]]);

  return { width, height };
}