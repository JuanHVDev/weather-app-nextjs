import { ForecastWeather } from "@/interfaces/clima";
import { revalidatePath } from "next/cache";

export const weatherCityByName = async (
    name: string = "coatzacoalcos"
    // lat?: string,
    // long?: string
) => {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_WEATHER_API_KEY}&q=${name}&days=7&lang=es`;
    try {
        const res: ForecastWeather = await fetch(url, {
            cache: "no-cache",
        }).then((res) => res.json());
        return res;
    } catch (error) {
        console.log(error);
    }
};
