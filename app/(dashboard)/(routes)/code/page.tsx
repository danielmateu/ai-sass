"use client"

// Next Hooks
import { useRouter } from "next/navigation"
// React Hooks
import { useState } from "react"
// OpenAI
import { ChatCompletionRequestMessage } from "openai"

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
import { Code } from "lucide-react"
import { Empty } from "@/components/Empty"
// Our Components
import { Heading } from "@/components/Heading"
import { Loader } from "@/components/Loader"
import { cn } from "@/lib/utils"
import { UserAvatar } from "@/components/user-avatar"
import { BotAvatar } from "@/components/bot-avatar"

const CodePage = () => {

    const router = useRouter()
    const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        }
    })

    const isLoading = form.formState.isSubmitting

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage: ChatCompletionRequestMessage = {
                role: "user",
                content: values.prompt,
            }
            const newMessages = [...messages, userMessage]

            const response = await axios.post("/api/code", {
                messages: newMessages,
            })
            setMessages((current) => [...current, userMessage, response.data])

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
                title="Generación de Código"
                description="El generador de código más potente"
                icon={Code}
                iconColor="text-green-700"
                bgColor="bg-green-700/10"
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
                                                placeholder="Cómo crear un bot en Python"
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
                        messages.length === 0 && !isLoading && (
                            <Empty
                                label="Empieza a escribir para generar una respuesta"
                            />
                        )
                    }
                    <div className="flex flex-col col-reverse gap-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.content}
                                className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg", message.role === 'user' ? 'bg-white border border-black/10' : 'bg-muted')}
                            >
                                {message.role === 'user' ? <UserAvatar /> : <BotAvatar />}
                                <p className="text-sm">
                                    {message.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CodePage