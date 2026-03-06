import { ChatGroq } from "@langchain/groq";
import { ChatOllama } from "@langchain/ollama";
import { ChatOpenAI } from "@langchain/openai";
import { loadEnv } from "./env";

export type Provider = "openai" | "ollama" | "groq";

type ChatModelInfo = {
  provider: Provider;
  modelName: string;
  model: any;
};

export const createChatModels = (
  providerInfo: Provider = "ollama",
  modelsName?: string
): ChatModelInfo => {
  loadEnv();

  const forced = providerInfo.toLowerCase() as Provider;
  const hasOpenAIKey = !!process.env.OPENAI_API_KEY;
  const hasGroqKey = !!process.env.GROQ_API_KEY;

  const base = { temperature: 0 as const };

  if (forced === "openai" && hasOpenAIKey) {
    const modelName = modelsName || "gpt-4o-mini";

    return {
      provider: "openai",
      modelName,
      model: new ChatOpenAI({
        model: modelName,
        ...(supportsTemperature(modelName) ? base : {}),
      }),
    };
  }

  if (forced === "groq" && hasGroqKey) {
    const modelName = modelsName || "llama-3.3-70b-versatile";

    return {
      provider: "groq",
      modelName,
      model: new ChatGroq({
        model: modelName,
        ...base,
      }),
    };
  }

  const modelName = modelsName || "gemma3";

  return {
    provider: "ollama",
    modelName,
    model: new ChatOllama({
      model: modelName,
      ...base,
    }),
  };
};

function supportsTemperature(model: string) {
  return !(
    model.startsWith("gpt-5") ||
    model.startsWith("o1") ||
    model.startsWith("o3")
  );
}
