//"use client"; // This is a client component 👈🏽
import Slider from "./components/Slider";

export default function Home() {
  return (
    <main className="flex  w-full min-h-screen content-center flex-wrap justify-center">
      <Slider key="slider" min={0} max={99} steps={null} />
    </main>
  );
}
