import { Tag } from "./Tag";
import { Symbol } from "./Symbol";

export interface Dream {
  id: number;
  dream_title: string;
  dream_context: string;
  dream_analysis: string;
  tags: Tag[];
  symbols: Symbol[];
  created_at: string;
};
