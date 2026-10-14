import React from "react";
import { View, Listing } from "../types";
import { Button } from "./Button";
import { Icon } from "./Icon";

export function ActivityPage({
  navigate,
  listings,
  toggleResolved,
  deleteListing,
  open,
}: {
  navigate: (view: View) => void;
  listings: Listing[];
  toggleResolved: (id: number) => void;
  deleteListing: (id: number) => void;
  open: (item: Listing) => void;
}) {
  const userListings = listings.filter((l) => l.isUserCreated);
  const activeCount = userListings.filter((l) => !l.resolved).length;
  const resolvedCount = userListings.filter((l) => l.resolved).length;

  return (
    <main className="content activity-page">
      <div className="page-heading">
        <div>
          <span className="section-kicker">Tu espacio</span>
          <h1>Mi actividad</h1>
          <p>Administra tus reportes locales y conversaciones.</p>
        </div>
        <Button icon="Plus" onClick={() => navigate("publish")}>
          Nuevo reporte
        </Button>
      </div>
      <div className="activity-stats">
        <div>
          <span>
            <Icon name="Activity" />
          </span>
          <div>
            <strong>{activeCount}</strong>
            <small>Reportes activos</small>
          </div>
        </div>
        <div>
          <span>
            <Icon name="Message" />
          </span>
          <div>
            <strong>3</strong>
            <small>Conversaciones</small>
          </div>
        </div>
        <div>
          <span>
            <Icon name="Check" />
          </span>
          <div>
            <strong>{resolvedCount}</strong>
            <small>Objetos resueltos</small>
          </div>
        </div>
      </div>
      <section className="activity-panel">
        <div className="section-heading">
          <div>
            <h2>Tus reportes</h2>
            <p>Publicaciones que has creado en este navegador.</p>
          </div>
        </div>
        {userListings.length === 0 ? (
          <div className="empty-state" style={{ padding: "35px 20px" }}>
            <p>Aún no has publicado ningún reporte desde este dispositivo.</p>
            <Button icon="Plus" onClick={() => navigate("publish")}>
              Crear mi primer reporte
            </Button>
          </div>
        ) : (
          userListings.map((item) => (
            <article className="activity-row" key={item.id}>
              <img
                src={item.image}
                alt={item.title}
                style={{ cursor: "pointer" }}
                onClick={() => open(item)}
              />
              <div
                className="activity-info"
                style={{ cursor: "pointer" }}
                onClick={() => open(item)}
              >
                <span className={`status ${item.status.toLowerCase()}`}>
                  {item.resolved ? "Resuelto" : "Activo"}
                </span>
                <h3>{item.title}</h3>
                <p>
                  {item.municipality} · {item.date}
                </p>
              </div>
              <div className="activity-actions">
                <button
                  onClick={() => toggleResolved(item.id)}
                  aria-label={
                    item.resolved ? "Marcar como activo" : "Marcar como resuelto"
                  }
                >
                  {item.resolved ? "Reabrir" : "Resolver"}
                </button>
                <button
                  onClick={() => deleteListing(item.id)}
                  aria-label="Eliminar reporte"
                  style={{ color: "var(--error)" }}
                >
                  <Icon name="Trash" size={16} />
                </button>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}
