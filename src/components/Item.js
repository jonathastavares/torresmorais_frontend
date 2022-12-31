import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../cart/CartSlice';

const Item = () => {
    const router = useParams();
    const [dish, setDish] = useState(null);
    const cart = useSelector((state) => state.cart.items);
    const [quantity, setQuantity] = useState(0);
    const dispatch = useDispatch();

    const getDish = async (id) => {
        const response = await axios.get(`http://3.84.89.81/api/dish/${id}`);
        if (response.status === 200) setDish(response.data.dish);
    }

    const add = () => {
        if (dish === undefined) return;
        setQuantity(quantity => quantity + 1);
        const newItem = {...dish, quantity: quantity + 1};
        dispatch(addItem(newItem));
    }

    const remove = () => {
        if (quantity > 0 && dish !== undefined) {
            setQuantity(quantity => quantity - 1);
            const newItem = {...dish, quantity: quantity - 1};
            dispatch(removeItem(newItem));
        }
    }

    useEffect(() => {
        if (router.id) getDish(router.id);
    }, [router])

    useEffect(() => {
        if (dish && cart) setQuantity(cart?.find(element => element.id == dish.id)?.quantity || 0);
    }, [dish, cart])

    if (dish) return (
        <div className='flex flex-col gap-6 justify-center items-center'>
            <div className='w-screen h-[50vh]'>
                <img src={dish.image} className='w-full h-full object-cover' />
            </div>
            <div className='flex flex-col justify-center items-center gap-6'>
                <h1 className='font-bold text-3xl'>{dish.name}</h1>
                <h3 className='text-md text-gray-500'>{dish.description}</h3>
                <h3 className='text-lg font-bold'>R$ {dish.price}</h3>
            </div>
            <div className='flex gap-2 rounded-full border h-[5vh] border-gray-500 justify-between px-6 items-center w-[40%]'>
                <button className='px-2 text-lg' onClick={add}>+</button>
                <span className='text-lg'>{quantity}</span>
                <button className='px-2 text-lg' onClick={remove}>-</button>
            </div>
        </div>
    )
}

export default Item;