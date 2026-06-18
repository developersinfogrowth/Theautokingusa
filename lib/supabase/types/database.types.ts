export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      application_answers: {
        Row: {
          answer_text: string | null
          application_id: string
          created_at: string | null
          id: string
          question_id: string
        }
        Insert: {
          answer_text?: string | null
          application_id: string
          created_at?: string | null
          id?: string
          question_id: string
        }
        Update: {
          answer_text?: string | null
          application_id?: string
          created_at?: string | null
          id?: string
          question_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "application_answers_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "application_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      applications: {
        Row: {
          branch: string | null
          created_at: string | null
          current_company: string | null
          current_ctc: string | null
          current_location: string | null
          education: Json | null
          email: string
          expected_ctc: string | null
          experience: Json | null
          graduation_year: number | null
          id: string
          is_fresher: boolean | null
          job_id: string | null
          linkedin_url: string | null
          location_preference: string | null
          name: string
          notice_period: string | null
          phone: string
          relevant_experience: string | null
          resume_text: string | null
          resume_url: string | null
          skills: string[] | null
          status: string | null
          total_experience: string | null
          university: string | null
        }
        Insert: {
          branch?: string | null
          created_at?: string | null
          current_company?: string | null
          current_ctc?: string | null
          current_location?: string | null
          education?: Json | null
          email: string
          expected_ctc?: string | null
          experience?: Json | null
          graduation_year?: number | null
          id?: string
          is_fresher?: boolean | null
          job_id?: string | null
          linkedin_url?: string | null
          location_preference?: string | null
          name: string
          notice_period?: string | null
          phone: string
          relevant_experience?: string | null
          resume_text?: string | null
          resume_url?: string | null
          skills?: string[] | null
          status?: string | null
          total_experience?: string | null
          university?: string | null
        }
        Update: {
          branch?: string | null
          created_at?: string | null
          current_company?: string | null
          current_ctc?: string | null
          current_location?: string | null
          education?: Json | null
          email?: string
          expected_ctc?: string | null
          experience?: Json | null
          graduation_year?: number | null
          id?: string
          is_fresher?: boolean | null
          job_id?: string | null
          linkedin_url?: string | null
          location_preference?: string | null
          name?: string
          notice_period?: string | null
          phone?: string
          relevant_experience?: string | null
          resume_text?: string | null
          resume_url?: string | null
          skills?: string[] | null
          status?: string | null
          total_experience?: string | null
          university?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author: string | null
          category: string | null
          comments: number | null
          content: string
          created_at: string | null
          date: string | null
          excerpt: string | null
          featured: boolean | null
          id: string
          image: string | null
          likes: number | null
          meta_description: string | null
          meta_keywords: string[] | null
          meta_title: string | null
          published_at: string | null
          read_time: string | null
          role: string | null
          slug: string
          status: string | null
          tags: string[] | null
          title: string
          trending: boolean | null
          updated_at: string | null
          views: number | null
        }
        Insert: {
          author?: string | null
          category?: string | null
          comments?: number | null
          content: string
          created_at?: string | null
          date?: string | null
          excerpt?: string | null
          featured?: boolean | null
          id?: string
          image?: string | null
          likes?: number | null
          meta_description?: string | null
          meta_keywords?: string[] | null
          meta_title?: string | null
          published_at?: string | null
          read_time?: string | null
          role?: string | null
          slug: string
          status?: string | null
          tags?: string[] | null
          title: string
          trending?: boolean | null
          updated_at?: string | null
          views?: number | null
        }
        Update: {
          author?: string | null
          category?: string | null
          comments?: number | null
          content?: string
          created_at?: string | null
          date?: string | null
          excerpt?: string | null
          featured?: boolean | null
          id?: string
          image?: string | null
          likes?: number | null
          meta_description?: string | null
          meta_keywords?: string[] | null
          meta_title?: string | null
          published_at?: string | null
          read_time?: string | null
          role?: string | null
          slug?: string
          status?: string | null
          tags?: string[] | null
          title?: string
          trending?: boolean | null
          updated_at?: string | null
          views?: number | null
        }
        Relationships: []
      }
      blogs_autoking: {
        Row: {
          author_avatar: string | null
          author_name: string | null
          author_role: string | null
          brand: string | null
          categories: string[] | null
          content: Json | null
          cover_image: string | null
          created_at: string | null
          excerpt: string | null
          faqs: Json | null
          featured: boolean | null
          id: string
          is_published: boolean | null
          rating: number | null
          read_time: string | null
          rich_content: string | null
          seo: Json | null
          seo_description: string | null
          seo_keywords: string[] | null
          seo_title: string | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string | null
          views: number | null
        }
        Insert: {
          author_avatar?: string | null
          author_name?: string | null
          author_role?: string | null
          brand?: string | null
          categories?: string[] | null
          content?: Json | null
          cover_image?: string | null
          created_at?: string | null
          excerpt?: string | null
          faqs?: Json | null
          featured?: boolean | null
          id?: string
          is_published?: boolean | null
          rating?: number | null
          read_time?: string | null
          rich_content?: string | null
          seo?: Json | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string | null
          views?: number | null
        }
        Update: {
          author_avatar?: string | null
          author_name?: string | null
          author_role?: string | null
          brand?: string | null
          categories?: string[] | null
          content?: Json | null
          cover_image?: string | null
          created_at?: string | null
          excerpt?: string | null
          faqs?: Json | null
          featured?: boolean | null
          id?: string
          is_published?: boolean | null
          rating?: number | null
          read_time?: string | null
          rich_content?: string | null
          seo?: Json | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          views?: number | null
        }
        Relationships: []
      }
      clients: {
        Row: {
          address: string | null
          auth_code: string[]
          brand_name: string | null
          client_name: string
          created_at: string
          id: string
          logo_url: string | null
          merchant_name: string | null
          phone: string | null
          show_brand_attribution: boolean | null
          website: string | null
        }
        Insert: {
          address?: string | null
          auth_code?: string[]
          brand_name?: string | null
          client_name: string
          created_at?: string
          id?: string
          logo_url?: string | null
          merchant_name?: string | null
          phone?: string | null
          show_brand_attribution?: boolean | null
          website?: string | null
        }
        Update: {
          address?: string | null
          auth_code?: string[]
          brand_name?: string | null
          client_name?: string
          created_at?: string
          id?: string
          logo_url?: string | null
          merchant_name?: string | null
          phone?: string | null
          show_brand_attribution?: boolean | null
          website?: string | null
        }
        Relationships: []
      }
      communication_log: {
        Row: {
          created_at: string
          id: string
          message: string
          order_task_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          order_task_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          order_task_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "communication_log_order_task_id_fkey"
            columns: ["order_task_id"]
            isOneToOne: false
            referencedRelation: "order_delivered_details"
            referencedColumns: ["om_task_id"]
          },
          {
            foreignKeyName: "communication_log_order_task_id_fkey"
            columns: ["order_task_id"]
            isOneToOne: false
            referencedRelation: "order_full_details"
            referencedColumns: ["om_task_id"]
          },
          {
            foreignKeyName: "communication_log_order_task_id_fkey"
            columns: ["order_task_id"]
            isOneToOne: false
            referencedRelation: "order_management_full"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "communication_log_order_task_id_fkey"
            columns: ["order_task_id"]
            isOneToOne: false
            referencedRelation: "order_management_tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "communication_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      consultation_requests: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string
          phone: string
          source: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          name: string
          phone: string
          source?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          phone?: string
          source?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      contact_leads: {
        Row: {
          created_at: string | null
          email: string | null
          id: number
          message: string | null
          name: string | null
          phone: string | null
          subject: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: number
          message?: string | null
          name?: string | null
          phone?: string | null
          subject?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: number
          message?: string | null
          name?: string | null
          phone?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      contact_page_submissions: {
        Row: {
          company: string | null
          created_at: string | null
          department: string
          email: string
          id: string
          message: string
          name: string
          phone: string
          source: string | null
          status: string | null
          subject: string
          updated_at: string | null
          urgency: string
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          department: string
          email: string
          id?: string
          message: string
          name: string
          phone: string
          source?: string | null
          status?: string | null
          subject: string
          updated_at?: string | null
          urgency: string
        }
        Update: {
          company?: string | null
          created_at?: string | null
          department?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string
          source?: string | null
          status?: string | null
          subject?: string
          updated_at?: string | null
          urgency?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          company: string | null
          created_at: string | null
          email: string
          id: string
          inquiry_type: string | null
          message: string
          name: string
          organization: string | null
          phone: string | null
          privacy_agreed: boolean | null
          region: string | null
          status: string | null
          subject: string
          updated_at: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email: string
          id?: string
          inquiry_type?: string | null
          message: string
          name: string
          organization?: string | null
          phone?: string | null
          privacy_agreed?: boolean | null
          region?: string | null
          status?: string | null
          subject: string
          updated_at?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string
          id?: string
          inquiry_type?: string | null
          message?: string
          name?: string
          organization?: string | null
          phone?: string | null
          privacy_agreed?: boolean | null
          region?: string | null
          status?: string | null
          subject?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      contact_submissions_frieght: {
        Row: {
          company: string | null
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          source: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      deal_test_id_counter: {
        Row: {
          id: number
          last_val: number
        }
        Insert: {
          id?: number
          last_val?: number
        }
        Update: {
          id?: number
          last_val?: number
        }
        Relationships: []
      }
      dispatch_communication_log: {
        Row: {
          created_at: string
          dispatch_task_id: string
          id: string
          message: string
          user_id: string
        }
        Insert: {
          created_at?: string
          dispatch_task_id: string
          id?: string
          message: string
          user_id: string
        }
        Update: {
          created_at?: string
          dispatch_task_id?: string
          id?: string
          message?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "dispatch_communication_log_dispatch_task_id_fkey"
            columns: ["dispatch_task_id"]
            isOneToOne: false
            referencedRelation: "order_delivered_details"
            referencedColumns: ["dispatch_task_id"]
          },
          {
            foreignKeyName: "dispatch_communication_log_dispatch_task_id_fkey"
            columns: ["dispatch_task_id"]
            isOneToOne: false
            referencedRelation: "order_dispatch_tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dispatch_communication_log_dispatch_task_id_fkey"
            columns: ["dispatch_task_id"]
            isOneToOne: false
            referencedRelation: "order_full_details"
            referencedColumns: ["dispatch_task_id"]
          },
          {
            foreignKeyName: "dispatch_communication_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      email_templates: {
        Row: {
          created_at: string
          email_enabled: boolean
          html_body: string
          id: number
          is_active: boolean
          json_design: Json | null
          key_name: string
          name: string
          preview_data: Json
          sms_enabled: boolean
          stop_on_failure: boolean
          subject: string
          template_type: string
          updated_at: string
          variables: Json
          version: number
        }
        Insert: {
          created_at?: string
          email_enabled?: boolean
          html_body: string
          id?: number
          is_active?: boolean
          json_design?: Json | null
          key_name: string
          name: string
          preview_data?: Json
          sms_enabled?: boolean
          stop_on_failure?: boolean
          subject: string
          template_type: string
          updated_at?: string
          variables?: Json
          version?: number
        }
        Update: {
          created_at?: string
          email_enabled?: boolean
          html_body?: string
          id?: number
          is_active?: boolean
          json_design?: Json | null
          key_name?: string
          name?: string
          preview_data?: Json
          sms_enabled?: boolean
          stop_on_failure?: boolean
          subject?: string
          template_type?: string
          updated_at?: string
          variables?: Json
          version?: number
        }
        Relationships: []
      }
      job_questions: {
        Row: {
          created_at: string | null
          display_order: number | null
          id: string
          is_required: boolean | null
          job_id: string
          question_id: string
        }
        Insert: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_required?: boolean | null
          job_id: string
          question_id: string
        }
        Update: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_required?: boolean | null
          job_id?: string
          question_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_questions_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_questions_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          applicants_count: number | null
          benefits: string[] | null
          created_at: string | null
          custom_job_id: string | null
          department: string
          description: string
          experience: string
          id: string
          is_active: boolean | null
          location: string
          meta_description: string | null
          meta_keywords: string | null
          meta_title: string | null
          posted_date: string | null
          requirements: string[] | null
          responsibilities: string[] | null
          salary: string
          title: string
          type: string
        }
        Insert: {
          applicants_count?: number | null
          benefits?: string[] | null
          created_at?: string | null
          custom_job_id?: string | null
          department: string
          description: string
          experience: string
          id?: string
          is_active?: boolean | null
          location: string
          meta_description?: string | null
          meta_keywords?: string | null
          meta_title?: string | null
          posted_date?: string | null
          requirements?: string[] | null
          responsibilities?: string[] | null
          salary: string
          title: string
          type: string
        }
        Update: {
          applicants_count?: number | null
          benefits?: string[] | null
          created_at?: string | null
          custom_job_id?: string | null
          department?: string
          description?: string
          experience?: string
          id?: string
          is_active?: boolean | null
          location?: string
          meta_description?: string | null
          meta_keywords?: string | null
          meta_title?: string | null
          posted_date?: string | null
          requirements?: string[] | null
          responsibilities?: string[] | null
          salary?: string
          title?: string
          type?: string
        }
        Relationships: []
      }
      lead_status_history: {
        Row: {
          changed_by: string
          created_at: string | null
          id: string
          lead_id: string
          new_status: string
          notes: string | null
          old_status: string | null
        }
        Insert: {
          changed_by: string
          created_at?: string | null
          id?: string
          lead_id: string
          new_status: string
          notes?: string | null
          old_status?: string | null
        }
        Update: {
          changed_by?: string
          created_at?: string | null
          id?: string
          lead_id?: string
          new_status?: string
          notes?: string | null
          old_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_status_history_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_status_history_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "sales_leads"
            referencedColumns: ["id"]
          },
        ]
      }
      makes: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      mechanics: {
        Row: {
          business_name: string
          city: string | null
          created_at: string | null
          created_by: string
          email: string | null
          id: string
          person_name: string
          phone: string
          status: string
          updated_at: string | null
          zip_code: string | null
        }
        Insert: {
          business_name: string
          city?: string | null
          created_at?: string | null
          created_by: string
          email?: string | null
          id?: string
          person_name: string
          phone: string
          status?: string
          updated_at?: string | null
          zip_code?: string | null
        }
        Update: {
          business_name?: string
          city?: string | null
          created_at?: string | null
          created_by?: string
          email?: string | null
          id?: string
          person_name?: string
          phone?: string
          status?: string
          updated_at?: string | null
          zip_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mechanics_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      mechanics_communication_log: {
        Row: {
          created_at: string | null
          created_by: string
          id: string
          mechanic_id: string
          message: string
        }
        Insert: {
          created_at?: string | null
          created_by: string
          id?: string
          mechanic_id: string
          message: string
        }
        Update: {
          created_at?: string | null
          created_by?: string
          id?: string
          mechanic_id?: string
          message?: string
        }
        Relationships: [
          {
            foreignKeyName: "mechanics_communication_log_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mechanics_communication_log_mechanic_id_fkey"
            columns: ["mechanic_id"]
            isOneToOne: false
            referencedRelation: "mechanics"
            referencedColumns: ["id"]
          },
        ]
      }
      models: {
        Row: {
          id: number
          make_id: number | null
          name: string
        }
        Insert: {
          id?: number
          make_id?: number | null
          name: string
        }
        Update: {
          id?: number
          make_id?: number | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "models_make_id_fkey"
            columns: ["make_id"]
            isOneToOne: false
            referencedRelation: "makes"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_subscribers: {
        Row: {
          created_at: string | null
          email: string
          first_name: string | null
          id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          first_name?: string | null
          id?: string
        }
        Update: {
          created_at?: string | null
          email?: string
          first_name?: string | null
          id?: string
        }
        Relationships: []
      }
      notification_views: {
        Row: {
          id: string
          notification_id: string
          user_id: string
          viewed_at: string
        }
        Insert: {
          id?: string
          notification_id: string
          user_id: string
          viewed_at?: string
        }
        Update: {
          id?: string
          notification_id?: string
          user_id?: string
          viewed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_views_notification_id_fkey"
            columns: ["notification_id"]
            isOneToOne: false
            referencedRelation: "notifications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_views_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          department: string
          id: string
          message: string
          related_id: string | null
          type: string
        }
        Insert: {
          created_at?: string
          department: string
          id?: string
          message: string
          related_id?: string | null
          type: string
        }
        Update: {
          created_at?: string
          department?: string
          id?: string
          message?: string
          related_id?: string | null
          type?: string
        }
        Relationships: []
      }
      order_dispatch_tasks: {
        Row: {
          actual_delivery_date: string | null
          assigned_by: string
          assigned_to: string
          auth_code: string | null
          bol_created_date: string | null
          bol_number: string | null
          carrier_name: string | null
          communication_notes: string | null
          completed_at: string | null
          created_at: string
          customer_name: string
          customer_paid: number | null
          customer_phone: string | null
          destination_terminal: string | null
          estimated_delivery: string | null
          freight_price: number | null
          fulfillment_source: string
          height_inches: number | null
          id: string
          last_updated_at: string | null
          last_updated_by: string | null
          length_inches: number | null
          order_management_task_id: string
          part_name: string
          picked_up_at: string | null
          pickup_date: string | null
          pickup_number: string | null
          pickup_terminal: string | null
          selected_yard_id: string
          shipping_address: string
          sla_elapsed_minutes: number | null
          sla_met: boolean | null
          sla_overdue_minutes: number | null
          status: string
          tracking_number: string | null
          updated_at: string
          vehicle_info: string | null
          weight_lbs: number | null
          width_inches: number | null
          yard_condition: string | null
          yard_name: string
          yard_phone: string | null
          yard_price: number
        }
        Insert: {
          actual_delivery_date?: string | null
          assigned_by: string
          assigned_to: string
          auth_code?: string | null
          bol_created_date?: string | null
          bol_number?: string | null
          carrier_name?: string | null
          communication_notes?: string | null
          completed_at?: string | null
          created_at?: string
          customer_name: string
          customer_paid?: number | null
          customer_phone?: string | null
          destination_terminal?: string | null
          estimated_delivery?: string | null
          freight_price?: number | null
          fulfillment_source?: string
          height_inches?: number | null
          id?: string
          last_updated_at?: string | null
          last_updated_by?: string | null
          length_inches?: number | null
          order_management_task_id: string
          part_name: string
          picked_up_at?: string | null
          pickup_date?: string | null
          pickup_number?: string | null
          pickup_terminal?: string | null
          selected_yard_id: string
          shipping_address: string
          sla_elapsed_minutes?: number | null
          sla_met?: boolean | null
          sla_overdue_minutes?: number | null
          status?: string
          tracking_number?: string | null
          updated_at?: string
          vehicle_info?: string | null
          weight_lbs?: number | null
          width_inches?: number | null
          yard_condition?: string | null
          yard_name: string
          yard_phone?: string | null
          yard_price: number
        }
        Update: {
          actual_delivery_date?: string | null
          assigned_by?: string
          assigned_to?: string
          auth_code?: string | null
          bol_created_date?: string | null
          bol_number?: string | null
          carrier_name?: string | null
          communication_notes?: string | null
          completed_at?: string | null
          created_at?: string
          customer_name?: string
          customer_paid?: number | null
          customer_phone?: string | null
          destination_terminal?: string | null
          estimated_delivery?: string | null
          freight_price?: number | null
          fulfillment_source?: string
          height_inches?: number | null
          id?: string
          last_updated_at?: string | null
          last_updated_by?: string | null
          length_inches?: number | null
          order_management_task_id?: string
          part_name?: string
          picked_up_at?: string | null
          pickup_date?: string | null
          pickup_number?: string | null
          pickup_terminal?: string | null
          selected_yard_id?: string
          shipping_address?: string
          sla_elapsed_minutes?: number | null
          sla_met?: boolean | null
          sla_overdue_minutes?: number | null
          status?: string
          tracking_number?: string | null
          updated_at?: string
          vehicle_info?: string | null
          weight_lbs?: number | null
          width_inches?: number | null
          yard_condition?: string | null
          yard_name?: string
          yard_phone?: string | null
          yard_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_dispatch_tasks_assigned_by_fkey"
            columns: ["assigned_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_dispatch_tasks_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_dispatch_tasks_last_updated_by_fkey"
            columns: ["last_updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_dispatch_tasks_order_management_task_id_fkey"
            columns: ["order_management_task_id"]
            isOneToOne: false
            referencedRelation: "order_delivered_details"
            referencedColumns: ["om_task_id"]
          },
          {
            foreignKeyName: "order_dispatch_tasks_order_management_task_id_fkey"
            columns: ["order_management_task_id"]
            isOneToOne: false
            referencedRelation: "order_full_details"
            referencedColumns: ["om_task_id"]
          },
          {
            foreignKeyName: "order_dispatch_tasks_order_management_task_id_fkey"
            columns: ["order_management_task_id"]
            isOneToOne: false
            referencedRelation: "order_management_full"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_dispatch_tasks_order_management_task_id_fkey"
            columns: ["order_management_task_id"]
            isOneToOne: false
            referencedRelation: "order_management_tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_dispatch_tasks_selected_yard_id_fkey"
            columns: ["selected_yard_id"]
            isOneToOne: false
            referencedRelation: "pricing_yard_quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      order_management_tasks: {
        Row: {
          assigned_by: string
          assigned_to: string
          auth_code: string | null
          completed_at: string | null
          created_at: string | null
          deal_id: string | null
          dispatch_status: string | null
          dispatch_task_id: string | null
          dispatched_at: string | null
          dispatched_to: string | null
          fulfillment_source: string | null
          height_inches: number | null
          id: string
          length_inches: number | null
          pickup_date: string | null
          pricing_task_id: string
          selected_yard_id: string | null
          sla_elapsed_minutes: number | null
          sla_met: boolean | null
          sla_overdue_minutes: number | null
          status: string
          submitted_to_dispatch: boolean | null
          updated_at: string | null
          weight_lbs: number | null
          width_inches: number | null
        }
        Insert: {
          assigned_by: string
          assigned_to: string
          auth_code?: string | null
          completed_at?: string | null
          created_at?: string | null
          deal_id?: string | null
          dispatch_status?: string | null
          dispatch_task_id?: string | null
          dispatched_at?: string | null
          dispatched_to?: string | null
          fulfillment_source?: string | null
          height_inches?: number | null
          id?: string
          length_inches?: number | null
          pickup_date?: string | null
          pricing_task_id: string
          selected_yard_id?: string | null
          sla_elapsed_minutes?: number | null
          sla_met?: boolean | null
          sla_overdue_minutes?: number | null
          status?: string
          submitted_to_dispatch?: boolean | null
          updated_at?: string | null
          weight_lbs?: number | null
          width_inches?: number | null
        }
        Update: {
          assigned_by?: string
          assigned_to?: string
          auth_code?: string | null
          completed_at?: string | null
          created_at?: string | null
          deal_id?: string | null
          dispatch_status?: string | null
          dispatch_task_id?: string | null
          dispatched_at?: string | null
          dispatched_to?: string | null
          fulfillment_source?: string | null
          height_inches?: number | null
          id?: string
          length_inches?: number | null
          pickup_date?: string | null
          pricing_task_id?: string
          selected_yard_id?: string | null
          sla_elapsed_minutes?: number | null
          sla_met?: boolean | null
          sla_overdue_minutes?: number | null
          status?: string
          submitted_to_dispatch?: boolean | null
          updated_at?: string | null
          weight_lbs?: number | null
          width_inches?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "order_management_tasks_assigned_by_fkey"
            columns: ["assigned_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_management_tasks_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_management_tasks_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "order_delivered_details"
            referencedColumns: ["deal_id"]
          },
          {
            foreignKeyName: "order_management_tasks_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "order_full_details"
            referencedColumns: ["deal_id"]
          },
          {
            foreignKeyName: "order_management_tasks_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "sales_deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_management_tasks_dispatched_to_fkey"
            columns: ["dispatched_to"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_management_tasks_pricing_task_id_fkey"
            columns: ["pricing_task_id"]
            isOneToOne: false
            referencedRelation: "order_delivered_details"
            referencedColumns: ["pricing_task_id"]
          },
          {
            foreignKeyName: "order_management_tasks_pricing_task_id_fkey"
            columns: ["pricing_task_id"]
            isOneToOne: false
            referencedRelation: "order_full_details"
            referencedColumns: ["pricing_task_id"]
          },
          {
            foreignKeyName: "order_management_tasks_pricing_task_id_fkey"
            columns: ["pricing_task_id"]
            isOneToOne: false
            referencedRelation: "pricing_tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_management_tasks_selected_yard_id_fkey"
            columns: ["selected_yard_id"]
            isOneToOne: false
            referencedRelation: "pricing_yard_quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          created_by: string
          customer_email: string | null
          customer_name: string
          customer_phone: string | null
          delivered_at: string | null
          dispatch_notes: string | null
          eta: string
          id: string
          logistics_provider: string
          order_management_task_id: string
          part_name: string
          pickup_confirmed_at: string | null
          pickup_datetime: string
          shipping_address: string
          status: string
          terminal_info: string | null
          updated_at: string
          yard_condition: string | null
          yard_id: string
          yard_name: string
          yard_phone: string | null
          yard_price: number
          yard_shipping_included: boolean
        }
        Insert: {
          created_at?: string
          created_by: string
          customer_email?: string | null
          customer_name: string
          customer_phone?: string | null
          delivered_at?: string | null
          dispatch_notes?: string | null
          eta: string
          id?: string
          logistics_provider: string
          order_management_task_id: string
          part_name: string
          pickup_confirmed_at?: string | null
          pickup_datetime: string
          shipping_address: string
          status?: string
          terminal_info?: string | null
          updated_at?: string
          yard_condition?: string | null
          yard_id: string
          yard_name: string
          yard_phone?: string | null
          yard_price: number
          yard_shipping_included?: boolean
        }
        Update: {
          created_at?: string
          created_by?: string
          customer_email?: string | null
          customer_name?: string
          customer_phone?: string | null
          delivered_at?: string | null
          dispatch_notes?: string | null
          eta?: string
          id?: string
          logistics_provider?: string
          order_management_task_id?: string
          part_name?: string
          pickup_confirmed_at?: string | null
          pickup_datetime?: string
          shipping_address?: string
          status?: string
          terminal_info?: string | null
          updated_at?: string
          yard_condition?: string | null
          yard_id?: string
          yard_name?: string
          yard_phone?: string | null
          yard_price?: number
          yard_shipping_included?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "orders_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_order_management_task_id_fkey"
            columns: ["order_management_task_id"]
            isOneToOne: false
            referencedRelation: "order_delivered_details"
            referencedColumns: ["om_task_id"]
          },
          {
            foreignKeyName: "orders_order_management_task_id_fkey"
            columns: ["order_management_task_id"]
            isOneToOne: false
            referencedRelation: "order_full_details"
            referencedColumns: ["om_task_id"]
          },
          {
            foreignKeyName: "orders_order_management_task_id_fkey"
            columns: ["order_management_task_id"]
            isOneToOne: false
            referencedRelation: "order_management_full"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_order_management_task_id_fkey"
            columns: ["order_management_task_id"]
            isOneToOne: false
            referencedRelation: "order_management_tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_yard_id_fkey"
            columns: ["yard_id"]
            isOneToOne: false
            referencedRelation: "pricing_yard_quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      outbound_leads: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          make: string | null
          model: string | null
          part: string | null
          phone: string | null
          year: string | null
          zip: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          make?: string | null
          model?: string | null
          part?: string | null
          phone?: string | null
          year?: string | null
          zip?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          make?: string | null
          model?: string | null
          part?: string | null
          phone?: string | null
          year?: string | null
          zip?: string | null
        }
        Relationships: []
      }
      page_sections: {
        Row: {
          content: Json | null
          created_at: string | null
          id: string
          is_active: boolean | null
          page_slug: string
          position: number
          section_type: string
          updated_at: string | null
        }
        Insert: {
          content?: Json | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          page_slug: string
          position: number
          section_type: string
          updated_at?: string | null
        }
        Update: {
          content?: Json | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          page_slug?: string
          position?: number
          section_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      partner_applications: {
        Row: {
          company_name: string
          company_overview: string | null
          created_at: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          message: string
          phone: string
          source: string | null
          status: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          company_name: string
          company_overview?: string | null
          created_at?: string | null
          email: string
          first_name: string
          id?: string
          last_name: string
          message: string
          phone: string
          source?: string | null
          status?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          company_name?: string
          company_overview?: string | null
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          message?: string
          phone?: string
          source?: string | null
          status?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      partner_applications_infogrowth: {
        Row: {
          company_name: string
          contact_person: string
          country: string
          created_at: string | null
          email: string
          id: string
          message: string
          partnership_type: string
          phone: string
          status: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          company_name: string
          contact_person: string
          country: string
          created_at?: string | null
          email: string
          id?: string
          message: string
          partnership_type: string
          phone: string
          status?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          company_name?: string
          contact_person?: string
          country?: string
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          partnership_type?: string
          phone?: string
          status?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      parts_content: {
        Row: {
          badge: string | null
          content: Json | null
          created_at: string | null
          description: string | null
          id: string
          image: string | null
          seo: Json | null
          slug: string
          title: string
          type: string
          warranty: string | null
        }
        Insert: {
          badge?: string | null
          content?: Json | null
          created_at?: string | null
          description?: string | null
          id: string
          image?: string | null
          seo?: Json | null
          slug: string
          title: string
          type: string
          warranty?: string | null
        }
        Update: {
          badge?: string | null
          content?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          image?: string | null
          seo?: Json | null
          slug?: string
          title?: string
          type?: string
          warranty?: string | null
        }
        Relationships: []
      }
      parts_content_autoking: {
        Row: {
          badge: string | null
          content: Json | null
          created_at: string | null
          description: string | null
          id: string
          image: string | null
          rich_content: string | null
          seo: Json | null
          slug: string
          title: string
          type: string
          warranty: string | null
        }
        Insert: {
          badge?: string | null
          content?: Json | null
          created_at?: string | null
          description?: string | null
          id: string
          image?: string | null
          rich_content?: string | null
          seo?: Json | null
          slug: string
          title: string
          type: string
          warranty?: string | null
        }
        Update: {
          badge?: string | null
          content?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          image?: string | null
          rich_content?: string | null
          seo?: Json | null
          slug?: string
          title?: string
          type?: string
          warranty?: string | null
        }
        Relationships: []
      }
      pricing_tasks: {
        Row: {
          admin_notes: string | null
          assigned_by: string
          assigned_to: string
          base_price: number | null
          completed_at: string | null
          created_at: string
          customer_name: string | null
          deal_id: string
          id: string
          is_special_case: boolean | null
          lead_id: string
          part_name: string | null
          shipping_address: string | null
          sla_elapsed_minutes: number | null
          sla_met: boolean | null
          sla_overdue_minutes: number | null
          status: string
          total_price: number | null
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          assigned_by: string
          assigned_to: string
          base_price?: number | null
          completed_at?: string | null
          created_at?: string
          customer_name?: string | null
          deal_id: string
          id?: string
          is_special_case?: boolean | null
          lead_id: string
          part_name?: string | null
          shipping_address?: string | null
          sla_elapsed_minutes?: number | null
          sla_met?: boolean | null
          sla_overdue_minutes?: number | null
          status?: string
          total_price?: number | null
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          assigned_by?: string
          assigned_to?: string
          base_price?: number | null
          completed_at?: string | null
          created_at?: string
          customer_name?: string | null
          deal_id?: string
          id?: string
          is_special_case?: boolean | null
          lead_id?: string
          part_name?: string | null
          shipping_address?: string | null
          sla_elapsed_minutes?: number | null
          sla_met?: boolean | null
          sla_overdue_minutes?: number | null
          status?: string
          total_price?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pricing_tasks_assigned_by_fkey"
            columns: ["assigned_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pricing_tasks_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pricing_tasks_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "order_delivered_details"
            referencedColumns: ["deal_id"]
          },
          {
            foreignKeyName: "pricing_tasks_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "order_full_details"
            referencedColumns: ["deal_id"]
          },
          {
            foreignKeyName: "pricing_tasks_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "sales_deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pricing_tasks_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "sales_leads"
            referencedColumns: ["id"]
          },
        ]
      }
      pricing_yard_quotes: {
        Row: {
          added_by_role: string | null
          city: string | null
          condition: string
          created_at: string
          created_by: string
          discount_offered: string | null
          disposition: string | null
          email: string | null
          engine_faults: string | null
          engine_injectors: boolean | null
          engine_leaks: string | null
          engine_manifolds: boolean | null
          engine_sensors: boolean | null
          id: string
          includes_torque_converter: boolean | null
          is_best: boolean | null
          is_selected: boolean
          manual_clutch: boolean | null
          manual_flywheel: boolean | null
          manual_gearbox: boolean | null
          manual_transfer_case: boolean | null
          miles: number | null
          part_name: string | null
          partnership_status: string | null
          payment_method: string
          phone: string | null
          pickup_address: string | null
          pickup_appointment: string | null
          price: number
          pricing_task_id: string
          rating: number | null
          review_count: number | null
          shipping_included: boolean
          state: string | null
          technical_reviewed: boolean | null
          timing_condition: string | null
          transmission_issues: string | null
          updated_at: string | null
          warranty: string | null
          yard_id: string | null
          yard_name: string
          yard_person_name: string | null
        }
        Insert: {
          added_by_role?: string | null
          city?: string | null
          condition: string
          created_at?: string
          created_by: string
          discount_offered?: string | null
          disposition?: string | null
          email?: string | null
          engine_faults?: string | null
          engine_injectors?: boolean | null
          engine_leaks?: string | null
          engine_manifolds?: boolean | null
          engine_sensors?: boolean | null
          id?: string
          includes_torque_converter?: boolean | null
          is_best?: boolean | null
          is_selected?: boolean
          manual_clutch?: boolean | null
          manual_flywheel?: boolean | null
          manual_gearbox?: boolean | null
          manual_transfer_case?: boolean | null
          miles?: number | null
          part_name?: string | null
          partnership_status?: string | null
          payment_method: string
          phone?: string | null
          pickup_address?: string | null
          pickup_appointment?: string | null
          price: number
          pricing_task_id: string
          rating?: number | null
          review_count?: number | null
          shipping_included?: boolean
          state?: string | null
          technical_reviewed?: boolean | null
          timing_condition?: string | null
          transmission_issues?: string | null
          updated_at?: string | null
          warranty?: string | null
          yard_id?: string | null
          yard_name: string
          yard_person_name?: string | null
        }
        Update: {
          added_by_role?: string | null
          city?: string | null
          condition?: string
          created_at?: string
          created_by?: string
          discount_offered?: string | null
          disposition?: string | null
          email?: string | null
          engine_faults?: string | null
          engine_injectors?: boolean | null
          engine_leaks?: string | null
          engine_manifolds?: boolean | null
          engine_sensors?: boolean | null
          id?: string
          includes_torque_converter?: boolean | null
          is_best?: boolean | null
          is_selected?: boolean
          manual_clutch?: boolean | null
          manual_flywheel?: boolean | null
          manual_gearbox?: boolean | null
          manual_transfer_case?: boolean | null
          miles?: number | null
          part_name?: string | null
          partnership_status?: string | null
          payment_method?: string
          phone?: string | null
          pickup_address?: string | null
          pickup_appointment?: string | null
          price?: number
          pricing_task_id?: string
          rating?: number | null
          review_count?: number | null
          shipping_included?: boolean
          state?: string | null
          technical_reviewed?: boolean | null
          timing_condition?: string | null
          transmission_issues?: string | null
          updated_at?: string | null
          warranty?: string | null
          yard_id?: string | null
          yard_name?: string
          yard_person_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pricing_yard_quotes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pricing_yard_quotes_pricing_task_id_fkey"
            columns: ["pricing_task_id"]
            isOneToOne: false
            referencedRelation: "order_delivered_details"
            referencedColumns: ["pricing_task_id"]
          },
          {
            foreignKeyName: "pricing_yard_quotes_pricing_task_id_fkey"
            columns: ["pricing_task_id"]
            isOneToOne: false
            referencedRelation: "order_full_details"
            referencedColumns: ["pricing_task_id"]
          },
          {
            foreignKeyName: "pricing_yard_quotes_pricing_task_id_fkey"
            columns: ["pricing_task_id"]
            isOneToOne: false
            referencedRelation: "pricing_tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pricing_yard_quotes_yard_id_fkey"
            columns: ["yard_id"]
            isOneToOne: false
            referencedRelation: "yards"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          app_scope: string
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          phone: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          app_scope: string
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          phone?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          app_scope?: string
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      questions: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          is_predefined: boolean | null
          options: string[] | null
          question_text: string
          question_type: string
          validation: Json | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_predefined?: boolean | null
          options?: string[] | null
          question_text: string
          question_type?: string
          validation?: Json | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_predefined?: boolean | null
          options?: string[] | null
          question_text?: string
          question_type?: string
          validation?: Json | null
        }
        Relationships: []
      }
      recruiters: {
        Row: {
          company: string | null
          created_at: string | null
          email: string
          id: string
          name: string
          password: string
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email: string
          id?: string
          name: string
          password: string
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          password?: string
        }
        Relationships: []
      }
      ringcentral_tokens: {
        Row: {
          access_token: string
          access_token_expires_at: string | null
          created_at: string | null
          expires_in: number | null
          id: string
          refresh_token: string
          refresh_token_expires_at: string | null
          scope: string | null
          token_type: string | null
          updated_at: string | null
        }
        Insert: {
          access_token: string
          access_token_expires_at?: string | null
          created_at?: string | null
          expires_in?: number | null
          id?: string
          refresh_token: string
          refresh_token_expires_at?: string | null
          scope?: string | null
          token_type?: string | null
          updated_at?: string | null
        }
        Update: {
          access_token?: string
          access_token_expires_at?: string | null
          created_at?: string | null
          expires_in?: number | null
          id?: string
          refresh_token?: string
          refresh_token_expires_at?: string | null
          scope?: string | null
          token_type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      roles: {
        Row: {
          created_at: string | null
          id: string
          name: string
          permissions: Json | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          permissions?: Json | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          permissions?: Json | null
        }
        Relationships: []
      }
      sales_communication: {
        Row: {
          content: string
          created_at: string | null
          created_by: string
          id: string
          lead_id: string | null
          subject: string | null
          type: string
        }
        Insert: {
          content: string
          created_at?: string | null
          created_by: string
          id?: string
          lead_id?: string | null
          subject?: string | null
          type: string
        }
        Update: {
          content?: string
          created_at?: string | null
          created_by?: string
          id?: string
          lead_id?: string | null
          subject?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "sales_communication_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_communication_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "sales_leads"
            referencedColumns: ["id"]
          },
        ]
      }
      sales_deals: {
        Row: {
          base_price: number
          billing_address: string
          card_number: string | null
          card_number_2: string | null
          card1_amount: number | null
          card2_amount: number | null
          created_at: string | null
          created_by: string | null
          customer_name: string
          cvv: string | null
          cvv_2: string | null
          display_deal_id: string | null
          email: string
          expiration: string | null
          expiration_2: string | null
          id: string
          is_test: boolean
          lead_id: string | null
          make: string
          model: string
          name_on_card: string | null
          name_on_card_2: string | null
          part: string
          payment_method: string
          shipping_address: string
          sub_inventory: string
          test_label: string | null
          total_price: number
          updated_at: string | null
          vin: string
          year: string
        }
        Insert: {
          base_price: number
          billing_address: string
          card_number?: string | null
          card_number_2?: string | null
          card1_amount?: number | null
          card2_amount?: number | null
          created_at?: string | null
          created_by?: string | null
          customer_name: string
          cvv?: string | null
          cvv_2?: string | null
          display_deal_id?: string | null
          email: string
          expiration?: string | null
          expiration_2?: string | null
          id?: string
          is_test?: boolean
          lead_id?: string | null
          make: string
          model: string
          name_on_card?: string | null
          name_on_card_2?: string | null
          part: string
          payment_method?: string
          shipping_address: string
          sub_inventory: string
          test_label?: string | null
          total_price: number
          updated_at?: string | null
          vin: string
          year: string
        }
        Update: {
          base_price?: number
          billing_address?: string
          card_number?: string | null
          card_number_2?: string | null
          card1_amount?: number | null
          card2_amount?: number | null
          created_at?: string | null
          created_by?: string | null
          customer_name?: string
          cvv?: string | null
          cvv_2?: string | null
          display_deal_id?: string | null
          email?: string
          expiration?: string | null
          expiration_2?: string | null
          id?: string
          is_test?: boolean
          lead_id?: string | null
          make?: string
          model?: string
          name_on_card?: string | null
          name_on_card_2?: string | null
          part?: string
          payment_method?: string
          shipping_address?: string
          sub_inventory?: string
          test_label?: string | null
          total_price?: number
          updated_at?: string | null
          vin?: string
          year?: string
        }
        Relationships: [
          {
            foreignKeyName: "sales_deals_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "sales_leads"
            referencedColumns: ["id"]
          },
        ]
      }
      sales_leads: {
        Row: {
          assigned_to: string | null
          created_at: string | null
          customer_name: string | null
          disposition: string | null
          email: string | null
          followup_notes: string | null
          id: string
          last_handled_at: string | null
          last_handled_by: string | null
          make: string | null
          miles: number | null
          mobile_no: string | null
          model: string | null
          organization_id: string | null
          part: string
          quoted_price: number | null
          source: string | null
          status: string
          sub_inventory: string | null
          updated_at: string | null
          vin: string | null
          warranty: string | null
          year: string | null
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string | null
          customer_name?: string | null
          disposition?: string | null
          email?: string | null
          followup_notes?: string | null
          id?: string
          last_handled_at?: string | null
          last_handled_by?: string | null
          make?: string | null
          miles?: number | null
          mobile_no?: string | null
          model?: string | null
          organization_id?: string | null
          part: string
          quoted_price?: number | null
          source?: string | null
          status?: string
          sub_inventory?: string | null
          updated_at?: string | null
          vin?: string | null
          warranty?: string | null
          year?: string | null
        }
        Update: {
          assigned_to?: string | null
          created_at?: string | null
          customer_name?: string | null
          disposition?: string | null
          email?: string | null
          followup_notes?: string | null
          id?: string
          last_handled_at?: string | null
          last_handled_by?: string | null
          make?: string | null
          miles?: number | null
          mobile_no?: string | null
          model?: string | null
          organization_id?: string | null
          part?: string
          quoted_price?: number | null
          source?: string | null
          status?: string
          sub_inventory?: string | null
          updated_at?: string | null
          vin?: string | null
          warranty?: string | null
          year?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sales_leads_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_leads_last_handled_by_fkey"
            columns: ["last_handled_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_leads_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      autoking_brands
: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          image: string | null
          rich_content: string | null
          seo_description: string | null
          seo_keywords: string[] | null
          seo_title: string | null
          slug: string
          status: string | null
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          image?: string | null
          rich_content?: string | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          slug: string
          status?: string | null
          title: string
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          image?: string | null
          rich_content?: string | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          slug?: string
          status?: string | null
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      shipments: {
        Row: {
          actual_delivery: string | null
          created_at: string | null
          customer_email: string | null
          customer_name: string
          customer_phone: string | null
          delay_reason: string | null
          delay_updated_at: string | null
          destination_address: string | null
          destination_state: string
          driver_id: string | null
          estimated_days: number
          id: string
          notes: string | null
          origin_address: string | null
          origin_state: string
          scheduled_delivery: string
          scheduled_pickup: string | null
          status: string | null
          tracking_number: string
          updated_at: string | null
          vehicle_id: string | null
        }
        Insert: {
          actual_delivery?: string | null
          created_at?: string | null
          customer_email?: string | null
          customer_name: string
          customer_phone?: string | null
          delay_reason?: string | null
          delay_updated_at?: string | null
          destination_address?: string | null
          destination_state: string
          driver_id?: string | null
          estimated_days: number
          id?: string
          notes?: string | null
          origin_address?: string | null
          origin_state: string
          scheduled_delivery: string
          scheduled_pickup?: string | null
          status?: string | null
          tracking_number: string
          updated_at?: string | null
          vehicle_id?: string | null
        }
        Update: {
          actual_delivery?: string | null
          created_at?: string | null
          customer_email?: string | null
          customer_name?: string
          customer_phone?: string | null
          delay_reason?: string | null
          delay_updated_at?: string | null
          destination_address?: string | null
          destination_state?: string
          driver_id?: string | null
          estimated_days?: number
          id?: string
          notes?: string | null
          origin_address?: string | null
          origin_state?: string
          scheduled_delivery?: string
          scheduled_pickup?: string | null
          status?: string | null
          tracking_number?: string
          updated_at?: string | null
          vehicle_id?: string | null
        }
        Relationships: []
      }
      support_communication_log: {
        Row: {
          communication_type:
            | Database["public"]["Enums"]["communication_type_enum"]
            | null
          created_at: string | null
          created_by: string
          id: string
          message: string
          ticket_id: string
        }
        Insert: {
          communication_type?:
            | Database["public"]["Enums"]["communication_type_enum"]
            | null
          created_at?: string | null
          created_by: string
          id?: string
          message: string
          ticket_id: string
        }
        Update: {
          communication_type?:
            | Database["public"]["Enums"]["communication_type_enum"]
            | null
          created_at?: string | null
          created_by?: string
          id?: string
          message?: string
          ticket_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_communication_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_communication_ticket_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      support_email_attachments: {
        Row: {
          created_at: string | null
          email_message_uuid: string | null
          file_name: string
          file_size: number | null
          file_type: string | null
          file_url: string | null
          id: string
          message_id: string | null
          mime_type: string | null
          sender_type: string | null
          storage_path: string | null
          ticket_id: string | null
          uploaded_by: string | null
        }
        Insert: {
          created_at?: string | null
          email_message_uuid?: string | null
          file_name: string
          file_size?: number | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          message_id?: string | null
          mime_type?: string | null
          sender_type?: string | null
          storage_path?: string | null
          ticket_id?: string | null
          uploaded_by?: string | null
        }
        Update: {
          created_at?: string | null
          email_message_uuid?: string | null
          file_name?: string
          file_size?: number | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          message_id?: string | null
          mime_type?: string | null
          sender_type?: string | null
          storage_path?: string | null
          ticket_id?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_email_attachments_email_message_uuid_fkey"
            columns: ["email_message_uuid"]
            isOneToOne: false
            referencedRelation: "support_email_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_email_attachments_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "support_email_messages"
            referencedColumns: ["message_id"]
          },
          {
            foreignKeyName: "support_email_attachments_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      support_email_messages: {
        Row: {
          agent_id: string | null
          body: string | null
          cc_emails: string[] | null
          created_at: string | null
          email_references: string | null
          from_email: string | null
          id: string
          in_reply_to: string | null
          message_id: string | null
          provider_email_id: string | null
          raw_payload: Json | null
          sender_type: string
          subject: string | null
          ticket_id: string | null
          to_emails: string[] | null
        }
        Insert: {
          agent_id?: string | null
          body?: string | null
          cc_emails?: string[] | null
          created_at?: string | null
          email_references?: string | null
          from_email?: string | null
          id?: string
          in_reply_to?: string | null
          message_id?: string | null
          provider_email_id?: string | null
          raw_payload?: Json | null
          sender_type: string
          subject?: string | null
          ticket_id?: string | null
          to_emails?: string[] | null
        }
        Update: {
          agent_id?: string | null
          body?: string | null
          cc_emails?: string[] | null
          created_at?: string | null
          email_references?: string | null
          from_email?: string | null
          id?: string
          in_reply_to?: string | null
          message_id?: string | null
          provider_email_id?: string | null
          raw_payload?: Json | null
          sender_type?: string
          subject?: string | null
          ticket_id?: string | null
          to_emails?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "support_email_messages_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_email_messages_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      support_email_participants: {
        Row: {
          created_at: string | null
          email: string
          id: string
          role: string
          ticket_id: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          role: string
          ticket_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          role?: string
          ticket_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_email_participants_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      support_tickets: {
        Row: {
          assigned_at: string | null
          assigned_to: string | null
          created_at: string | null
          created_by: string
          customer_email: string | null
          customer_name: string | null
          id: string
          issue: string
          last_email_at: string | null
          phone_number: string | null
          priority: string
          resolved_at: string | null
          status: string
          status_started_at: string
          ticket_id: string
          tracking_number: string | null
          updated_at: string | null
        }
        Insert: {
          assigned_at?: string | null
          assigned_to?: string | null
          created_at?: string | null
          created_by: string
          customer_email?: string | null
          customer_name?: string | null
          id?: string
          issue: string
          last_email_at?: string | null
          phone_number?: string | null
          priority?: string
          resolved_at?: string | null
          status?: string
          status_started_at?: string
          ticket_id: string
          tracking_number?: string | null
          updated_at?: string | null
        }
        Update: {
          assigned_at?: string | null
          assigned_to?: string | null
          created_at?: string | null
          created_by?: string
          customer_email?: string | null
          customer_name?: string | null
          id?: string
          issue?: string
          last_email_at?: string | null
          phone_number?: string | null
          priority?: string
          resolved_at?: string | null
          status?: string
          status_started_at?: string
          ticket_id?: string
          tracking_number?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      system_config: {
        Row: {
          key: string
          updated_at: string | null
          value: string
        }
        Insert: {
          key: string
          updated_at?: string | null
          value: string
        }
        Update: {
          key?: string
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
      us_cities: {
        Row: {
          id: number
          name: string
          state_id: number
        }
        Insert: {
          id?: number
          name: string
          state_id: number
        }
        Update: {
          id?: number
          name?: string
          state_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "us_cities_state_id_fkey"
            columns: ["state_id"]
            isOneToOne: false
            referencedRelation: "us_states"
            referencedColumns: ["id"]
          },
        ]
      }
      us_states: {
        Row: {
          id: number
          name: string
          state_code: string
        }
        Insert: {
          id?: number
          name: string
          state_code: string
        }
        Update: {
          id?: number
          name?: string
          state_code?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          department: string | null
          departments: string[] | null
          email: string
          full_name: string
          id: string
          is_active: boolean | null
          organization_id: string | null
          phone: string | null
          role_id: string | null
        }
        Insert: {
          created_at?: string | null
          department?: string | null
          departments?: string[] | null
          email: string
          full_name: string
          id: string
          is_active?: boolean | null
          organization_id?: string | null
          phone?: string | null
          role_id?: string | null
        }
        Update: {
          created_at?: string | null
          department?: string | null
          departments?: string[] | null
          email?: string
          full_name?: string
          id?: string
          is_active?: boolean | null
          organization_id?: string | null
          phone?: string | null
          role_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      yards: {
        Row: {
          address: string | null
          city: string | null
          created_at: string | null
          created_by: string
          expected_discount: string | null
          id: string
          last_contacted: string | null
          partnered_on: string | null
          partnership_status: string | null
          poc1_email: string | null
          poc1_name: string
          poc1_phone: string
          poc2_email: string | null
          poc2_name: string | null
          poc2_phone: string | null
          rating: number | null
          returns_count: number | null
          returns_reasons: string | null
          review_count: number | null
          state: string
          updated_at: string | null
          warranty: string | null
          website: string | null
          yard_name: string
        }
        Insert: {
          address?: string | null
          city?: string | null
          created_at?: string | null
          created_by: string
          expected_discount?: string | null
          id?: string
          last_contacted?: string | null
          partnered_on?: string | null
          partnership_status?: string | null
          poc1_email?: string | null
          poc1_name: string
          poc1_phone: string
          poc2_email?: string | null
          poc2_name?: string | null
          poc2_phone?: string | null
          rating?: number | null
          returns_count?: number | null
          returns_reasons?: string | null
          review_count?: number | null
          state: string
          updated_at?: string | null
          warranty?: string | null
          website?: string | null
          yard_name: string
        }
        Update: {
          address?: string | null
          city?: string | null
          created_at?: string | null
          created_by?: string
          expected_discount?: string | null
          id?: string
          last_contacted?: string | null
          partnered_on?: string | null
          partnership_status?: string | null
          poc1_email?: string | null
          poc1_name?: string
          poc1_phone?: string
          poc2_email?: string | null
          poc2_name?: string | null
          poc2_phone?: string | null
          rating?: number | null
          returns_count?: number | null
          returns_reasons?: string | null
          review_count?: number | null
          state?: string
          updated_at?: string | null
          warranty?: string | null
          website?: string | null
          yard_name?: string
        }
        Relationships: []
      }
      yards_communication_log: {
        Row: {
          created_at: string | null
          created_by: string
          id: string
          message: string
          yard_id: string
        }
        Insert: {
          created_at?: string | null
          created_by: string
          id?: string
          message: string
          yard_id: string
        }
        Update: {
          created_at?: string | null
          created_by?: string
          id?: string
          message?: string
          yard_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "yards_communication_log_yard_id_fkey"
            columns: ["yard_id"]
            isOneToOne: false
            referencedRelation: "yards"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      order_delivered_details: {
        Row: {
          actual_delivery_date: string | null
          base_price: number | null
          bol_created_date: string | null
          bol_number: string | null
          carrier_name: string | null
          communication_notes: string | null
          customer_email: string | null
          customer_name: string | null
          customer_paid: number | null
          customer_phone: string | null
          deal_id: string | null
          deal_price: number | null
          destination_terminal: string | null
          dispatch_status: string | null
          dispatch_task_id: string | null
          estimated_delivery: string | null
          freight_price: number | null
          height_inches: number | null
          lead_source: string | null
          length_inches: number | null
          make: string | null
          model: string | null
          om_task_id: string | null
          order_source: string | null
          part: string | null
          payment_method: string | null
          pickup_date: string | null
          pickup_terminal: string | null
          pipeline_stage: string | null
          pricing_agent: string | null
          pricing_status: string | null
          pricing_task_id: string | null
          sales_agent: string | null
          shipping_address: string | null
          sub_inventory: string | null
          tracking_number: string | null
          vin: string | null
          weight_lbs: number | null
          width_inches: number | null
          yard_condition: string | null
          yard_email: string | null
          yard_name: string | null
          yard_phone: string | null
          yard_price: number | null
          yard_state: string | null
          yard_warranty: string | null
          year: string | null
        }
        Relationships: []
      }
      order_full_details: {
        Row: {
          actual_delivery_date: string | null
          base_price: number | null
          bol_created_date: string | null
          bol_number: string | null
          carrier_name: string | null
          communication_notes: string | null
          customer_email: string | null
          customer_name: string | null
          customer_paid: number | null
          customer_phone: string | null
          deal_created_at: string | null
          deal_id: string | null
          deal_price: number | null
          destination_terminal: string | null
          dispatch_status: string | null
          dispatch_task_id: string | null
          estimated_delivery: string | null
          freight_price: number | null
          height_inches: number | null
          lead_source: string | null
          length_inches: number | null
          make: string | null
          model: string | null
          om_task_id: string | null
          order_source: string | null
          part: string | null
          payment_method: string | null
          pickup_date: string | null
          pickup_terminal: string | null
          pipeline_stage: string | null
          pricing_agent: string | null
          pricing_status: string | null
          pricing_task_id: string | null
          sales_agent: string | null
          shipping_address: string | null
          sub_inventory: string | null
          tracking_number: string | null
          vin: string | null
          weight_lbs: number | null
          width_inches: number | null
          yard_condition: string | null
          yard_email: string | null
          yard_name: string | null
          yard_phone: string | null
          yard_price: number | null
          yard_state: string | null
          yard_warranty: string | null
          year: string | null
        }
        Relationships: []
      }
      order_management_full: {
        Row: {
          agent_name: string | null
          assigned_to: string | null
          created_at: string | null
          customer_name: string | null
          fulfillment_source: string | null
          height_inches: number | null
          id: string | null
          length_inches: number | null
          part_name: string | null
          pickup_date: string | null
          pricing_task_id: string | null
          selected_yard_id: string | null
          submitted_to_dispatch: boolean | null
          vehicle: string | null
          weight_lbs: number | null
          width_inches: number | null
        }
        Relationships: [
          {
            foreignKeyName: "order_management_tasks_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_management_tasks_pricing_task_id_fkey"
            columns: ["pricing_task_id"]
            isOneToOne: false
            referencedRelation: "order_delivered_details"
            referencedColumns: ["pricing_task_id"]
          },
          {
            foreignKeyName: "order_management_tasks_pricing_task_id_fkey"
            columns: ["pricing_task_id"]
            isOneToOne: false
            referencedRelation: "order_full_details"
            referencedColumns: ["pricing_task_id"]
          },
          {
            foreignKeyName: "order_management_tasks_pricing_task_id_fkey"
            columns: ["pricing_task_id"]
            isOneToOne: false
            referencedRelation: "pricing_tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_management_tasks_selected_yard_id_fkey"
            columns: ["selected_yard_id"]
            isOneToOne: false
            referencedRelation: "pricing_yard_quotes"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      assign_ticket: {
        Args: { p_ticket_id: string; p_user_id: string }
        Returns: undefined
      }
      change_ticket_status: {
        Args: {
          p_new_status: string
          p_prev_status: string
          p_ticket_id: string
          p_user_id: string
        }
        Returns: Json
      }
      fn_delete_old_notifications: { Args: never; Returns: undefined }
      generate_custom_job_id: {
        Args: { company_prefix?: string; job_title: string }
        Returns: string
      }
      generate_next_tracking_number: { Args: never; Returns: string }
      generate_ticket_id: { Args: never; Returns: string }
      get_next_rac_display_id: { Args: never; Returns: string }
      get_next_test_display_id: { Args: never; Returns: string }
      get_next_tracking_id: { Args: never; Returns: string }
      get_order_details: { Args: { order_number: string }; Returns: Json }
      increment_applicants_count: {
        Args: { job_id_param: string }
        Returns: undefined
      }
      reassign_ticket: {
        Args: {
          p_current_user_id: string
          p_new_user_id: string
          p_ticket_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      communication_type_enum:
        | "internal_note"
        | "status_update"
        | "assignment_change"
        | "ai_suggestion"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      communication_type_enum: [
        "internal_note",
        "status_update",
        "assignment_change",
        "ai_suggestion",
      ],
    },
  },
} as const
