export interface JWTResponse {
    refresh: string,
    access: string,
    user_id: number
}

export interface AccessJWTResponse{
    access: string
}