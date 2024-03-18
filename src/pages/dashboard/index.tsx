import AxiosContext from "@/context/axios"
import { useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { IData } from "./@types"
import { CirclePlus, Download } from "lucide-react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { SquareMousePointer } from "lucide-react"
import { Link } from "react-router-dom"

export const DashboardPage = () => {
    const { api } = useContext(AxiosContext)
    const [data, setData] = useState<IData | null>(null)
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const date: string | null = searchParams.get('date')

    useEffect(() => {
        api.get(`staffings/${date}`)
            .then((response) => {
                setData(response?.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [api])

    console.log(data)

    return (
        <div className='w-screen h-screen text-white pt-4 px-28'>
            <h1 className='text-2xl'>Dashboard</h1>
            <div className='flex justify-between items-center gap-3 mt-10'>
                <Link to={`/forms?date=${date}&id=${data?.id}`}>
                    <CirclePlus />
                </Link>
                <Download />
            </div>
            {data ? (
                <Table className='mt-5'>
                    <TableCaption>Lista para exportação</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12"></TableHead>
                            <TableHead>#</TableHead>
                            <TableHead>Número Registro</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Sexo</TableHead>
                            <TableHead>Data Admissão</TableHead>
                            <TableHead>CPF</TableHead>
                            <TableHead>Data Nascimento</TableHead>
                            <TableHead>RG</TableHead>
                            <TableHead>Emissor RG</TableHead>
                            <TableHead>UF RG</TableHead>
                            <TableHead>Nome Mãe</TableHead>
                            <TableHead>Nome Pai</TableHead>
                            <TableHead>Naturalidade</TableHead>
                            <TableHead>Nacionalidade</TableHead>
                            <TableHead>Nacionalidade UF</TableHead>
                            <TableHead>Tipo Sangue</TableHead>
                            <TableHead>Carteira Número</TableHead>
                            <TableHead>Carteira Data Expedição</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.information.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell className="relative">
                                    <Link to={`edit?show=${item.id}`}>
                                        <SquareMousePointer />
                                    </Link>
                                </TableCell>
                                <TableCell>{index+1}</TableCell>
                                <TableCell>{item.matriculation}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.gender}</TableCell>
                                <TableCell>{item.admission_date}</TableCell>
                                <TableCell>{item.cpf}</TableCell>
                                <TableCell>{item.birth_date}</TableCell>
                                <TableCell>{item.rg}</TableCell>
                                <TableCell>{item.issue_rg}</TableCell>
                                <TableCell>{item.uf_rg}</TableCell>
                                <TableCell>{item.mother_name}</TableCell>
                                <TableCell>{item.father_name}</TableCell>
                                <TableCell>{item.birthplace}</TableCell>
                                <TableCell>{item.nationality}</TableCell>
                                <TableCell>{item.nationality_uf}</TableCell>
                                <TableCell>{item.blood_type}</TableCell>
                                <TableCell>{item.identification_number}</TableCell>
                                <TableCell>{item.issue_date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : null}
        </div>
    )
}
