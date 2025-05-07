import React, { FormEvent, useState } from "react";

interface Props {
  placeholder?: string;
  onSendMessage?: (message: string) => void;
  disabledCorrections?: boolean;
}

export const TextMessageBox = ({
  placeholder,
  onSendMessage,
  disabledCorrections = false,
}: Props) => {
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim().length === 0) return;
    onSendMessage?.(message);
    setMessage("");
  };
  
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
    >
      <div className="flex-grow">
        <div className="relative w-full">
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
