import Link from "next/link";
export default function Header() {
  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">My App</span>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-blue-200 border-blue-400 hover:text-white hover:border-white">
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3a3 3 0 013-3h14a3 3 0 110 6H3a3 3 0 01-3-3zm0 8a3 3 0 013-3h14a3 3 0 110 6H3a3 3 0 01-3-3zm0 8a3 3 0 013-3h14a3 3 0 110 6H3a3 3 0 01-3-3z" />
            </svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <Link href="/" className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4">
                Home
            </Link>
            <Link href="/about" className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4">
                About
            </Link>
            <Link href="/about/team" className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4">
                Team
            </Link>
            <Link href="/code/repos" className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4">
                Code
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
