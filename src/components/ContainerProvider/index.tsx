import { createContext, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ContainerDimensions, ContainersType, ContainterContextValueType } from "./types";
import ContainerContext from "./context";


const ContainerProvider = ({ children }: { children: React.ReactNode }) => {
  const [containers, setContainers] = useState<ContainersType>({});
  const observerRef = useRef<ResizeObserver>(null);

  useEffect(() => {
    observerRef.current = new ResizeObserver((entries) => {
      const updates: ContainersType = {};
      entries.forEach((entry) => {
        const id = (entry.target as HTMLElement).dataset.containerId!;
        updates[id] = {
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        };
      });
      setContainers((prev) => ({ ...prev, ...updates }));
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const register = (id: string, node: HTMLDivElement) => {
    node.dataset.containerId = id; // Tag the node with an ID
    observerRef.current?.observe(node);
  };

  const unregister = (id: string) => {
    // Cleanup logic (if needed)
    const { [id]: _removed, ...rest } = containers;
    setContainers(rest);
  };

  const getDimensions = (id: string) => {
    if (containers[id]) return containers[id];
    // not found throw error;
    // throw (`Container with id: ${id} not found, please ensure that the container is register and not recently unregistered`)
    return { width: 0, height: 0 };
  }

  return (
    <ContainerContext.Provider value={{ register, unregister, getDimensions, containers }}>
      {children}
    </ContainerContext.Provider>
  );
};

export default ContainerProvider;
