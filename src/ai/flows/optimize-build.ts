// 'use server';
/**
 * @fileOverview An AI agent to optimize Destiny 2 builds based on desired stat goals.
 *
 * - optimizeBuild - A function that handles the build optimization process.
 * - OptimizeBuildInput - The input type for the optimizeBuild function.
 * - OptimizeBuildOutput - The return type for the optimizeBuild function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeBuildInputSchema = z.object({
  currentGear: z.string().describe('A JSON string representing the user\'s current gear.'),
  desiredStats: z.string().describe('A JSON string representing the user\'s desired stat goals.'),
  activity: z.string().describe('The activity for which the build is being optimized (e.g., PvP, PvE, Raids).'),
});
export type OptimizeBuildInput = z.infer<typeof OptimizeBuildInputSchema>;

const OptimizeBuildOutputSchema = z.object({
  buildSuggestions: z.string().describe('AI-generated suggestions for optimizing the build, including specific gear pieces to farm and stat allocation strategies.'),
  statAnalysis: z.string().describe('An analysis of the current gear setup in relation to the desired stats.'),
});
export type OptimizeBuildOutput = z.infer<typeof OptimizeBuildOutputSchema>;

export async function optimizeBuild(input: OptimizeBuildInput): Promise<OptimizeBuildOutput> {
  return optimizeBuildFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeBuildPrompt',
  input: {schema: OptimizeBuildInputSchema},
  output: {schema: OptimizeBuildOutputSchema},
  prompt: `You are an expert Destiny 2 build crafter. Analyze the player's current gear and desired stats to suggest an optimal build for the specified activity.

Current Gear:
{{currentGear}}

Desired Stats:
{{desiredStats}}

Activity:
{{activity}}

Provide specific suggestions on how to optimize the build, including gear pieces to farm and stat allocation strategies. Explain the reasoning behind your suggestions.

Format your response as follows:

Stat Analysis: [Analysis of current gear vs desired stats]
Build Suggestions: [Specific gear and stat allocation suggestions]`,
});

const optimizeBuildFlow = ai.defineFlow(
  {
    name: 'optimizeBuildFlow',
    inputSchema: OptimizeBuildInputSchema,
    outputSchema: OptimizeBuildOutputSchema,
  },
  async input => {
    try {
      JSON.parse(input.currentGear);
    } catch (e) {
      throw new Error('Invalid JSON format for currentGear');
    }

    try {
      JSON.parse(input.desiredStats);
    } catch (e) {
      throw new Error('Invalid JSON format for desiredStats');
    }

    const {output} = await prompt(input);
    return output!;
  }
);
