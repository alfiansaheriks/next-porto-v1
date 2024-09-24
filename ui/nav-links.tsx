'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import '../globals.css'

export function NavLinks() {
    const pathname = usePathname()

    return (
        <nav className="bg-[#212529]">
            <div className="flex flex-row items-center justify-between p-5 inconsolata">
                <div>
                    <p className="text-[#F8F9FA]">Portofolio</p>
                </div>
                <div>
                    <Link className={`no-underline p-2 m-2 rounded ${pathname === '/dashboard' ? 'font-bold text-[#f5f5f5]' : 'hover:bg-[#F8F9FA] hover:text-[#212529] text-white'}`} href="/dashboard">
                        Home
                    </Link>

                    <Link className={`no-underline p-2 m-2 rounded ${pathname === '/about' ? 'bg-[#E9ECEF] text-[#212529]' : 'hover:bg-[#F8F9FA] hover:text-[#212529] text-white'}`} href="/about">
                        About
                    </Link>
                </div>
                <div>
                </div>
            </div>
        </nav>
    )
}