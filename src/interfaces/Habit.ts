export interface HabitJson {
    hab_id?: number,
    hab_name: string;
    hab_description: string;
    hab_icon: string;
    hab_type_recurrence: string;
    hab_status: string;
    hab_use_id: number;
    hab_date: string;
}

export interface HabitComplete {
    habits: HabitCompleteDetail[],
    percentage: number
}

export interface HabitCompleteDetail {
    hab_id: number,
    hac_date: string,
    hac_id: number
}