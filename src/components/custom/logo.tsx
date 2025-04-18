import Link from "next/link";

const Logo = () => {
  return (
    <div>
      <Link href="/">
    <h2 className="text-4xl text-primary-100">Intervue<span className="text-cyan-500">AI</span></h2>
    </Link>
    </div>
  )
}

export default Logo