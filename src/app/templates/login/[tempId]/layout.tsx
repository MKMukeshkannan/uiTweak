import { Providers } from "./StateConfig/Providers";

export const metadata = {
  title: "Login",
  description: "LoginPage",
};

export default function LoginLayout({
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
