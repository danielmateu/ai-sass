"use client"

import { Zap } from "lucide-react"
import { Button } from "./ui/button"
import axios from "axios"
import { useState } from 'react';
import toast from 'react-hot-toast';

interface SubscriptionButtonProps {
    isPro: boolean
}

export const SubscriptionButton = ({
    isPro = false
}: SubscriptionButtonProps) => {

    const [loading, setLoading] = useState(false)

    const onClick = async () => {
        try {
            setLoading(true)
            const response = await axios.get("/api/stripe")
            window.location.href = response.data.url
        } catch (error) {
            console.log("BILLING_ERROR", error);
            toast.error('Algo ha salido mal')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Button disabled={loading} variant={isPro ? 'default' : 'premium'} onClick={onClick}>
            {isPro ? "Gestiona la suscripción" : "Suscribirse a Pro"}
            {!isPro && <Zap className="ml-2 w-4 h-4 fill-white" />}

        </Button>
    )
}
