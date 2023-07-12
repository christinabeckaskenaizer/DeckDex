import { signIn } from 'next-auth/react';

export default function SignInButton() {
    return (
        <button
        onClick={() => signIn('google')}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-10 w-24 py-2 px-4 rounded"
        >Sign In</button>
    )
}