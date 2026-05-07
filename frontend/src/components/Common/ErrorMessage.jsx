const ErrorMessage = ({ message, onRetry }) => {
    return (
        <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 mb-6 animate-slide-up">
            <div className="flex items-start">
                <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div className="ml-3 flex-1">
                    <h3 className="text-sm font-medium text-red-800">Erreur</h3>
                    <p className="text-sm text-red-700 mt-1">{message}</p>
                </div>
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="ml-auto bg-red-100 text-red-700 px-3 py-1 rounded-md text-sm hover:bg-red-200 transition-colors"
                    >
                        Réessayer
                    </button>
                )}
            </div>
        </div>
    );
};

export default ErrorMessage;