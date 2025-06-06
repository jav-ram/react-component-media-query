import { CSSProperties } from "@mui/material";
import { ComponentProps, ElementType, ForwardedRef, forwardRef, ReactNode, RefObject, useEffect, useMemo, useRef, useState } from "react";
import MediaContainerContext from "./context";
import { ContainerDimensions } from "../BatchMediaContainer/types";
import _ from "lodash";

export type ContainerMediaPropsType<T extends ElementType> = {
  id?: string | number;
  as?: T;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  containerType?: CSSProperties['containerType'],
} & ComponentProps<T>;

type ContainerProviderPropsType<T extends ElementType> = ContainerMediaPropsType<T>;
const MediaContainer = forwardRef(
  // FIXME
  // @ts-expect-error types are not correctly set for forwardRef
  // maybe we will need a new type approach?
  <T extends ElementType = 'div'>(
    props: ContainerProviderPropsType<T>,
    ref: ForwardedRef<HTMLElement>,
  ) => {
    const {
      id,
      as,
      children,
      className,
      style: incomingStyles,
      containerType = 'inline-size',
      ...rest
    } = props;

    const [dimension, setDimension] = useState<ContainerDimensions>({ width: 0, height: 0 });
    const containerRef = useRef<HTMLElement>(null);
    const observerRef = useRef<ResizeObserver>(null);

    // isOnScreen?
    const [isOnScreen, setIsOnScreen] = useState(false);
    const isOnScreenRef = useRef(true);
    isOnScreenRef.current = isOnScreen;

    const Component = as || 'div';
    const containerName = id ? id.toString() : 'random'; // implement random uuid

    const style: CSSProperties = {
      // useful values for component media query
      containerName,  // identifier of container
      containerType,  // defines how the container will be use
      // allow to set them with styles
      ...incomingStyles,
    }

    useEffect(() => {
      if (!containerRef.current) return;

      // Initialize ResizeObserver
      observerRef.current = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (!isOnScreenRef.current) return;
          const { width, height } = entry.contentRect;
          if (width === dimension.width && height === dimension.height) return

          setDimension({ width, height });
        }
      });

      // Start observing
      observerRef.current.observe(containerRef.current);

      // Cleanup
      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    }, [isOnScreen]);

    const setRefs = (node: HTMLElement | null) => {
      containerRef.current = node;

      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.RefObject<HTMLElement | null>).current = node;
      }
    };

    useEffect(() => {
      if (!containerRef.current) return;

      const intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          setIsOnScreen(entry.isIntersecting);
        },
        { threshold: 0.01 }
      );

      intersectionObserver.observe(containerRef.current);
      return () => intersectionObserver.disconnect();
    }, []);

    return (
      <MediaContainerContext.Provider value={dimension}>
        <Component
          ref={setRefs}
          className={className}
          style={style}
          {...rest}
        >
          {children}
        </Component>
      </MediaContainerContext.Provider>
    );
  });

export default MediaContainer;