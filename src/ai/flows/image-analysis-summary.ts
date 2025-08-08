'use server';

/**
 * @fileOverview A flow for summarizing image analysis findings.
 *
 * - imageAnalysisSummary - A function that takes an image and optional metadata,
 *   and returns a summarized report highlighting key features and potential areas of concern.
 * - ImageAnalysisSummaryInput - The input type for the imageAnalysisSummary function.
 * - ImageAnalysisSummaryOutput - The return type for the imageAnalysisSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImageAnalysisSummaryInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      'A microscopic image as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // Corrected description
    ),
  sampleType: z.string().optional().describe('Type of sample (e.g., blood, urine).'),
  objective: z.string().optional().describe('Microscope objective used (e.g., 40x, 100x).'),
  stain: z.string().optional().describe('Staining technique used (e.g., Gram, Giemsa).'),
});

export type ImageAnalysisSummaryInput = z.infer<typeof ImageAnalysisSummaryInputSchema>;

const ImageAnalysisSummaryOutputSchema = z.object({
  report: z.string().describe('A summarized report of the image analysis findings.'),
});

export type ImageAnalysisSummaryOutput = z.infer<typeof ImageAnalysisSummaryOutputSchema>;

export async function imageAnalysisSummary(input: ImageAnalysisSummaryInput): Promise<ImageAnalysisSummaryOutput> {
  return imageAnalysisSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'imageAnalysisSummaryPrompt',
  input: {schema: ImageAnalysisSummaryInputSchema},
  output: {schema: ImageAnalysisSummaryOutputSchema},
  prompt: `You are an expert bioanalyst summarizing microscopic image findings.

  Based on the image and any provided metadata, generate a concise report highlighting key features and potential areas of concern.  Be as detailed as possible in the report.

  Image: {{media url=photoDataUri}}

  {{#if sampleType}}Sample Type: {{sampleType}}{{/if}}
  {{#if objective}}Objective: {{objective}}{{/if}}
  {{#if stain}}Stain: {{stain}}{{/if}}
  `,
});

const imageAnalysisSummaryFlow = ai.defineFlow(
  {
    name: 'imageAnalysisSummaryFlow',
    inputSchema: ImageAnalysisSummaryInputSchema,
    outputSchema: ImageAnalysisSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
