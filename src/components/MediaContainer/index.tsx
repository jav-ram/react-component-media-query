import { CSSProperties } from "@mui/material";
import { ComponentProps, ElementType, ForwardedRef, forwardRef, ReactNode, RefObject, useEffect, useMemo, useRef, useState } from "react";
import MediaContainerContext from "./context";
import { ContainerDimensions } from "../BatchMediaContainer/types";
import _ from "lodash";
import { useMediaContainer, useMediaContainerNewObserver } from "./hooks";

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

    const { ref: containerRef, dimension } = useMediaContainer({ ref })
    // const { ref: containerRef, dimension } = useMediaContainerNewObserver({ ref });

    const Component = as || 'div';
    const containerName = id ? id.toString() : 'random'; // implement random uuid

    const style: CSSProperties = {
      // useful values for component media query
      containerName,  // identifier of container
      containerType,  // defines how the container will be use
      // allow to set them with styles
      ...incomingStyles,
    }

    return (
      <MediaContainerContext.Provider value={dimension}>
        <Component
          ref={containerRef}
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