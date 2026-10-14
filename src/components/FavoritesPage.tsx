import React from "react";
import { View, Listing } from "../types";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { ListingCard } from "./ListingCard";

export function FavoritesPage({
  navigate,
  listings,
  favorites,
  toggleFavorite,
  open,
}: {
  navigate: (view: View) => void;
  listings: Listing[];
  favorites: number[];
  toggleFavorite: (id: number) => void;
  open: (item: Listing) => void;
}) {
  const favoriteListings = listings.filter((l) => favorites.includes(l.id));

  return (
    <main className="content">
      <div className="page-heading">
        <div>
          <span className="section-kicker">Guardados</span>
          <h1>Mis favoritos</h1>
          <p>Publicaciones que has guardado para consultar rápidamente.</p>
        </div>
      </div>
      {favoriteListings.length === 0 ? (
        <div className="empty-state">
          <span>
            <Icon name="Heart" size={30} />
          </span>
          <h2>No tienes favoritos guardados</h2>
          <p>
            Haz clic en el icono de guardar en cualquier tarjeta para añadirla a
            tus favoritos.
          </p>
          <Button onClick={() => navigate("search")}>
            Explorar publicaciones
          </Button>
        </div>
      ) : (
        <div className="listing-grid results-grid">
          {favoriteListings.map((item) => (
            <ListingCard
              item={item}
              key={item.id}
              open={open}
              isFavorite={true}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </main>
  );
}
