import { Providers } from "./Providers";

export const metadata = {
  title: "LoginV2",
  description: "LoginPageV2",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
