export const siteConfig = {
  name: "Tsiaro Rakototiana",
  shortName: "TSIARO R.",
  title: "Tsiaro Rakototiana — Architecture, Technology & Making",
  description:
    "Portfolio of Tsiaro Rakototiana exploring architecture, technical precision, material, drawing and creative experimentation.",
  descriptor: "Architecture · Technology · Making",
  location: "Toronto, Canada",
  email: "kototsiaro@gmail.com",
  phone: "(343) 262-6636",
  social: {
    linkedin: "https://www.linkedin.com/in/tsiaro-r-177824306",
    instagram: "https://www.instagram.com/trnskdesign",
  },
  hero: {
    eyebrow: "TR / PORTFOLIO / 2026",
    title: "Designing between matter, memory and the unknown.",
    description:
      "I work across architecture, technical development, drawing and making — connecting precision with experimentation and human experience.",
  },
  about: {
    title: "Architecture is only one part of how I create.",
    description:
      "My work moves between spatial design, technical documentation, drawing, collage and physical making. I am interested in the point where structure, culture, memory and imagination begin to influence one another.",
  },
  navigation: [
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export const profileFacts = [
  {
    label: "Current study",
    value: "Bachelor of Architectural Science",
    detail: "Toronto Metropolitan University · 2026—2030",
  },
  {
    label: "Previous study",
    value: "Architectural Technology",
    detail: "Ottawa · 2022—2025",
  },
  {
    label: "Professional practice",
    value: "Project Coordination & Estimation",
    detail: "2025—Present",
  },
] as const;

export const skills = {
  advanced: [
    "Adobe Photoshop",
    "Adobe InDesign",
    "Adobe Illustrator",
    "AutoCAD",
    "Revit",
    "pyRevit",
    "Twinmotion",
    "D5 Render",
    "Quoter Plan",
  ],
  intermediate: ["Rhino", "Grasshopper", "QGIS", "SketchUp"],
  disciplines: [
    "Architectural Design",
    "Technical Drawing",
    "3D Modelling",
    "Visualization",
    "Construction Documentation",
    "Quantity Take-Off",
    "Project Coordination",
    "Physical Modelling",
    "Drawing",
    "Painting",
    "Ceramics",
    "Woodworking",
  ],
} as const;

export const awards = [
  { title: "1st Prize Winner", detail: "Capstone Integrating Objectives" },
  {
    title: "Special Mention",
    detail: "Well-designed, adaptable structure — Municipality of Cantley",
  },
  { title: "CCN Challenge 2024", detail: "Urban Planning Competition" },
] as const;
