import { createContext, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ContainerDimensions, ContainersType, ContainterContextValueType } from "./types";
import ContainerContext from "./context";
import _, { debounce } from 'lodash';
import { unstable_batchedUpdates } from 'react-dom'; // Or use 'react-batched-updates'
import { batchedUpdates } from 'react-batched-updates'

const logTime: Record<string, number> = {};
const DEV = true;

const csvLog = (id: string, start: number, end: number) => {
  const took = end - start;
  if (!DEV) return;
  if (!logTime[id]) {
    logTime[id] = took;
  } else {
    logTime[id] = logTime[id] + took;
  }
  console.log(id, ',', logTime)
}

const FrameRequestContainerProvider = ({ children }: { children: React.ReactNode }) => {
  const [containers, setContainers] = useState(() => new Map<string, ContainerDimensions>());
  const observerRef = useRef<ResizeObserver>(null);

  const pendingUpdates = useRef<Map<string, ContainerDimensions>>(new Map<string, ContainerDimensions>);
  const animationFrameId = useRef<number | null>(null);

  // add updates by batches
  // TODO: rename flush is not describing whats happening
  const flushUpdates = () => {
    const start = performance.now();
    batchedUpdates(() => {
      if (pendingUpdates.current.size > 0) {
        console.log('entering')
        setContainers((prev) => {
          // Create a new Map but copy entries efficiently
          const newMap = new Map(prev);
          pendingUpdates.current.forEach((value, key) => newMap.set(key, value));
          return newMap; // Now React detects the change
        });
        // clear map
        pendingUpdates.current.clear(); // Faster than creating a new Map
      }
      animationFrameId.current = null;
    })
    const end = performance.now();
    csvLog('flush', start, end);
  };

  useEffect(() => {
    const throttleResize = _.throttle((entries: ResizeObserverEntry[]) => {
      entries.forEach((entry) => {
        const id = (entry.target as HTMLElement).dataset.containerId!;
        pendingUpdates.current.set(id, {
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      });
      if (animationFrameId.current === null) {
        animationFrameId.current = requestAnimationFrame(flushUpdates);
      }
    }, 100); // Throttle to 100ms

    observerRef.current = new ResizeObserver(throttleResize);
    return () => observerRef.current?.disconnect();
  }, []);

  const register = (id: string, node: HTMLDivElement) => {
    const start = performance.now();
    if (node.offsetParent !== null) { // Skip hidden elements
      node.dataset.containerId = id;
      observerRef.current?.observe(node);
    }
    const end = performance.now();
    csvLog('register', start, end);
  };

  const unregister = (id: string) => {
    const start = performance.now();
    // Cleanup logic (if needed)
    setContainers((prev) => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
    const end = performance.now();
    csvLog('unregister setup', start, end);
  };

  const getDimensions = (id: string) => {
    const start = performance.now();
    if (containers.get(id)) return containers.get(id);
    // not found throw error;
    // throw (`Container with id: ${id} not found, please ensure that the container is register and not recently unregistered`)
    const end = performance.now();
    csvLog('getDimensions', start, end);
    return { width: 0, height: 0 };
  }

  const contextValue = useMemo(() => ({
    register,
    unregister,
    getDimensions,
    containers, // Only include if children truly need it
  }), [containers]); // Recreate only when `containers` changes

  return (
    <ContainerContext.Provider value={contextValue}>
      {children}
    </ContainerContext.Provider>
  );
};

export default FrameRequestContainerProvider;
