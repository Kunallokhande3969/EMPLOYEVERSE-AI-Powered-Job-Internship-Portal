import Wrapper from "@/Components/wrapper/Wrapper";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.css";

export const metadata = {
  title: "CareerHub",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
