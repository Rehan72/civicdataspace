import Link from 'next/link';
import { Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-brand-navy py-4 text-white shadow-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 sm:px-8">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center">
            {/* Custom Orange Network Icon */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 6C13.1046 6 14 5.10457 14 4C14 2.89543 13.1046 2 12 2C10.8954 2 10 2.89543 10 4C10 5.10457 10.8954 6 12 6Z" fill="#F9B44F" />
              <path d="M6 14C7.10457 14 8 13.1046 8 12C8 10.8954 7.10457 10 6 10C4.89543 10 4 10.8954 4 12C4 13.1046 4.89543 14 6 14Z" fill="#F9B44F" />
              <path d="M18 14C19.1046 14 20 13.1046 20 12C20 10.8954 19.1046 10 18 10C16.8954 10 16 10.8954 16 12C16 13.1046 16.8954 14 18 14Z" fill="#F9B44F" />
              <path d="M12 22C13.1046 22 14 21.1046 14 20C14 18.8954 13.1046 18 12 18C10.8954 18 10 18.8954 10 20C10 21.1046 10.8954 22 12 22Z" fill="#F9B44F" />
              <path d="M7.42 10.58L10.58 7.42" stroke="#F9B44F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13.42 7.42L16.58 10.58" stroke="#F9B44F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16.58 13.42L13.42 16.58" stroke="#F9B44F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10.58 16.58L7.42 13.42" stroke="#F9B44F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">CivicDataSpace</span>
        </Link>

        {/* Navigation Section */}
        <div className="flex items-center gap-10">
          <nav className="hidden items-center gap-8 text-[14px] font-bold lg:flex">
            <button className="p-1 transition hover:opacity-80">
              <Search className="h-5 w-5 text-white" />
            </button>
            <Link href="#" className="text-brand-mint transition-colors hover:text-white">ALL DATA</Link>
            <Link href="#" className="tracking-wide text-white transition hover:text-brand-mint">SECTORS</Link>
            <Link href="#" className="tracking-wide text-white transition hover:text-brand-mint">USE CASES</Link>
            <Link href="#" className="tracking-wide text-white transition hover:text-brand-mint">PUBLISHERS</Link>
            <Link href="#" className="tracking-wide text-white transition hover:text-brand-mint">ABOUT US</Link>
          </nav>

          {/* Login Button */}
          <button className="hidden rounded-[6px] bg-brand-mint px-6 py-2.5 text-[14px] font-black uppercase text-slate-800 transition hover:bg-opacity-90 lg:block">
            LOGIN / SIGN UP
          </button>
        </div>
      </div>
    </header>
  );
}
