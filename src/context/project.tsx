import { ReactNode, createContext, useState, useContext } from 'react'

interface IProject {
    id: number
    date: Date
}

interface ProjectContextProps {
    project: IProject | null
    startProject: (projectData: IProject) => void
}

const ProjectContext = createContext({} as ProjectContextProps)

export function useProject()
{
    const context = useContext(ProjectContext)
    if (!context) {
        throw new Error('useProject deve ser usado dentro de um ProjectProvider')
    }
    return context
}

interface ProjectProviderProps {
    children: ReactNode
}

export function ProjectProvider({ children }: ProjectProviderProps)
{
    const [ project, setProject ] = useState<IProject | null>(() => {
        const savedProject = sessionStorage.getItem('project')
        return savedProject ? JSON.parse(savedProject) : null
    })

    function startProject(projectData: IProject)
    {
        setProject(projectData)
        sessionStorage.setItem('project', JSON.stringify(projectData))
    }

    return (
        <ProjectContext.Provider value={{ project, startProject }}>
            { children }
        </ProjectContext.Provider>
    )
}