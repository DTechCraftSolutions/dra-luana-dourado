interface EvolutionProps{
    date: string
    treatment: string
    description: string
}

export function EvolutionComponent({
    date,
    treatment,
    description
}: EvolutionProps) {
    return (
        <div className="w-full bg-white shadow border-b-4 p-2 border-primary h-28 mb-4 rounded-lg">
            <p className="text-primary font-bold">{date}</p>
            <p className="text-primary font-semibold">{treatment}</p>
            <p className="text-primary">{description}</p>   
        </div>
    )
}