"use client"

import { useAuth } from "@clerk/nextjs"
import Link from "next/link"
import TypewriterComponent from "typewriter-effect"
import { Button } from "./ui/button"

export const LandingHero = () => {
    const { isSignedIn } = useAuth()
    return (
        <div className="text-white text-center py-36 font-semibold space-y-5">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                <h1 className="font-bold">Desarrollando herramientas con IA</h1>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    <TypewriterComponent
                        options={{
                            strings: [
                                "Generación de texto",
                                "Generación de imágenes",
                                "Generación de música",
                                "Generación de videos",
                                "Generación de código"
                            ],
                            autoStart: true,
                            loop: true,
                        }}
                    />

                </div>
            </div>
            <div className="text-sm md:text-xl font-light text-inc-400">
                Crea contenido usando inteligencia artificial
            </div>
            <div>
                <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
                    <Button variant='premium' className="md:text-lg p-4 md:p-6 rounded-full font-semibold opacity-75 hover:opacity-100 transition">
                        Empieza a generar gratis!
                    </Button>
                </Link>
            </div>
            <div className="text-zinc-400 text-xs md:text-sm">
                No se requiere tarjeta de crédito
            </div>
        </div>
    )
}
