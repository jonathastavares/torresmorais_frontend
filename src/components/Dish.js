import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../cart/CartSlice';
import { useNavigate } from "react-router-dom";

const Dish = ({ dish }) => {
    const cart = useSelector((state) => state.cart.items);
    const [quantity, setQuantity] = useState(cart?.find(item => item.id == dish.id)?.quantity || 0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const add = () => {
        setQuantity(quantity => quantity + 1);
        const newItem = {...dish, quantity: quantity + 1};
        dispatch(addItem(newItem));
    }

    const remove = () => {
        if (quantity > 0) {
            setQuantity(quantity => quantity - 1);
            const newItem = {...dish, quantity: quantity - 1};
            dispatch(removeItem(newItem));
        }
    }

    const showItem = () => {
        navigate(`/item/${dish.id}`);
    }

    return (
        <div className='h-[120px] flex justify-start w-full gap-3 pb-4 border-b-2 border-gray-200'>
            <div className='h-full w-[40%]' onClick={showItem}>
                <img className='w-full h-full object-cover overflow-hidden' src={dish.image} alt='Foto do prato' />
            </div>
            <div className='flex flex-col justify-between min-w-[60%] max-w-[60%]'>
                <div className='flex flex-col gap-1' onClick={showItem}>
                    <h1 className='text-lg'>{dish.name}</h1>
                    <p className='text-sm text-gray-600 truncate'>{dish.description}</p>
                </div>
                <div className='flex justify-between'>
                    <p className='font-bold'>R$ {dish.price}</p>
                    <div className='flex gap-2 rounded-full border border-gray-500'>
                        <button className='px-2' onClick={add}>+</button>
                        <span className=''>{quantity}</span>
                        <button className='px-2' onClick={remove}>-</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dish;