import React, { useState, useEffect } from "react";
import { Disclosure } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/20/solid';
import axios from "axios";
import { useNavigate, useLocation} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setItem } from "../navbar/NavbarSlice";

const Navbar = () => {
    const [categories, setCategories] = useState();
    const [links, setLinks] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const getCategories = async () => {
        const result = await axios.get('http://localhost:3000/dishes');
        if (result.status === 200) setCategories(result.data.categories);
    }
    
    const visitSection = (name) => {
        if (name !== 'CARDAPIO')dispatch(setItem(name));
        navigate('/');
    }

    useEffect(() => {
        getCategories();
    }, [])

    useEffect(() => {
        if (location.pathname === '/') setLinks(categories);
        if (location.pathname !== '/') setLinks([{ id:9999, name:'CARDAPIO'}]);
    }, [location, categories])

    return (
        <nav className='flex w-full justify-between items-center h-[65px] bg-black py-3 px-4'>
            <Disclosure>
                {({ open }) => (
                <>
                <Disclosure.Button className='flex h-full justify-between items-center'>
                    <Bars3Icon className='h-7 w-7 text-white' />
                </Disclosure.Button>
                <Disclosure.Panel className={`text-gray-500 absolute top-[65px] left-0 ${open ? 'slideIn' : 'slideOut'} w-screen h-[92vh]`}>
                    <div className={`flex flex-col shadow-xl w-[60%] md:w-[30%] ${location.pathname === '/checkout' ? 'h-[82vh]' : 'h-[92vh]'} bg-white relative top-0 left-0 z-40`}>
                        {links && location.pathName !== '/' && links.map((category) => (
                            <Disclosure.Button key={category.id}>
                                <div key={category.id} className='p-4 w-full font-bold bg-white z-30 text-start' onClick={() => visitSection(category.name)}>{category.name}</div>
                            </Disclosure.Button>
                        ))}
                    </div>
                </Disclosure.Panel>
                {open && (
                    <Disclosure.Button className='absolute top-0 left-0 h-[92vh] mt-[65px] w-screen z-20'>
                        <div className='w-full h-full bg-black opacity-50 backdrop-blur-3xl'></div>
                    </Disclosure.Button>
                )}
                </>
            )}
            </Disclosure>
            <button onClick={() => navigate('/')} className='h-full w-auto'>
                <img className='h-full w-auto' src='./torresmoraislogo.jpeg' alt='Logo Torres Morais'/>
            </button>
            <button onClick={() => navigate('/checkout')}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
            </button>
        </nav>
    )
}

export default Navbar;