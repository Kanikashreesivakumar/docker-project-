import "./globals.css";

export const metadata = {
  title: "AI Resume Analyzer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
