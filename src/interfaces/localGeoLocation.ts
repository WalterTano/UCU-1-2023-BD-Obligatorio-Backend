// It's called LocalGeoLocation because there's a type called Geolocation already
export interface LocalGeolocation {
    latitude?: number,
    longitude?: number,
    country: string,
    city: string,
    province: string,
    streetAddress: string
}
