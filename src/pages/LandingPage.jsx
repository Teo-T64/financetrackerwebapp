import { UserIcon, Github, Twitter, Linkedin } from "lucide-react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";


function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
        <nav className="flex items-center justify-between bg-white/80 border-b border-gray-200 backdrop-blur-md py-4 px-6 sm:px-12 sticky top-0 z-50">
            <div className="flex items-center gap-8">
                <img src={assets.logo} alt="logo" className="h-17 w-auto object-contain" />
                
                <div className="hidden md:flex items-center gap-2 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    <UserIcon size={16} className="text-purple-700" />
                    <span>New here? Join the community.</span>
                </div>

            </div>

            <div className="flex items-center gap-4">
                <button onClick={()=>navigate("/login")} className="cursor-pointer text-gray-600 font-semibold hover:text-purple-700 transition-colors">
                        Login
                </button>
                <button onClick={()=>navigate("/signup")} className="cursor-pointer text-white font-bold bg-purple-700 px-6 py-2 rounded-full hover:bg-purple-800 transition-all shadow-md hover:shadow-lg">
                        Sign Up
                </button>
            </div>
        </nav>

        <main className="flex grow flex-col items-center justify-center text-center px-6 py-20">
            <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
                Manage your work <span className="text-purple-700">smarter</span>
            </h1>
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
                Experience the next generation of productivity. Beautifully designed, 
                expertly crafted for tracking your financial habits.
            </p>
            
            <div className="relative mt-8 rounded-2xl p-2 bg-linear-to-tr from-purple-200 to-indigo-200 shadow-2xl">
                <img 
                src={assets.screenshot} 
                alt="App Dashboard" 
                className="rounded-xl shadow-sm w-full h-auto"
                />
            </div>
            </div>
        </main>

        <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1">
                <img src={assets.logo} alt="logo" className="h-8 mb-4" />
                <p className="text-gray-500 text-sm">
                Finance tracker, app for everyone
                </p>
            </div>

            <div>
                <h4 className="font-bold text-gray-900 mb-4">Product</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                <li className="hover:text-purple-700 cursor-pointer">Features</li>
                <li className="hover:text-purple-700 cursor-pointer">Integrations</li>
                <li className="hover:text-purple-700 cursor-pointer">Pricing</li>
                </ul>
            </div>

            <div>
                <h4 className="font-bold text-gray-900 mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                <li className="hover:text-purple-700 cursor-pointer">About Us</li>
                <li className="hover:text-purple-700 cursor-pointer">Careers</li>
                <li className="hover:text-purple-700 cursor-pointer">Contact</li>
                </ul>
            </div>

            <div>
                <h4 className="font-bold text-gray-900 mb-4">Follow Us</h4>
                <div className="flex gap-4">
                <Twitter className="w-5 h-5 text-gray-400 hover:text-purple-600 cursor-pointer" />
                <a href="https://github.com/Teo-T64">
                    <Github className="w-5 h-5 text-gray-400 hover:text-purple-600 cursor-pointer" />
                </a>
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-purple-600 cursor-pointer" />
                </div>
            </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-xs">
                © {new Date().getFullYear()} FinanceTrackingApp-Teo-Tunjic. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-gray-400">
                <span className="hover:underline cursor-pointer">Privacy Policy</span>
                <span className="hover:underline cursor-pointer">Terms of Service</span>
            </div>
            </div>
        </footer>
        </div>
    );
}

export default LandingPage;