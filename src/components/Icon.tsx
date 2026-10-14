import React, { ReactNode } from "react";

export function Icon({
  name,
  size = 20,
  strokeWidth = 1.9,
}: {
  name: string;
  size?: number;
  strokeWidth?: number;
}) {
  const paths: Record<string, ReactNode> = {
    Home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10M9 20v-6h6v6" /></>,
    Search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    Plus: <><path d="M12 5v14M5 12h14" /></>,
    Activity: <><path d="M4 5h16v14H4zM8 9h8M8 13h6" /></>,
    MapPin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    ChevronDown: <path d="m7 9 5 5 5-5" />,
    ChevronRight: <path d="m9 6 6 6-6 6" />,
    ArrowLeft: <path d="m15 18-6-6 6-6" />,
    Sliders: <><path d="M4 7h10M18 7h2M4 17h2M10 17h10" /><circle cx="16" cy="7" r="2" /><circle cx="8" cy="17" r="2" /></>,
    Bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
    Key: <><circle cx="8" cy="15" r="4" /><path d="m11 12 8-8M16 7l2 2M14 9l2 2" /></>,
    Id: <><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="8" cy="11" r="2" /><path d="M5.5 16c.8-2 4.2-2 5 0M13 10h5M13 14h4" /></>,
    Phone: <><rect x="6" y="2" width="12" height="20" rx="2" /><path d="M10 18h4" /></>,
    Headphones: <><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><path d="M4 14h3v6H5a1 1 0 0 1-1-1ZM20 14h-3v6h2a1 1 0 0 0 1-1Z" /></>,
    Bag: <><path d="M5 8h14l1 13H4Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>,
    Shirt: <path d="m8 4-5 3 3 5 2-1v9h8v-9l2 1 3-5-5-3c-1 2-7 2-8 0Z" />,
    Paw: <><circle cx="12" cy="15" r="4" /><circle cx="6" cy="10" r="2" /><circle cx="10" cy="6" r="2" /><circle cx="18" cy="10" r="2" /><circle cx="15" cy="6" r="2" /></>,
    Grid: <><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></>,
    Clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    Shield: <><path d="M12 3 4 6v5c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6Z" /><path d="m9 12 2 2 4-4" /></>,
    Upload: <><path d="M12 16V4M7 9l5-5 5 5" /><path d="M5 15v5h14v-5" /></>,
    Check: <path d="m5 12 4 4L19 6" />,
    Bookmark: <path d="M6 3h12v18l-6-4-6 4Z" />,
    Message: <path d="M4 5h16v12H8l-4 4Z" />,
    Calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18" /></>,
    Trash: <><path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></>,
    Heart: <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />,
  };
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    >
      {paths[name] || paths.Grid}
    </svg>
  );
}
