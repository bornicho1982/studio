// use server'

/**
 * @fileOverview Gear recommendation AI agent.
 *
 * - getMissingPieces - A function that handles the gear recommendation process.
 * - GetMissingPiecesInput - The input type for the getMissingPieces function.
 * - GetMissingPiecesOutput - The return type for the getMissingPieces function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetMissingPiecesInputSchema = z.object({
  desiredBuild: z
    .string()
    .describe('The description of the desired Destiny 2 build.'),
  missingGear: z.string().describe('The gear pieces that are missing for the build.'),
});
export type GetMissingPiecesInput = z.infer<typeof GetMissingPiecesInputSchema>;

const GetMissingPiecesOutputSchema = z.object({
  farmingSuggestions: z.string().describe('Suggestions on where to farm the missing gear pieces.'),
});
export type GetMissingPiecesOutput = z.infer<typeof GetMissingPiecesOutputSchema>;

export async function getMissingPieces(input: GetMissingPiecesInput): Promise<GetMissingPiecesOutput> {
  return getMissingPiecesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getMissingPiecesPrompt',
  input: {schema: GetMissingPiecesInputSchema},
  output: {schema: GetMissingPiecesOutputSchema},
  prompt: `You are a Destiny 2 expert, helping players find the best locations to farm missing gear pieces for their desired builds.

  Provide specific suggestions on where to farm for the following missing gear pieces, considering the desired build:

  Desired Build: {{{desiredBuild}}}
  Missing Gear: {{{missingGear}}}
  \n  Format your response as a list of suggestions, including the activity or location name, and any relevant details (e.g., specific enemy types, difficulty levels).
  `,
});

const getMissingPiecesFlow = ai.defineFlow(
  {
    name: 'getMissingPiecesFlow',
    inputSchema: GetMissingPiecesInputSchema,
    outputSchema: GetMissingPiecesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
