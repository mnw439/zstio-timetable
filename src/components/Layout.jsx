import React, { useEffect } from "react";
import Timetable from "./Timetable";
import Footer from "../components/Footer";
import Jumbotron from "../components/Jumbotron";
import Navbar from "./Navbar";
import { initFlowbite } from "flowbite";
import DropdownRoom from "./Dropdowns/RoomDropdown";
import DropdownTeacher from "./Dropdowns/TeacherDropdown";
import DropdownClass from "./Dropdowns/ClassDropdown";
import Head from "next/head";

function Layout(props) {
  let {
    rooms,
    teachers,
    classes,
    siteTitle,
    timeTable: { title },
  } = props;

  useEffect(() => {
    initFlowbite();
  }, []);

  return (
    <>
      <Head>
        <title>
          {title
            ? `ZSTiO - Plan lekcji | ${title}`
            : "ZSTiO - Plan lekcji | Wczytywanie planu..."}
        </title>
        <meta
          property="og:title"
          content={`Sprawdź plan lekcji ${siteTitle} | ZSTiO`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min-h-screen w-screen flex flex-col justify-center items-center bg-[#F7F3F5] dark:bg-gray-900 transition-all">
        <Navbar />
        <Jumbotron {...props} />
        <Timetable {...props} />
        <DropdownRoom rooms={rooms} />
        <DropdownTeacher teachers={teachers} />
        <DropdownClass classes={classes} />
        <Footer />
      </div>
    </>
  );
}

export default Layout;
