import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import loading from './loading.svg'
import { useContext, useEffect, useState } from "react"
import { IData } from "@/@types/Data"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ptBR } from 'date-fns/locale'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import AxiosContext from "@/context/axios"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
    name: z.string().min(1),
    gender: z.string()
        .refine(value => value.trim() !== '', {
            path: ["gender"]
        }),
    matriculation: z.string().min(1),
    cpf: z.string().min(1),
    rg: z.string().min(1),
    mother_name: z.string().nullable(),
    father_name: z.string().nullable(),
    identification_number: z.string(),
    staffing_id: z.string(),
    issue_rg: z.string().min(1),
    uf_rg: z.string().min(1),
    issue_date: z.date({
        required_error: "",
    }),
    admission_date: z.date({
        required_error: "",
    }),
    birth_date: z.date({
        required_error: "",
    }),
    nationality: z.string().min(1),
    nationality_uf: z.string().min(1),
    birthplace: z.string().min(1),
    blood_type: z.string()
        .refine(value => value.trim() !== '', {
            path: ["blood_type"]
        }),
})

export const EditPage = () => {
    const [data, setData] = useState<IData | undefined>(undefined)
    const { api } = useContext(AxiosContext)
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const id = searchParams.get('show')
    const date = searchParams.get('date')

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get(`informations/${id}`)
            setData(response.data)
        }

        if (!data && id) {
            fetchData()
        }
    }, [api, id, data])

    const [form, setForm] = useState<any>(null)

    useEffect(() => {
        console.log("useEffect triggered")
        if (data && !form) {
            const initializedForm = useForm<z.infer<typeof formSchema>>({
                resolver: zodResolver(formSchema),
                defaultValues: {
                    name: data.name || '',
                    gender: data.gender || '',
                    matriculation: data.matriculation || '',
                    cpf: data.cpf || '',
                    rg: data.rg || '',
                    mother_name: data.mother_name || '',
                    father_name: data.father_name || '',
                    issue_rg: data.issue_rg || '',
                    uf_rg: data.uf_rg || '',
                    issue_date: data.issue_date ? new Date(data.issue_date) : undefined,
                    admission_date: data.admission_date ? new Date(data.admission_date) : undefined,
                    birth_date: data.birth_date ? new Date(data.birth_date) : undefined,
                    nationality: data.nationality || '',
                    nationality_uf: data.nationality_uf || '',
                    birthplace: data.birthplace || '',
                    blood_type: data.blood_type || '',
                    identification_number: "0",
                }
            })
            setForm(initializedForm)
        }
    }, [data, form])

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            {data && !form ? (
                <Card>
                    <CardHeader>
                        <CardTitle>Atualizar Informações</CardTitle>
                        <CardDescription>
                            Atualizar informações descrita no formulário no
                            modelo de arquivo escolhido.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                                <div className='grid grid-cols-3 items-center gap-3'>
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem className='col-span-2'>
                                                <FormLabel>Nome</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="gender"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Gênero</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="M">Masculino</SelectItem>
                                                        <SelectItem value="F">Feminino</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='grid grid-cols-3 gap-3'>
                                    <FormField
                                        control={form.control}
                                        name="matriculation"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Número Registro</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="cpf"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>CPF</FormLabel>
                                                <FormControl>
                                                    <Input maxLength={11} {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="rg"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>RG</FormLabel>
                                                <FormControl>
                                                    <Input maxLength={11} {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='grid grid-cols-2 gap-3'>
                                    <FormField
                                        control={form.control}
                                        name="mother_name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nome da Mãe</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="father_name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nome do Pai</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='grid grid-cols-3 gap-3'>
                                    <FormField
                                        control={form.control}
                                        name="issue_rg"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Emissor RG</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="uf_rg"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>UF RG</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="issue_date"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Carteira Data Expedição</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full justify-start text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                            {field.value ? format(new Date(field.value), "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : <span>Escolha a data</span>}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            disabled={(date) =>
                                                                date > new Date() || date < new Date("1800-01-01")
                                                            }
                                                            initialFocus
                                                            locale={ptBR}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='grid grid-cols-2 gap-3'>
                                    <FormField
                                        control={form.control}
                                        name="admission_date"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Data Admissão</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full justify-start text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                            {field.value ? format(new Date(field.value), "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : <span>Escolha a data</span>}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            disabled={(date) =>
                                                                date > new Date() || date < new Date("1900-01-01")
                                                            }
                                                            initialFocus
                                                            locale={ptBR}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="birth_date"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Data Aniversário</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full justify-start text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                            {field.value ? format(new Date(field.value), "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : <span>Escolha a data</span>}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            disabled={(date) =>
                                                                date > new Date() || date < new Date("1900-01-01")
                                                            }
                                                            initialFocus
                                                            locale={ptBR}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='grid grid-cols-4 gap-3'>
                                    <FormField
                                        control={form.control}
                                        name="nationality"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nacionalidade</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="nationality_uf"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nacionalidade UF</FormLabel>
                                                <FormControl>
                                                    <Input maxLength={2} {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="birthplace"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Naturalidade</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name="blood_type"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Tipo Sanguíneo</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Selecione" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="A+">A+</SelectItem>
                                                            <SelectItem value="AB+">AB+</SelectItem>
                                                            <SelectItem value="B+">B+</SelectItem>
                                                            <SelectItem value="O+">O+</SelectItem>
                                                            <SelectItem value="A-">A-</SelectItem>
                                                            <SelectItem value="AB-">AB-</SelectItem>
                                                            <SelectItem value="B-">B-</SelectItem>
                                                            <SelectItem value="O-">O-</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <Button type="submit">Atualizar</Button>
                                    <Link to={`/dashboard?date=${date}`}>
                                        <Button variant={'destructive'}>
                                            Cancelar
                                        </Button>
                                    </Link>
                                </div>
                            </form>
                        </Form >
                    </CardContent>
                </Card>
            ) : (
                <div className='w-screen h-screen flex justify-center items-center'>
                    <img className='w-12' src={loading} alt="loading" />
                </div>
            )}
        </div>
    )
}