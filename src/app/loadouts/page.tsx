import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, SaveIcon, SwordsIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";

export default function LoadoutsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Loadout Management</CardTitle>
          <CardDescription>
            Create, save, and equip full gear sets with a single click.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Prepare for any encounter by saving your favorite combinations of weapons, armor, and mods.
            Switch between PvE, PvP, or specific activity loadouts instantly.
          </p>
          <div className="flex space-x-4">
            <Button>
              <PlusCircleIcon className="mr-2 h-5 w-5" /> Create New Loadout
            </Button>
          </div>
          
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="bg-background/50">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                      <SwordsIcon className="h-5 w-5 text-primary"/> Loadout {index + 1}
                    </CardTitle>
                     <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                        <Trash2Icon className="h-4 w-4"/>
                     </Button>
                  </div>
                  <CardDescription>A brief description of this awesome loadout.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src={`https://placehold.co/300x150.png`}
                    alt={`Loadout ${index + 1} Visual`}
                    width={300}
                    height={150}
                    className="rounded-md mb-4 w-full object-cover"
                    data-ai-hint="gear equipment"
                  />
                  <Button className="w-full">
                    <SaveIcon className="mr-2 h-4 w-4" /> Equip Loadout
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
           <div className="mt-6 p-6 border rounded-lg bg-muted/30">
            <h3 className="text-xl font-semibold mb-2">Advanced Loadout Features Coming Soon!</h3>
            <p className="text-muted-foreground">
              Expect more granular control, sharing options, and smart suggestions for your loadouts.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
