export type View = "home" | "search" | "publish" | "activity" | "detail" | "favorites";
export type Status = "Perdido" | "Encontrado";

export type Listing = {
  id: number;
  title: string;
  status: Status;
  category: string;
  municipality: string;
  place: string;
  date: string;
  image: string;
  description: string;
  author: string;
  isUserCreated?: boolean;
  resolved?: boolean;
};
