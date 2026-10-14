import React from "react";
import { Icon } from "./Icon";
import { Brand } from "./Brand";
import { municipalities } from "../data/mockData";

export function Header({
  location,
  setLocation,
  query,
  setQuery,
  runSearch,
}: {
  location: string;
  setLocation: (value: string) => void;
  query: string;
  setQuery: (value: string) => void;
  runSearch: () => void;
}) {
  return (
    <header className="topbar">
      <div className="mobile-brand">
        <Brand compact />
      </div>
      <form
        className="top-search"
        onSubmit={(event) => {
          event.preventDefault();
          runSearch();
        }}
      >
        <Icon name="Search" size={19} />
        <input
          aria-label="Buscar objetos"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="¿Qué objeto estás buscando?"
          value={query}
        />
      </form>
      <label className="location-picker">
        <Icon name="MapPin" size={18} />
        <select
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          aria-label="Seleccionar municipio"
        >
          {municipalities.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <Icon name="ChevronDown" size={15} />
      </label>
      <button className="icon-button" aria-label="Notificaciones">
        <Icon name="Bell" />
      </button>
      <button className="avatar" aria-label="Abrir perfil de usuario">
        LM
      </button>
    </header>
  );
}
