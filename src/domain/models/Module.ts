export interface Module {
  id?: number;
  user_id?: number;
  departement_id?: number;
  name: string;
  description?: string;
  deletemodule?: number;
  created_at?: string;
  updated_at?: string;
}


export interface CreateModuleResponse {
  data: Module;
}


export interface ModulesByDepartementResponse {
  data: Module[];
  count: number;
  departement_id: number;
}
