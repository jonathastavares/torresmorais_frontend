import React, { useState, useEffect, Fragment } from "react";
import CartItem from "./CartItem";
import { useSelector, useDispatch } from 'react-redux';
import Loader from "./Loader";
import { Dialog, Transition } from '@headlessui/react';
import { setName, setAddress } from '../personalInfo/PersonalSlice';

const Cart = () => {
    const cart = useSelector((state) => state.cart.items);
    const { name, address } = useSelector((state) => state.personal);
    const [total, setTotal] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [notes, setNotes] = useState('');

    const dispatch = useDispatch();

    const confirmOrder = () => {
        let orderText = encodeURI(`Nome: ${name}\nEndereço: ${address}\n\n*Pedido*:\n\n`);
        cart.forEach((item) => {
            orderText += encodeURI(`*${item.name}*\nPreço Unitário: R$ ${item.price.replace('.', ',')}\nQuantidade: *${item.quantity}*\nTotal(${item.quantity} Unidade${item.quantity > 1 ? 's': ''}): R$${parseFloat(item.price.replace(',','.') * item.quantity).toFixed(2)}\n\n`);
        })
        if (notes !== '') orderText += encodeURI(`Observações: ${notes}\n\n`);
        orderText += encodeURI(`Entrega: *Grátis*\n\n`);
        orderText += encodeURI(`Total: *R$ ${total.replace('.', ',')}*`);
        window.open(`https://wa.me/+5491123892815/?text=${orderText}`);
    }

    useEffect(() => {
        let _total = 0;
        cart.forEach((item) => {
            _total += item.price.replace(',', '.') * item.quantity;
        })
        setTotal(parseFloat(_total).toFixed(2));
    }, [cart]);

    const makeOnlyOneSelected = (id) => {
        const buttons = document.getElementsByClassName('pagamento');
        Array.from(buttons).forEach((button) => {
            if (button.id !== id) button.checked = false;
        })
    }

    return (
        <div className='flex flex-col justify-between gap-12 w-full items-center mt-6 px-4'>
            <h1 className='font-bold text-2xl text-center mb-6'>MEU PEDIDO</h1>
            {cart.length === 0 && (
                <div className='my-2 h-[50vh] w-screen flex justify-center items-center'>
                    <Loader />
                </div>
            )}
            {cart && cart.length > 0 && (
                <div className='absolute px-4 mt-[12%] md:mt-[3%] h-[74%] w-full overflow-y-scroll flex flex-col gap-4'>
                    <div className=''>
                        <div className='flex flex-col gap-4 w-[91vw]'>
                            {cart && cart.length > 0 && cart.map((item) => (
                                <CartItem key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 w-full items-start'>
                                <div className='flex gap-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                                    </svg>
                                    <h2>Formas de pagamento</h2>
                                </div>
                                <div className='flex gap-4'>
                                    <div className='flex gap-4 w-[35%] justify-between'>
                                        <label className=''>Pix</label>
                                        <input type='radio' className='pagamento h-5 w-5 border-gray-300 focus:ring-none focus:accent-black checked:accent-black' id='pix' onFocus={(event) => makeOnlyOneSelected(event.target.id)} />
                                    </div>

                                    <div className='flex gap-4 w-[35%] justify-between'>
                                        <label className=''>Dinheiro</label>
                                        <input type='radio' className='pagamento h-5 w-5 border-gray-300 focus:ring-none focus:accent-black checked:accent-black' id='dinheiro' onFocus={(event) => makeOnlyOneSelected(event.target.id)}  />
                                    </div>

                                    <div className='flex gap-4 w-[35%] justify-between'>
                                        <label className=''>Cartão</label>
                                        <input type='radio' className='pagamento h-5 w-5 border-gray-300 focus:ring-none focus:accent-black checked:accent-black' id='cartao' onFocus={(event) => makeOnlyOneSelected(event.target.id)}  />
                                    </div>
                                </div>
                    </div>
                    <div className='flex flex-col w-full gap-4 pb-12'>
                                <div className='flex gap-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                    <label className='text-md'>Observações</label>
                                </div>
                                <textarea className='bg-[#fcfcfc] w-full h-[5vh] focus:h-[10vh] outline-none focus:border-gray-300 focus:ring-gray-300 border border-gray-300 text-black break-words max-w-screen' onChange={(event) => setNotes(event.target.value)} />
                    </div>
                </div>
            )}
            <button className='absolute bottom-0 left-0 w-screen flex flex-col items-center justify-center bg-black h-[10%] z-30' onClick={() => setIsOpen(true)}>
                <h2 className='font-bold text-xl text-white'>TOTAL: R$ {total}</h2>
                <h1 className='font-bold text-2xl text-white'>CONFIRMAR PEDIDO</h1>
            </button>
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black bg-opacity-50" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-scroll px-4">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                        as="h3"
                        className="text-xl font-medium leading-6 text-gray-900"
                    >
                        Informações Pessoais:
                    </Dialog.Title>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                        Por favor preencha as seguintes informações:
                        </p>
                    </div>

                    <div className='my-4 flex flex-col justify-center items-center gap-4 text-center'>
                        <div className='flex flex-col gap-4 w-full'>
                            <input value={name} className='w-full h-12 outline-black px-4' placeholder='Nome Completo' onChange={(event) => dispatch(setName(event.target.value))} />
                            {name === '' && (
                                <p className='bg-red-200 rounded'>Por favor preencha seu nome!</p>
                            )}
                        </div>
                        <div className='flex flex-col gap-4 w-full'>
                            <input id='address-input' value={address} className='w-full h-12 outline-black px-4' placeholder='Endereço Completo' onChange={(event) => dispatch(setAddress(event.target.value)) }/>
                            {address === '' && (
                                <p className='bg-red-200 rounded'>Por favor preencha seu endereço!</p>
                            )}
                        </div>
                        <div className='flex flex-col gap-4 w-full'>
                            {cart.length === 0 && (
                                <p className='bg-red-200 rounded'>Seu carrinho está vazio!</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <p className='text-sm text-gray-400'>*Ao confirmar, você será redirecionado para a pagina do Whatsapp, onde você vai precisar clicar em enviar a mensagem para enviar o pedido.</p>
                    </div>

                    <div className="mt-4 flex justify-between">
                        <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                        onClick={() => setIsOpen(false)}
                        >
                        Cancelar
                        </button>
                        <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                        onClick={() => {
                            if (name !== '' && address !== '' && cart.length > 0) confirmOrder();
                        }}>
                        Confirmar
                        </button>
                    </div>
                    </Dialog.Panel>
                </Transition.Child>
                </div>
            </div>
            </Dialog>
        </Transition>
        </div>
    )
}

export default Cart;