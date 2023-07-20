import Image from 'next/image'
import React from 'react'

export const Loader = () => {
    return (
        <>
            <div className='h-full flex flex-col gap-y-4 items-center justify-center'>
                <div className="w-32 h-32 animate-spin">
                    <Image
                        alt="Logo"
                        src="/logo.png"
                        fill
                        className='rounded-full'
                    />
                </div>
            </div>
            <p className='text-sm text-muted-foreground'>
                Nuko esta pensando...
            </p>
        </>
    )
}
