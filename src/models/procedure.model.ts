
export interface Document {
  name: string;
  isMandatory: boolean;
  notes: string;
}

export interface Step {
  stepNumber: number;
  title: string;
  description: string;
  estimatedDurationMinutes: number;
}

export enum Category {
  PersonalDocuments = 'LIČNI DOKUMENTI',
  Vehicles = 'VOZILA',
  Business = 'POSLOVANJE',
  RealEstate = 'NEKRETNINE',
  Health = 'ZDRAVSTVO',
}

export interface Procedure {
  id: string;
  title: string;
  category: Category;
  description: string;
  steps: Step[];
  documents: Document[];
}
