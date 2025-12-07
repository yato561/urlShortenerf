export default function Button({children, disabled, ...props}){
    return(
        <button
            className="w-full bg-primary hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-semibold py-2 rounded transition"
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}