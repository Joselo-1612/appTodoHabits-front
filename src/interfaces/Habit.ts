export interface HabitJson {
    hab_id?: number,
    hab_name: string;
    hab_description: string;
    hab_type_recurrence: string;
    hab_status?: string;
    hab_schedule?: string;
    hab_is_pinned: number;
    hab_use_id?: number;
}

export interface HabitRegisterJson extends HabitJson {
    hab_days_of_week?: string[];
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

export interface ReportDate {
    from: string;
    to: string;
}

export interface ReportHabit {
    listHabitsDone: HabitCompleteDetail[],
    totalHabit: number,
    totalDone: number
}

export interface HabitDay {
    had_id:number,
    had_hab_id: number,
    had_day: string;
    had_description: string;
    had_schedule: string;
}