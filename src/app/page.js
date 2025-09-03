import Image from "next/image";
import AddSchool from '../pages/addSchool'
import ShowSchools from "@/pages/showSchool";
export default function Home() {
  return (
    <>
      <AddSchool/>
      <ShowSchools/>
    </>
  );
}
