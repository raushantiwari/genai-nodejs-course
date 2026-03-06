import { createChatModels, Provider } from "./lc-model";
import { AskResult, AskResultSchema } from "./schema";

export async function askStructured(
  query: string,
  provider: Provider,
  modelsName?: string
): Promise<AskResult> {
  // Replace 'any' with the actual type if available
  const { model, modelName } = createChatModels(provider, modelsName) as {
    model: any;
    modelName: string;
  };

  // keep instructions brief so that schema stays visible to the model.
  const system = "You are a concise assistant. return only the requested JSON.";
  const user =
    `Summarize for beginner: \n` +
    `"${query}" \n` +
    `Return fields: summery (short paragraph), confidence (0...1).`;
  const structured = model.withStructuredOutput(AskResultSchema);

  const result = await structured.invoke([
    {
      role: "system",
      content: system,
    },
    {
      role: "user",
      content: user,
    },
  ]);

  const response = {
    ...result,
    provider: provider,
    model: modelName,
    timestamp: Date.now(),
  };
  return response;
}
