"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { Montserrat } from "next/font/google"

import { cn } from "@/lib/utils"
import { LayoutDashboard, MessagesSquare, Image as ImageIcon, Video, Music, Code, Settings } from 'lucide-react';
import { FreeCounter } from "./free-counter"


const montserrat = Montserrat({ weight: '600', subsets: ['latin'] })

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500",
    },
    {
        label: "Conversación",
        icon: MessagesSquare,
        href: "/conversation",
        color: "text-violet-500",
    },
    {
        label: "Generador de imágenes",
        icon: ImageIcon,
        href: "/image",
        color: "text-pink-700",
    },
    {
        label: "Generador de videos",
        icon: Video,
        href: "/video",
        color: "text-orange-700",
    },
    {
        label: "Generador de música",
        icon: Music,
        href: "/music",
        color: "text-emerald-500",
    },
    {
        label: "Generador de código",
        icon: Code,
        href: "/code",
        color: "text-green-700",
    },
    {
        label: "Configuración",
        icon: Settings,
        href: "/settings",
        color: "text-gray-300",
    },
]

interface SidebarProps {
    apiLimitCount: number;
    isPro: boolean;
}

export const Sidebar = ({
    apiLimitCount = 0,
    isPro = false
}: SidebarProps) => {

    const pathname = usePathname()

    return (

        <aside className="py-4 flex flex-col h-full bg-[#111827] text-white justify-between">
            <div className="px-3 py-2 flex-1">
                <Link href='/dashboard' className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        <Image src="/logo.png" fill alt="Logo" className="rounded-full" />
                    </div>
                    <h1 className={cn("text-2xl font-semibold", montserrat.className)}
                    >Nuko AI</h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn("text-sm group flex p-3 w-full justify-start rounded-md hover:bg-gray-700 transition-colors", pathname === route.href && "bg-gray-700 text-zinc-300")}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("w-6 h-6 mr-4", route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))
                    }
                </div>
            </div>
            <FreeCounter apiLimitCount={apiLimitCount} isPro={isPro} />
        </aside>

    )
}
