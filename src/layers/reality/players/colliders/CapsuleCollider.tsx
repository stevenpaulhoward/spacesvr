import {
  BodyProps,
  CylinderArgs,
  ShapeType,
  Triplet,
  useCompoundBody,
} from "@react-three/cannon";
import { useEffect, useState } from "react";
import { useEnvironment } from "../../layers/environment";
import { CompoundBodyProps } from "@react-three/cannon/src/hooks";

// height of 0.9 (eye level) for a perceived height of 1
const HEIGHT = 0.9;
const RADIUS = 0.2;
const SEGMENTS = 12;

const SPHERE_SHAPE: ShapeType = "Sphere";
const CYLINDER_SHAPE: ShapeType = "Cylinder";

const sphereProps = { type: SPHERE_SHAPE, args: [RADIUS, SEGMENTS, SEGMENTS] };
const cylinderProps = {
  type: CYLINDER_SHAPE,
  args: [RADIUS, RADIUS, HEIGHT - RADIUS * 2, SEGMENTS],
};

const sphere1 = { ...sphereProps, position: [0, -(HEIGHT - RADIUS), 0] };
const cylinder = { ...cylinderProps, position: [0, -(HEIGHT / 2), 0] };
const sphere2 = { ...sphereProps, position: [0, -RADIUS, 0] };

export const useCapsuleCollider = (pos = [0, 0, 0]) => {
  const vPos = pos as Triplet;

  const { paused } = useEnvironment();
  const [setup, setSetup] = useState(false);

  const compoundBody = useCompoundBody(() => ({
    mass: 0,
    position: vPos,
    segments: SEGMENTS,
    fixedRotation: true,
    type: "Dynamic",
    shapes: [sphere1, cylinder, sphere2],
  }));

  useEffect(() => {
    if (!paused && !setup) {
      compoundBody[1].mass?.set(62);
      setSetup(true);
    }
  }, [setup, paused, compoundBody]);

  return compoundBody;
};

export function VisibleCapsuleCollider() {
  const createSphere = (sphere: any) => (
    <mesh position={sphere.position}>
      <sphereBufferGeometry args={sphere.args} />
      <meshStandardMaterial color="red" wireframe={true} />
    </mesh>
  );

  const createCylinder = (cylinder: any) => (
    <mesh position={cylinder.position}>
      <cylinderBufferGeometry args={cylinder.args} />
      <meshStandardMaterial color="blue" wireframe={true} />
    </mesh>
  );

  return (
    <group name="collider" position={[1.5, -HEIGHT, 0]}>
      {createSphere(sphere1)}
      {createCylinder(cylinder)}
      {createSphere(sphere2)}
    </group>
  );
}
