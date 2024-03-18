import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FC, FormEvent, useContext, useState } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { SelectSingleEventHandler } from "react-day-picker"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import AxiosContext from "@/context/axios"
import { useProject } from "@/context/project"
import { ptBR } from 'date-fns/locale'

interface FormProps {
    onSubmit: (formData: FormData) => void
}

interface FormData {
    data?: Date
    day?: string
}

const Form: FC<FormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState<FormData>({})

    const handleChange: SelectSingleEventHandler = (day: Date | undefined) => {
        if (day) {
            const formattedDate = `${day.getDate().toString().padStart(2, "0")}-${(day.getMonth() + 1).toString().padStart(2, "0")}-${day.getFullYear()}`
            setFormData({ ...formData, data: day, day: formattedDate })
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmit(formData)
    }

    return (
        <form onSubmit={handleSubmit} className='grid grid-cols-3 gap-1'>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal border border-gray-500 col-span-2",
                            !formData?.data && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData?.data ? format(new Date(formData?.data), "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : <span>Escolha a data</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={formData?.data}
                        onSelect={handleChange}
                        initialFocus
                        locale={ptBR}
                    />
                </PopoverContent>
            </Popover>
            <Button type='submit'>Enviar</Button>
        </form>
    )
}

export const Home: FC = () => {
    const { startProject } = useProject()
    const navigate = useNavigate()
    const { toast } = useToast()
    const { api } = useContext(AxiosContext)

    const handleCreate = (formData: FormData) => {
        if (formData.data) {
            api.post('staffings', { date: formData.day })
                .then((response) => {
                    if (response.status === 201) {
                        startProject({ 'id': response.data.id, 'date': response.data.date })
                        toast({
                            title: "Criando conteúdo",
                            description: `Conteúdo criado com a data: ${formData.day}`,
                        })
                        navigate(`/forms?date=${formData.day}&id=${response.data.id}`)
                    }
                })
                .catch((error) => {
                    toast({
                        title: "Erro ao criar conteúdo",
                        description: `${error}`,
                    })
                })
        }
    }

    const handleOpen = (formData: FormData) => {
        if (formData.data) {
            toast({
                title: "Abrindo conteúdo",
                description: `Carregando data: ${formData.day}`,
            })
            navigate(`/dashboard?date=${formData.day}`)
        }
    }

    return (
        <div className='w-screen h-screen flex flex-col justify-center items-center'>
            <Card className='w-1/4'>
                <CardHeader>
                    <CardTitle>Exportador XML e XLSX</CardTitle>
                </CardHeader>
                <CardContent className='grid grid-rows-2 gap-3'>
                    <div className='space-y-3'>
                        <h1 className='text-lg'>Criar novo projeto</h1>
                        <Form onSubmit={handleCreate} />
                    </div>
                    <div className='space-y-3'>
                        <h1 className='text-lg'>Abrir um projeto</h1>
                        <Form onSubmit={handleOpen} />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
