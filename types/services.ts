export interface Service {
  title: string;
  slug: string;           // used for /services/[slug] routing
  icon: string;
  thumb: string;
  link: string;
}

export interface ServicesSectionProps {
  backgroundImage?: string;
  subtitleImg?: string;
  subtitleText?: string;
  heading?: string;
  services?: Service[];
}