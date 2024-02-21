

interface ProcedureCardProps {
    procedure: string
    time: string
    professional: string
    color: string
    price: number
}
export function ProcedureCard({procedure, time, professional, color, price}: ProcedureCardProps) {
    return (
        <div className="w-72 h-36 shadow-md rounded-3xl p-4 bg-white ">
            <div className="flex items-center mb-5 justify-between">
                <h2 className="font-bold text-primary">
                    {procedure}
                </h2>
                <div style={{backgroundColor: color}} className={`w-20 h-5 rounded-t-lg rounded-tl-none`} />
            </div>
            <p>
                <span className="font-semibold mr-1">
                    Profissional:
                </span>
                {professional}
            </p>
            <p>
                <span className="font-semibold mr-1">
                    Tempo estimado:
                </span>
                {time} min
            </p>
            <p>
                <span className="font-semibold mr-1">
                    Preço
                </span>
                R${String(price.toFixed(2)).replace('.', ',')}
            </p>
        </div>
    )
}