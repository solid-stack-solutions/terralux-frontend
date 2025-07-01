export type PowerState = {
    power: boolean;
};

export type PlugConfiguration = {
    plug_url: string;
    natural_factor: number;
    local_latitude: number;
    local_longitude: number;
    natural_latitude: number;
    natural_longitude: number;
    timezone?: Date;
    computed_timers?: PlugTimer[];
    local_timers?: PlugTimer[];
    natural_timers?: PlugTimer[];
};

export type PlugTimer = {
    on_time: PlugSwitchTime;
    off_time: PlugSwitchTime;
};

export type PlugSwitchTime = {
    hour: number;
    minute: number;
};

export function plugSwitchTimeToString(time: PlugSwitchTime): string {
    const minute = time.minute.toString().padStart(2, '0');
    return `${time.hour}:${minute}`;
}
