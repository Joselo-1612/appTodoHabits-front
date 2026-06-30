export interface ProjectJson {
    pro_id?: number;
    pro_name: string;
    pro_description: string;
    pro_priority: number;
    pro_date_start: string;
    pro_date_end: string;
    pro_prg_id?: number;
    pro_use_id: number;
    pro_status?: string;
}

export interface ProjectRegisterJson extends ProjectJson {
    pro_group?: string;
}

