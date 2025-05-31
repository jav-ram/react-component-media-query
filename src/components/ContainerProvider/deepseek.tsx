import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ContainerContext from "./context";
import { ContainerDimensions, ContainersType } from "./types";

const OptimizedContaierProvider = ({ children }: { children: React.ReactNode }) => {
  const [containers, setContainers] = useState<ContainersType>({});
  const observerRef = useRef<ResizeObserver>(null);
  const pendingUpdates = useRef<Record<string, ContainerDimensions>>({});
  const animationFrameId = useRef<number | null>(null);

  const flushUpdates = useCallback(() => {
    if (Object.keys(pendingUpdates.current).length > 0) {
      setContainers(prev => ({ ...prev, ...pendingUpdates.current }));
      pendingUpdates.current = {};
    }
    animationFrameId.current = null;
  }, []);

  const scheduleFlush = useCallback(() => {
    if (animationFrameId.current === null) {
      animationFrameId.current = requestAnimationFrame(flushUpdates);
    }
  }, [flushUpdates]);

  useEffect(() => {
    observerRef.current = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.dataset.containerId!;
        pendingUpdates.current[id] = {
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        };
      });
      scheduleFlush();
    });

    return () => {
      observerRef.current?.disconnect();
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [scheduleFlush]);

  const register = useCallback((id: string, node: HTMLDivElement) => {
    if (node.offsetParent !== null) {
      node.dataset.containerId = id;
      observerRef.current?.observe(node);
    }
  }, []);

  const unregister = useCallback((id: string) => {
    const node = document.querySelector(`[data-container-id="${id}"]`);
    if (node) observerRef.current?.unobserve(node);
    setContainers(prev => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  const getDimensions = useCallback((id: string) => {
    return containers[id] || { width: 0, height: 0 };
  }, [containers]);

  const contextValue = useMemo(() => ({
    register,
    unregister,
    getDimensions,
  }), [register, unregister, getDimensions]);

  return (
    <ContainerContext.Provider value={contextValue}>
      {children}
    </ContainerContext.Provider>
  );
};

export default OptimizedContaierProvider;