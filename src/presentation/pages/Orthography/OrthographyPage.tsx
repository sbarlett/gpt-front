import { useState } from "react";
import {
  GtpMessage,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from "../../components";
import { GtpMessageOrthography } from "../../components/ChatBubbles/GtpMessageOrthography";
import { orthographyUseCases } from "../../core/use-cases/orthograpy.use-cases";

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    userScore: number;
    errors: string[];
    message: string;
  };
}

export const OrthographyPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePostMessage = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text, isGpt: false }]);

    const { ok, userScore, errors, message } = await orthographyUseCases(text);
    console.log(ok, "aca");

    if (!ok) {
      setMessages((prev) => [
        ...prev,
        { text: "No se pudo realizar la correcion", isGpt: true },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          text: message,
          info: {
            userScore,
            errors,
            message,
          },
          isGpt: true,
        },
      ]);
    }

    setIsLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GtpMessage text="Hola, soy un asistente de ortografía. ¿En qué puedo ayudarte?" />

          {messages.map((msg: Message, index: number) => {
            return msg.isGpt ? (
              <GtpMessageOrthography
                key={index}
                errors={msg.info?.errors || []}
                message={msg.info?.message || ""}
                userScore={msg.info?.userScore || 0}
              />
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
