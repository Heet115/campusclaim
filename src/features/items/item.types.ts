export interface Item {
  id: string;
  title: string;
  description: string;
  type: "lost" | "found";
  location: string;
  date: Date;
}
