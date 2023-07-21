import { Heading } from "@/components/Heading"
import { checkSubscription } from "@/lib/subscription"
import { Settings } from "lucide-react"


const SettingsPage = async () => {

    const isPro = await checkSubscription()
    return (
        <div>
            <Heading
                title="Configuración"
                description="Administra tu cuenta"
                icon={Settings}
                iconColor="text-gray-700"
                bgColor="bg-gray-700/10"
            />
            <div className="px-4 lg:px-8 space-y-4">
                <div className="text-muted-foreground text-sm">
                    {isPro ? 'Tienes una suscripción activa' : 'No tienes una suscripción activa'}
                </div>
            </div>
        </div>
    )
}

export default SettingsPage
