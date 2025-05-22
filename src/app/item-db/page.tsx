import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, FilterIcon, InfoIcon } from "lucide-react";
import Image from "next/image";

export default function ItemDbPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Comprehensive Item Database</CardTitle>
          <CardDescription>
            Explore all items in Destiny 2, with detailed stats, perks, and lore.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input type="search" placeholder="Search for items (e.g., Gjallarhorn, Ace of Spades)..." className="flex-grow" />
            <Button variant="outline">
              <FilterIcon className="mr-2 h-4 w-4" /> Filters
            </Button>
            <Button>
              <SearchIcon className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>
          
          <p>
            This powerful database will allow you to search, filter, and sort through every weapon, armor piece,
            and item available in Destiny 2. Get detailed information on stats, possible rolls, acquisition methods, and lore.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {['Exotic Weapon', 'Legendary Armor', 'Shader'].map((itemType, index) => (
              <Card key={index} className="bg-background/50 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{itemType} Example</CardTitle>
                  <CardDescription>Placeholder for an item card.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image 
                    src={`https://placehold.co/300x200.png`}
                    alt={`${itemType} example`}
                    width={300}
                    height={200}
                    className="rounded-md mb-2 w-full object-cover"
                    data-ai-hint="gaming item"
                  />
                  <p className="text-sm text-muted-foreground mb-2">
                    Detailed stats and perks will be displayed here. Click for more info.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    <InfoIcon className="mr-2 h-4 w-4" /> View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-6 p-6 border rounded-lg bg-muted/30">
            <h3 className="text-xl font-semibold mb-2">Database Under Construction!</h3>
            <p className="text-muted-foreground">
              Our archivists are hard at work cataloging the Destiny universe.
              A fully functional item database is on its way.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
