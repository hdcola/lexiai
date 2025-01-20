import type {
    GenerationConfig,
    Part,
    Tool,
} from "@google/generative-ai";

export const Voices = ["Puck", "Charon", "Kore", "Fenrir", "Aoede"] as const;
export type VoiceName = typeof Voices[number];
export type ResponseModalities = "text" | "audio" | "image";

export type LiveConfig = {
    model: string;
    systemInstruction?: { parts: Part[] };
    generationConfig?: Partial<LiveGenerationConfig>;
    tools?: Array<Tool | { googleSearch: {} } | { codeExecution: {} }>;
};
  
export type LiveGenerationConfig = GenerationConfig & {
    responseModalities: ResponseModalities;
    speechConfig?: {
        voiceConfig?: {
            prebuiltVoiceConfig?: {
                voiceName: VoiceName;
            };
        };
    };
};
