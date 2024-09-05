"use client"

import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"
import { BiLogoGithub } from "react-icons/bi"
import { FaXmark } from "react-icons/fa6"
import { GiHamburgerMenu } from "react-icons/gi"

export default function Navbar() {
  const { data: session } = useSession()

  const [showMobileNav, setShowMobileNav] = useState(false)

  return (
    <nav className="flex items-center sticky top-4 z-40 bg-white shadow-lg justify-between mt-4 p-4 border-2 rounded-xl">
      <Link
        href={session?.user ? "/posts" : "/"}
        className="text-2xl font-bold"
      >
        BlogAbout
      </Link>
      <ul className="hidden sm:flex items-center gap-4">
        <li>
          <Link href="/#about">About</Link>
        </li>
        <li>
          <Link href="http://www.github.com">
            <BiLogoGithub size={32} />
          </Link>
        </li>
        {session?.user && (
          <li>
            <Link href={`/user/${session?.user.username}`}>My Profile</Link>
          </li>
        )}
        {session?.user ? (
          <>
            <p
              className="font-bold text-white bg-black p-2 rounded-xl mx-2 cursor-pointer"
              onClick={() => signOut()}
            >
              Sign Out
            </p>
          </>
        ) : (
          <Link href={"/auth/login"}>
            <p className="font-bold text-white bg-black p-2 rounded-xl mx-2 cursor-pointer">
              Login
            </p>
          </Link>
        )}
      </ul>
      {!showMobileNav ? (
        <GiHamburgerMenu
          className="sm:hidden block"
          size={24}
          onClick={() => setShowMobileNav(!showMobileNav)}
        />
      ) : (
        <FaXmark
          className="sm:hidden block"
          size={24}
          onClick={() => setShowMobileNav(!showMobileNav)}
        />
      )}
      {showMobileNav && (
        <ul className="sm:hidden absolute top-20 left-0 w-full bg-white shadow-lg flex flex-col items-center gap-4 p-4 border-2 rounded-xl">
          <li>
            <Link href="/#about" onClick={() => setShowMobileNav(false)}>
              About
            </Link>
          </li>
          <li>
            <Link
              href="http://www.github.com"
              onClick={() => setShowMobileNav(false)}
            >
              <BiLogoGithub size={32} />
            </Link>
          </li>
          {session?.user && (
            <li>
              <Link
                href={`/user/${session?.user.username}`}
                onClick={() => setShowMobileNav(false)}
              >
                My Profile
              </Link>
            </li>
          )}
          {session?.user ? (
            <>
              <p
                className="font-bold text-white bg-black p-2 rounded-xl mx-2 cursor-pointer"
                onClick={() => {
                  signOut()
                  setShowMobileNav(false)
                }}
              >
                Sign Out
              </p>
            </>
          ) : (
            <Link href={"/auth/login"} onClick={() => setShowMobileNav(false)}>
              <p className="font-bold text-white bg-black p-2 rounded-xl mx-2 cursor-pointer">
                Login
              </p>
            </Link>
          )}
        </ul>
      )}
    </nav>
  )
}
