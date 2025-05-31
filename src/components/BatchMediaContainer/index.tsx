import { useEffect, useMemo, useRef, useState } from "react";
import { ContainerDimensions } from "./types";
import BatchMediaContainerContext from "./context";
import _ from 'lodash';
import { batchedUpdates } from 'react-batched-updates'


const BatchMediaContainer = ({ children }: { children: React.ReactNode }) => {
  const [containers, setContainers] = useState<Record<string, ContainerDimensions>>({});
  const observerRef = useRef<ResizeObserver>(null);

  const pendingUpdates = useRef<Record<string, ContainerDimensions>>({});
  const animationFrameId = useRef<number | null>(null);

  // add updates by batches
  // TODO: rename flush is not describing whats happening
  const flushUpdates = () => {
    batchedUpdates(() => {
      if (Object.entries(pendingUpdates.current).length > 0) {
        setContainers((prev) => {
          return { ...prev, ...pendingUpdates.current };
        });
        // clear map
        pendingUpdates.current = {}; // Faster than creating a new Map
      }
      animationFrameId.current = null;
    })
  };

  useEffect(() => {
    const throttleResize = _.throttle((entries: ResizeObserverEntry[]) => {
      entries.forEach((entry) => {
        const id = (entry.target as HTMLElement).dataset.containerId!;
        pendingUpdates.current[id] = {
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        };
      });
      if (animationFrameId.current === null) {
        animationFrameId.current = requestAnimationFrame(flushUpdates);
      }
    }, 100); // Throttle to 100ms

    observerRef.current = new ResizeObserver(throttleResize);
    return () => observerRef.current?.disconnect();
  }, []);

  const register = (id: string, node: HTMLDivElement) => {
    if (node.offsetParent !== null) { // Skip hidden elements
      node.dataset.containerId = id;
      observerRef.current?.observe(node);
    }
  };

  const unregister = (id: string) => {
    setContainers((prev) => {
      const { [id]: _omit, ...res } = prev
      return res
    });
  };

  const getDimensions = (id: string) => {
    if (containers[id]) return containers[id];
    return { width: 0, height: 0 };
  }

  const contextValue = useMemo(() => ({
    register,
    unregister,
    getDimensions,
    containers, // Only include if children truly need it
  }), [containers]); // Recreate only when `containers` changes

  return (
    <BatchMediaContainerContext.Provider value={contextValue}>
      {children}
    </BatchMediaContainerContext.Provider>
  );
};

export default BatchMediaContainer;
