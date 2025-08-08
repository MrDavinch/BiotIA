'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing microscopic images via a chatbot.
 *
 * It allows lab technicians to ask questions about images and receive relevant information.
 * - chatbotImageAnalysis - A function that handles the image analysis process via a chatbot.
 * - ChatbotImageAnalysisInput - The input type for the chatbotImageAnalysis function.
 * - ChatbotImageAnalysisOutput - The return type for the chatbotImageAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatbotImageAnalysisInputSchema = z.object({
  question: z.string().describe('The question about the microscopic image.'),
  imageDataUri: z
    .string()
    .describe(
      "A photo of a microscopic image, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ChatbotImageAnalysisInput = z.infer<typeof ChatbotImageAnalysisInputSchema>;

const ChatbotImageAnalysisOutputSchema = z.object({
  answer: z.string().describe('The answer to the question about the image.'),
});
export type ChatbotImageAnalysisOutput = z.infer<typeof ChatbotImageAnalysisOutputSchema>;

export async function chatbotImageAnalysis(input: ChatbotImageAnalysisInput): Promise<ChatbotImageAnalysisOutput> {
  return chatbotImageAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotImageAnalysisPrompt',
  input: {schema: ChatbotImageAnalysisInputSchema},
  output: {schema: ChatbotImageAnalysisOutputSchema},
  prompt: `You are an AI assistant helping lab technicians analyze microscopic images.

The technician has provided the following question about the image:
{{question}}

Here is the image:
{{media url=imageDataUri}}

Provide a detailed answer, including relevant information, troubleshooting advice, or links to related atlas entries. Focus on being helpful and informative for the lab technician. Also, be concise.
`,
});

const chatbotImageAnalysisFlow = ai.defineFlow(
  {
    name: 'chatbotImageAnalysisFlow',
    inputSchema: ChatbotImageAnalysisInputSchema,
    outputSchema: ChatbotImageAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
