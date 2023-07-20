"use client"

import { ArrowRight, Code, ImageIcon, MessagesSquare, Video } from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

const tools = [
    {
        label: "Conversación",
        icon: MessagesSquare,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
        href: "/conversation"
    },
    {
        label: "Generador de imágenes",
        icon: ImageIcon,
        color: "text-pink-700",
        bgColor: "bg-pink-700/10",
        href: "/image",
    },
    {
        label: "Generador de videos",
        icon: Video,
        color: "text-orange-700",
        bgColor: "bg-orange-700/10",
        href: "/video",
    },
    {
        label: "Generador de música",
        icon: MessagesSquare,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
        href: "/music"
    },
    {
        label: "Generador de código",
        icon: Code,
        color: "text-green-700",
        bgColor: "bg-green-700/10",
        href: "/code",
    }
]

export default function DashboardPage() {

    const router = useRouter()
    return (
        <div className="flex flex-col justify-between px-2">
            <div className="mb-8 space-y-4">
                <h2 className="text-2xl md:text-4xl font-semibold text-center ">
                    Eplora el poder de la IA
                </h2>
                <p className="text-muted-foreground font-light text-sm md:text-lg text-center">Chatea con la IA más potente - Compruébalo tu mismo</p>
            </div>
            <div className="px-4 lg:px-32 space-y-4">
                {
                    tools.map((tool) => (
                        <Card
                            onClick={() => router.push(tool.href)}
                            key={tool.href}
                            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
                        >
                            <div className="flex items-center gap-x-4">
                                <div className={cn("p-2 w-filt rounded-md", tool.bgColor)}>
                                    <tool.icon className={cn("w-6 h-6", tool.color)} />
                                </div>
                                <div className="text-semibold">
                                    <CardTitle>{tool.label}</CardTitle>
                                </div>
                            </div>
                            <ArrowRight className="w-6 h-6 text-black/50" />
                        </Card>
                    ))

                }
            </div>
        </div>
    )
}
