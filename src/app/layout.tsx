import Navbar from "@components/Navbar";
import "./globals.css";

export const metadata = {
  title: "GatorAI",
  description: "Official website",
  icons: { icon: "/icon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen flex flex-col no-scrollbar">
        <Navbar />
        <main className="flex-grow w-screen flex justify-center no-scrollbar">
          <div className="w-full flex flex-col items-center">{children}</div>
        </main>
      </body>
    </html>
  );
}
