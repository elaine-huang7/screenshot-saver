export type ScreenshotCategory =
  | "Event"
  | "Shopping"
  | "Travel"
  | "Food"
  | "School"
  | "Work"
  | "Entertainment"
  | "Other";

export type ScreenshotItem = {
  id: string;
  imageUri: string;
  title: string;
  summary: string;
  action: string;
  category: ScreenshotCategory;
  status: "active";
  createdAt: string;
  metadata?: {
    eventDate?: string;
    location?: string;
    url?: string;
    price?: string;
  };
};
