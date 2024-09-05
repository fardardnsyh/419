import Link from "next/link"
import { HiStar } from "react-icons/hi"

export default function About() {
  return (
    <section id="#about" className="flex flex-col items-center mt-12 sm:p-12">
      <div className="flex flex-col sm:grid grid-cols-2 place-items-center mt-12 gap-12 w-full">
        <div className="flex flex-col items-center">
          <p className="text-4xl text-center sm:text-left tracking-wide font-bold">
            Write a fully formatted blog post in seconds
          </p>
          <p className="text-xl text-center sm:text-left tracking-wider mt-6">
            Create beautifully formatted blog posts with our intuitive
            Markdown-HTML tool. Create an account to keep track of all your
            created blog posts and share them anywhere.
          </p>

          <div className="flex flex-col mt-12 text-xl gap-4">
            <div className="flex items-center gap-4">
              <HiStar fill="gold" size={32} />
              <p>
                Filter through blog posts and discover posts that suit your
                interests.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <HiStar fill="gold" size={32} />
              <p>Create an account to link your socials and view your posts.</p>
            </div>
            <div className="flex items-center gap-4">
              <HiStar fill="gold" size={32} />
              <p>
                No account necessary. Share your thoughts with full freedom.
              </p>
            </div>
          </div>
          <Link href={"/posts/new"} className="flex">
            <p className="p-2 bg-black mt-8 w-fit justify-center text-white text-xl rounded-xl font-bold">
              Get writing
            </p>
          </Link>
        </div>
        <div className="border rounded-xl shadow-lg p-4 mb-4 sm:mb-0">
          <img src={"/scrnshot.png"} />
        </div>
      </div>
    </section>
  )
}
