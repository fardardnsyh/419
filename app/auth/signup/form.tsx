// "use client"

// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { FormEvent } from "react"

// export default function Form() {
//   const router = useRouter()
//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     const formData = new FormData(e.currentTarget)

//     let password = formData.get("password")
//     let confirm_password = formData.get("confirm_password")

//     if (password !== confirm_password) {
//       console.error("Password do not match")
//       return
//     }

//     const response = await fetch(`/api/auth/signup`, {
//       method: "POST",
//       body: JSON.stringify({
//         username: formData.get("username"),
//         first_name: formData.get("first_name"),
//         last_name: formData.get("last_name"),
//         password: formData.get("password"),
//       }),
//     })

//     if (response.ok) {
//       const result = await response.json()
//       console.log(result)
//       router.push("/auth/login")
//     } else {
//       console.error("Failed to create post")
//     }
//   }

//   return (
//     <div className="flex justify-center items-center h-full w-full mt-12">
//       <form
//         onSubmit={handleSubmit}
//         className="flex flex-col items-center gap-4 border-2 shadow-lg rounded-xl p-4 sm:p-8 sm:w-1/2"
//       >
//         <p className="text-2xl sm:text-5xl font-bold my-1 sm:my-2">Sign Up</p>

//         <div className="flex flex-col text-left gap-1 sm:gap-2">
//           <label className="text-lg sm:text-2xl">Username</label>

//           <input
//             name="username"
//             className="border p-0.5 text-lg sm:text-xl"
//             type="username"
//             required
//           />
//         </div>

//         <div className="flex flex-col text-left gap-1 sm:gap-2">
//           <label className="text-lg sm:text-2xl">First Name</label>

//           <input
//             name="first_name"
//             className="border p-0.5 text-lg sm:text-xl"
//             type="text"
//             required
//           />
//         </div>
//         <div className="flex flex-col text-left gap-1 sm:gap-2">
//           <label className="text-lg sm:text-2xl">Last Name</label>

//           <input
//             name="last_name"
//             className="border p-0.5 text-lg sm:text-xl"
//             type="text"
//             required
//           />
//         </div>

//         <div className="flex flex-col text-left gap-1 sm:gap-2">
//           <label className="text-lg sm:text-2xl">Password</label>

//           <input
//             name="password"
//             className="border p-0.5 text-lg sm:text-xl"
//             type="password"
//             required
//           />
//         </div>
//         <div className="flex flex-col text-left gap-1 sm:gap-2">
//           <label className="text-lg sm:text-2xl">Confirm Password</label>

//           <input
//             name="confirm_password"
//             className="border p-0.5 text-lg sm:text-xl"
//             type="password"
//             required
//           />
//         </div>
//         <p>
//           Already got an account?{" "}
//           <strong>
//             <Link href="/auth/login">Log In</Link>
//           </strong>
//         </p>
//         <button
//           type="submit"
//           className="p-2 bg-black text-white font-bold text-xl w-fit rounded-xl"
//         >
//           Sign Up
//         </button>
//       </form>
//     </div>
//   )
// }
