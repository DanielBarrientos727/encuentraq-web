import React from "react";
import { View } from "../types";
import { Brand } from "./Brand";
import { Icon } from "./Icon";

export function Sidebar({
  view,
  navigate,
  favoritesCount,
}: {
  view: View;
  navigate: (view: View) => void;
  favoritesCount: number;
}) {
  return (
    <aside className="sidebar">
      <Brand />
      <nav>
        {[
          ["home", "Home", "Inicio"],
          ["search", "Search", "Buscar objetos"],
          ["publish", "Plus", "Publicar reporte"],
          ["activity", "Activity", "Mi actividad"],
          ["favorites", "Heart", `Favoritos (${favoritesCount})`],
        ].map(([id, icon, label]) => (
          <button
            key={id}
            className={view === id ? "active" : ""}
            onClick={() => navigate(id as View)}
          >
            <Icon name={icon} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-tip">
        <Icon name="Shield" />
        <strong>Devuelve con seguridad</strong>
        <p>Acuerda siempre la entrega en un lugar público y verifica el objeto.</p>
      </div>
      <div className="sidebar-footer">
        <span>EncuentraQ v1.0 (PWA)</span>
        <span>El Quindío se ayuda</span>
      </div>
    </aside>
  );
}
