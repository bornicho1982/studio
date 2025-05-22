import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section className="bg-card p-8 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-primary">Welcome to Guardian AI</h1>
            <p className="text-lg text-muted-foreground">
              Your ultimate companion for Destiny 2. Manage your inventory, optimize your builds with AI,
              and stay updated on daily activities.
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg">
                <Link href="/ai-optimizer">
                  Optimize Your Build <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/inventory">
                  Manage Inventory
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex-shrink-0">
            <Image
              src="https://placehold.co/400x300.png"
              alt="Destiny 2 Guardian"
              width={400}
              height={300}
              className="rounded-lg shadow-md"
              data-ai-hint="gaming guardian"
            />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-md hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle>Inventory Transfers</CardTitle>
            <CardDescription>Quickly move items between characters and the vault.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Seamlessly manage your gear across all your Guardians and storage.</p>
            <Button variant="link" asChild className="mt-4 px-0">
              <Link href="/inventory">Go to Inventory <ArrowRightIcon className="ml-1 h-4 w-4" /></Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle>Loadout Management</CardTitle>
            <CardDescription>Create, save, and equip full gear sets with one click.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Prepare for any activity by saving your favorite loadouts.</p>
            <Button variant="link" asChild className="mt-4 px-0">
              <Link href="/loadouts">Manage Loadouts <ArrowRightIcon className="ml-1 h-4 w-4" /></Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle>AI Build Optimizer</CardTitle>
            <CardDescription>Optimize your gear for specific activities and stats.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Let AI help you find the perfect build and farm missing pieces.</p>
            <Button variant="link" asChild className="mt-4 px-0">
              <Link href="/ai-optimizer">Optimize Now <ArrowRightIcon className="ml-1 h-4 w-4" /></Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
