'use server';
/**
 * @fileOverview Provides diagnostic suggestions for microscopic images using AI.
 *
 * - analyzeImageForDiagnosis - A function that accepts an image and returns a diagnostic suggestion.
 * - ImageAnalysisInput - The input type for the analyzeImageForDiagnosis function.
 * - ImageAnalysisOutput - The return type for the analyzeImageForDiagnosis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImageAnalysisInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "A microscopic image, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  sampleType: z.string().optional().describe('The type of sample (e.g., blood, urine).'),
  objective: z.string().optional().describe('The objective used (e.g., 40x, 100x).'),
  staining: z.string().optional().describe('The staining method used (e.g., Gram, Giemsa).'),
});
export type ImageAnalysisInput = z.infer<typeof ImageAnalysisInputSchema>;

const ImageAnalysisOutputSchema = z.object({
  diagnosis: z.string().describe('The diagnostic suggestion from the AI.'),
  confidence: z.number().describe('The confidence score of the diagnosis (0-1).'),
  flaggedAreas: z.string().optional().describe('Description of any flagged areas of interest in the image.'),
});
export type ImageAnalysisOutput = z.infer<typeof ImageAnalysisOutputSchema>;

export async function analyzeImageForDiagnosis(input: ImageAnalysisInput): Promise<ImageAnalysisOutput> {
  return imageAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'imageAnalysisPrompt',
  input: {schema: ImageAnalysisInputSchema},
  output: {schema: ImageAnalysisOutputSchema},
  prompt: `You are an AI assistant that provides diagnostic suggestions for microscopic images.

  Analyze the provided image and provide a diagnostic suggestion, including potential pathogens or cell abnormalities identified, along with a confidence score (0-1).

  Image: {{media url=imageDataUri}}
  Sample Type: {{sampleType}}
  Objective: {{objective}}
  Staining: {{staining}}

  Consider the sample type, objective, and staining method when providing the diagnostic suggestion. Describe any flagged areas of interest in the image.
  `,
});

const imageAnalysisFlow = ai.defineFlow(
  {
    name: 'imageAnalysisFlow',
    inputSchema: ImageAnalysisInputSchema,
    outputSchema: ImageAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
