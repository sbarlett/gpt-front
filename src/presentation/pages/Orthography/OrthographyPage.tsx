import React, { useState } from "react";
import {
  GtpMessage,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from "../../components";

interface Message {
  text: string;
  isGpt: boolean;
}

export const OrthographyPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePostMessage = async (message: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: message, isGpt: false }]);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GtpMessage text="Hola, soy un asistente de ortografía. ¿En qué puedo ayudarte?" />

          {messages.map((msg: Message, index: number) => {
            return msg.isGpt ? (
              <GtpMessage key={index} text="Esto es gpt" />
            ) : (
              <MyMessage key={index} text={msg.text} />
            );
          })}

          {isLoading && (
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader />
            </div>
          )}
        </div>
      </div>
      <TextMessageBox
        onSendMessage={handlePostMessage}
        placeholder="Escribe aquí lo que deseas"
        disabledCorrections
      />
    </div>
  );
};
