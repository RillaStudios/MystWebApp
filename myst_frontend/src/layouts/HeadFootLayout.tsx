import { Footer } from "../components/global/Footer";
import { Header } from "../components/global/Header";

/* 
This is a layout component that provides a header and footer for the application.
It is used for pages that require a header and footer. An example of this is the main page.

@author: IFD
@since: 2025-05-14
*/
export default function HeadFootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
