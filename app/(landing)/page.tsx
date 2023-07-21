import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const LandingPage = () => {
    return (
        <div className='flex flex-col justify-center items-center h-full gap-4'>
            <h1 className='text-4xl font-bold'>Bienvenido a la Landing Page</h1>
            <div className='flex justify-center items-center gap-4'>
                <Link href="/sign-in">
                    <Button>Sign In</Button>
                </Link>
                <Link href="/sign-up">
                    <Button>Sign up</Button>
                </Link>
            </div>
        </div>
    )
}

export default LandingPage