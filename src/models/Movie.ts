export interface Movie{
    id: string,
    name: string,
    type: string,
    hasTrailer: boolean;
}

export const defaultMovie: Movie = {id: "", name: "defaultMovie", type: "", hasTrailer: false};
