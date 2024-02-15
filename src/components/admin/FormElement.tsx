import React from "react";

const FormElement = ({
  name,
  value,
  type,
  id,
  onChange,
}: {
  name: string;
  value: string;
  type: string;
  id: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}) => {
  return (
    <div className="flex flex-row  items-center gap-1 md:gap-5 flex-wrap justify-start">
      <label htmlFor={id} className="font-semibold text-base md:text-lg">
        {name} :
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        name={id}
        id={id}
        className="border-black px-2 py-1 max-md:w-full rounded-xl "
      />
    </div>
  );
};
export default FormElement;
