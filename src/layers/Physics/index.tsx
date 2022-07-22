import {
  PhysicsProps as ProviderProps,
  Physics as PhysicsProvider,
} from "@react-three/cannon";
import { ReactNode } from "react";

const defaultPhysicsProps: Partial<ProviderProps> = {
  size: 50,
  allowSleep: false,
  gravity: [0, -9.8, 0],
  defaultContactMaterial: {
    friction: 0,
  },
};

export type PhysicsProps = Partial<ProviderProps>;
type PhysicsLayerProps = { children: ReactNode | ReactNode[] } & PhysicsProps;

export function Physics(props: PhysicsLayerProps) {
  const { children, ...physicsProps } = props;

  console.log("physics-rerender");

  return (
    <PhysicsProvider {...defaultPhysicsProps} {...physicsProps}>
      {children}
    </PhysicsProvider>
  );
}
