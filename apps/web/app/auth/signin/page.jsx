import React from 'react';
import SigninForm from '../../components/signInForm';

const Signpage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-6 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
         <SigninForm />
        </div>
      </div>
    </div>
  );
};

export default Signpage;