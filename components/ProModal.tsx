"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { Badge } from "@/components/ui/badge"
import { useProModal } from "@/hooks/use-pro-modal"
import { Check, Code, ImageIcon, MessagesSquare, Music, Video, Zap } from "lucide-react"
import { Card } from "./ui/card"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"


const tools = [
    {
        label: "Conversación",
        icon: MessagesSquare,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
    },
    {
        label: "Generador de imágenes",
        icon: ImageIcon,
        color: "text-pink-700",
        bgColor: "bg-pink-700/10",
    },
    {
        label: "Generador de videos",
        icon: Video,
        color: "text-orange-700",
        bgColor: "bg-orange-700/10",
    },
    {
        label: "Generador de música",
        icon: Music,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
    },
    {
        label: "Generador de código",
        icon: Code,
        color: "text-green-700",
        bgColor: "bg-green-700/10",
    }
]

export const ProModal = () => {

    const proModal = useProModal()

    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                        <div className="flex items-center gap-x-2 py-1 font-semibold">
                            Sube de nivel!
                            <Badge className="uppercase text-sm py-1" variant='premium'>
                                Pro
                            </Badge>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                        {
                            tools.map((tool) => (
                                <Card
                                    key={tool.label}
                                    className="p-3 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
                                >
                                    <div className="flex items-center gap-x-4">
                                        <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                            <tool.icon className={cn(tool.color)} size={24} />
                                        </div>
                                        <div className="font-semibold">
                                            {tool.label}
                                        </div>
                                    </div>
                                    <Check className="text-primary w-5 h-5" />
                                </Card>
                            ))
                        }
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        size='lg'
                        variant='premium'
                        className="w-full"
                    >
                        Sube de nivel!
                        <Zap className="w-4 h-4 ml-2 fill-white" size={16} />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
