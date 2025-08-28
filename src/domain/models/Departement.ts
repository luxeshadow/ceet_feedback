export interface Departement {
  id?: number; 
  name: string;     
  description?: string; 
  created_at?: string;   
  updated_at?: string;  
}


export interface CreateDepartementResponse {
  data: Departement;
}
