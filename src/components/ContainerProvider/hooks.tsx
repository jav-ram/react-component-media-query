import { useContext, useMemo } from "react"
import ContainerContext from "./context"


export const useContainerSize = (id: string) => {
  const { getDimensions, containers } = useContext(ContainerContext);

  const { width, height } = useMemo(() => {
    return getDimensions(id);
  }, [containers.get(id)]);

  return { width, height };
}