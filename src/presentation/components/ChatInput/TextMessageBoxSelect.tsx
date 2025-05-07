import React, { FormEvent, useState } from "react";

interface Option {
  id: string;
  text: string;
}

interface Props {
  onSendMessage: (message: string, selectedOption: string) => void;
  placeholder?: string;
  disabledCorrections?: boolean;
  options: Option[];
}

export const TextMessageBoxSelect = ({
  placeholder,
  onSendMessage,
  disabledCorrections = false,
  options,
}: Props) => {
  const [message, setMessage] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim().length === 0) return;
    onSendMessage(message, selectedOption);
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
    >
      <div className="flex-grow">
        <div className="flex">
          <input
            type="text"
            autoFocus
            name="message"
            className="flex w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10"
            placeholder={placeholder}
            autoComplete={disabledCorrections ? "on" : "off"}
            autoCorrect={disabledCorrections ? "on" : "off"}
            spellCheck={disabledCorrections ? "true" : "false"}
            onChange={(e) => setMessage(e.target.value)}
          />

          <select
            name="slect"
            className="w-2/5 ml-5 border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="ml-4">
        <button className="btn-primary">
          <span className="mr-2">Enviar</span>
          <i className="fa-regular fa-paper-plane"></i>
        </button>
      </div>
    </form>
  );
};
