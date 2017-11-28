export class Master {
  birthday?: string;
  father_name: string;
  first_name: string;
  id: number;
  last_name:  string;
  photo?: string;
  position: Position;
  position_id: number;
  public_position?: number;
  sex?: string;
}

export class Position {
  created_at: string;
  description: string;
  id: number;
  title: string;
  updated_at: string;
}

