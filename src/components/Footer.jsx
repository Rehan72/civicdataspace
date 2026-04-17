import { Facebook, Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

const social = [
  { label: 'GitHub', icon: Github, href: 'https://github.com' },
  { label: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
  { label: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
  { label: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
];

export default function Footer() {
  return (
    <footer className="bg-brand-navy pt-16 pb-12 text-white">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
        {/* Top Row: Logo and Follow Us */}
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center">
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
            <span className="text-2xl font-bold tracking-tight">CivicDataSpace</span>
          </Link>

          <div className="flex flex-col items-start gap-4 md:items-end">
            <span className="text-sm font-bold uppercase tracking-wider text-brand-yellow">Follow Us</span>
            <div className="flex items-center gap-3">
              {social.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-mint p-2 text-slate-800 transition hover:bg-white"
                  aria-label={item.label}
                >
                  <item.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row: Nav Links and Credits */}
        <div className="mt-16 flex flex-col items-start justify-between border-t border-white/10 pt-8 md:flex-row md:items-center">
          <nav className="flex items-center gap-8 text-[12px] font-bold uppercase tracking-wide opacity-80">
            <Link href="#" className="transition hover:opacity-100">About Us</Link>
            <Link href="#" className="transition hover:opacity-100">Sitemap</Link>
            <Link href="#" className="transition hover:opacity-100">Contact Us</Link>
          </nav>

          <div className="mt-6 flex items-center gap-2 text-[12px] font-medium md:mt-0">
            <span className="opacity-60">made by</span>
            <div className="flex items-center gap-1 font-bold">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              CivicDataSpace
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
