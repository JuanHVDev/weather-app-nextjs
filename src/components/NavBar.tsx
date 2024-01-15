"use client"
import { weatherCityByName } from '@/actions/weather'
import { Button, Input, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@nextui-org/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { MdOutlineLocationOn, MdOutlineLocationSearching } from 'react-icons/md'
import { TfiLocationPin, TfiSearch } from 'react-icons/tfi'
import { TiLocationArrowOutline, TiLocationOutline, TiWeatherSunny } from 'react-icons/ti'


export default function NavBar()
{
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() =>
  {
    setSearch('')
  }, [])

  const handleChange = (e: React.KeyboardEvent<HTMLInputElement> | KeyboardEvent) =>
  {
    if (e.code === 'Enter')
    {
      const params = new URLSearchParams()
      if (search.length >= 4)
      {
        params.set("search", search);
      } else
      {
        params.delete('search')
      }
      router.replace(`/?${params.toString()}`)
    }
  }
  return (
    <Navbar className=''>
      <NavbarContent>
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'} className='lg:hidden' />
        <NavbarBrand className='text-lg sm:text-xl lg:text-3xl px-2'>
          <Link href={'/'} className='flex'>
            <TiWeatherSunny className='text-sm sm:text-4xl' />
            <p className='capitalize font-bold'>Weather App</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className='hidden lg:flex  gap-3 lg:text-2xl lg:justify-center text-lg items-center sm:justify-start'>
        <NavbarItem className='flex gap-1 justify-center items-center'>
          <MdOutlineLocationOn size={30} title='Your Location' />
          <p>{search ? search : 'London'}</p>
        </NavbarItem>
        <NavbarItem className=''>
          <Input type='search' placeholder='London' variant='bordered' name='search' id='search' onKeyDown={(e) => handleChange(e)}
            // isInvalid={error ? false : true} errorMessage='City Not Found'
            radius='full' value={search} onValueChange={setSearch} size='sm' className='w-52 sm:w-32 lg:w-52 bg-transparent' startContent={<TfiSearch size={18} />} />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className=''>
        <NavbarMenuItem className='flex gap-3 justify-center items-center my-4'>
          <TiLocationOutline size={30} title='Your Location' />
          <p>Ciudad de México</p>
        </NavbarMenuItem>
        <NavbarMenuItem className='flex gap-3 justify-center items-center my-4'>
          <TiLocationArrowOutline size={30} title='Permission for your location' />
          <p>Ciudad de México</p>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Input type='search' placeholder='London' radius='full' value={search} onValueChange={setSearch} size='sm' className='w-full my-2 sm:w-32 lg:w-52 bg-transparent' variant='bordered'
            // isInvalid={error} errorMessage='City Not Found' 
            startContent={<TfiSearch size={18} />} />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  )
}