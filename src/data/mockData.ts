import { Listing } from "../types";

export const initialListings: Listing[] = [
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

export const categories = [
  ["Id", "Documentos"],
  ["Key", "Llaves"],
  ["Phone", "Tecnología"],
  ["Headphones", "Audífonos"],
  ["Bag", "Carteras"],
  ["Shirt", "Ropa"],
  ["Paw", "Mascotas"],
  ["Grid", "Otros"],
];

export const municipalities = [
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
