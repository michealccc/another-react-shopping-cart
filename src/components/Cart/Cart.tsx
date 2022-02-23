import React from "react";
import {CartItemType} from "../../App";
import {Wrapper} from "./Cart.styles";
import CartItem from "./CartItem";
import Button from "@mui/material/Button";

type Props = {
    cartItems: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({cartItems, addToCart, removeFromCart,}) => {
    const calculateTotal = (items: CartItemType[]) =>
        items.reduce((previousValue: number, currentCartItemType) => previousValue + currentCartItemType.amount * currentCartItemType.price, 0);

    const clearAllFromCart = (cartItem: CartItemType[]) => {
        for (let key = 0; key < cartItem.length; key++) {
            cartItem.splice(key)
        }
    }


    return (
        <Wrapper>
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? <p>No items in cart.</p> : null}
            {cartItems.map(item => (
                <CartItem
                    key={item.id}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
            ))}
            <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
            <div className='cart-manage'>
                <Button variant="outlined" onClick={() => {
                    clearAllFromCart(cartItems)
                    alert('Shopping Cart Cleared.')
                }}>Clear Cart</Button>
                <Button variant="contained" onClick={() => {
                    clearAllFromCart(cartItems)
                    alert('Purchase Completed.')
                }}>Purchase</Button>
            </div>
        </Wrapper>
    );
};

export default Cart;