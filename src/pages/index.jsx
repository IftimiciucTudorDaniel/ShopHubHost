import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar from "@/components/headers/Topbar";
import Collections from "@/components/homes/home-1/Collections";
import Hero from "@/components/homes/home-1/Hero";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "InDulap.ro",
};

export default function Acasă() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <Header1 />
      <Hero />
      <Collections />
      <Products />
      <BannerCollection />
      <BannerCountdown />
      <Blogs />
      <ShopGram />
      <Footer1 />
    </>
  );
}
