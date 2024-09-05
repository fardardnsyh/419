"use client"

import Link from "next/link"
import { TypeAnimation } from "react-type-animation"

export default function Hero() {
  return (
    <section className="flex flex-col items-center my-48">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center text-black text-center font-bold text-[24px] sm:text-[40px] lg:text-[75px]">
          <span>BlogAbout...</span>
          <TypeAnimation
            sequence={[
              "Cats.",
              2000,
              "AI.",
              2000,
              "Photography.",
              2000,
              "Biscuits.",
              2000,
              "Technology.",
              2000,
              "Politics.",
              2000,
              "Music.",
              2000,
              "Anything.",
              2000,
            ]}
            wrapper="span"
            speed={1}
            repeat={Infinity}
          />
        </div>
        <p className="text-md sm:text-xl text-center max-w-xl sm:max-w-3xl">
          BlogAbout anything that peaks your interest. Whether it be spaceships
          or your favourite pair of socks, let the world know! No account
          necessary.
        </p>
      </div>
      <Link href={"/posts"} className="flex">
        <p className="p-4 bg-black mt-8 w-fit justify-center text-white text-2xl rounded-xl font-normal">
          View Posts
        </p>
      </Link>
    </section>
  )
}
