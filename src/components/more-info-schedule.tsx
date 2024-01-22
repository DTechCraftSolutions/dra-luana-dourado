export function MoreInfoSchedule() {
    return (
        <div className="w-full h-full flex flex-col items-center pt-5 text-primary">
            <ul>
                <li className="flex items-center gap-2">
                    <span>
                        Paciente:
                    </span>
                    <p>Deyvid</p>
                </li>
                <li className="flex items-center gap-2">
                    <span>
                        Procedimento:
                    </span>
                    <p>Manutenção</p>
                </li>
                <li className="flex items-center gap-2">
                    <span>
                        Tempo estimado:
                    </span>
                    <p>15 min</p>
                </li>
                <li className="flex items-center gap-2">
                    <span>
                        Data escolhida:
                    </span>
                    <p>25/01/2024</p>
                </li>
            </ul>
            <div className="flex items-center gap-2 mt-5">
                <button className="text-cancel border border-cancel rounded-full px-4 py-1">
                    Cancelar
                </button>
                <button className="bg-primary text-white px-2 py-1 rounded-full">
                    Editar
                </button>
            </div>
        </div>
    )
}