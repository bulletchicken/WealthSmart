export const metadata = {
  title: 'WealthSmart',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{margin:"0", maxHeight:"150vh"}}>{children}</body>
    </html>
  )
}
