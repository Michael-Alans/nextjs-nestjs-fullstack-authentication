// app/auth/signup/page.tsx
import Link from 'next/link';
import SignupForm from '../../components/signupForm';

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-xl rounded-2xl">
        
        <SignupForm />
        
        {/* Navigation Link */}
        <div className="pt-4 text-center border-t border-gray-100">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link 
              href="/auth/signin" 
              className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}