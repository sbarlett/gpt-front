import { OrthographyResponse } from "../../../interfaces";

export const orthographyUseCases = async (prompt: string) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_GPT_API}/orthography-check`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      }
    );

    const data = (await res.json()) as OrthographyResponse;

    return {
      ok: data.statusCode === 200,
      ...data,
    };
  } catch (error) {
    console.log("aca");

    return {
      ok: false,
      userScore: 0,
      errors: [],
      message: "No se pudo obtener la respuesta. Por favor, intenta de nuevo.",
      errorMessage: (error as Error).message,
    };
  }
};
