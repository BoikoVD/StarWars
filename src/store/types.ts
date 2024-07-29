export interface ErrorModel {
    code?: number, 
    message?: string
}

interface BaseResponseModel {
    count: number,
	next: string | null,
	previous: string | null,
}

export interface PersonModel {
    "id": number,
    "name": string,
    "height": string,
    "mass": string,
    "hair_color": string,
    "skin_color": string,
    "eye_color": string,
    "birth_year": string,
    "gender": "male" | "female",
    "homeworld": number,
    "films": number[],
    "species": number[],
    "vehicles": number[],
    "starships": number[],
    "created": string,
    "edited": string,
    "url": string
}

export interface FilmModel {
    "id": number,
    "characters": number[],
    "created": string,
    "director": string,
    "edited": string,
    "episode_id": 4,
    "opening_crawl": string,
    "planets": number[],
    "producer": string,
    "release_date": string,
    "species": number[],
    "starships": number[],
    "title": string,
    "url": string,
    "vehicles": number[]
}

export interface StarshipModel {
    "id": number,
    "MGLT": string,
    "cargo_capacity": string,
    "consumables": string,
    "cost_in_credits": string,
    "created": string,
    "crew": string,
    "edited": string,
    "hyperdrive_rating": string,
    "length": string,
    "manufacturer": string,
    "max_atmosphering_speed": string,
    "model": string,
    "name": string,
    "passengers": string,
    "films": number[],
    "pilots": number[],
    "starship_class": string,
    "url": string
}

export interface PeopleResponseModel extends BaseResponseModel {
    results: PersonModel[]
}

export interface FilmsResponseModel extends BaseResponseModel {
    results: FilmModel[]
}

export interface StarshipsResponseModel extends BaseResponseModel {
    results: StarshipModel[]
}