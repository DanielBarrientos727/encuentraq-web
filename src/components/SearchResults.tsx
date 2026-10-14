import React, { useMemo, useState } from "react";
import { Listing } from "../types";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { ListingCard } from "./ListingCard";
import { categories, municipalities } from "../data/mockData";

export function SearchResults({
  query,
  setQuery,
  location,
  setLocation,
  category,
  setCategory,
  open,
  listings,
  favorites,
  toggleFavorite,
}: {
  query: string;
  setQuery: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  open: (item: Listing) => void;
  listings: Listing[];
  favorites: number[];
  toggleFavorite: (id: number) => void;
}) {
  const [tab, setTab] = useState("Todos");
  const [showFilters, setShowFilters] = useState(false);
  const [dateFilter, setDateFilter] = useState("Cualquier fecha");
  const [sortBy, setSortBy] = useState("Más recientes");
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(() => {
    let result = listings.filter((item) => {
      const textMatch =
        !query ||
        `${item.title} ${item.category} ${item.description} ${item.place}`
          .toLowerCase()
          .includes(query.toLowerCase());
      const locationMatch =
        location === "Todo el Quindío" || item.municipality === location;
      const statusMatch = tab === "Todos" || item.status === tab.slice(0, -1);
      const categoryMatch =
        !category ||
        category === "Todos" ||
        category === item.category ||
        category === item.status ||
        (category === "Documentos" && item.category === "Documentos y carnés") ||
        (category === "Carteras" && item.category === "Carteras y bolsos") ||
        (category === "Audífonos" && item.category === "Audífonos y accesorios");
      return textMatch && locationMatch && statusMatch && categoryMatch;
    });

    // Sort
    result.sort((a, b) => {
      if (sortBy === "Más recientes") {
        return b.id - a.id;
      } else {
        return a.id - b.id;
      }
    });

    return result;
  }, [listings, query, location, tab, category, sortBy]);

  function applyFilters() {
    setShowFilters(false);
    setLoading(true);
    window.setTimeout(() => setLoading(false), 400);
  }

  return (
    <main className="content search-page">
      <div className="page-heading">
        <div>
          <span className="section-kicker">Explorar publicaciones</span>
          <h1>Encuentra lo que buscas</h1>
          <p>Reportes recientes y comunitarios de todo el Quindío.</p>
        </div>
      </div>
      <div className="search-tool">
        <Icon name="Search" />
        <input
          aria-label="Buscar objetos"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Ej. llaves, cartera, audífonos, Armenia..."
        />
        {query && (
          <button aria-label="Limpiar búsqueda" onClick={() => setQuery("")}>
            Limpiar
          </button>
        )}
      </div>
      <div className="results-layout">
        <aside className={`filters ${showFilters ? "show" : ""}`}>
          <div className="filter-mobile-head">
            <strong>Filtrar resultados</strong>
            <button
              aria-label="Cerrar filtros"
              onClick={() => setShowFilters(false)}
            >
              Cerrar
            </button>
          </div>
          <div className="filter-title">
            <strong>Filtros</strong>
            <button
              onClick={() => {
                setCategory("");
                setLocation("Todo el Quindío");
                setDateFilter("Cualquier fecha");
              }}
            >
              Limpiar filtros
            </button>
          </div>
          <label>
            Municipio
            <select
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            >
              {municipalities.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            Categoría
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="">Todas las categorías</option>
              {categories.map(([, item]) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            Fecha
            <select
              value={dateFilter}
              onChange={(event) => setDateFilter(event.target.value)}
            >
              <option>Cualquier fecha</option>
              <option>Hoy</option>
              <option>Últimos 7 días</option>
              <option>Último mes</option>
            </select>
          </label>
          <Button onClick={applyFilters} className="filter-apply">
            Aplicar filtros
          </Button>
        </aside>
        <section className="results">
          <div className="results-toolbar">
            <div className="tabs">
              {["Todos", "Perdidos", "Encontrados"].map((item) => (
                <button
                  className={tab === item ? "active" : ""}
                  key={item}
                  onClick={() => setTab(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="toolbar-right">
              <button
                className="filter-trigger"
                onClick={() => setShowFilters(true)}
              >
                <Icon name="Sliders" size={17} /> Filtrar
              </button>
              <label>
                Ordenar por{" "}
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                >
                  <option>Más recientes</option>
                  <option>Más antiguos</option>
                </select>
              </label>
            </div>
          </div>
          <div className="result-count">
            <strong>{filtered.length} resultados</strong>
            {(location !== "Todo el Quindío" || category || query) && (
              <span>Filtros activos</span>
            )}
          </div>
          {loading ? (
            <div className="listing-grid">
              {[1, 2, 3, 4].map((item) => (
                <div className="skeleton-card" key={item}>
                  <div></div>
                  <span></span>
                  <span></span>
                  <small></small>
                </div>
              ))}
            </div>
          ) : filtered.length ? (
            <div className="listing-grid results-grid">
              {filtered.map((item) => (
                <ListingCard
                  item={item}
                  key={item.id}
                  open={open}
                  isFavorite={favorites.includes(item.id)}
                  toggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span>
                <Icon name="Search" size={30} />
              </span>
              <h2>No encontramos coincidencias</h2>
              <p>
                Prueba con una palabra más general o elimina algunos filtros.
              </p>
              <Button
                onClick={() => {
                  setQuery("");
                  setCategory("");
                  setLocation("Todo el Quindío");
                }}
              >
                Ver todas las publicaciones
              </Button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
