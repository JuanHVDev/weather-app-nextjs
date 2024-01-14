"use client"
import { Button, Input, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@nextui-org/react'
import React, { useState } from 'react'
import { MdOutlineLocationOn, MdOutlineLocationSearching } from 'react-icons/md'
import { TfiLocationPin, TfiSearch } from 'react-icons/tfi'
import { TiLocationArrowOutline, TiLocationOutline, TiWeatherSunny } from 'react-icons/ti'

type Props = {}

export default function NavBar({ }: Props)
{
  const [isMenuOpen, setIsMenuOpen] = useState('')
  const [search, setSearch] = useState('')
  const [error, setError] = useState(false)
  return (
    <Navbar className=''>
      <NavbarContent>
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'} className='lg:hidden' />
        <NavbarBrand className='text-lg sm:text-xl lg:text-3xl px-2'>
          <TiWeatherSunny className='text-sm sm:text-4xl' />
          <p className='capitalize font-bold'>Weather App</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className='hidden lg:flex  gap-3 lg:text-2xl lg:justify-center text-lg items-center sm:justify-start'>
        <NavbarItem className='flex gap-1 justify-center items-center'>
          <Button isIconOnly variant='light'
            className='bg-white'
          >
            <MdOutlineLocationSearching size={30} title='Permission for your location' />
          </Button>
          <p>Ciudad de México</p>
        </NavbarItem>
        <NavbarItem className='flex gap-1 justify-center items-center'>
          <MdOutlineLocationOn size={30} title='Your Location' />
          <p>Ciudad de México</p>
        </NavbarItem>
        <NavbarItem className=''>
          <Input type='search' placeholder='London' variant='bordered'
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