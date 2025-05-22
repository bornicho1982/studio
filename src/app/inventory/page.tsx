import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PackageSearchIcon, ShuffleIcon, VaultIcon } from "lucide-react";
import Image from "next/image";

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Inventory Transfers</CardTitle>
          <CardDescription>
            Manage your gear across characters and the vault with ease.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            This section will allow you to view all your items and transfer them
            between your characters and the vault. Drag-and-drop functionality and quick actions
            will make gear management a breeze.
          </p>
           <div className="grid md:grid-cols-3 gap-4 text-center">
            <Card className="bg-background/50 p-4">
              <VaultIcon className="h-12 w-12 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">Vault Access</h3>
              <p className="text-sm text-muted-foreground">View and manage your vault inventory.</p>
            </Card>
            <Card className="bg-background/50 p-4">
              <ShuffleIcon className="h-12 w-12 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">Character Transfers</h3>
              <p className="text-sm text-muted-foreground">Move items between your Guardians.</p>
            </Card>
             <Card className="bg-background/50 p-4">
              <PackageSearchIcon className="h-12 w-12 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">Quick Equip</h3>
              <p className="text-sm text-muted-foreground">Equip items directly from any location.</p>
            </Card>
          </div>
          <div className="mt-6 p-6 border rounded-lg bg-muted/30">
            <h3 className="text-xl font-semibold mb-2">Feature Coming Soon!</h3>
            <p className="text-muted-foreground">
              We are working hard to bring you a powerful and intuitive inventory management system.
              Stay tuned for updates!
            </p>
            <div className="mt-4">
              <Image 
                src="https://placehold.co/600x300.png"
                alt="Inventory Management Placeholder"
                width={600}
                height={300}
                className="rounded-md shadow-md"
                data-ai-hint="inventory management"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
