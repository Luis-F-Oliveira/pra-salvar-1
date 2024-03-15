import { IData } from "@/@types/Data"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChangeEvent, FC, FormEvent, useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Link } from "react-router-dom"
import { SelectSingleEventHandler } from "react-day-picker"


interface FormProps {
    onSubmit: (formData: IData) => void
}

export const Form: FC<FormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState<IData>({

    })

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleCalendar: SelectSingleEventHandler = (day: Date | undefined) => {
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
        <form onSubmit={handleSubmit} className='space-y-2'>
            <div className='grid grid-cols-3 items-center gap-3'>
                <div className="col-span-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input
                        id='name'
                        name="name"
                        type="text"
                        className='border border-gray-500'
                    />
                </div>
                <div>
                    <Label htmlFor='gender'>Sexo</Label>
                    <Select name='gender'>
                        <SelectTrigger id='gender' className="border border-gray-500">
                            <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="M">Masculino</SelectItem>
                            <SelectItem value="F">Feminino</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className='grid grid-cols-3 gap-3'>
                <div>
                    <Label htmlFor="matriculation">Número Registro</Label>
                    <Input
                        id='matriculation'
                        name="matriculation"
                        type="number"
                        className='border border-gray-500'
                    />
                </div>
                <div>
                    <Label htmlFor="cpf">CPF</Label>
                    <Input
                        id="cpf"
                        name="cpf"
                        type="number"
                        className='border border-gray-500'
                    />
                </div>
                <div>
                    <Label htmlFor="rg">RG</Label>
                    <Input
                        id="rg"
                        name="rg"
                        type="number"
                        className='border border-gray-500'
                    />
                </div>
            </div>
            <div className='grid grid-cols-2 gap-3'>
                <div>
                    <Label htmlFor="mother_name">Nome da Mãe</Label>
                    <Input
                        id="mother_name"
                        name="mother_name"
                        type="text"
                        className='border border-gray-500'
                    />
                </div>
                <div>
                    <Label htmlFor="father_name">Nome do Pai</Label>
                    <Input
                        id="father_name"
                        name="father_name"
                        type="text"
                        className='border border-gray-500'
                    />
                </div>
            </div>
            <div className='grid grid-cols-3 gap-3'>
                <div>
                    <Label htmlFor="issue_rg">Emissor RG</Label>
                    <Input
                        id="issue_rg"
                        name="issue_rg"
                        type="text"
                        className='border border-gray-500'
                    />
                </div>
                <div>
                    <Label htmlFor="uf_rg">UF RG</Label>
                    <Input
                        id="uf_rg"
                        name="uf_rg"
                        type="text"
                        className='border border-gray-500'
                    />
                </div>
                <div>
                    <Label htmlFor="rg">Carteira Data Expedição</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal border border-gray-500",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>Escolha a data</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            <div className='grid grid-cols-2 gap-3'>
                <div>
                    <Label htmlFor="rg">Data Admissão</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal border border-gray-500",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>Escolha a data</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div>
                    <Label htmlFor="rg">Data Aniversário</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal border border-gray-500",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>Escolha a data</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            <div className='grid grid-cols-4 gap-3'>
                <div>
                    <Label htmlFor="nationality">Nacionalidade</Label>
                    <Input
                        id="nationality"
                        name="nationality"
                        type="text"
                        className='border border-gray-500'
                    />
                </div>
                <div>
                    <Label htmlFor="nationality">Nacionalidade UF</Label>
                    <Input
                        id='nationality'
                        name="nationality"
                        type="text"
                        className='border border-gray-500'
                    />
                </div>
                <div>
                    <Label htmlFor="birthplace">Naturalidade</Label>
                    <Input
                        id="birthplace"
                        name="birthplace"
                        type="text"
                        className='border border-gray-500'
                    />
                </div>
                <div>
                    <Label htmlFor="blood_type">Tipo Sanguíneo</Label>
                    <Select name='blood_type'>
                        <SelectTrigger id="blood_type" className="border border-gray-500">
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
                </div>
            </div>
            <div className='flex gap-3 items-center'>
                <div>
                    adicionar coleta de imagem
                </div>
                <div>
                    adicionar coleta de imagem
                </div>
            </div>
            <div className='text-end'>
                <Link className='mr-3' to={'/dashboard'}>Dashboard</Link>
                <Button>Salvar</Button>
            </div>
        </form>
    )
}