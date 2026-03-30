export interface Character {
    id: number;
    name: string;
    status: 'Alive' | 'Dead' | 'unknown';
    species: string;
    gender: string;
    origin: {
        name: string;
        url: string;
    };  
    location: {
        name: string;
        url: string;
    };
    image: string;
}

export interface ApiResponse {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    };
    results: Character[];
}