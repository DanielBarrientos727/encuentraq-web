import { FormEvent, ReactNode, useMemo, useState } from "react";

type View = "home" | "search" | "publish" | "activity" | "detail";
type Status = "Perdido" | "Encontrado";

type Listing = {
  id: number;
  title: string;
  status: Status;
  category: string;
  municipality: string;
  place: string;
  date: string;
  image: string;
  description: string;
  author: string;
};

const listings: Listing[] = [
  {
    id: 1,
    title: "Llaves con llavero azul",
    status: "Encontrado",
    category: "Llaves",
    municipality: "Armenia",
    place: "Parque Sucre",
    date: "Hoy, 9:40 a. m.",
    image:
      "https://images.unsplash.com/photo-1643804926339-e94f0a655185?auto=format&fit=crop&w=900&q=80",
    description:
      "Encontré un juego de llaves con un llavero azul cerca de una banca. Para entregarlas, cuéntame qué detalle tiene el llavero.",
    author: "Mariana R.",
  },
  {
    id: 2,
    title: "Cartera negra pequeña",
    status: "Perdido",
    category: "Carteras y bolsos",
    municipality: "Calarcá",
    place: "Sector plaza principal",
    date: "Ayer, 6:15 p. m.",
    image:
      "https://images.unsplash.com/photo-1579014134953-1580d7f123f3?auto=format&fit=crop&w=900&q=80",
    description:
      "Perdí una cartera de cuero negra. Tenía algunos documentos importantes y una tarjeta de transporte.",
    author: "Andrés M.",
  },
  {
    id: 3,
    title: "Audífonos negros de diadema",
    status: "Encontrado",
    category: "Tecnología",
    municipality: "Salento",
    place: "Terminal de transportes",
    date: "12 jun., 3:20 p. m.",
    image:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80",
    description:
      "Fueron encontrados en la sala de espera. Están guardados en un lugar seguro.",
    author: "Camilo V.",
  },
  {
    id: 4,
    title: "Llave plateada de apartamento",
    status: "Perdido",
    category: "Llaves",
    municipality: "Montenegro",
    place: "Vía al Parque del Café",
    date: "11 jun., 11:05 a. m.",
    image:
      "https://images.unsplash.com/photo-1576153645383-e03c25dafed5?auto=format&fit=crop&w=900&q=80",
    description:
      "Llave plateada con argolla sencilla. Pudo caerse cerca de la entrada de un local.",
    author: "Laura P.",
  },
  {
    id: 5,
    title: "Billetera café con documentos",
    status: "Encontrado",
    category: "Documentos y carnés",
    municipality: "Circasia",
    place: "Parque Bolívar",
    date: "10 jun., 4:30 p. m.",
    image:
      "https://images.unsplash.com/photo-1637486069202-b1163268c240?auto=format&fit=crop&w=900&q=80",
    description:
      "La billetera fue entregada en un comercio cercano. El dueño puede validar sus datos.",
    author: "Tienda El Roble",
  },
  {
    id: 6,
    title: "Audífonos grises con cable",
    status: "Perdido",
    category: "Audífonos y accesorios",
    municipality: "La Tebaida",
    place: "Aeropuerto El Edén",
    date: "9 jun., 8:10 a. m.",
    image:
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=80",
    description:
      "Audífonos grises guardados en un estuche pequeño de tela.",
    author: "Sofía L.",
  },
];

const categories = [
  ["Id", "Documentos"],
  ["Key", "Llaves"],
  ["Phone", "Tecnología"],
  ["Headphones", "Audífonos"],
  ["Bag", "Carteras"],
  ["Shirt", "Ropa"],
  ["Paw", "Mascotas"],
  ["Grid", "Otros"],
];

const municipalities = [
  "Todo el Quindío",
  "Armenia",
  "Calarcá",
  "La Tebaida",
  "Montenegro",
  "Circasia",
  "Quimbaya",
  "Salento",
  "Filandia",
];

function Icon({
  name,
  size = 20,
  strokeWidth = 1.9,
}: {
  name: string;
  size?: number;
  strokeWidth?: number;
}) {
  const paths: Record<string, ReactNode> = {
    Home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10M9 20v-6h6v6" /></>,
    Search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    Plus: <><path d="M12 5v14M5 12h14" /></>,
    Activity: <><path d="M4 5h16v14H4zM8 9h8M8 13h6" /></>,
    MapPin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    ChevronDown: <path d="m7 9 5 5 5-5" />,
    ChevronRight: <path d="m9 6 6 6-6 6" />,
    ArrowLeft: <path d="m15 18-6-6 6-6" />,
    Sliders: <><path d="M4 7h10M18 7h2M4 17h2M10 17h10" /><circle cx="16" cy="7" r="2" /><circle cx="8" cy="17" r="2" /></>,
    Bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
    Key: <><circle cx="8" cy="15" r="4" /><path d="m11 12 8-8M16 7l2 2M14 9l2 2" /></>,
    Id: <><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="8" cy="11" r="2" /><path d="M5.5 16c.8-2 4.2-2 5 0M13 10h5M13 14h4" /></>,
    Phone: <><rect x="6" y="2" width="12" height="20" rx="2" /><path d="M10 18h4" /></>,
    Headphones: <><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><path d="M4 14h3v6H5a1 1 0 0 1-1-1ZM20 14h-3v6h2a1 1 0 0 0 1-1Z" /></>,
    Bag: <><path d="M5 8h14l1 13H4Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>,
    Shirt: <path d="m8 4-5 3 3 5 2-1v9h8v-9l2 1 3-5-5-3c-1 2-7 2-8 0Z" />,
    Paw: <><circle cx="12" cy="15" r="4" /><circle cx="6" cy="10" r="2" /><circle cx="10" cy="6" r="2" /><circle cx="18" cy="10" r="2" /><circle cx="15" cy="6" r="2" /></>,
    Grid: <><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></>,
    Clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    Shield: <><path d="M12 3 4 6v5c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6Z" /><path d="m9 12 2 2 4-4" /></>,
    Upload: <><path d="M12 16V4M7 9l5-5 5 5" /><path d="M5 15v5h14v-5" /></>,
    Check: <path d="m5 12 4 4L19 6" />,
    Bookmark: <path d="M6 3h12v18l-6-4-6 4Z" />,
    Message: <path d="M4 5h16v12H8l-4 4Z" />,
    Calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18" /></>,
  };
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    >
      {paths[name] || paths.Grid}
    </svg>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="brand">
      <div className="brand-mark">
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <path d="M20 4C12.3 4 6 10.1 6 17.7c0 8.8 10.6 16.4 13.1 18.1.5.3 1.2.3 1.7 0C23.4 34 34 26.5 34 17.7 34 10.1 27.7 4 20 4Z" />
          <path d="m14.5 18.5 3.8 3.8 7.7-8" />
          <path d="M26.5 27.5c2.2-.1 4.1.6 5.5 2.2-3 .6-5.5-.1-7-2" />
        </svg>
      </div>
      {!compact && (
        <div>
          <strong>EncuentraQ</strong>
          <span>El Quindío se ayuda</span>
        </div>
      )}
    </div>
  );
}

function Button({
  children,
  variant = "primary",
  icon,
  onClick,
  type = "button",
  className = "",
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "quiet";
  icon?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}) {
  return (
    <button className={`button ${variant} ${className}`} onClick={onClick} type={type}>
      {icon && <Icon name={icon} size={18} />}
      {children}
    </button>
  );
}

function Header({
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
      <div className="mobile-brand"><Brand compact /></div>
      <form className="top-search" onSubmit={(event) => { event.preventDefault(); runSearch(); }}>
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
        <select value={location} onChange={(event) => setLocation(event.target.value)}>
          {municipalities.map((item) => <option key={item}>{item}</option>)}
        </select>
        <Icon name="ChevronDown" size={15} />
      </label>
      <button className="icon-button" aria-label="Notificaciones"><Icon name="Bell" /></button>
      <button className="avatar" aria-label="Abrir perfil">LM</button>
    </header>
  );
}

function Sidebar({ view, navigate }: { view: View; navigate: (view: View) => void }) {
  return (
    <aside className="sidebar">
      <Brand />
      <nav>
        {[
          ["home", "Home", "Inicio"],
          ["search", "Search", "Buscar objetos"],
          ["publish", "Plus", "Publicar reporte"],
          ["activity", "Activity", "Mi actividad"],
        ].map(([id, icon, label]) => (
          <button key={id} className={view === id ? "active" : ""} onClick={() => navigate(id as View)}>
            <Icon name={icon} /><span>{label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-tip">
        <Icon name="Shield" />
        <strong>Devuelve con seguridad</strong>
        <p>Acuerda siempre la entrega en un lugar público y verifica el objeto.</p>
      </div>
      <div className="sidebar-footer">
        <span>EncuentraQ v0.1</span>
        <span>Hecho para el Quindío</span>
      </div>
    </aside>
  );
}

function MobileNav({ view, navigate }: { view: View; navigate: (view: View) => void }) {
  return (
    <nav className="mobile-nav">
      {[
        ["home", "Home", "Inicio"],
        ["search", "Search", "Buscar"],
        ["publish", "Plus", "Publicar"],
        ["activity", "Activity", "Actividad"],
      ].map(([id, icon, label]) => (
        <button key={id} className={`${view === id ? "active" : ""} ${id === "publish" ? "publish-tab" : ""}`} onClick={() => navigate(id as View)}>
          <span className="mobile-icon"><Icon name={icon} /></span><small>{label}</small>
        </button>
      ))}
    </nav>
  );
}

function ListingCard({ item, open }: { item: Listing; open: (item: Listing) => void }) {
  return (
    <article className="listing-card" onClick={() => open(item)}>
      <div className="card-image-wrap">
        <img src={item.image} alt={item.title} />
        <span className={`status ${item.status.toLowerCase()}`}>{item.status}</span>
        <button className="save-button" aria-label="Guardar publicación" onClick={(event) => event.stopPropagation()}>
          <Icon name="Bookmark" size={18} />
        </button>
      </div>
      <div className="card-body">
        <span className="eyebrow">{item.category}</span>
        <h3>{item.title}</h3>
        <div className="metadata"><Icon name="MapPin" size={15} /><span>{item.municipality} · {item.place}</span></div>
        <div className="metadata"><Icon name="Clock" size={15} /><span>{item.date}</span></div>
      </div>
    </article>
  );
}

function Home({
  navigate,
  open,
  setQuery,
  setCategory,
}: {
  navigate: (view: View) => void;
  open: (item: Listing) => void;
  setQuery: (value: string) => void;
  setCategory: (value: string) => void;
}) {
  return (
    <main className="content">
      <section className="hero">
        <div className="hero-copy">
          <span className="hero-kicker"><Icon name="MapPin" size={15} /> Comunidad del Quindío</span>
          <h1>Perdiste algo. <br />Alguien podría haberlo encontrado.</h1>
          <p>Busca reportes de objetos perdidos o ayuda a alguien a recuperar lo suyo en el Quindío.</p>
          <div className="hero-actions">
            <Button icon="Search" onClick={() => navigate("search")}>Buscar un objeto</Button>
            <Button variant="secondary" icon="Plus" onClick={() => navigate("publish")}>Publicar un reporte</Button>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="map-shape"></div>
          <div className="floating-card card-one"><span><Icon name="Key" /></span><div><b>Llaves encontradas</b><small>Armenia · hace 20 min</small></div></div>
          <div className="floating-card card-two"><span><Icon name="Check" /></span><div><b>Objeto recuperado</b><small>Gracias a la comunidad</small></div></div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div><span className="section-kicker">Explora fácilmente</span><h2>¿Qué estás buscando?</h2></div>
          <button className="text-link" onClick={() => navigate("search")}>Ver todas <Icon name="ChevronRight" size={16} /></button>
        </div>
        <div className="categories">
          {categories.map(([icon, label]) => (
            <button key={label} onClick={() => { setQuery(label); setCategory(label); navigate("search"); }}>
              <span><Icon name={icon} size={21} /></span><small>{label}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div><span className="section-kicker">Cerca de ti</span><h2>Publicaciones recientes</h2></div>
          <button className="text-link" onClick={() => navigate("search")}>Ver resultados <Icon name="ChevronRight" size={16} /></button>
        </div>
        <div className="listing-grid home-grid">{listings.slice(0, 4).map((item) => <ListingCard item={item} key={item.id} open={open} />)}</div>
      </section>

      <section className="quick-grid">
        <button className="quick-card found" onClick={() => { setCategory("Encontrado"); navigate("search"); }}>
          <span className="quick-icon"><Icon name="Check" /></span>
          <div><small>Quiero ayudar</small><h3>Encontré un objeto</h3><p>Publica el reporte para encontrar a su dueño.</p></div>
          <Icon name="ChevronRight" />
        </button>
        <button className="quick-card lost" onClick={() => { setCategory("Perdido"); navigate("search"); }}>
          <span className="quick-icon"><Icon name="Search" /></span>
          <div><small>Necesito encontrar</small><h3>Perdí un objeto</h3><p>Cuéntale a la comunidad qué estás buscando.</p></div>
          <Icon name="ChevronRight" />
        </button>
      </section>

      <section className="how">
        <div><span className="section-kicker">Simple y comunitario</span><h2>Recuperar algo puede ser más fácil</h2></div>
        <div className="steps">
          <div><span>01</span><strong>Busca o publica</strong><p>Revisa los reportes o cuéntanos qué pasó.</p></div>
          <div><span>02</span><strong>Encuentra coincidencias</strong><p>Filtra por municipio, fecha y categoría.</p></div>
          <div><span>03</span><strong>Contacta con seguridad</strong><p>Verifica la información y acuerda la entrega.</p></div>
        </div>
      </section>
    </main>
  );
}

function SearchResults({
  query,
  setQuery,
  location,
  setLocation,
  category,
  setCategory,
  open,
}: {
  query: string;
  setQuery: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  open: (item: Listing) => void;
}) {
  const [tab, setTab] = useState("Todos");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const filtered = useMemo(() => listings.filter((item) => {
    const textMatch = !query || `${item.title} ${item.category}`.toLowerCase().includes(query.toLowerCase());
    const locationMatch = location === "Todo el Quindío" || item.municipality === location;
    const statusMatch = tab === "Todos" || item.status === tab.slice(0, -1);
    const categoryMatch = !category || category === "Todos" || category === item.category || category === item.status ||
      (category === "Documentos" && item.category === "Documentos y carnés") ||
      (category === "Carteras" && item.category === "Carteras y bolsos") ||
      (category === "Audífonos" && item.category === "Audífonos y accesorios");
    return textMatch && locationMatch && statusMatch && categoryMatch;
  }), [query, location, tab, category]);

  function applyFilters() {
    setShowFilters(false);
    setLoading(true);
    window.setTimeout(() => setLoading(false), 550);
  }

  return (
    <main className="content search-page">
      <div className="page-heading">
        <div><span className="section-kicker">Explorar publicaciones</span><h1>Encuentra lo que buscas</h1><p>Reportes recientes de toda la comunidad del Quindío.</p></div>
      </div>
      <div className="search-tool">
        <Icon name="Search" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ej. llaves con llavero azul" />
        {query && <button onClick={() => setQuery("")}>Limpiar</button>}
      </div>
      <div className="results-layout">
        <aside className={`filters ${showFilters ? "show" : ""}`}>
          <div className="filter-mobile-head"><strong>Filtrar resultados</strong><button onClick={() => setShowFilters(false)}>Cerrar</button></div>
          <div className="filter-title"><strong>Filtros</strong><button onClick={() => { setCategory(""); setLocation("Todo el Quindío"); }}>Limpiar</button></div>
          <label>Municipio<select value={location} onChange={(event) => setLocation(event.target.value)}>{municipalities.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Categoría<select value={category} onChange={(event) => setCategory(event.target.value)}><option value="">Todas las categorías</option>{categories.map(([, item]) => <option key={item}>{item}</option>)}</select></label>
          <label>Fecha<select><option>Cualquier fecha</option><option>Hoy</option><option>Últimos 7 días</option><option>Último mes</option></select></label>
          <Button onClick={applyFilters} className="filter-apply">Aplicar filtros</Button>
        </aside>
        <section className="results">
          <div className="results-toolbar">
            <div className="tabs">{["Todos", "Perdidos", "Encontrados"].map((item) => <button className={tab === item ? "active" : ""} key={item} onClick={() => setTab(item)}>{item}</button>)}</div>
            <div className="toolbar-right"><button className="filter-trigger" onClick={() => setShowFilters(true)}><Icon name="Sliders" size={17} /> Filtrar</button><label>Ordenar por <select><option>Más recientes</option><option>Más antiguos</option></select></label></div>
          </div>
          <div className="result-count"><strong>{filtered.length} resultados</strong>{(location !== "Todo el Quindío" || category) && <span>Filtros activos</span>}</div>
          {loading ? (
            <div className="listing-grid">{[1,2,3,4].map((item) => <div className="skeleton-card" key={item}><div></div><span></span><span></span><small></small></div>)}</div>
          ) : filtered.length ? (
            <div className="listing-grid results-grid">{filtered.map((item) => <ListingCard item={item} key={item.id} open={open} />)}</div>
          ) : (
            <div className="empty-state"><span><Icon name="Search" size={30} /></span><h2>No encontramos coincidencias</h2><p>Prueba con una palabra más general o elimina algunos filtros.</p><Button onClick={() => { setQuery(""); setCategory(""); setLocation("Todo el Quindío"); }}>Ver todas las publicaciones</Button></div>
          )}
        </section>
      </div>
    </main>
  );
}

function Publish({ onDone }: { onDone: () => void }) {
  const [type, setType] = useState<Status>("Perdido");
  const [submitted, setSubmitted] = useState(false);
  function submit(event: FormEvent) { event.preventDefault(); setSubmitted(true); window.scrollTo({ top: 0, behavior: "smooth" }); }
  if (submitted) return (
    <main className="content publish-page">
      <div className="success-state">
        <span><Icon name="Check" size={34} /></span>
        <div className="success-tag">Reporte publicado</div>
        <h1>Tu reporte ya está ayudando</h1>
        <p>La comunidad del Quindío podrá verlo y contactarte si encuentra una coincidencia.</p>
        <div className="success-summary"><div><Icon name={type === "Perdido" ? "Search" : "Check"} /><span><small>Tipo de reporte</small><strong>Objeto {type.toLowerCase()}</strong></span></div><span>Publicado ahora</span></div>
        <div className="hero-actions"><Button onClick={onDone}>Ver publicaciones</Button><Button variant="secondary" onClick={() => setSubmitted(false)}>Crear otro reporte</Button></div>
      </div>
    </main>
  );
  return (
    <main className="content publish-page">
      <div className="page-heading compact"><div><span className="section-kicker">Ayuda a la comunidad</span><h1>Publica un reporte</h1><p>Completa la información que recuerdes. No necesitas conocer la dirección exacta.</p></div><div className="privacy-note"><Icon name="Shield" /><span><strong>Tu privacidad importa</strong><small>No publicaremos tus datos de contacto.</small></span></div></div>
      <form className="publish-form" onSubmit={submit}>
        <section className="form-section">
          <div className="form-section-title"><span>1</span><div><h2>¿Qué ocurrió?</h2><p>Selecciona el tipo de reporte que quieres crear.</p></div></div>
          <div className="type-options">
            <button type="button" className={type === "Perdido" ? "selected" : ""} onClick={() => setType("Perdido")}><span><Icon name="Search" /></span><div><strong>Perdí un objeto</strong><small>Quiero que la comunidad me ayude a encontrarlo.</small></div><i>{type === "Perdido" && <Icon name="Check" size={15} />}</i></button>
            <button type="button" className={type === "Encontrado" ? "selected" : ""} onClick={() => setType("Encontrado")}><span><Icon name="Check" /></span><div><strong>Encontré un objeto</strong><small>Quiero ayudar a devolverlo a su dueño.</small></div><i>{type === "Encontrado" && <Icon name="Check" size={15} />}</i></button>
          </div>
        </section>
        <section className="form-section">
          <div className="form-section-title"><span>2</span><div><h2>Cuéntanos sobre el objeto</h2><p>Incluye detalles claros, pero reserva alguno para verificar al dueño.</p></div></div>
          <div className="form-grid">
            <label className="full">Título del reporte <input required placeholder="Ej. Llaves con llavero azul" /><small>Usa un nombre corto y fácil de reconocer.</small></label>
            <label>Categoría <select required defaultValue=""><option value="" disabled>Selecciona una categoría</option>{categories.map(([, item]) => <option key={item}>{item}</option>)}</select></label>
            <label>Fecha aproximada <span className="input-icon"><Icon name="Calendar" size={17} /><input required type="date" /></span></label>
            <label className="full">Descripción <textarea required rows={4} placeholder="Describe el color, tamaño y características principales del objeto..." /><small>Evita compartir números de documento o información sensible.</small></label>
            <label className="full">Imagen del objeto <span className="upload-box"><Icon name="Upload" /><strong>Sube una foto o arrástrala aquí</strong><small>PNG o JPG, máximo 5 MB · Opcional</small><input type="file" accept="image/*" /></span></label>
          </div>
        </section>
        <section className="form-section">
          <div className="form-section-title"><span>3</span><div><h2>Ubicación y contacto</h2><p>Una referencia aproximada es suficiente.</p></div></div>
          <div className="form-grid">
            <label>Municipio <select required defaultValue=""><option value="" disabled>Selecciona un municipio</option>{municipalities.slice(1).map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Lugar aproximado <input required placeholder="Ej. Cerca al Parque Sucre" /></label>
            <label className="full">Preferencia de contacto <select><option>Mensajes dentro de EncuentraQ</option><option>Correo electrónico</option><option>WhatsApp (solo al confirmar)</option></select></label>
          </div>
        </section>
        <div className="form-submit"><p><Icon name="Shield" size={17} /> Podrás editar o cerrar el reporte desde Mi actividad.</p><Button type="submit" icon="Check">Publicar reporte</Button></div>
      </form>
    </main>
  );
}

function Detail({ item, back }: { item: Listing; back: () => void }) {
  const [contacted, setContacted] = useState(false);
  return (
    <main className="content detail-page">
      <button className="back-link" onClick={back}><Icon name="ArrowLeft" size={18} /> Volver a resultados</button>
      <div className="detail-layout">
        <div className="detail-main">
          <div className="detail-image"><img src={item.image} alt={item.title} /><span className={`status ${item.status.toLowerCase()}`}>{item.status}</span></div>
          <div className="detail-content">
            <div className="detail-title"><div><span className="eyebrow">{item.category}</span><h1>{item.title}</h1></div><button className="icon-button"><Icon name="Bookmark" /></button></div>
            <div className="detail-meta"><span><Icon name="MapPin" />{item.municipality} · {item.place}</span><span><Icon name="Clock" />{item.date}</span></div>
            <hr />
            <h2>Descripción</h2><p>{item.description}</p>
            <div className="safety-box"><Icon name="Shield" /><div><strong>Protege los detalles importantes</strong><p>Para verificar al dueño, no compartas públicamente toda la información del objeto.</p></div></div>
          </div>
        </div>
        <aside className="contact-card">
          <div className="reporter"><span>{item.author.split(" ").map((part) => part[0]).join("")}</span><div><small>Publicado por</small><strong>{item.author}</strong><em>Miembro verificado</em></div></div>
          <hr />
          <p>{item.status === "Encontrado" ? "¿Crees que este objeto es tuyo?" : "¿Encontraste este objeto?"}</p>
          <small>Inicia una conversación segura dentro de EncuentraQ.</small>
          <Button icon={contacted ? "Check" : "Message"} onClick={() => setContacted(true)}>{contacted ? "Solicitud enviada" : "Contactar a la persona"}</Button>
          <div className="contact-note"><Icon name="Shield" size={16} /> No compartas datos sensibles antes de verificar la coincidencia.</div>
        </aside>
      </div>
    </main>
  );
}

function ActivityPage({ navigate }: { navigate: (view: View) => void }) {
  return (
    <main className="content activity-page">
      <div className="page-heading"><div><span className="section-kicker">Tu espacio</span><h1>Mi actividad</h1><p>Administra tus reportes y conversaciones.</p></div><Button icon="Plus" onClick={() => navigate("publish")}>Nuevo reporte</Button></div>
      <div className="activity-stats"><div><span><Icon name="Activity" /></span><div><strong>2</strong><small>Reportes activos</small></div></div><div><span><Icon name="Message" /></span><div><strong>3</strong><small>Conversaciones</small></div></div><div><span><Icon name="Check" /></span><div><strong>1</strong><small>Objeto recuperado</small></div></div></div>
      <section className="activity-panel">
        <div className="section-heading"><div><h2>Tus reportes</h2><p>Publicaciones que has creado recientemente.</p></div></div>
        {[listings[1], listings[2]].map((item, index) => <article className="activity-row" key={item.id}><img src={item.image} alt="" /><div className="activity-info"><span className={`status ${item.status.toLowerCase()}`}>{index ? "Resuelto" : "Activo"}</span><h3>{item.title}</h3><p>{item.municipality} · {item.date}</p></div><div className="activity-actions"><button>Editar</button><Icon name="ChevronRight" /></div></article>)}
      </section>
    </main>
  );
}

export default function App() {
  const [view, setView] = useState<View>("home");
  const [previousView, setPreviousView] = useState<View>("home");
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("Todo el Quindío");
  const [category, setCategory] = useState("");
  const [selected, setSelected] = useState<Listing>(listings[0]);

  function navigate(next: View) {
    setView(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function open(item: Listing) {
    setPreviousView(view);
    setSelected(item);
    navigate("detail");
  }
  return (
    <div className="app-shell">
      <Sidebar view={view} navigate={navigate} />
      <div className="app-main">
        <Header location={location} setLocation={setLocation} query={query} setQuery={setQuery} runSearch={() => navigate("search")} />
        {view === "home" && <Home navigate={navigate} open={open} setQuery={setQuery} setCategory={setCategory} />}
        {view === "search" && <SearchResults query={query} setQuery={setQuery} location={location} setLocation={setLocation} category={category} setCategory={setCategory} open={open} />}
        {view === "publish" && <Publish onDone={() => navigate("search")} />}
        {view === "activity" && <ActivityPage navigate={navigate} />}
        {view === "detail" && <Detail item={selected} back={() => navigate(previousView)} />}
      </div>
      <MobileNav view={view} navigate={navigate} />
    </div>
  );
}
