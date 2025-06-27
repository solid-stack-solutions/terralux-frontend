export type PlugConfiguration = {
    plug_url: string;
    natural_factor: number;
    local_latitude: number;
    local_longitude: number;
    natural_latitude: number;
    natural_longitude: number;
    timezone?: Date;
    computed_timers?: PlugTimer[];
};

export type PlugTimer = {
    on_time: PlugSwitchTime;
    off_time: PlugSwitchTime;
};

export type PlugSwitchTime = {
    hour: number;
    minute: number;
};
