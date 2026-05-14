export const metadata = {
  title: 'NBA GOAT Rankings',
  description: 'Adjust stat weights and rank the 23 greatest NBA players of all time.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
