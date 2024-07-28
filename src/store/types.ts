export interface ErrorModel {
    code?: number, 
    message?: string
}

interface BaseResponseModel {
    count: number,
	next: string | null,
	previous: string | null,
}

interface PersonModel {
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

export interface PeopleResponseModel extends BaseResponseModel {
    results: PersonModel[]
}
