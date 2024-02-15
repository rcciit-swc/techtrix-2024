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
<<<<<<< HEAD
      <select
        name={id}
        id={id}
        className="py-2 px-2"
        onChange={onChange}
      >
=======
      <select name={id} id={id} className="py-2 px-2" onChange={onChange}>
        <option id={id} value=""></option>
>>>>>>> 7044bc36bbea51d460c750b30bfc96c79395e96f
        {options.map((option: any, index: number) => {
          return (
            <option key={index} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectInput;
