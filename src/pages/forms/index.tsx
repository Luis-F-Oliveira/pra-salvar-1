import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Forms } from "@/pages/forms/partials/forms"

export const FormPage = () => {
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <Card>
                <CardHeader>
                    <CardTitle>Exportar Informações</CardTitle>
                    <CardDescription>
                        Exportar informações descrita no formulário no
                        modelo de arquivo escolhido.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Forms />
                </CardContent>
            </Card>
        </div>
    )
}
