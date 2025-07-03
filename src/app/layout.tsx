export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <title>WeatherApp Dimas</title>
      <body>{children}</body>
    </html>
  );
}
