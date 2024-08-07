export interface Episode{
    id: string,
    name: string,
    seasonNumber: number,
    episodeNumber: number
}

export const defaultEpisode: Episode = {id: "", name: "", seasonNumber: 0, episodeNumber: 0};
