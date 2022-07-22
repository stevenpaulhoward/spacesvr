import { Suspense } from "react";
import { Background, LostWorld, StandardReality } from "spacesvr";
import MuseHQ from "./ideas/MuseHQ";

export default function Muse() {
  return (
    <StandardReality>
      <Suspense fallback={null}>
        <MuseHQ />
      </Suspense>
      <ambientLight />
      <directionalLight position={[0, 1, 2]} color="yellow" />
      <Background color="gray" />
      <LostWorld />
    </StandardReality>
  );
}
0;
