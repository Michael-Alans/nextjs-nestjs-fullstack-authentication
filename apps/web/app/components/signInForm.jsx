"use client"

import React, { useActionState } from 'react'; // New Hook
import { handleSignin } from '../auth/signup/actions';

const SigninForm = () => {
  // state: the object returned from your action (errors, message)
  // formAction: the function to pass to the form 'action' prop
  // isPending: true while the server action is running
  const [state, formAction, isPending] = useActionState(handleSignin, null);

  return (
    <form action={formAction} className="space-y-5">
      {/* Show Global Error Message */}
      {state?.message && (
        <p className="text-red-500 text-sm bg-red-50 p-2 rounded">{state.message}</p>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="block w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900"
          placeholder="you@example.com"
        />
        {/* Show Validation Errors */}
        {state?.errors?.email && (
          <p className="text-red-500 text-xs mt-1">{state.errors.email[0]}</p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
        <label htmlFor="password" className="text-sm font-medium text-slate-700">Password</label>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          className="block w-full px-4 py-3 rounded-lg border border-slate-300"
        />
        {state?.errors?.password && (
          <p className="text-red-500 text-xs mt-1">{state.errors.password[0]}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex justify-center py-3 px-4 rounded-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300"
      >
        {isPending ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
};

export default SigninForm;