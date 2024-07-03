interface Apperance {
  dream_id: number;
  dream_title: string;
}

export interface Symbol {
  symbol_id: number;
  user_id: number;
  symbol_name: string;
  symbol_analysis: string;
  symbol_image: string;
  created_at: string;
  apperances: Apperance[];
};
