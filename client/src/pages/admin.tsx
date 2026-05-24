import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ObjectUploader } from "@/components/ObjectUploader";
import {
  Calendar as CalendarIcon,
  Users,
  Clock,
  Trash2,
  Check,
  X,
  Plus,
  ArrowLeft,
  Loader2,
  Image as ImageIcon,
  Upload,
} from "lucide-react";
import type { Booking, AvailabilitySlot, PortfolioImage } from "@shared/schema";

interface AdminPageProps {
  onBack?: () => void;
}

const DEFAULT_TIMES = [
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
];

const CATEGORIES = [
  { value: "portrait", label: "Portrait" },
  { value: "events", label: "Events" },
  { value: "commercial", label: "Commercial" },
  { value: "headshots", label: "Headshots" },
];

function formatTimeDisplay(time: string): string {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
}

export default function AdminPage({ onBack }: AdminPageProps) {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageAlt, setNewImageAlt] = useState("");
  const [newImageCategory, setNewImageCategory] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const { data: bookings, isLoading: bookingsLoading } = useQuery<Booking[]>({
    queryKey: ["/api/bookings"],
  });

  const { data: availability, isLoading: availabilityLoading } = useQuery<AvailabilitySlot[]>({
    queryKey: ["/api/availability"],
  });

  const { data: portfolioImages, isLoading: portfolioLoading } = useQuery<PortfolioImage[]>({
    queryKey: ["/api/portfolio"],
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await apiRequest("PATCH", `/api/bookings/${id}/status`, { status });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      queryClient.invalidateQueries({ queryKey: ["/api/availability"] });
      toast({ title: "Status Updated", description: "Booking status has been updated." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update status.", variant: "destructive" });
    },
  });

  const deleteBookingMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/bookings/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      queryClient.invalidateQueries({ queryKey: ["/api/availability"] });
      toast({ title: "Deleted", description: "Booking has been deleted." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete booking.", variant: "destructive" });
    },
  });

  const addSlotsMutation = useMutation({
    mutationFn: async (slots: { date: string; time: string; isAvailable: boolean }[]) => {
      const response = await apiRequest("POST", "/api/availability/bulk", { slots });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/availability"] });
      toast({ title: "Slots Added", description: "Availability slots have been added." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to add slots.", variant: "destructive" });
    },
  });

  const deleteSlotMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/availability/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/availability"] });
      toast({ title: "Deleted", description: "Slot has been removed." });
    },
  });

  const addImageMutation = useMutation({
    mutationFn: async (data: { src: string; alt: string; category: string }) => {
      const response = await apiRequest("POST", "/api/portfolio", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio"] });
      toast({ title: "Image Added", description: "Portfolio image has been added." });
      setNewImageUrl("");
      setNewImageAlt("");
      setNewImageCategory("");
      setUploadedImageUrl("");
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to add image.", variant: "destructive" });
    },
  });

  const deleteImageMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/portfolio/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio"] });
      toast({ title: "Deleted", description: "Image has been removed." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete image.", variant: "destructive" });
    },
  });

  const handleAddDefaultSlots = () => {
    if (!selectedDate) return;
    const dateString = selectedDate.toISOString().split("T")[0];
    
    const existingSlots = availability?.filter(s => s.date === dateString).map(s => s.time) || [];
    const newSlots = DEFAULT_TIMES
      .filter(time => !existingSlots.includes(time))
      .map((time) => ({
        date: dateString,
        time,
        isAvailable: true,
      }));
    
    if (newSlots.length === 0) {
      toast({ title: "No New Slots", description: "All time slots already exist for this date." });
      return;
    }
    
    addSlotsMutation.mutate(newSlots);
  };

  const handleAddImage = () => {
    const imageUrl = uploadedImageUrl || newImageUrl;
    if (!imageUrl || !newImageCategory) {
      toast({ title: "Error", description: "Please provide an image and select a category.", variant: "destructive" });
      return;
    }
    addImageMutation.mutate({
      src: imageUrl,
      alt: newImageAlt || `${newImageCategory} photography`,
      category: newImageCategory,
    });
  };

  const handleGetUploadParameters = async () => {
    const response = await apiRequest("POST", "/api/objects/upload");
    const { uploadURL } = await response.json();
    return {
      method: "PUT" as const,
      url: uploadURL,
    };
  };

  const handleUploadComplete = async (result: any) => {
    if (result.successful && result.successful.length > 0) {
      const uploadURL = result.successful[0].uploadURL;
      try {
        const response = await apiRequest("POST", "/api/objects/normalize", { uploadURL });
        const { objectPath } = await response.json();
        setUploadedImageUrl(objectPath);
        toast({ title: "Upload Complete", description: "Image uploaded successfully." });
      } catch (error) {
        console.error("Failed to normalize path:", error);
        setUploadedImageUrl(uploadURL);
      }
    }
  };

  const upcomingBookings = bookings?.filter((b) => b.status === "confirmed") || [];
  const totalBookings = bookings?.length || 0;

  const sessionTypeLabels: Record<string, string> = {
    portrait: "Portrait",
    events: "Events",
    commercial: "Commercial",
    headshots: "Headshots",
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge variant="default">Confirmed</Badge>;
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {onBack && (
              <Button variant="ghost" size="icon" onClick={onBack} data-testid="button-admin-back">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Bookings
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" data-testid="text-total-bookings">
                {totalBookings}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Upcoming Sessions
              </CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" data-testid="text-upcoming-sessions">
                {upcomingBookings.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Available Slots
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" data-testid="text-available-slots">
                {availability?.length || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Portfolio Images
              </CardTitle>
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" data-testid="text-portfolio-images">
                {portfolioImages?.length || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="bookings">
          <TabsList className="mb-6">
            <TabsTrigger value="bookings" data-testid="tab-bookings">
              Bookings
            </TabsTrigger>
            <TabsTrigger value="availability" data-testid="tab-availability">
              Availability
            </TabsTrigger>
            <TabsTrigger value="portfolio" data-testid="tab-portfolio">
              Portfolio
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>All Bookings</CardTitle>
                <CardDescription>Manage your photography session bookings</CardDescription>
              </CardHeader>
              <CardContent>
                {bookingsLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : bookings && bookings.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Client</TableHead>
                          <TableHead>Session Type</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bookings.map((booking) => (
                          <TableRow key={booking.id} data-testid={`row-booking-${booking.id}`}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{booking.name}</p>
                                <p className="text-sm text-muted-foreground">{booking.email}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              {sessionTypeLabels[booking.sessionType] || booking.sessionType}
                            </TableCell>
                            <TableCell>{booking.date}</TableCell>
                            <TableCell>{formatTimeDisplay(booking.time)}</TableCell>
                            <TableCell>{getStatusBadge(booking.status)}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                {booking.status === "confirmed" && (
                                  <>
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      onClick={() =>
                                        updateStatusMutation.mutate({
                                          id: booking.id,
                                          status: "completed",
                                        })
                                      }
                                      data-testid={`button-complete-${booking.id}`}
                                    >
                                      <Check className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      onClick={() =>
                                        updateStatusMutation.mutate({
                                          id: booking.id,
                                          status: "cancelled",
                                        })
                                      }
                                      data-testid={`button-cancel-${booking.id}`}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </>
                                )}
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  onClick={() => deleteBookingMutation.mutate(booking.id)}
                                  data-testid={`button-delete-${booking.id}`}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-center py-8 text-muted-foreground">
                    No bookings yet. Bookings will appear here when clients book sessions.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="availability">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add Availability</CardTitle>
                  <CardDescription>Select a date to add available time slots</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return date < today;
                    }}
                    className="rounded-md border"
                  />
                  {selectedDate && (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Selected:{" "}
                        {selectedDate.toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <Button
                        onClick={handleAddDefaultSlots}
                        disabled={addSlotsMutation.isPending}
                        data-testid="button-add-default-slots"
                      >
                        {addSlotsMutation.isPending ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Plus className="mr-2 h-4 w-4" />
                        )}
                        Add Default Time Slots
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Current Availability</CardTitle>
                  <CardDescription>Your available time slots</CardDescription>
                </CardHeader>
                <CardContent>
                  {availabilityLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                  ) : availability && availability.length > 0 ? (
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {availability.map((slot) => (
                        <div
                          key={slot.id}
                          className="flex items-center justify-between p-3 rounded-md bg-muted"
                          data-testid={`slot-${slot.id}`}
                        >
                          <div>
                            <p className="font-medium">{slot.date}</p>
                            <p className="text-sm text-muted-foreground">{formatTimeDisplay(slot.time)}</p>
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => deleteSlotMutation.mutate(slot.id)}
                            data-testid={`button-delete-slot-${slot.id}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-8 text-muted-foreground">
                      No availability slots set. Select a date and add time slots.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="portfolio">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Image</CardTitle>
                  <CardDescription>Upload or link a new portfolio image</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Upload Image</Label>
                    <ObjectUploader
                      onGetUploadParameters={handleGetUploadParameters}
                      onComplete={handleUploadComplete}
                      maxFileSize={10485760}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {uploadedImageUrl ? "Image Uploaded" : "Upload Image"}
                    </ObjectUploader>
                    {uploadedImageUrl && (
                      <p className="text-sm text-muted-foreground truncate">
                        Uploaded: {uploadedImageUrl}
                      </p>
                    )}
                  </div>

                  <div className="text-center text-sm text-muted-foreground">or</div>

                  <div className="space-y-2">
                    <Label htmlFor="imageUrl">Image URL</Label>
                    <Input
                      id="imageUrl"
                      placeholder="https://example.com/image.jpg"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      disabled={!!uploadedImageUrl}
                      data-testid="input-image-url"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="imageAlt">Image Description (optional)</Label>
                    <Input
                      id="imageAlt"
                      placeholder="Describe the image"
                      value={newImageAlt}
                      onChange={(e) => setNewImageAlt(e.target.value)}
                      data-testid="input-image-alt"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={newImageCategory} onValueChange={setNewImageCategory}>
                      <SelectTrigger data-testid="select-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={handleAddImage}
                    disabled={addImageMutation.isPending || (!newImageUrl && !uploadedImageUrl) || !newImageCategory}
                    className="w-full"
                    data-testid="button-add-image"
                  >
                    {addImageMutation.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Plus className="mr-2 h-4 w-4" />
                    )}
                    Add Image
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Images</CardTitle>
                  <CardDescription>Manage your portfolio gallery</CardDescription>
                </CardHeader>
                <CardContent>
                  {portfolioLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                  ) : portfolioImages && portfolioImages.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                      {portfolioImages.map((image) => (
                        <div
                          key={image.id}
                          className="relative group rounded-md overflow-hidden bg-muted"
                          data-testid={`portfolio-image-${image.id}`}
                        >
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button
                              size="icon"
                              variant="destructive"
                              onClick={() => deleteImageMutation.mutate(image.id)}
                              data-testid={`button-delete-image-${image.id}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 truncate">
                            {sessionTypeLabels[image.category] || image.category}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-8 text-muted-foreground">
                      No portfolio images yet. Add images to showcase your work.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
