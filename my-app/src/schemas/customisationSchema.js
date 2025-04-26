// customisationSchema.js
import { z } from "zod";

export const customisationSchema = z.object({
  aiName: z.string().min(1, "AI Name is required").max(50, "AI Name must be under 50 characters."),
  role: z.string().min(1, "Role is required").max(50, "Role must be under 100 characters."),
  level: z.enum(["Expert", "Intermediate", "Beginner-Friendly"]),
  personality: z.enum(["Friendly", "Professional", "Humorous", "Direct", "Creative"]),
  tone: z.enum(["Casual", "Formal", "Neutral", "Encouraging", "Direct"]),
  structure: z.string().max(100, "Structure description must be under 100 characters.").optional(),
  wordcount: z.number().min(0, "Word count must be present and positive"),
  additionalinfo: z.string().max(200, "Additional info must be under 200 characters.").optional(),
  refrain: z.string().max(200, "Refrain field must be under 200 characters.").optional(),
  dataSources: z.array(z.string()).optional(),
});

export function checkPersonalityToneConflict(data) {
    const conflicts = [
      { personality: "Humorous", tone: "Formal" },
      { personality: "Friendly", tone: "Formal" },
      { personality: "Direct", tone: "Encouraging" },
      { personality: "Professional", tone: "Casual" },
      { personality: "Creative", tone: "Neutral" },
    ];
  
    return conflicts.some(conflict => 
      data.personality === conflict.personality && data.tone === conflict.tone
    );
  }
  