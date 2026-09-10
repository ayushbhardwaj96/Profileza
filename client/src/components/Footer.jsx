import { assets } from "../assets/assets";

export default function Footer() {
    return (
        <footer className="mt-25 w-full border-t border-slate-100 bg-white px-6 py-12 text-sm text-slate-500 md:px-16 lg:px-24 xl:px-32">
            <div className="mx-auto max-w-7xl grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
                
                {/* Column 1: Brand & About */}
                <div className="flex flex-col space-y-4">
                    <a href="/" className="inline-block">
                        <img src={assets.logo} alt="Profileza Logo" className="h-8 w-auto object-contain" />
                    </a>
                    <p className="leading-relaxed">
                     Profileza is the premier social media marketplace connecting brands and customers through an intuitive, user-first platform.
                    </p>
                </div>

                {/* Column 2: Quick Links */}
                <div className="flex flex-col space-y-3">
                    <h2 className="font-semibold text-slate-900">Company</h2>
                    <a className="hover:text-slate-800 transition-colors" href="#">About us</a>
                    <a className="inline-flex items-center hover:text-slate-800 transition-colors" href="#">
                        Careers
                        <span className="ml-2 rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-600">
                            Hiring
                        </span>
                    </a>
                    <a className="hover:text-slate-800 transition-colors" href="#">Contact us</a>
                </div>

                {/* Column 3: Legal Links */}
                <div className="flex flex-col space-y-3">
                    <h2 className="font-semibold text-slate-900">Legal</h2>
                    <a className="hover:text-slate-800 transition-colors" href="#">Privacy Policy</a>
                    <a className="hover:text-slate-800 transition-colors" href="#">Terms of Service</a>
                    <a className="hover:text-slate-800 transition-colors" href="#">Cookie Settings</a>
                </div>

                {/* Column 4: Newsletter Signup */}
                <div className="flex flex-col space-y-4">
                    <div>
                        <h2 className="font-semibold text-slate-900">Subscribe to our newsletter</h2>
                        <p className="mt-2 leading-relaxed">The latest news, articles, and resources, sent weekly.</p>
                    </div>
                    {/* Kept the same inner form elements, just wrapped them cleaner */}
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <input 
                            className="w-full rounded-md border border-slate-200 px-1 py-2 text-slate-950 placeholder-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600" 
                            type="email" 
                            placeholder="Enter your email" 
                        />
                        <button className="whitespace-nowrap rounded-md bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>

            </div>

            {/* Bottom Copyright Bar */}
            <div className="mt-12 border-t border-slate-100 pt-6 text-center text-xs text-slate-400">
                <p>Copyright © {new Date().getFullYear()} Profileza. All rights reserved.</p>
            </div>
        </footer>
    );
}
