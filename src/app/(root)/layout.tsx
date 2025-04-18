import Footer from '@/components/custom/Footer'
import Logo from '@/components/custom/logo'
import { isAuthenticated } from '@/lib/actions/auth.action'
// import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

const Rootlayout =  async ({children}:{children : ReactNode}) => {
  const isUserAuthenticated = await isAuthenticated();

  if(!isUserAuthenticated) redirect('/sign-in');
  return (
    <div className="root-layout">
      <nav className="flex justify-between items-center p-4">
        <Logo />
        <ul className="flex space-x-6 items-center list-none">
        <li className='max-md:hidden'><Link href="/"> Features</Link></li>
        <li className='max-md:hidden'><Link href="/"> Pricing</Link></li>
        <li className='btn-primary py-2'><Link href="/sign-in"> Get Started</Link></li>
        </ul>
      </nav>

      
      
      {children}
      <Footer />
      
      </div>
  )
}

export default Rootlayout