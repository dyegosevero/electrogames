export type Database = {
  public: {
    Tables: {
      settings: {
        Row: { key: string; value: string };
        Insert: { key: string; value: string };
        Update: { value?: string };
      };
      products: {
        Row: {
          id: string;
          name: string;
          edition: string;
          specs: string[];
          price: string;
          installments: string;
          condition: string;
          image_url: string;
          buy_url: string;
          active: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["products"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["products"]["Insert"]>;
      };
      youtube_videos: {
        Row: {
          id: string;
          video_id: string;
          title: string;
          active: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["youtube_videos"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["youtube_videos"]["Insert"]>;
      };
    };
  };
};

export type Product = Database["public"]["Tables"]["products"]["Row"];
export type YoutubeVideo = Database["public"]["Tables"]["youtube_videos"]["Row"];
export type Setting = Database["public"]["Tables"]["settings"]["Row"];
