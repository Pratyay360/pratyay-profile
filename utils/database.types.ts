export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      about: {
        Row: {
          word: string
        }
        Insert: {
          word?: string
        }
        Update: {
          word?: string
        }
        Relationships: []
      }
      certificate: {
        Row: {
          description: string | null
          imageSrc: string | null
          link: string | null
          title: string
        }
        Insert: {
          description?: string | null
          imageSrc?: string | null
          link?: string | null
          title: string
        }
        Update: {
          description?: string | null
          imageSrc?: string | null
          link?: string | null
          title?: string
        }
        Relationships: []
      }
      description: {
        Row: {
          word: string
        }
        Insert: {
          word: string
        }
        Update: {
          word?: string
        }
        Relationships: []
      }
      donation: {
        Row: {
          image: string | null
          link: string
          name: string
        }
        Insert: {
          image?: string | null
          link: string
          name: string
        }
        Update: {
          image?: string | null
          link?: string
          name?: string
        }
        Relationships: []
      }
      education: {
        Row: {
          category: string
          date_from: number | null
          date_to: number | null
          description: string | null
          title: string | null
        }
        Insert: {
          category: string
          date_from?: number | null
          date_to?: number | null
          description?: string | null
          title?: string | null
        }
        Update: {
          category?: string
          date_from?: number | null
          date_to?: number | null
          description?: string | null
          title?: string | null
        }
        Relationships: []
      }
      project: {
        Row: {
          category: string | null
          description: string | null
          imageSrc: string | null
          link: string | null
          title: string
        }
        Insert: {
          category?: string | null
          description?: string | null
          imageSrc?: string | null
          link?: string | null
          title: string
        }
        Update: {
          category?: string | null
          description?: string | null
          imageSrc?: string | null
          link?: string | null
          title?: string
        }
        Relationships: []
      }
      social_link: {
        Row: {
          image: string | null
          link: string | null
          name: string
        }
        Insert: {
          image?: string | null
          link?: string | null
          name: string
        }
        Update: {
          image?: string | null
          link?: string | null
          name?: string
        }
        Relationships: []
      }
      technology: {
        Row: {
          href: string | null
          name: string
          src: string | null
        }
        Insert: {
          href?: string | null
          name: string
          src?: string | null
        }
        Update: {
          href?: string | null
          name?: string
          src?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
