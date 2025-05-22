import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarCheck2Icon, RefreshCwIcon, ShoppingCartIcon, SparklesIcon } from "lucide-react";
import Image from "next/image";

interface Activity {
  name: string;
  description: string;
  icon: React.ElementType;
  modifier?: string;
  imageUrl: string;
  aiHint: string;
}

const dailyActivities: Activity[] = [
  {
    name: "Featured Raid: Vault of Glass",
    description: "Relive the classic raid and earn powerful rewards.",
    icon: SparklesIcon,
    modifier: "Challenge Mode Active",
    imageUrl: "https://placehold.co/400x200.png",
    aiHint: "raid boss"
  },
  {
    name: "Nightfall: The Ordeal - The Scarlet Keep",
    description: "Face Hashladûn on Grandmaster difficulty for Ascendant Shards.",
    icon: CalendarCheck2Icon,
    modifier: "Champions: Barrier & Unstoppable",
    imageUrl: "https://placehold.co/400x200.png",
    aiHint: "moon fortress"
  },
  {
    name: "Crucible Rotator: Mayhem",
    description: "Abilities recharge at an accelerated rate. Chaos ensues!",
    icon: RefreshCwIcon,
    imageUrl: "https://placehold.co/400x200.png",
    aiHint: "space battle"
  },
];

const vendorInventories = [
    { name: "Ada-1", items: "Armor Synthesis Bounties, Rare Armor Mods" },
    { name: "Banshee-44", items: "Featured Weapons, Upgrade Modules" },
    { name: "Xûr, Agent of the Nine (Weekend)", items: "Exotic Gear, Legendary Weapons" }
];

export default function DailyActivitiesPage() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Daily & Weekly Activities</CardTitle>
          <CardDescription>
            Stay updated on rotating activities, vendor inventories, and challenges.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Featured Activities</h2>
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
              {dailyActivities.map((activity) => (
                <Card key={activity.name} className="bg-background/50 hover:shadow-lg transition-shadow">
                  <Image
                    src={activity.imageUrl}
                    alt={activity.name}
                    width={400}
                    height={200}
                    className="rounded-t-lg object-cover w-full h-48"
                    data-ai-hint={activity.aiHint}
                  />
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <activity.icon className="h-6 w-6 text-primary" /> {activity.name}
                    </CardTitle>
                    {activity.modifier && <CardDescription className="text-accent">{activity.modifier}</CardDescription>}
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <ShoppingCartIcon className="h-6 w-6 text-primary" /> Vendor Inventories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {vendorInventories.map(vendor => (
                <Card key={vendor.name} className="bg-background/50">
                  <CardHeader>
                    <CardTitle>{vendor.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{vendor.items}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-6 p-6 border rounded-lg bg-muted/30">
            <h3 className="text-xl font-semibold mb-2">Live Data Integration Coming Soon!</h3>
            <p className="text-muted-foreground">
              This section will soon feature real-time information directly from Destiny 2 APIs,
              providing the most up-to-date activity and vendor details.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
