import React, { FormEvent, useState } from "react";

interface Props {
  placeholder?: string;
  onSendMessage?: (message: string) => void;
  disabledCorrections?: boolean;
  aceptedFileTypes?: string;
}

export const TextMessageBoxFile = ({
  placeholder,
  onSendMessage,
  disabledCorrections = false,
  aceptedFileTypes,
}: Props) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState<string>("");

  const [selectedFiles, setSelectedFiles] = useState<File | null | undefined>(
    null
  );

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
      <div className="mr-3 ">
        <button
          type="button"
          className="flex items-center justify-center text-gray-400 hover:text-gray-600"
          onClick={() => inputRef.current?.click()}
        >
          <i className="fa-solid fa-paperclip text-xl"></i>
        </button>
      </div>
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
        <button className="btn-primary" disabled={!selectedFiles}>
          {!selectedFiles ? (
            <span className="mr-2">Enviar</span>
          ) : (
            <span className="mr-2">
              {selectedFiles.name.substring(0, 10) + "..."}
            </span>
          )}
          <i className="fa-regular fa-paper-plane"></i>
        </button>
        <input
          type="file"
          ref={inputRef}
          accept={aceptedFileTypes}
          onChange={(e) => setSelectedFiles(e.target.files?.item(0))}
          hidden
        />
      </div>
    </form>
  );
};
