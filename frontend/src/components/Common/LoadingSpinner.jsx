const LoadingSpinner = () => {
    return (
        <div className="flex flex-col justify-center items-center p-12 animate-fade-in">
            <div className="animate-spin-slow rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
            <p className="mt-4 text-gray-600 font-medium">Chargement en cours...</p>
        </div>
    );
};

export default LoadingSpinner;