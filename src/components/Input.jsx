/* eslint-disable react/prop-types */
export default function Input({ label, type = "text", disabled, ...props }) {
    return (
        <div className="mb-4">
            {label && <label className="block mb-1 text-gray-300 font-medium">{label}</label>}
            <input
                type={type}
                disabled={disabled}
                className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-primary focus:bg-gray-600 outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
                {...props}
            />
        </div>
    );
}