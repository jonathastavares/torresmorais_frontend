import React, { useEffect } from "react";
import Dish from "./Dish";
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import { useSelector } from 'react-redux';

const Category = ({category}) => {
    const hash = useSelector((state) => state.navbar.hash);

    useEffect(() => {
        const button = document.getElementById(`button-${category.id}`) || null;
        if (button && hash !== category.name && button.ariaExpanded === 'true') button.click();
        if (button && hash === category.name && button.ariaExpanded === 'false') button.click();
    }, [hash])

    return (
        <div id={category.name}>
            <Disclosure defaultOpen>
                {({ open }) => (
                <>
                <Disclosure.Button id={`button-${category.id}`} className="py-2 w-[91vw]">
                    <div className='flex justify-between px-4 shadow'>
                        <h1 className='mb-2'>{category.name}</h1>
                        <ChevronUpIcon className={`${ open ? 'rotate-180 transform' : ''} h-5 w-5 text-black`} />
                    </div>
                    <hr/>
                </Disclosure.Button>
                <Disclosure.Panel className="text-gray-500">
                    <div className='flex flex-col gap-4 mt-6 w-[91vw]'>
                        {category.dishes && category.dishes.map((dish) => (
                            <Dish key={dish.id} dish={dish} />
                        ))}
                    </div>
                </Disclosure.Panel>
                </>
            )}
            </Disclosure>
        </div>
    )
}

export default Category;