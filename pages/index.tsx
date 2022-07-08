import Link from "next/link"

const Landing = () => {

  return (
    <div className="flex-1 flex flex-col sm:flex-row justify-evenly items-center gap-12 p-10 sm:p-5 ">
      
      <section className="flex flex-col gap-5">

        {/* Heading */}
        <header className="text-5xl md:text-6xl lg:text-7xl text-center sm:text-start leading-tight">
          <h1 className="font-normal">Let's go</h1>
          <h1 className="font-bold">Somewhere!</h1>
        </header>

        {/* Buttons */} 
        <div className="flex flex-col lg:flex-row gap-5 sm:text-2xl">
          <div className="flex gap-5">
            <Link href={'/login'}><button className="flex-1 lg:flex-none px-5 lg:px-8 py-2 rounded-full bg-emerald-500">Sign In</button></Link>
            <Link href={'/register'}><button className="flex-1 lg:flex-none px-5 lg:px-8 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900">Sign Up</button></Link>
          </div>

          <Link href={'/home'}><button className="px-7 py-2 rounded-full border-2">Continue as a guest</button></Link>
        </div>

      </section>

      {/* Mockup */}
      <div className="dark:hidden">
        <img src="/iphone_mockup_white.png" className="w-72" alt="Somewhere on iPhone" />
      </div>
      <div className="hidden dark:flex">
        <img src="/iphone_mockup_black.png" className="w-72" alt="Somewhere on iPhone" />
      </div>

    </div>
  )
}

export default Landing