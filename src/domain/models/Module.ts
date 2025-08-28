export interface Module {
  id?: number; 
  name: string;     
  description?: string; 
  created_at?: string;   
  updated_at?: string;  
}


export interface CreateModuleResponse {
  data: Module;
}
