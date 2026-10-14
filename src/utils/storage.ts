import { Listing } from "../types";
import { initialListings } from "../data/mockData";

const LISTINGS_KEY = "encuentraq_listings_v1";
const FAVORITES_KEY = "encuentraq_favorites_v1";

export function loadListings(): Listing[] {
  try {
    const stored = localStorage.getItem(LISTINGS_KEY);
    if (stored) {
      const parsed: Listing[] = JSON.parse(stored);
      // Ensure initial listings are present if localStorage was empty or had fewer items, plus user listings
      return parsed;
    }
  } catch (e) {
    console.error("Error loading listings from localStorage", e);
  }
  return initialListings;
}

export function saveListings(listings: Listing[]): void {
  try {
    localStorage.setItem(LISTINGS_KEY, JSON.stringify(listings));
  } catch (e) {
    console.error("Error saving listings to localStorage", e);
  }
}

export function loadFavorites(): number[] {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Error loading favorites from localStorage", e);
  }
  return [];
}

export function saveFavorites(favorites: number[]): void {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (e) {
    console.error("Error saving favorites to localStorage", e);
  }
}
