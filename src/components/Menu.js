import React, { useState, useEffect } from "react";
import Category from "./Category";
import axios from "axios";

const Menu = () => {
    const [categories, setCategories] = useState();

    const getCategories = async () => {
        const result = await axios.get('http://localhost:3000/api/dishes')
        if (result.status === 200) setCategories(result.data.categories)
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <div className='flex items-center flex-col mt-6'>
            <h1 className='mb-8 font-bold text-2xl'>CARDÁPIO</h1>
            <div className='flex flex-col gap-4'>
                {categories && categories.map((category) => (
                    <Category id={category.name} key={category.id} category={category} />
                ))}
            </div>
        </div>
    )
}

export default Menu;