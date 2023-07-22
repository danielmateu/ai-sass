"use client"

import { Crisp } from "crisp-sdk-web"
import { useEffect } from "react"

export const CrispChat = () => {

    useEffect(() => {
        Crisp.configure('3b0befec-62b2-4b2e-a044-40001ca71da5')
    }, [])

    return null

}
