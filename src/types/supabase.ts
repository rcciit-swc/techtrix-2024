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
      defined_roles: {
        Row: {
          role: string
        }
        Insert: {
          role: string
        }
        Update: {
          role?: string
        }
        Relationships: []
      }
      event_categories: {
        Row: {
          fest_name: string | null
          id: string
          name: string
          year: number | null
        }
        Insert: {
          fest_name?: string | null
          id?: string
          name: string
          year?: number | null
        }
        Update: {
          fest_name?: string | null
          id?: string
          name?: string
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "event_categories_fkey"
            columns: ["year", "fest_name"]
            isOneToOne: false
            referencedRelation: "fests"
            referencedColumns: ["year", "name"]
          }
        ]
      }
      events: {
        Row: {
          desc: string | null
          event_category_id: string | null
          event_image_url: string | null
          event_name: string | null
          fest_name: string
          id: string
          is_open: boolean
          max_team_member: number
          min_team_member: number
          registration_fees: number | null
          year: number
        }
        Insert: {
          desc?: string | null
          event_category_id?: string | null
          event_image_url?: string | null
          event_name?: string | null
          fest_name: string
          id?: string
          is_open?: boolean
          max_team_member?: number
          min_team_member?: number
          registration_fees?: number | null
          year: number
        }
        Update: {
          desc?: string | null
          event_category_id?: string | null
          event_image_url?: string | null
          event_name?: string | null
          fest_name?: string
          id?: string
          is_open?: boolean
          max_team_member?: number
          min_team_member?: number
          registration_fees?: number | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "event_fkey"
            columns: ["year", "fest_name"]
            isOneToOne: false
            referencedRelation: "fests"
            referencedColumns: ["year", "name"]
          },
          {
            foreignKeyName: "events_event_category_id_fkey"
            columns: ["event_category_id"]
            isOneToOne: false
            referencedRelation: "event_categories"
            referencedColumns: ["id"]
          }
        ]
      }
      fests: {
        Row: {
          name: string
          year: number
        }
        Insert: {
          name: string
          year: number
        }
        Update: {
          name?: string
          year?: number
        }
        Relationships: []
      }
      max_participation_allowed: {
        Row: {
          event_id: string
          max_allowed: number | null
        }
        Insert: {
          event_id: string
          max_allowed?: number | null
        }
        Update: {
          event_id?: string
          max_allowed?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "max_participation_allowed_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: true
            referencedRelation: "events"
            referencedColumns: ["id"]
          }
        ]
      }
      participations: {
        Row: {
          created_at: string
          payment_stats: string
          phone: string
          team_id: string
        }
        Insert: {
          created_at?: string
          payment_stats?: string
          phone: string
          team_id: string
        }
        Update: {
          created_at?: string
          payment_stats?: string
          phone?: string
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "participations_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["team_id"]
          }
        ]
      }
      roles: {
        Row: {
          created_at: string
          event_id: string | null
          id: string
          role: string
        }
        Insert: {
          created_at?: string
          event_id?: string | null
          id: string
          role: string
        }
        Update: {
          created_at?: string
          event_id?: string | null
          id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "roles_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "roles_id_fkey"
            columns: ["id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "roles_role_fkey"
            columns: ["role"]
            isOneToOne: false
            referencedRelation: "defined_roles"
            referencedColumns: ["role"]
          }
        ]
      }
      teams: {
        Row: {
          created_at: string
          event_id: string
          payment_confirmation_mail_sent: boolean
          team_id: string
          team_lead_phone: string
          team_name: string
          transaction_id: string
          transaction_ss_filename: string | null
          transaction_verified: boolean
          transaction_verified_at: string | null
        }
        Insert: {
          created_at?: string
          event_id: string
          payment_confirmation_mail_sent?: boolean
          team_id?: string
          team_lead_phone: string
          team_name: string
          transaction_id: string
          transaction_ss_filename?: string | null
          transaction_verified?: boolean
          transaction_verified_at?: string | null
        }
        Update: {
          created_at?: string
          event_id?: string
          payment_confirmation_mail_sent?: boolean
          team_id?: string
          team_lead_phone?: string
          team_name?: string
          transaction_id?: string
          transaction_ss_filename?: string | null
          transaction_verified?: boolean
          transaction_verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "teams_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teams_team_lead_phone_fkey"
            columns: ["team_lead_phone"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["phone"]
          }
        ]
      }
      users: {
        Row: {
          college: string | null
          college_roll: string | null
          email: string
          gender: string | null
          id: string
          name: string | null
          phone: string | null
        }
        Insert: {
          college?: string | null
          college_roll?: string | null
          email: string
          gender?: string | null
          id: string
          name?: string | null
          phone?: string | null
        }
        Update: {
          college?: string | null
          college_roll?: string | null
          email?: string
          gender?: string | null
          id?: string
          name?: string | null
          phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_if_user_registered: {
        Args: {
          phone_param: string
        }
        Returns: {
          team_id: string
          team_name: string
          is_team_lead: boolean
          created_at: string
          transaction_id: string
          transaction_ss_filename: string
          transaction_verified: boolean
          payment_stats: string
          event_id: string
          event_name: string
        }[]
      }
      fetch_event_roles_using_uid: {
        Args: {
          user_id_param?: string
          fest_name_param?: string
          year_param?: number
        }
        Returns: {
          event_id: string
          role: string
        }[]
      }
      fetch_team_registrations_by_events: {
        Args: {
          event_id_param?: string
          transaction_id_param?: string
          phone_param?: string
        }
        Returns: {
          team_id: string
          team_lead_phone: string
          event_id: string
          event_name: string
          transaction_id: string
          transaction_ss_filename: string
          transaction_verified: boolean
          team_name: string
          college: string
          name: string
          gender: string
          team_member_phones: string[]
          is_team: boolean
        }[]
      }
      get_event_participations: {
        Args: {
          event_id_param?: string
          phone_param?: string
          transaction_id_param?: string
        }
        Returns: {
          event_name: string
          team_name: string
          team_lead_phone: string
          transaction_id: string
          transaction_ss_filename: string
          transaction_verfied: boolean
          user_name: string
          college: string
        }[]
      }
      regs_closed: {
        Args: {
          event_id_param: string
        }
        Returns: {
          closed: boolean
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
