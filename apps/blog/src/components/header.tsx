import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            My Blog
          </Link>

          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="text-gray-700 hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/admin/create" className="text-gray-700 hover:text-blue-600">
                  New Post
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
