"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { handleOptimizeBuild, handleGetMissingPieces, OptimizeBuildResult, GetMissingPiecesResult } from "./actions";
import type { OptimizeBuildInput, GetMissingPiecesInput, OptimizeBuildOutput, GetMissingPiecesOutput } from "@/ai/flows/optimize-build"; // Assuming types are exported here

const optimizeBuildSchema = z.object({
  currentGear: z.string().min(1, "Current gear JSON is required."),
  desiredStats: z.string().min(1, "Desired stats JSON is required."),
  activity: z.string().min(1, "Activity is required."),
});

const getMissingPiecesSchema = z.object({
  desiredBuild: z.string().min(1, "Desired build description is required."),
  missingGear: z.string().min(1, "Missing gear description is required."),
});

export default function AiOptimizerPage() {
  const { toast } = useToast();
  const [optimizationResult, setOptimizationResult] = useState<OptimizeBuildOutput | null>(null);
  const [farmingSuggestions, setFarmingSuggestions] = useState<GetMissingPiecesOutput | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isFinding, setIsFinding] = useState(false);

  const optimizeForm = useForm<z.infer<typeof optimizeBuildSchema>>({
    resolver: zodResolver(optimizeBuildSchema),
    defaultValues: {
      currentGear: "",
      desiredStats: "",
      activity: "",
    },
  });

  const missingPiecesForm = useForm<z.infer<typeof getMissingPiecesSchema>>({
    resolver: zodResolver(getMissingPiecesSchema),
    defaultValues: {
      desiredBuild: "",
      missingGear: "",
    },
  });

  const onOptimizeSubmit: SubmitHandler<z.infer<typeof optimizeBuildSchema>> = async (data) => {
    setIsOptimizing(true);
    setOptimizationResult(null);
    const result: OptimizeBuildResult = await handleOptimizeBuild(data as OptimizeBuildInput);
    setIsOptimizing(false);
    if (result.success && result.data) {
      setOptimizationResult(result.data);
      toast({ title: "Build Optimized!", description: "AI suggestions generated successfully." });
    } else {
      toast({ variant: "destructive", title: "Optimization Failed", description: result.error });
    }
  };

  const onFindSubmit: SubmitHandler<z.infer<typeof getMissingPiecesSchema>> = async (data) => {
    setIsFinding(true);
    setFarmingSuggestions(null);
    const result: GetMissingPiecesResult = await handleGetMissingPieces(data as GetMissingPiecesInput);
    setIsFinding(false);
    if (result.success && result.data) {
      setFarmingSuggestions(result.data);
      toast({ title: "Suggestions Found!", description: "Farming locations identified." });
    } else {
      toast({ variant: "destructive", title: "Search Failed", description: result.error });
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">AI Build Optimizer</CardTitle>
          <CardDescription>
            Leverage AI to perfect your Destiny 2 builds and find missing gear.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...optimizeForm}>
            <form onSubmit={optimizeForm.handleSubmit(onOptimizeSubmit)} className="space-y-6">
              <CardTitle className="text-xl">Optimize Your Build</CardTitle>
              <FormField
                control={optimizeForm.control}
                name="currentGear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Gear (JSON)</FormLabel>
                    <FormControl>
                      <Textarea placeholder='e.g., {"helmet": "Celestial Nighthawk", "arms": "Young Ahamkara\'s Spine", ...}' {...field} rows={5} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={optimizeForm.control}
                name="desiredStats"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Desired Stats (JSON)</FormLabel>
                    <FormControl>
                      <Textarea placeholder='e.g., {"mobility": 100, "resilience": 80, "recovery": 100, ...}' {...field} rows={3} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={optimizeForm.control}
                name="activity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Activity</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select activity type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="PvE">PvE (Strikes, Nightfalls, Dungeons)</SelectItem>
                        <SelectItem value="PvP">PvP (Crucible, Trials of Osiris)</SelectItem>
                        <SelectItem value="Raids">Raids</SelectItem>
                        <SelectItem value="Gambit">Gambit</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isOptimizing}>
                {isOptimizing ? "Optimizing..." : "Optimize Build"}
              </Button>
            </form>
          </Form>

          {optimizationResult && (
            <Card className="mt-6 bg-background/50">
              <CardHeader>
                <CardTitle>AI Optimization Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold">Stat Analysis:</h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{optimizationResult.statAnalysis}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Build Suggestions:</h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{optimizationResult.buildSuggestions}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Find Missing Gear</CardTitle>
          <CardDescription>Get AI suggestions on where to farm missing pieces for your desired build.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...missingPiecesForm}>
            <form onSubmit={missingPiecesForm.handleSubmit(onFindSubmit)} className="space-y-6">
              <FormField
                control={missingPiecesForm.control}
                name="desiredBuild"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Desired Build Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Solar Warlock build focused on grenade spam with Sunbracers." {...field} rows={3} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={missingPiecesForm.control}
                name="missingGear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Missing Gear Pieces</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Sunbracers (Exotic Gauntlets), specific legendary weapon with Incandescent perk." {...field} rows={3} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isFinding}>
                {isFinding ? "Finding..." : "Get Farming Suggestions"}
              </Button>
            </form>
          </Form>

          {farmingSuggestions && (
            <Card className="mt-6 bg-background/50">
              <CardHeader>
                <CardTitle>AI Farming Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{farmingSuggestions.farmingSuggestions}</p>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
