"use server";

import { optimizeBuild, OptimizeBuildInput, OptimizeBuildOutput } from "@/ai/flows/optimize-build";
import { getMissingPieces, GetMissingPiecesInput, GetMissingPiecesOutput } from "@/ai/flows/get-missing-pieces";

export interface OptimizeBuildResult {
  success: boolean;
  data?: OptimizeBuildOutput;
  error?: string;
}

export interface GetMissingPiecesResult {
  success: boolean;
  data?: GetMissingPiecesOutput;
  error?: string;
}

export async function handleOptimizeBuild(input: OptimizeBuildInput): Promise<OptimizeBuildResult> {
  try {
    // Basic validation (more robust validation can be added)
    if (!input.currentGear || !input.desiredStats || !input.activity) {
      return { success: false, error: "All fields are required." };
    }
    try {
      JSON.parse(input.currentGear);
    } catch (e) {
      return { success: false, error: "Invalid JSON format for Current Gear." };
    }
    try {
      JSON.parse(input.desiredStats);
    } catch (e) {
      return { success: false, error: "Invalid JSON format for Desired Stats." };
    }

    const result = await optimizeBuild(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error in handleOptimizeBuild:", error);
    return { success: false, error: error instanceof Error ? error.message : "An unknown error occurred." };
  }
}

export async function handleGetMissingPieces(input: GetMissingPiecesInput): Promise<GetMissingPiecesResult> {
  try {
     // Basic validation
    if (!input.desiredBuild || !input.missingGear) {
      return { success: false, error: "Desired build description and missing gear are required." };
    }
    const result = await getMissingPieces(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error in handleGetMissingPieces:", error);
    return { success: false, error: error instanceof Error ? error.message : "An unknown error occurred." };
  }
}
