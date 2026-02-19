export interface Service {
  title: string;
  icon: string;
  thumb: string;
  link?: string;
}

export interface ServicesSectionProps {
  backgroundImage?: string;
  subtitleImg?: string;
  subtitleText?: string;
  heading?: string;
  services?: Service[];
}
