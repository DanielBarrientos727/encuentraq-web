import React from "react";
import { Listing } from "../types";
import { Icon } from "./Icon";

export function ListingCard({
  item,
  open,
  isFavorite,
  toggleFavorite,
}: {
  item: Listing;
  open: (item: Listing) => void;
  isFavorite: boolean;
  toggleFavorite: (id: number) => void;
}) {
  return (
    <article className="listing-card" onClick={() => open(item)}>
      <div className="card-image-wrap">
        <img src={item.image} alt={item.title} loading="lazy" />
        <span className={`status ${item.status.toLowerCase()}`}>
          {item.resolved ? "Resuelto" : item.status}
        </span>
        <button
          className={`save-button ${isFavorite ? "active-fav" : ""}`}
          aria-label={isFavorite ? "Quitar de favoritos" : "Guardar en favoritos"}
          onClick={(event) => {
            event.stopPropagation();
            toggleFavorite(item.id);
          }}
        >
          <Icon name={isFavorite ? "Heart" : "Bookmark"} size={18} />
        </button>
      </div>
      <div className="card-body">
        <span className="eyebrow">{item.category}</span>
        <h3>{item.title}</h3>
        <div className="metadata">
          <Icon name="MapPin" size={15} />
          <span>
            {item.municipality} · {item.place}
          </span>
        </div>
        <div className="metadata">
          <Icon name="Clock" size={15} />
          <span>{item.date}</span>
        </div>
      </div>
    </article>
  );
}
