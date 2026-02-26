'use client';

import { useState } from "react";
import { User2, Settings2, CalendarDays, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { dashboardHistory } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { formatINR } from "@/lib/utils";

export function DashboardClient() {
  const { toast } = useToast();
  const [activeBooking, setActiveBooking] = useState<(typeof dashboardHistory)[number] | null>(null);

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your dashboard preferences were updated successfully.",
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <aside className="hidden lg:block">
        <Card className="sticky top-24 rounded-2xl border-border/60">
          <CardHeader>
            <CardTitle className="text-lg">Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="rounded-xl bg-muted px-3 py-2 text-sm font-medium">Bookings</p>
            <p className="rounded-xl px-3 py-2 text-sm text-muted-foreground">Profile</p>
            <p className="rounded-xl px-3 py-2 text-sm text-muted-foreground">Settings</p>
          </CardContent>
        </Card>
      </aside>

      <div className="space-y-6">
        <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-card/80 p-4">
          <div>
            <p className="text-lg font-semibold">Welcome back, Alex</p>
            <p className="text-sm text-muted-foreground">Manage bookings, profile, and preferences.</p>
          </div>
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" size="icon">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Dashboard</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-3">
                  <p className="rounded-xl bg-muted px-3 py-2 text-sm font-medium">Bookings</p>
                  <p className="rounded-xl px-3 py-2 text-sm text-muted-foreground">Profile</p>
                  <p className="rounded-xl px-3 py-2 text-sm text-muted-foreground">Settings</p>
                </div>
              </SheetContent>
            </Sheet>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-full">Account</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="bookings" className="gap-2">
              <CalendarDays className="h-4 w-4" /> Bookings
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <User2 className="h-4 w-4" /> Profile
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings2 className="h-4 w-4" /> Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <Card className="rounded-2xl border-border/60">
              <CardHeader>
                <CardTitle>Booking History</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dashboardHistory.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>{booking.id}</TableCell>
                        <TableCell>{booking.service}</TableCell>
                        <TableCell>{booking.date}</TableCell>
                        <TableCell>{booking.status}</TableCell>
                        <TableCell>{formatINR(booking.amount)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" onClick={() => setActiveBooking(booking)}>
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card className="rounded-2xl border-border/60">
              <CardHeader>
                <CardTitle>Profile</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input defaultValue="Alex Morgan" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input defaultValue="alex@example.com" type="email" />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input defaultValue="+1 223 000 9921" />
                </div>
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input defaultValue="San Francisco" />
                </div>
                <div className="sm:col-span-2">
                  <Button onClick={handleSaveSettings}>Save Profile</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="rounded-2xl border-border/60">
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label>Preferred Contact Method</Label>
                  <Select defaultValue="email">
                    <SelectTrigger className="max-w-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Notification Frequency</Label>
                  <Select defaultValue="important">
                    <SelectTrigger className="max-w-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All updates</SelectItem>
                      <SelectItem value="important">Important only</SelectItem>
                      <SelectItem value="none">Do not disturb</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleSaveSettings}>Save Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={Boolean(activeBooking)} onOpenChange={(open) => !open && setActiveBooking(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
          </DialogHeader>
          {activeBooking && (
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">ID:</span> {activeBooking.id}</p>
              <p><span className="font-medium">Service:</span> {activeBooking.service}</p>
              <p><span className="font-medium">Date:</span> {activeBooking.date}</p>
              <p><span className="font-medium">Status:</span> {activeBooking.status}</p>
              <p><span className="font-medium">Amount:</span> {formatINR(activeBooking.amount)}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

