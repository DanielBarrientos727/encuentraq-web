import React, { useState } from "react";
import { Listing } from "../types";
import { Button } from "./Button";
import { Icon } from "./Icon";

export function Detail({
  item,
  back,
  isFavorite,
  toggleFavorite,
}: {
  item: Listing;
  back: () => void;
  isFavorite: boolean;
  toggleFavorite: (id: number) => void;
}) {
  const [contacted, setContacted] = useState(false);
  const initials = item.author
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <main className="content detail-page">
      <button className="back-link" onClick={back}>
        <Icon name="ArrowLeft" size={18} /> Volver a resultados
      </button>
      <div className="detail-layout">
        <div className="detail-main">
          <div className="detail-image">
            <img src={item.image} alt={item.title} />
            <span className={`status ${item.status.toLowerCase()}`}>
              {item.resolved ? "Resuelto" : item.status}
            </span>
          </div>
          <div className="detail-content">
            <div className="detail-title">
              <div>
                <span className="eyebrow">{item.category}</span>
                <h1>{item.title}</h1>
              </div>
              <button
                className={`icon-button ${isFavorite ? "active-fav" : ""}`}
                aria-label={
                  isFavorite ? "Quitar de favoritos" : "Guardar publicación"
                }
                onClick={() => toggleFavorite(item.id)}
              >
                <Icon name={isFavorite ? "Heart" : "Bookmark"} />
              </button>
            </div>
            <div className="detail-meta">
              <span>
                <Icon name="MapPin" />
                {item.municipality} · {item.place}
              </span>
              <span>
                <Icon name="Clock" />
                {item.date}
              </span>
            </div>
            <hr />
            <h2>Descripción</h2>
            <p>{item.description}</p>
            <div className="safety-box">
              <Icon name="Shield" />
              <div>
                <strong>Protege los detalles importantes</strong>
                <p>
                  Para verificar al dueño, no compartas públicamente toda la
                  información del objeto ni documentos completos.
                </p>
              </div>
            </div>
          </div>
        </div>
        <aside className="contact-card">
          <div className="reporter">
            <span>{initials}</span>
            <div>
              <small>Publicado por</small>
              <strong>{item.author}</strong>
              <em>Miembro verificado (Local)</em>
            </div>
          </div>
          <hr />
          <p>
            {item.status === "Encontrado"
              ? "¿Crees que este objeto es tuyo?"
              : "¿Encontraste este objeto?"}
          </p>
          <small>Inicia una conversación segura dentro de EncuentraQ.</small>
          <Button
            icon={contacted ? "Check" : "Message"}
            onClick={() => setContacted(true)}
          >
            {contacted ? "Solicitud enviada" : "Contactar a la persona"}
          </Button>
          <div className="contact-note">
            <Icon name="Shield" size={16} /> No compartas datos sensibles antes de
            verificar la coincidencia en persona en un lugar público.
          </div>
        </aside>
      </div>
    </main>
  );
}
