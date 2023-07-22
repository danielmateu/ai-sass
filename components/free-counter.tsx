"use client"

import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { MAX_FREE_COUNTS } from "@/constants";

import { Progress } from "@/components/ui/progress"
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import { useProModal } from "@/hooks/use-pro-modal";



interface FreeCounterProps {
    apiLimitCount: number;
    isPro: boolean;
}

export const FreeCounter = ({
    apiLimitCount = 0,
    isPro = false
}: FreeCounterProps) => {

    const proModal = useProModal()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    if (isPro) return null

    return (
        <div className="px-3">
            <Card className="bg-white/10 border-0">
                <CardContent className="py-6">
                    <div className="text-center text-sm text-white mb-4 space-y-2 flex flex-col gap-3">
                        <p>
                            Usos gratuitos - {apiLimitCount} / {MAX_FREE_COUNTS}
                            <Progress value={(apiLimitCount / MAX_FREE_COUNTS) * 100} className="h-3" />
                        </p>
                        <Button
                            onClick={proModal.onOpen}
                            className="w-full opacity-80 hover:opacity-100 transition" variant='premium'>
                            Upgrade!
                            <Zap className="w-4 ml-2 fill-white" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
