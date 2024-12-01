import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import Header from "./header/Header";

export default function PageShell() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
