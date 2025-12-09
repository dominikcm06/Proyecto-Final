export interface Review {
    id: number;
    user_id: number;
    movie_id: number;
    rating: number;
    comment: string;
    created_at?: string;
    username?: string; // Optional for joins
    movie_title?: string; // Optional for joins
    title?: string;
    is_public?: boolean;
    contains_spoilers?: boolean;
    would_recommend?: boolean;
}
