"use client"

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const Navbar = () => {
    const searchParams = useSearchParams();
    const todosParams = searchParams.get('todos');

  return (
    <nav>
        <Link href="/" className={todosParams === null ? "active" : ""}>All</Link>
        <Link href="/?todos=active" className={todosParams === "active" ? "active" : ""}> Active </Link>
        <Link href="/?todos=completed" className={todosParams === "completed" ? "active" : ""}> Completed </Link>
    </nav>
  )
}

export default Navbar