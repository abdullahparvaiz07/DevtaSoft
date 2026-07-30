export interface Project {
  id: string;
  title: string;
  category: 'UI/UX Design' | 'Mobile Apps' | 'Web Apps';
  description: string;
  image: string;
  client: string;
  techStack: string[];
  metrics: string;
  link?: string;
}

export interface ServiceDetail {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  icon: string;
  tech: string[];
}

export interface ContactFormData {
  fullName: string;
  email: string;
  company: string;
  serviceType: string;
  budget: string;
  message: string;
}
