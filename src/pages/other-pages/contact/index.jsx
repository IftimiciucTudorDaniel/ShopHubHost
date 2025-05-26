import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar6 from "@/components/headers/Topbar6";
import Contact2 from "@/components/otherPages/Contact2";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Contact || Modave - Multipurpose Reactjs eCommerce Template",
  description: "Modave - Multipurpose Reactjs eCommerce Template",
};

export default function ContactPage() {
  return (
      <>
          <MetaComponent meta={metadata}/>
          <Topbar6 bgColor="bg-main"/>
          <Header1/>
          <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11249794.063501574!2d20.4620061!3d45.943161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff3d5b1c0a0d%3A0x4d0b0b0b0b0b0b0b!2sRomania!5e0!3m2!1sen!2sro!4v1617203294845!5m2!1sen!2sro"
              width={600}
              height={450}
              style={{border: 0, width: "100%"}}
              allowFullScreen=""
              loading="lazy"
          />

          <Contact2/>
          <Footer1/>
      </>
  );
}
