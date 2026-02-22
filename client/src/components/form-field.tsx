import React from "react";

const FormField = ({ as, type, onChange, label, id }) => {
    return (
        <div className="flex flex-col gap-2 px-5 w-full">
            {label && (
                <label className="text-neutral-400! font-medium">{label}</label>
            )}
            {as == "input" ? (
                <input className="bg-neutral-700 text-lg rounded-lg px-4 py-2" />
            ) : as == "textarea" ? (
                <textarea className="bg-neutral-700 text-lg rounded-lg px-4 py-2" />
            ) : (
                ""
            )}
        </div>
    );
};

export default FormField;
