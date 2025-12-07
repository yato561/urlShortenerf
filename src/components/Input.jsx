/* eslint-disable react/prop-types */
export default function Input({ label, type = "text", disabled, ...props }) {
    return (
        <div className="mb-4">
            {label && <label className="block mb-1 text-gray-300">{label}</label>}
            <input
                type={type}
                disabled={disabled}
                className="w-full px-4 py-2 rounded bg-darkCard border border-gray-700 focus:border-primary outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                {...props}
            />
        </div>
    );
}