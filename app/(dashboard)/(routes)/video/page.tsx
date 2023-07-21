"use client"

// Next Hooks
import { useRouter } from "next/navigation"
// React Hooks
import { useState } from "react"
// OpenAI

// form imports
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { formSchema } from "./constants"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
// Conection to API
import axios from "axios"

// UI Components
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
// Icons
import { Music, VideoIcon } from "lucide-react"
import { Empty } from "@/components/Empty"
// Our Components
import { Heading } from "@/components/Heading"
import { Loader } from "@/components/Loader"


const VideoPage = () => {

    const router = useRouter()

    const [Video, setVideo] = useState<string>()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        }
    })

    const isLoading = form.formState.isSubmitting

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setVideo(undefined)

            const response = await axios.post("/api/Video", values)
            setVideo(response.data.audio)

            form.reset()

        } catch (error: any) {
            // TODO: Open Pro Modal
            console.log(error);
        } finally {
            router.refresh()
        }
    }

    return (
        <div>
            <Heading
                title="Generador de videos"
                description="Genera videos a partir de un prompt"
                icon={VideoIcon}
                iconColor="text-green-500"
                bgColor="bg-green-500/10"
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
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormLabel>Prompt</FormLabel>
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="Un ciclista en la montaña"
                                                {...field}
                                            />
                                        </FormControl>
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
                            <div className="">
                                <Loader />
                            </div>
                        </div>
                    )}
                    {
                        !Video && !isLoading && (
                            <Empty
                                label="Que esperas para generar videos?"
                            />
                        )
                    }
                    {Video && (
                        <audio controls className="w-full mt-8">
                            <source src={Video} type="audio/mpeg" />
                        </audio>
                    )}
                </div>
            </div>
        </div>
    )
}

export default VideoPage