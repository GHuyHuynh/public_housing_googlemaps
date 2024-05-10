import Image from "next/image";
import { Inter } from "next/font/google";
import MapView from "./components/MapView";

export default function Home() {

  return (
    <>
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-4xl font-bold text-center">Google Map view Showing all Public Housing in NS</h1>
        <MapView className="mt-20 "/>
      </div>
    </>
  );
}
