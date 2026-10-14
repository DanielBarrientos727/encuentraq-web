import React from "react";
import { View, Listing } from "../types";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { ListingCard } from "./ListingCard";
import { categories } from "../data/mockData";

export function Home({
  navigate,
  open,
  setQuery,
  setCategory,
  listings,
  favorites,
  toggleFavorite,
}: {
  navigate: (view: View) => void;
  open: (item: Listing) => void;
  setQuery: (value: string) => void;
  setCategory: (value: string) => void;
  listings: Listing[];
  favorites: number[];
  toggleFavorite: (id: number) => void;
}) {
  const activeListings = listings.filter((l) => !l.resolved);

  return (
    <main className="content">
      <section className="hero">
        <div className="hero-copy">
          <span className="hero-kicker">
            <Icon name="MapPin" size={15} /> Comunidad del Quindío
          </span>
          <h1>
            Perdiste algo. <br />
            Alguien podría haberlo encontrado.
          </h1>
          <p>
            Busca reportes de objetos perdidos o ayuda a alguien a recuperar lo
            suyo en el Quindío. Datos locales y seguros en tu navegador.
          </p>
          <div className="hero-actions">
            <Button icon="Search" onClick={() => navigate("search")}>
              Buscar un objeto
            </Button>
            <Button
              variant="secondary"
              icon="Plus"
              onClick={() => navigate("publish")}
            >
              Publicar un reporte
            </Button>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="map-shape"></div>
          <div className="floating-card card-one">
            <span>
              <Icon name="Key" />
            </span>
            <div>
              <b>Llaves encontradas</b>
              <small>Armenia · hace 20 min</small>
            </div>
          </div>
          <div className="floating-card card-two">
            <span>
              <Icon name="Check" />
            </span>
            <div>
              <b>Objeto recuperado</b>
              <small>Gracias a la comunidad</small>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Explora fácilmente</span>
            <h2>¿Qué estás buscando?</h2>
          </div>
          <button className="text-link" onClick={() => navigate("search")}>
            Ver todas <Icon name="ChevronRight" size={16} />
          </button>
        </div>
        <div className="categories">
          {categories.map(([icon, label]) => (
            <button
              key={label}
              onClick={() => {
                setQuery(label);
                setCategory(label);
                navigate("search");
              }}
            >
              <span>
                <Icon name={icon} size={21} />
              </span>
              <small>{label}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Cerca de ti</span>
            <h2>Publicaciones recientes</h2>
          </div>
          <button className="text-link" onClick={() => navigate("search")}>
            Ver resultados <Icon name="ChevronRight" size={16} />
          </button>
        </div>
        <div className="listing-grid home-grid">
          {activeListings.slice(0, 4).map((item) => (
            <ListingCard
              item={item}
              key={item.id}
              open={open}
              isFavorite={favorites.includes(item.id)}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </section>

      <section className="quick-grid">
        <button
          className="quick-card found"
          onClick={() => {
            setCategory("Encontrado");
            navigate("search");
          }}
        >
          <span className="quick-icon">
            <Icon name="Check" />
          </span>
          <div>
            <small>Quiero ayudar</small>
            <h3>Encontré un objeto</h3>
            <p>Publica el reporte para encontrar a su dueño.</p>
          </div>
          <Icon name="ChevronRight" />
        </button>
        <button
          className="quick-card lost"
          onClick={() => {
            setCategory("Perdido");
            navigate("search");
          }}
        >
          <span className="quick-icon">
            <Icon name="Search" />
          </span>
          <div>
            <small>Necesito encontrar</small>
            <h3>Perdí un objeto</h3>
            <p>Cuéntale a la comunidad qué estás buscando.</p>
          </div>
          <Icon name="ChevronRight" />
        </button>
      </section>

      <section className="how">
        <div>
          <span className="section-kicker">Simple y comunitario</span>
          <h2>Recuperar algo puede ser más fácil</h2>
        </div>
        <div className="steps">
          <div>
            <span>01</span>
            <strong>Busca o publica</strong>
            <p>Revisa los reportes o cuéntanos qué pasó.</p>
          </div>
          <div>
            <span>02</span>
            <strong>Encuentra coincidencias</strong>
            <p>Filtra por municipio, fecha y categoría.</p>
          </div>
          <div>
            <span>03</span>
            <strong>Contacta con seguridad</strong>
            <p>Verifica la información y acuerda la entrega.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
