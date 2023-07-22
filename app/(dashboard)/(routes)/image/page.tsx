"use client"

// Next Hooks
import { useRouter } from "next/navigation"
// React Hooks
import { useState } from "react"
// OpenAI
// import { ChatCompletionRequestMessage } from "openai"

// form imports
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { amountOptions, formSchema, resolutionOptions } from "./constants"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Conection to API
import axios from "axios"

// UI Components
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
// Icons
import { Download, ImageIcon } from "lucide-react"
import { Empty } from "@/components/Empty"
// Our Components
import { Heading } from "@/components/Heading"
import { Loader } from "@/components/Loader"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Card, CardFooter } from "@/components/ui/card"
import { useProModal } from "@/hooks/use-pro-modal"

import toast from "react-hot-toast"
const ImagePage = () => {

    const router = useRouter()
    const proModal = useProModal()
    const [images, setImages] = useState<string[]>([])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution: "256x256",
        }
    })

    const isLoading = form.formState.isSubmitting

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setImages([])

            // console.log(values);
            const response = await axios.post("/api/image", values)

            const urls = response.data.map((image: { url: string }) => image.url)
            setImages(urls)
            form.reset()
        } catch (error: any) {
            // TODO: Open Pro Modal
            proModal.onOpen()
            toast.error('Error al generar la imagen')
        } finally {
            router.refresh()
        }
    }

    return (
        <div>
            <Heading
                title="Generador de Imágenes"
                description="Crea imágenes a partir de un texto."
                icon={ImageIcon}
                iconColor="text-red-500"
                bgColor="bg-pink-500/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                        >
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-6">
                                        <FormLabel>Prompt</FormLabel>
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="Un perro volador con traje de superman"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="amount"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-2">
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        defaultValue={field.value}
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    amountOptions.map((option) => (
                                                        <SelectItem
                                                            key={option.value}
                                                            value={option.value}
                                                        >
                                                            {option.label}
                                                        </SelectItem>
                                                    ))
                                                }

                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="resolution"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-2">
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        defaultValue={field.value}
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    resolutionOptions.map((option) => (
                                                        <SelectItem
                                                            key={option.value}
                                                            value={option.value}
                                                        >
                                                            {option.label}
                                                        </SelectItem>
                                                    ))
                                                }

                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                            <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                                Generar
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="flex items-center justify-center">
                            <div className="p-10">
                                <Loader />
                            </div>
                        </div>
                    )}
                    {
                        images.length === 0 && !isLoading && (
                            <Empty
                                label="Aqui podrás generear imágenes a partir de un texto."
                            />
                        )
                    }
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {
                            images.map((src) => (
                                <Card
                                    key={src} className="rounded-lg overflow-hidden">
                                    <div className="relative aspect-square">
                                        <Image
                                            alt="Generated Image"
                                            src={src}
                                            fill
                                        />
                                    </div>
                                    <CardFooter className="p-2">
                                        <Button
                                            variant='secondary'
                                            className="w-full"
                                            onClick={() => window.open(src, "_blank")}
                                        >
                                            <Download
                                                className="h-4 w-4 mr-2"
                                            />
                                            Descargar
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImagePage