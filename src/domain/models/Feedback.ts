// src/domain/models/Feedback.ts

export interface Comment {
  id?: number;
  feedback_id?: number;
  user_id?: number;
  comment: string;
  created_at?: string;
  updated_at?: string;
  user?: {
    id?: number;
    name?: string;
  };
}

export interface Feedback {
  id?: number;
  slug?: string;
  user_id?: number | null;
  departement_id?: number | null;
  module_id?: number | null;
  phase_id?: number | null;
  type_feedback_id?: number | null;
  description: string;
  file?: string | null;
  status?: string | null;
  deletefeedback?: boolean;
  feedback_group_id?: string;
  created_at?: string;
  updated_at?: string;

  // Relations pour ton frontend
  module?: { name: string };
  typeFeedback?: { name: string };
  departement?: { name: string };
  phase?: { name: string };
  comments?: Comment[]; // Ajout des commentaires
}

export interface CreateFeedbackResponse {
  status: string;
  message: string;
  data: Feedback | Feedback[];
}

// Pagination
export interface FeedbackListResponse {
  status: string;
  data: Feedback[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  next_page_url?: string;
  prev_page_url?: string;
}

// Payload pour créer un feedback
export interface FeedbackCreatePayload {
  description: string;
  departement_id?: number;
  module_id?: number;
  type_feedback_id?: number;
  phases: number[];
  file?: File | null;
}
