import { useState, useEffect } from "react";
import { View, Listing } from "./types";
import { loadListings, saveListings, loadFavorites, saveFavorites } from "./utils/storage";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { MobileNav } from "./components/MobileNav";
import { Home } from "./components/Home";
import { SearchResults } from "./components/SearchResults";
import { Publish } from "./components/Publish";
import { Detail } from "./components/Detail";
import { ActivityPage } from "./components/ActivityPage";
import { FavoritesPage } from "./components/FavoritesPage";

export default function App() {
  const [view, setView] = useState<View>("home");
  const [previousView, setPreviousView] = useState<View>("home");
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("Todo el Quindío");
  const [category, setCategory] = useState("");
  const [listings, setListings] = useState<Listing[]>(() => loadListings());
  const [favorites, setFavorites] = useState<number[]>(() => loadFavorites());
  const [selected, setSelected] = useState<Listing>(listings[0] || null);

  useEffect(() => {
    saveListings(listings);
  }, [listings]);

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  function navigate(next: View) {
    setView(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function open(item: Listing) {
    setPreviousView(view);
    setSelected(item);
    navigate("detail");
  }

  function toggleFavorite(id: number) {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  function addListing(newListingData: Omit<Listing, "id" | "date">) {
    const newId = Date.now();
    const newListing: Listing = {
      ...newListingData,
      id: newId,
      date: "Hoy, " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setListings((prev) => [newListing, ...prev]);
  }

  function toggleResolved(id: number) {
    setListings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, resolved: !item.resolved } : item))
    );
  }

  function deleteListing(id: number) {
    if (window.confirm("¿Estás seguro de que deseas eliminar este reporte?")) {
      setListings((prev) => prev.filter((item) => item.id !== id));
    }
  }

  return (
    <div className="app-shell">
      <Sidebar view={view} navigate={navigate} favoritesCount={favorites.length} />
      <div className="app-main">
        <Header
          location={location}
          setLocation={setLocation}
          query={query}
          setQuery={setQuery}
          runSearch={() => navigate("search")}
        />
        {view === "home" && (
          <Home
            navigate={navigate}
            open={open}
            setQuery={setQuery}
            setCategory={setCategory}
            listings={listings}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        )}
        {view === "search" && (
          <SearchResults
            query={query}
            setQuery={setQuery}
            location={location}
            setLocation={setLocation}
            category={category}
            setCategory={setCategory}
            open={open}
            listings={listings}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        )}
        {view === "publish" && (
          <Publish
            onDone={() => navigate("search")}
            addListing={addListing}
          />
        )}
        {view === "activity" && (
          <ActivityPage
            navigate={navigate}
            listings={listings}
            toggleResolved={toggleResolved}
            deleteListing={deleteListing}
            open={open}
          />
        )}
        {view === "favorites" && (
          <FavoritesPage
            navigate={navigate}
            listings={listings}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            open={open}
          />
        )}
        {view === "detail" && selected && (
          <Detail
            item={selected}
            back={() => navigate(previousView)}
            isFavorite={favorites.includes(selected.id)}
            toggleFavorite={toggleFavorite}
          />
        )}
      </div>
      <MobileNav view={view} navigate={navigate} favoritesCount={favorites.length} />
    </div>
  );
}
