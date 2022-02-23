import React from "react";
import {Wrapper} from "./CartItem.styles";
import {CartItemType} from "../../App";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutline";

type Props = {
    item: CartItemType; addToCart: (clickedItem: CartItemType) => void; removeFromCart: (id: number) => void;
}
const CartItem: React.FC<Props> = ({item, addToCart, removeFromCart}) => (<Wrapper>
    <div>
        <h3>{item.title}</h3>
        <div className='information'>
            <p>
                <b>Price:</b> ${item.price}</p>
            <p>
                <b>Total:</b> ${(item.amount * item.price).toFixed(2)}</p>
        </div>
        <div className='buttons'>
            <IconButton aria-label="decrease" onClick={() => removeFromCart(item.id)}>
                <RemoveCircleOutline/>
            </IconButton>
            <p>{item.amount}</p>
            <IconButton aria-label="increase" onClick={() => addToCart(item)}>
                <AddCircleOutlineIcon/>
            </IconButton>
        </div>
    </div>
    <img src={item.image} alt={item.title}/>
</Wrapper>);

export default CartItem;