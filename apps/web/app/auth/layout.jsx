// app/(auth)/layout.jsx



export default function AuthLayout({ children }) { 
  return (
    <section className="min-h-screen relative flex items-center justify-center bg-slate-50 px-4 py-12 overflow-hidden">
      
      {/* 1. Modern Background Decorations */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="relative w-full max-w-md">
        {/* 2. Floating Card Design */}
        <div className="bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20 rounded-3xl p-8 sm:p-10 transition-all">
          
          {/* 3. Header Section */}
          <div className="text-center mb-10">
            {/* Minimalist Logo Icon */}
            <div className="mx-auto w-12 h-12 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="white 12h18m-9-9l9 9-9 9" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Admin Portal
            </h2>
            <p className="mt-2 text-sm font-medium text-slate-500">
              Please authenticate to manage your portfolio
            </p>
          </div>
  
          {/* 4. Page Content (Signup or Signin) */}
          <div className="mt-2">
            {children}
          </div>
          
          {/* 5. Modern Footer Link */}
          <div className="text-center mt-8 pt-6 border-t border-slate-100">
            <a 
              href="/" 
              className="group inline-flex items-center text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
            >
              <span className="mr-2 transition-transform group-hover:-translate-x-1">←</span>
              Back to main site
            </a>
          </div>
        </div>

        {/* Subtle Copyright */}
        <p className="text-center mt-8 text-xs text-slate-400 font-medium tracking-wide">
          &copy; 2025 PORTFOLIO ADMIN SERVICE
        </p>
      </div>
    </section>
  );
}