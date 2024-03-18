export interface Information {
    id: number;
    matriculation: string;
    name: string;
    gender: string;
    admission_date: string;
    cpf: string;
    birth_date: string;
    rg: string;
    issue_rg: string;
    uf_rg: string;
    mother_name: string | null;
    father_name: string | null;
    birthplace: string;
    nationality: string;
    nationality_uf: string;
    blood_type: string;
    identification_number: string;
    issue_date: string;
}

export interface IData {
    id: number;
    date: string;
    created_at: string;
    updated_at: string;
    information: Information[];
}