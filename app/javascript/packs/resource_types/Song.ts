export enum SongStatus {
    ready= 'Ready',
    needs_work = "Needs Work",
    not_started = "Not Started"
}

export type Song = {
    id?: number
    bpm: number
    title: string
    last_played: string
    status: SongStatus
    created_at?: string
    updated_at?: string
    data_file?: File
}