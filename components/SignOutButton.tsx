import { signOut } from 'next-auth/react';

export default function SignInButton() {
    return (
        <button
        onClick={() => signOut()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-10 w-32 py-2 px-4 rounded"
        >Sign Out</button>
    )
}