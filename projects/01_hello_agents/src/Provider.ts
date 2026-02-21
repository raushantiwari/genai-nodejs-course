type Provider = "openai" | "groq" | "ollama";
type HelloOutput = {
  ok: boolean;
  provider: Provider;
  message: string;
  model: string;
};

type OpenAIChatCompletion = {
  choices?: Array<{ message?: { content?: string } }>;
};

/**
 * Groq Hello
 * @returns
 */
export async function helloGroq(): Promise<HelloOutput> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not defined in environment variables.");
  }
  const model = "llama-3.1-8b-instant";
  const url = "https://api.groq.com/openai/v1/chat/completions";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "user",
          content: "Say a short Hello",
        },
      ],
      temperature: 0.7,
    }),
  });
  if (!response.ok) {
    throw new Error(`Groq ${response.status} - ${response.statusText}`);
  }
  const json = (await response.json()) as OpenAIChatCompletion;

  const content = json.choices?.[0]?.message?.content || "No message";
  return {
    ok: true,
    provider: "groq",
    message: content,
    model,
  };
}

/**
 * OpenAI Hello
 * @returns
 */
export async function helloOpenAi(): Promise<HelloOutput> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not defined in environment variables.");
  }

  const model = "gpt-4.1-nano";
  const url = "https://api.openai.com/v1/chat/completions";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "user",
          content: "what can you do?",
        },
      ],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI ${response.status} - ${errorText}`);
  }

  const json = await response.json();

  const content = json.choices?.[0]?.message?.content ?? "No message";

  return {
    ok: true,
    provider: "openai",
    message: content,
    model, // ✅ fixed (was modal)
  };
}

/**
 * Ollama Hello
 * @returns
 */
export async function helloOllama(): Promise<HelloOutput> {
  const model = "gemma3";
  const url = "http://localhost:11434/api/generate"; // Ollama installed locally is expected to be running on this URL

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      prompt: "who are you?",
      stream: false,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Ollama ${response.status} - ${errorText}`);
  }

  const json = await response.json();

  return {
    ok: true,
    provider: "ollama",
    message: json.response ?? "No message",
    model,
  };
}

/**
 * Selects the appropriate provider and returns a hello message.
 * @returns
 */

export async function selectAndHello(): Promise<HelloOutput> {
  const provider = process.env.PROVIDER as Provider;

  if (!provider) {
    throw new Error("PROVIDER is not defined in environment variables.");
  }
  switch (provider) {
    case "groq":
      return await helloGroq();
    case "openai":
      return await helloOpenAi();
    case "ollama":
      return await helloOllama();
    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }
}
