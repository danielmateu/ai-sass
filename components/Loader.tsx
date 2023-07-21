import Image from 'next/image'
import React from 'react'

export const Loader = () => {
    return (
        <>
            <div className='h-full flex flex-col gap-y-4 items-center justify-center'>
                <div className="w-9 h-9 animate-spin">
                    <Image
                        alt="loading logo"
                        src="/loading.png"
                        fill
                        className='rounded-full'
                    />
                </div>
                <p className='text-sm text-muted-foreground'>
                    Nuko esta pensando...
                </p>
            </div>
        </>
    )
}
