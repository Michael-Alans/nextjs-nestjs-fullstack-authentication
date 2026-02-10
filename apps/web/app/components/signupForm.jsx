// app/(auth)/signup/page.jsx (Server Component)

'use client' // Hooking up state requires client-side interactivity

import { useActionState } from 'react';
import { handleSignup } from '../auth/signup/actions';


export default function SignupForm() {
  // state will contain the 'errors' and 'message' returned from handleSignup
  const [state, formAction] = useActionState(handleSignup, null);

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <form action={formAction} className="space-y-5">
        
        {/* Name Input */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
          <input 
            name="name"
            type="text" 
            placeholder="username"
            className={`w-full px-4 py-3 bg-slate-50/50 border rounded-xl outline-none transition-all ${
              state?.errors?.name ? 'border-red-400 ring-4 ring-red-500/10' : 'border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500'
            }`}
          />
          {state?.errors?.name && (
            <p className="text-xs text-red-500 font-medium ml-1">{state.errors.name[0]}</p>
          )}
        </div>

        {/* Email Input */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
          <input 
            name="email"
            type="email" 
            placeholder="mike@portfolio.com"
            className={`w-full px-4 py-3 bg-slate-50/50 border rounded-xl outline-none transition-all ${
              state?.errors?.email ? 'border-red-400 ring-4 ring-red-500/10' : 'border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500'
            }`}
          />
          {state?.errors?.email && (
            <p className="text-xs text-red-500 font-medium ml-1">{state.errors.email[0]}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
          <input 
            name="password"
            type="password" 
            placeholder="••••••••"
            className={`w-full px-4 py-3 bg-slate-50/50 border rounded-xl outline-none transition-all ${
              state?.errors?.password ? 'border-red-400 ring-4 ring-red-500/10' : 'border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500'
            }`}
          />
          {state?.errors?.password && (
            <p className="text-xs text-red-500 font-medium ml-1">{state.errors.password[0]}</p>
          )}
        </div>

        {/* Global Error Message */}
        {state?.message && !state.errors && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm font-medium text-center">
            {state.message}
          </div>
        )}

        {/* You can use a regular button or the SubmitButton below */}
<button 
type="submit"
className="w-full mt-4 py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
>
Create Admin Account
<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
</svg>
</button>
      </form>
    </div>
  );
}



