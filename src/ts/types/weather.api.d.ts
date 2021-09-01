export interface Location {
    "country": string,
    "id": number,
    "lat": number,
    "lon": number
    "name": string,
    "region": string
    "url": string
}

export interface ExtendedLocation extends Location {
    "localtime": string,
    "localtime_epoch": number,
    "tz_id": string
}

export interface Forecast {
    "alerts": {
        alert: []
    },
    "current": {
        "air_quality" : {
            "co":number,
            "gb-defra-index": number,
            "no2": number
            "o3": number,
            "pm2_5": number,
            "pm10": number,
            "so2": number,
            "us-epa-index": number
        },
        "cloud": number,
        "condition": {
            "code": number,
            "icon":string,
            "text": string
        },
        "feelslike_c": number,
        "feelslike_f": number,
        "gust_kph": number,
        "gust_mph": number,
        "humidity": number,
        "is_day": number,
        "last_updated": string,
        "last_updated_epoch": number,
        "precip_in": number,
        "precip_mm": number,
        "pressure_in": number,
        "presurre_mb": number,
        "temp_c": number,
        "temp_f": number,
        "uv": number,
        "vis_km": number,
        "vis_miles": number,
        "wind_degree": number,
        "wind_dir": string,
        "wind_kph": number,
        "wind_mph": number

    },
    "forecast": {
        "forecastday": {
            "astro": {
                "moon_illumination": string,
                "moon_phase": string,
                "moonrise": string,
                "moonset": string,
                "sunrise": string,
                "sunset": string
            },
            "date": string,
            "date_epoch": string
            "day": {
                "avghumidity": number,
                "avgtemp_c": number,
                "avgtemp_f": number,
                "avgvis_km": number,
                "avgvis_miles": number,
                "condition": {
                    "code": number,
                    "icon": string,
                    "text": string
                },
                "daily_chance_of_rain": number,
                "daily_chance_of_snow": number,
                "daily_will_it_rain": number,
                "daily_will_it_snow": number,
                "max_temp_c": number,
                "max_temp_f": number,
                "maxwind_kph": number,
                "maxwind_mph": number,
                "mintemp_c": number,
                "mintemp_f": number,
                "totalprecip_in": number,
                "totalprecip_mm": number,
                "uv": number
            },
            "hour": {
                "chance_of_rain": number,
                "chance_of_snow": number,
                "cloud": number,
                "condition": {
                    "code": number,
                    "icon": string,
                    "text": string
                },
                "dewpoint_c": number,
                "dewpoint_f": number,
                "feelslike_f": number,
                "feelslike_c": number,
                "gust_kph": number,
                "gust_mph": number,
                "heatindex_c": number,
                "heatindex_f": number,
                "humidity": number,
                "is_day": number,
                "precip_in": number,
                "precip_mm": number,
                "pressure_in": number,
                "pressure_mm": number,
                "temp_c": number,
                "temp_f": number,
                "time": string,
                "time_epoch": number,
                "uv": number,
                "vis_km": number,
                "vis_miles": number,
                "will_it_rain": number,
                "will_it_snow": number,
                "wind_degree": number,
                "wind_dir": string,
                "wind_kph": number,
                "wind_mph": number,
                "windchill_c": number,
                "windchill_f": number
            }[]

        }[],
        "location": ExtendedLocation
    }
}