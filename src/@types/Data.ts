export interface IData {
    matriculation: number
    name: string
    gender: 'M' | 'F' | undefined
    admission_date: string
    cpf: number
    birth_date: string
    rg: number
    issue_rg: string
    uf_rg: string
    mother_name: string
    father_name?: string
    birthplace: string
    nationality: string
    nationality_uf: string
    blood_type: 'A+' | 'AB+' | 'B+' | 'O+' | 'A-' | 'AB-' | 'B-' | 'O-' | undefined
    identification_number: 0 // deixar internamente
    issue_date: string
}