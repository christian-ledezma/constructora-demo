import { IMAGES } from "@/data/images";
import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "begonias-de-aranjuez",
    name: "Begonias de Aranjuez",
    location: "Zona Aranjuez, Cochabamba",
    status: "under-construction",
    statusLabel: "En construcción",
    tagline:
      "Departamentos de autor en el corazón de Aranjuez, pensados para quienes buscan diseño y tranquilidad a partes iguales.",
    description: [
      "Begonias de Aranjuez es un edificio residencial de baja densidad que combina arquitectura contemporánea con materiales nobles: hormigón visto, madera natural y grandes paños de vidrio que inundan cada ambiente de luz.",
      "Cada departamento fue diseñado para maximizar la ventilación cruzada y las vistas hacia los jardines internos, con plantas flexibles que se adaptan a familias jóvenes y profesionales que buscan su primer o segundo hogar.",
      "El proyecto se encuentra a pocos minutos del Parque Aranjuez y de los principales centros comerciales de la zona norte, en una calle tranquila y arbolada.",
    ],
    facts: [
      { label: "Entrega estimada", value: "Diciembre 2027" },
      { label: "Unidades", value: "24 departamentos" },
      { label: "Superficie", value: "72 a 138 m²" },
      { label: "Dormitorios", value: "1 a 3" },
      { label: "Parqueos", value: "1 a 2 por unidad" },
      { label: "Avance de obra", value: "40%" },
    ],
    coverImage: IMAGES.projects["begonias-de-aranjuez"].cover,
    gallery: [...IMAGES.projects["begonias-de-aranjuez"].gallery],
    tour360: IMAGES.projects["begonias-de-aranjuez"].tour360,
  },
  {
    slug: "prados-del-oeste",
    name: "Prados del Oeste",
    location: "Zona Oeste, Cochabamba",
    status: "few-units-left",
    statusLabel: "Últimas unidades disponibles",
    tagline:
      "Un edificio ya entregado y habitado, con las últimas unidades disponibles para entrega inmediata.",
    description: [
      "Prados del Oeste es un condominio consolidado en una de las zonas de mayor plusvalía de Cochabamba, con áreas comunes terminadas, seguridad las 24 horas y vecinos que ya disfrutan del edificio.",
      "Su fachada de líneas limpias y su relación directa con áreas verdes lo convirtieron en uno de los proyectos más buscados de la constructora, con la gran mayoría de unidades ya entregadas.",
      "Quedan disponibles solo algunos departamentos de las plantas superiores, con entrega inmediata y acabados finos de fábrica.",
    ],
    facts: [
      { label: "Estado", value: "Entregado" },
      { label: "Unidades disponibles", value: "5 departamentos" },
      { label: "Superficie", value: "85 a 160 m²" },
      { label: "Dormitorios", value: "2 a 3" },
      { label: "Parqueos", value: "2 por unidad" },
      { label: "Entrega", value: "Inmediata" },
    ],
    coverImage: IMAGES.projects["prados-del-oeste"].cover,
    gallery: [...IMAGES.projects["prados-del-oeste"].gallery],
    tour360: IMAGES.projects["prados-del-oeste"].tour360,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
