export interface CardSection {
  label: string;
  value: string | string[]; 
  type: 'text' | 'list';              
}

export type Theme = "light" | "main";
