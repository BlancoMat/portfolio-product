export interface Profile {
  nombre: string;
  titulo: string;
  descripcion: string;
  linkedin: string;
  github: string;
}

export interface Project {
  id: number;
  nombre: string;
  descripcion: string;
  tecnologias: string[];
  githubUrl: string;
  imageUrl: string;
}

export interface Skill {
  nombre: string;
  categoria: string;
}
