export function LoadingIndicator() {
    return (
        <div className="flex justify-center w-full h-full gap-2 items-center">
            <div className="animate-spin rounded-full h-3 w-3 border-2 border-l-white border-primary"/>
            <p className="text-primary">
                Carregando
            </p>
        </div>
    );
}