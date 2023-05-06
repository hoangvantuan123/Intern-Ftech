import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <h1>
      Hello World
     </h1>
      <ul>
        <li>
          <Link href='/'>
            Home
          </Link>
        </li>
        <li>
          <Link href='/about'>
            About
          </Link>
        </li>
        <li>
          <Link href='/about/team'>
            Team
          </Link>
        </li>
      </ul>
    </main>
  )
}
