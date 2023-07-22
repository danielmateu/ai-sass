"use client"

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

const testimonials = [
    {
        name: 'John Doe',
        avatar: 'JD',
        title: 'Desarrollador web',
        description: 'La mejor herramienta que he usado para generar contenido, me ha ayudado a ahorrar mucho tiempo y dinero.'
    },
    {
        name: 'Daniel Mateu',
        avatar: 'DM',
        title: 'Desarrollador full stack',
        description: 'Me ha ayudado a generar contenido para mis clientes, es una herramienta muy útil y fácil de usar.'
    },
    {
        name: 'Silvia Cazorla',
        avatar: 'SC',
        title: 'Abogado',
        description: 'Muy fácil de usar y muy útil para resolver casos, me ha ayudado a ahorrar mucho tiempo y dinero.'
    },
    {
        name: 'Nuk Mateu Cazorla',
        avatar: 'NMC',
        title: 'CEO',
        description: 'Bup bup bup... BUP BUP!!!'
    }
]

export const LandingContent = () => {
    return (
        <div className="px-10 pb-20">
            <h2 className="text-center text-4xl text-white font-extrabold mb-10">Nuestr@s usuari@s</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {testimonials.map((testimonial) => (

                    <Card key={testimonial.description} className="bg-[#192339] border-none text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-x-2">
                                <div>
                                    <p className="text-lg">{testimonial.name}</p>
                                    <p className="text-zinc-400 text-sm">{testimonial.title}</p>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm p-0">{testimonial.description}</p>
                        </CardContent>
                    </Card>
                ))}

            </div>
        </div>
    )
}
