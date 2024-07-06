export interface Movie{
    id: string,
    name: string,
    type: string,
    dateAdded: number,
    size: number,
    hasTrailer: boolean,
    requester: string | null
}

export const defaultMovie: Movie = {id: "", name: "defaultMovie", type: "", dateAdded: 0, size: 0, hasTrailer: false, requester: null};
