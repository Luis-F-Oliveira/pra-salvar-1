import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form } from "@/partials/forms"
import { FC } from "react"

export const FormPage: FC = () => {
    const handleSubmit = async () => {

    }

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
                    <Form onSubmit={handleSubmit} />
                </CardContent>
            </Card>
        </div>
    )
}
