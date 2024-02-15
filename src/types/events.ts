export interface coordinatorType {
  name: string;
  email: string;
  phone: string;
}
export interface eventInputType {
  name: string;
  description: string;
  date: string;
  minTeamSize: number;
  maxTeamSize: number;
  category: string;
  time: string;
  coordinators: coordinatorType[];
  price: string;
  prize: string;
  rules: string;
  imagePath: string;
}

export interface CategoryState {
  date: string;
  desc: string;
  event_category_id: number;
  event_image_url: string;
  event_name: string;
  fest_name: string;
  id: string;
  max_team_member: number;
  min_team_member: number;
  prize: number;
  registration_fees: number;
  rules: string;
  time: string;
}

export interface EventData {
  date: string;
  desc: string;
  event_category_id: string;
  event_image_url: string;
  event_name: string;
  fest_name: string;
  id: string;
  is_open: boolean;
  max_team_member: number;
  min_team_member: number;
  prize: number;
  registration_fees: number;
  roles: { name: string; phone: string }[];
  rules: string;
  time: string;
  year: number;
}
