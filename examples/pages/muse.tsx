import dynamic from "next/dynamic";

const Muse = dynamic(import("../worlds/Muse"), { ssr: false });

export default function Index() {
  return <Muse />;
}
