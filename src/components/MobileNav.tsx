import React from "react";
import { View } from "../types";
import { Icon } from "./Icon";

export function MobileNav({
  view,
  navigate,
  favoritesCount,
}: {
  view: View;
  navigate: (view: View) => void;
  favoritesCount: number;
}) {
  return (
    <nav className="mobile-nav">
      {[
        ["home", "Home", "Inicio"],
        ["search", "Search", "Buscar"],
        ["publish", "Plus", "Publicar"],
        ["activity", "Activity", "Actividad"],
        ["favorites", "Heart", `Favoritos`],
      ].map(([id, icon, label]) => (
        <button
          key={id}
          className={`${view === id ? "active" : ""} ${
            id === "publish" ? "publish-tab" : ""
          }`}
          onClick={() => navigate(id as View)}
        >
          <span className="mobile-icon">
            <Icon name={icon} />
            {id === "favorites" && favoritesCount > 0 && (
              <span className="mobile-badge">{favoritesCount}</span>
            )}
          </span>
          <small>{label}</small>
        </button>
      ))}
    </nav>
  );
}
