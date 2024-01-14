import { Card, CardHeader, CardBody, CardFooter, Image, Divider, CircularProgress, Progress, Button } from "@nextui-org/react";
import { weatherCityByName } from "@/actions/weather"
import NextImage from "next/image";
import { TfiLocationPin } from "react-icons/tfi";
import { TiArrowDownOutline, TiArrowUpOutline, TiCalendarOutline, TiCompass } from "react-icons/ti";
import { getDateDay } from "@/utils";
import clsx from "clsx";
import { WiHumidity, WiRain, WiRaindrop } from "react-icons/wi";

export default async function Home()
{
  const cityWeather = await weatherCityByName()
  const date = new Date(cityWeather?.current.last_updated as string).toLocaleString("es-MX", {
    hour12: true,
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    weekday: "long"
  })
  return (
    <main className="grid lg:grid-cols-12 lg:grid-rows-2 sm:justify-center lg:items-center">
      <div className="lg:col-span-4 lg:row-span-1 m-4">
        <Card className="max-w-[400px] sm:max-w-[450px] text-2xl">
          <CardHeader className="flex flex-col justify-center items-center">
            <div>
              <Image className='object-cover' as={NextImage} width={64} height={64} alt={cityWeather?.current.condition.text} src={`https:${cityWeather?.current.condition.icon}`} />
            </div>
            <div>
              <div className="items-center justify-center flex flex-row">
                <h1>{cityWeather?.current.temp_c.toFixed()}</h1>
                <span>°C</span>
              </div>
              <p>
                {
                  cityWeather?.current.condition.text
                }
              </p>
            </div>
          </CardHeader>
          <Divider className="w-3/4 mx-auto" />
          <CardBody className="px-12">
            <div className="text-lg flex items-center">
              <TfiLocationPin size={30} />
              <h1 className="ml-6 font-bold">{cityWeather?.location.name}, {cityWeather?.location.country}</h1>
            </div>
            <div className="text-lg flex items-center gap-6 mt-5">
              <TiCalendarOutline size={30} />
              <h1 className="capitalize">{date}</h1>
            </div>
          </CardBody>
          <Divider className="w-3/4 mx-auto" />
          <CardFooter className="px-12">
            <p className="flex gap-2">
              <WiRaindrop size={40} />
              {cityWeather?.forecast.forecastday[1].day.daily_chance_of_rain}%</p>
          </CardFooter>
        </Card>
      </div>
      <div className="lg:col-span-8 lg:grid sm:w-[450px] lg:w-[900px] lg:grid-cols-7 gap-3 text-center font-bold m-4">
        {
          cityWeather?.forecast.forecastday.map((day) => (
            <Card key={day.date_epoch} className={clsx(
              `text-lg mt-4`,
              { 'bg-danger-500/80 text-white': getDateDay(Date().toString()) === getDateDay(day.date) }
            )}>
              <CardHeader className=" p-1">
                <p className="mx-auto text-lg">{getDateDay(day.date as string)}</p>
              </CardHeader>
              <CardBody className="flex items-center">
                <Image as={NextImage} src={`https:${day.day.condition.icon}`} alt={day.day.condition.text} width={64} height={64} />
                <div className={`flex text-sm gap-2 my-2`}>
                  <p >{day.day.maxtemp_c}°</p>
                  <p className="opacity-70">{day.day.mintemp_c}°C</p>
                </div>
              </CardBody>
            </Card>
          ))
        }
      </div>
      {/* <div className="col-span-4 m-4 row-span-1">
        <Card className="max-w-[450px]">

        </Card>
      </div> */}
      <div className="lg:mx-auto h-full lg:col-span-12 lg:row-span-2 grid lg:grid-cols-3 gap-10 pb-8 align-middle place-content-center justify-center lg:w-[1200px] sm:w-[500px]">
        <Card className="w-[400px]">
          <CardHeader>
            <h1 className="mx-auto text-2xl font-bold">UV Index</h1>
          </CardHeader>
          <CardBody className="bg-gradient-to-br from-purple-600 to-blue-600 flex justify-center items-center">
            <CircularProgress
              classNames={{
                svg: "w-36 h-36 drop-shadow-md",
                indicator: "stroke-white",
                track: "stroke-white/10",
                value: "text-3xl font-semibold text-white",
              }}
              maxValue={12}
              value={cityWeather?.current.uv}
              formatOptions={{
              }}
              strokeWidth={4}
              showValueLabel={true}
            />
          </CardBody>
        </Card>
        <Card className="w-[400px]">
          <CardHeader>
            <h1 className="mx-auto text-2xl font-bold">Wind Status</h1>
          </CardHeader>
          <CardBody className="bg-gradient-to-br from-purple-600 to-blue-600 flex justify-center items-center text-white">
            <h1>{cityWeather?.current.wind_kph} km/h</h1>
            <div className="flex flex-row justify-center items-center mt-6 gap-2 text-xl ">
              <TiCompass className="" size={30} />
              <span>{cityWeather?.current.wind_dir}</span>
            </div>
          </CardBody>
        </Card>
        <Card className="w-[400px]">
          <CardHeader>
            <h1 className="mx-auto text-2xl font-bold">Sunrise & Sunset</h1>
          </CardHeader>
          <CardBody className="bg-gradient-to-br from-purple-600 to-blue-600 flex justify-center items-center">
            <div className="flex justify-center items-center gap-3 text-white">

              <TiArrowUpOutline color="white" size={30} />
              <p>{cityWeather?.forecast.forecastday[0].astro.sunrise}</p>

            </div>
            <div className="flex justify-center items-center gap-3 text-white">
              <TiArrowDownOutline color="white" size={30} />
              <p>{cityWeather?.forecast.forecastday[0].astro.sunset}</p>
            </div>
          </CardBody>
        </Card>
        <Card className="w-[400px]">
          <CardHeader>
            <h1 className="mx-auto text-2xl font-bold">Humidity</h1>
          </CardHeader>
          <CardBody className="bg-gradient-to-br from-purple-600 to-blue-600 flex justify-center items-center flex-row ">
            <CircularProgress
              classNames={{
                svg: "w-36 h-36 drop-shadow-md",
                indicator: "stroke-white",
                track: "stroke-white/10",
                value: "text-3xl font-semibold text-white",
              }}

              maxValue={100}
              value={cityWeather?.current.humidity}
              strokeWidth={4}
              showValueLabel={true}

            />
            <Button isIconOnly className="bg-transparent">
              <WiHumidity size={50} color="white" />
            </Button>
          </CardBody>
        </Card>

        <Card className="w-[400px]">
          <CardHeader>
            <h1 className="mx-auto text-2xl font-bold">
              Visibility
            </h1>
          </CardHeader>
          <CardBody className="bg-gradient-to-br from-purple-600 to-blue-600 flex justify-center items-center text-white">
            {cityWeather?.current.vis_km.toLocaleString('es-Mx', {
              style: 'unit',
              unit: 'kilometer'
            })}
          </CardBody>
        </Card>

        <Card className="w-[400px]">
          <CardHeader>
            <h1 className="mx-auto text-2xl font-bold">
              Air pressure
            </h1>
          </CardHeader>
          <CardBody className="bg-gradient-to-br from-purple-600 to-blue-600 flex justify-center items-center text-white">
            {cityWeather?.current.pressure_mb} millibars
          </CardBody>
        </Card>
      </div>
    </main>
  )
}
