export interface ProjectJson {
    pro_id?: number;
    pro_name: string;
    pro_description: string;
    pro_priority: number;
    pro_date_start: string;
    pro_date_end: string;
    pro_prg_id?: number;
    pro_use_id?: number;
    pro_status?: string;
}

export interface ProjectRegisterJson extends ProjectJson {
    pro_group: string;
}

export interface ProjectDetail {
  pro_id: number;
  pro_name: string;
  pro_description: string;
  pro_priority: string;
  pro_date_start: string;
  pro_date_end: string;
}

export interface Section {
  acs_id?: number,
  acs_name: string,
  acs_pro_id?: number
}

export interface SectionDetail extends Section {
  activities: ActivityDetail[]
}

export interface Tag {
  tag_name: string,
  tag_color: string
}

export interface Activity {
  act_id?: number,
  act_sea_id: number,
  act_name: string,
  act_description: string,
  act_date_start: string,
  act_date_end: string,
  act_position?: number
}

export interface ActivityDetail extends Activity {
  tags: Tag[]
}