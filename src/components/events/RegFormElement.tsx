import React from 'react'

const RegFormElement = ({
    name,
    value,
    type,
    id,
    onChange,
    width,
    disabled
  }: {
    name: string;
    value: string;
    type: string;
    id: string;
    width?: string;
    disabled?: boolean;
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void;
  }) => {
  return (
    <div className="flex flex-col w-full px-3  items-start gap-1 md:gap-5 flex-wrap justify-start">
    <label htmlFor={id} className="font-semibold text-xs md:text-sm">
      {name} :
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      name={id}
      disabled={disabled}
      id={id}
      className={`w-[${width}] border-b border-black px-2 py-1 font-semibold max-md:w-full focus:border-b bg-transparent `}
    />
  </div>
  )
}

export default RegFormElement