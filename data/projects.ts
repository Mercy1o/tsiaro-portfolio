export type ProjectCategory = "Architecture" | "Technical" | "Professional" | "Creative";

export type Project = {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  year: string;
  category: ProjectCategory;
  featured: boolean;
  description: string;
  context: string;
  concept: string;
  process: string;
  result: string;
  coverLabel: string;
};

export const projects: Project[] = [
  {
    slug: "hikari",
    number: "01",
    title: "Hikari",
    subtitle: "Student House",
    year: "2025",
    category: "Architecture",
    featured: true,
    description:
      "A student housing project investigating the relationship between individual identity and collective belonging within a multicultural community.",
    context:
      "The project responds to different cultural backgrounds, habits and understandings of home without reducing them to a single model of dwelling.",
    concept:
      "Plurality becomes a design condition. Fragmented volumes and layered spatial relationships allow individuality and shared experience to coexist.",
    process:
      "The proposal develops through fragmentation, calibration and porosity, organizing a progression between private, semi-private and collective spaces.",
    result:
      "A spatial continuum between isolation and interaction, with a strong relationship to landscape, movement and community.",
    coverLabel: "HIKARI / PROJECT IMAGE",
  },
  {
    slug: "baobab-fony",
    number: "02",
    title: "Baobab Fony",
    subtitle: "Immersive Experience",
    year: "2024",
    category: "Architecture",
    featured: true,
    description:
      "An immersive spatial proposal inspired by the sensory experience, resilience and symbolic qualities of the baobab.",
    context:
      "The project explores how a natural and cultural reference can become an inhabitable experience rather than a literal imitation.",
    concept:
      "The baobab is abstracted into layered volumes, thresholds and moments of pause.",
    process:
      "Spatial elements, circulation, light and enclosure are composed as a sequence that encourages exploration.",
    result:
      "A sculptural environment centred on resilience, longevity and immersion.",
    coverLabel: "BAOBAB FONY / PROJECT IMAGE",
  },
  {
    slug: "steel-structure",
    number: "03",
    title: "Steel Structure",
    subtitle: "Construction Drawing",
    year: "Academic Study",
    category: "Technical",
    featured: true,
    description:
      "A technical documentation study exploring the coordination and assembly of a steel structural system within an industrial garage.",
    context:
      "The work focuses on the relationship between structure, envelope, detailing and construction documentation.",
    concept:
      "Technical precision is treated as a design discipline, where every layer must coordinate with the larger system.",
    process:
      "Plans, sections and details investigate insulation, air and vapour control, cladding, glazing, steel framing and constructability.",
    result:
      "A coordinated drawing package demonstrating technical communication and understanding of building assemblies.",
    coverLabel: "STEEL STRUCTURE / DRAWING",
  },
  {
    slug: "professional-practice",
    number: "04",
    title: "Professional Practice",
    subtitle: "Coordination & Estimation",
    year: "2025—Present",
    category: "Professional",
    featured: true,
    description:
      "Professional experience supporting institutional, commercial and industrial projects through coordination, estimating and documentation.",
    context:
      "The role connects architectural information with project delivery, pricing, subcontractors, consultants and site conditions.",
    concept:
      "The project environment is treated as a network of decisions that must remain clear, traceable and coordinated.",
    process:
      "Work includes quantity take-offs, pricing analysis, subcontractor coordination, RFIs, shop drawing tracking and site follow-ups.",
    result:
      "A practical understanding of how design intent, technical documents and construction realities intersect.",
    coverLabel: "PROFESSIONAL PRACTICE / CASE STUDY",
  },
  {
    slug: "in-my-head",
    number: "05",
    title: "In My Head",
    subtitle: "Identity Through Collage",
    year: "2025",
    category: "Creative",
    featured: true,
    description:
      "A personal collage exploring identity, memory, cultural influence and the experiences that continue to shape the way I create.",
    context:
      "Instead of presenting identity as a linear biography, the work assembles fragments of places, memories, cultures and references.",
    concept:
      "The self is represented as an evolving field of overlapping influences rather than a fixed image.",
    process:
      "Hand-drawn fragments and cut compositions are layered into a single field of visual memory.",
    result:
      "A self-portrait built through atmosphere, contradiction and accumulated experience.",
    coverLabel: "IN MY HEAD / COLLAGE",
  },
  {
    slug: "the-smiling-wound",
    number: "06",
    title: "The Smiling Wound",
    subtitle: "Ceramic Study",
    year: "2025",
    category: "Creative",
    featured: true,
    description:
      "A ceramic study of vulnerability and persistence, representing a figure that remains present despite visible fracture.",
    context:
      "The sculpture investigates the tension between breaking and continuing to exist.",
    concept:
      "An open, wounded form is paired with a restrained expression to suggest awareness rather than defeat.",
    process:
      "The head is hand-built, glazed and kiln-fired, allowing material irregularity to remain visible.",
    result:
      "An object where fragility and resilience are held in the same form.",
    coverLabel: "THE SMILING WOUND / CERAMIC",
  },
];

export const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);
