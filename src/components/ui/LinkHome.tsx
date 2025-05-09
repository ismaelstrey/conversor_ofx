import Link from "next/link";

export default function LinkHome() {
   return (
    <Link href="/">
    <span className='fixed transition-all top-8 right-8 text-[#F3F821] hover:scale-110 cursor-pointer'>Voltar</span>
    </Link>
   )
}