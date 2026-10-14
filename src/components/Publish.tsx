import React, { FormEvent, useState } from "react";
import { Listing, Status } from "../types";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { categories, municipalities } from "../data/mockData";

export function Publish({
  onDone,
  addListing,
}: {
  onDone: () => void;
  addListing: (listing: Omit<Listing, "id" | "date">) => void;
}) {
  const [type, setType] = useState<Status>("Perdido");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(
    "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=900&q=80"
  );
  const [submitted, setSubmitted] = useState(false);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setImage(uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!title || !category || !municipality || !place || !description) return;

    addListing({
      title,
      status: type,
      category,
      municipality,
      place,
      image,
      description,
      author: "Tú (Anónimo / Local)",
      isUserCreated: true,
      resolved: false,
    });

    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (submitted)
    return (
      <main className="content publish-page">
        <div className="success-state">
          <span>
            <Icon name="Check" size={34} />
          </span>
          <div className="success-tag">Reporte publicado localmente</div>
          <h1>Tu reporte ya está guardado</h1>
          <p>
            Se ha guardado en tu navegador. La comunidad local del Quindío
            podrá verlo en este dispositivo.
          </p>
          <div className="success-summary">
            <div>
              <Icon name={type === "Perdido" ? "Search" : "Check"} />
              <span>
                <small>Tipo de reporte</small>
                <strong>Objeto {type.toLowerCase()}</strong>
              </span>
            </div>
            <span>Publicado ahora</span>
          </div>
          <div className="hero-actions">
            <Button onClick={onDone}>Ver publicaciones</Button>
            <Button
              variant="secondary"
              onClick={() => {
                setSubmitted(false);
                setTitle("");
                setDescription("");
                setPlace("");
              }}
            >
              Crear otro reporte
            </Button>
          </div>
        </div>
      </main>
    );

  return (
    <main className="content publish-page">
      <div className="page-heading compact">
        <div>
          <span className="section-kicker">Ayuda a la comunidad</span>
          <h1>Publica un reporte</h1>
          <p>
            Completa la información que recuerdes. Los datos se guardan de
            forma segura en tu navegador.
          </p>
        </div>
        <div className="privacy-note">
          <Icon name="Shield" />
          <span>
            <strong>Tu privacidad importa</strong>
            <small>No publicaremos datos personales ni sensibles.</small>
          </span>
        </div>
      </div>
      <form className="publish-form" onSubmit={submit}>
        <section className="form-section">
          <div className="form-section-title">
            <span>1</span>
            <div>
              <h2>¿Qué ocurrió?</h2>
              <p>Selecciona el tipo de reporte que quieres crear.</p>
            </div>
          </div>
          <div className="type-options">
            <button
              type="button"
              aria-pressed={type === "Perdido"}
              className={type === "Perdido" ? "selected" : ""}
              onClick={() => setType("Perdido")}
            >
              <span>
                <Icon name="Search" />
              </span>
              <div>
                <strong>Perdí un objeto</strong>
                <small>Quiero que la comunidad me ayude a encontrarlo.</small>
              </div>
              <i>{type === "Perdido" && <Icon name="Check" size={15} />}</i>
            </button>
            <button
              type="button"
              aria-pressed={type === "Encontrado"}
              className={type === "Encontrado" ? "selected" : ""}
              onClick={() => setType("Encontrado")}
            >
              <span>
                <Icon name="Check" />
              </span>
              <div>
                <strong>Encontré un objeto</strong>
                <small>Quiero ayudar a devolverlo a su dueño.</small>
              </div>
              <i>{type === "Encontrado" && <Icon name="Check" size={15} />}</i>
            </button>
          </div>
        </section>
        <section className="form-section">
          <div className="form-section-title">
            <span>2</span>
            <div>
              <h2>Cuéntanos sobre el objeto</h2>
              <p>
                Incluye detalles claros, pero reserva alguno para verificar al
                dueño.
              </p>
            </div>
          </div>
          <div className="form-grid">
            <label className="full">
              Título del reporte{" "}
              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej. Llaves con llavero azul"
              />
              <small>Usa un nombre corto y fácil de reconocer.</small>
            </label>
            <label>
              Categoría{" "}
              <select
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled>
                  Selecciona una categoría
                </option>
                {categories.map(([, item]) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label>
              Fecha aproximada{" "}
              <span className="input-icon">
                <Icon name="Calendar" size={17} />
                <input required type="date" defaultValue={new Date().toISOString().split("T")[0]} />
              </span>
            </label>
            <label className="full">
              Descripción{" "}
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe el color, tamaño y características principales del objeto..."
              />
              <small>
                Evita compartir números de documento o información sensible.
              </small>
            </label>
            <label className="full">
              Imagen del objeto{" "}
              <span className="upload-box">
                <Icon name="Upload" />
                <strong>Sube una foto o arrástrala aquí</strong>
                <small>PNG o JPG, máximo 5 MB · Opcional</small>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </span>
            </label>
          </div>
        </section>
        <section className="form-section">
          <div className="form-section-title">
            <span>3</span>
            <div>
              <h2>Ubicación y contacto</h2>
              <p>Una referencia aproximada es suficiente.</p>
            </div>
          </div>
          <div className="form-grid">
            <label>
              Municipio{" "}
              <select
                required
                value={municipality}
                onChange={(e) => setMunicipality(e.target.value)}
              >
                <option value="" disabled>
                  Selecciona un municipio
                </option>
                {municipalities.slice(1).map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label>
              Lugar aproximado{" "}
              <input
                required
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                placeholder="Ej. Cerca al Parque Sucre"
              />
            </label>
            <label className="full">
              Preferencia de contacto{" "}
              <select>
                <option>Mensajes dentro de EncuentraQ</option>
                <option>Correo electrónico</option>
                <option>WhatsApp (solo al confirmar)</option>
              </select>
            </label>
          </div>
        </section>
        <div className="form-submit">
          <p>
            <Icon name="Shield" size={17} /> Podrás administrar tu reporte desde Mi
            actividad.
          </p>
          <Button type="submit" icon="Check">
            Publicar reporte
          </Button>
        </div>
      </form>
    </main>
  );
}
