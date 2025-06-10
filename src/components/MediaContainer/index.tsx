import { CSSProperties } from "@mui/material";
import { ComponentProps, ElementType, ForwardedRef, forwardRef, ReactNode } from "react";
import MediaContainerContext from "./context";
import { useMediaContainer } from "./hooks";

// Define props without ComponentProps to avoid type conflicts
type BaseContainerMediaProps<T extends ElementType> = {
  id?: string | number;
  as?: T;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  containerType?: CSSProperties['containerType'];
};

// Combine with component-specific props
type ContainerMediaProps<T extends ElementType> = BaseContainerMediaProps<T> &
  Omit<ComponentProps<T>, keyof BaseContainerMediaProps<T>>;

// Define the component signature
interface MediaContainerComponent {
  <T extends ElementType = 'div'>(
    props: ContainerMediaProps<T> & { ref?: ForwardedRef<HTMLElement> }
  ): ReactNode;
  displayName?: string;
}

// @ts-expect-error forward ref not infering the correct type of generic
// forward component `as`. This needs to be fixed
const MediaContainer = forwardRef(<T extends ElementType = 'div'>(
  props: ContainerMediaProps<T>,
  ref: ForwardedRef<HTMLElement>
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

  const { ref: containerRef, dimension } = useMediaContainer({ ref });
  const Component = as || 'div';
  const containerName = id ? id.toString() : 'random';

  const style: CSSProperties = {
    containerName,
    containerType,
    ...incomingStyles,
  };

  return (
    <MediaContainerContext.Provider value={dimension}>
      <Component
        id="media-container"
        ref={containerRef}
        className={className}
        style={style}
        {...rest}
      >
        {children}
      </Component>
    </MediaContainerContext.Provider>
  );
}) as MediaContainerComponent;

MediaContainer.displayName = 'MediaContainer';

export default MediaContainer;