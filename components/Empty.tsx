import { SmilePlus } from 'lucide-react';

import Image from "next/image"

interface EmptyProps {
    label: string
}

export const Empty = ({ label }: EmptyProps) => {
    return (
        <div className="h-full p-2 flex flex-col items-center justify-center">
            <SmilePlus className="w-16 h-16 text-blue-500 bg-blue-500/10 p-4 rounded-full hover:scale-125 transition-all" />
            <p className="text-gray-500 text-center">
                {label}
            </p>
            {/* <div className="relative h-96 w-96 mb-4">
                <Image
                    src="/nothing.png"
                    alt="Empty"
                    fill
                />
            </div> */}
            {/* {label} */}
        </div>
    )
}
