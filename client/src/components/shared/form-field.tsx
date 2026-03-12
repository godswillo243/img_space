import type { ChangeEventHandler } from "react";

const FormField = ({
  as,
  type,
  onChange,
  label,
  id,
  value,
}: {
  as?: string;
  type?: string;
  label?: string;
  id?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-neutral-400! font-medium">{label}</label>
      )}
      {as == "textarea" ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          className="bg-neutral-700/60 rounded-lg px-4 py-2"
        />
      ) : (
        <input
          id={id}
          type={type}
          className="bg-neutral-700/60  rounded-md px-4 py-1.5"
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default FormField;
