import AuthForm from "@/components/AuthForm";
import withAuth from "@/components/hoc/withAuth";
import Image from "next/image";
// export default withAuth(index,"auth")
export default function index () {
  return (
    <div 
      className="flex flex-col justify-center h-screen py-12 bg-gray-100 sm:px-6 lg:px-8"
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          height="1080"
          width="1920"
          className="w-auto mx-auto rounded-md"
          src="/images/logo.jpg"
          alt="Logo"
        />
        <h2 
          className="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900 "
          >
            Sign in to your account
        </h2>
      </div>
        <AuthForm/>
  </div>

  )
}
