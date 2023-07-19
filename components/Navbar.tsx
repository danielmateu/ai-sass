
import { Menu } from 'lucide-react'
import { Button } from './ui/button'
import { UserButton } from '@clerk/nextjs'

export const Navbar = () => {
    return (
        <div className='flex item-center p-4'>
            <Button variant={'ghost'} size={'icon'} className='md:hidden'>
                <Menu size={24} />
            </Button>
            <div className="flex w-full justify-end">
                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    )
}
