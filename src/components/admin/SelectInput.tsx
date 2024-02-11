import React from "react";

const SelectInput = ({
  options,
  onChange,
  id,
  name,
  value,
}: {
  options: any;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <div className="flex flex-row flex-wrap items-center gap-2 w-full">
      <label htmlFor="event" className="font-semibold text-md md:text-xl ">
        {name} :
      </label>

      <select
        name={id}
        id={id}
        className="py-2 px-2"
        onSelect={onChange}
        
      >
        {options.map((option: any, index: number) => {
          return (
            <option key={index} id={id} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectInput;
