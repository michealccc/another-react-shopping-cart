import {useState} from "react";
import {useQuery} from "react-query";
import {Wrapper} from "./App.styles";
import Grid from "@mui/material/Grid";
import Item from "./components/Item/Item";
import Cart from "./components/Cart/Cart";
import Badge from "@mui/material/Badge";
import {AppBar, Backdrop, Box, CircularProgress, Container, Drawer, Toolbar, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ShoppingCart from "@mui/icons-material/ShoppingCart";

export type CartItemType = {
    id: number;
    category: string;
    description: string;
    image: string;
    price: number;
    title: string;
    amount: number;
};

const getProducts = async (): Promise<CartItemType[]> =>
    await (await fetch('https://fakestoreapi.com/products')).json();

const App = () => {
    const [cartOpen, setCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([] as CartItemType[]);
    const {data, isLoading, error} = useQuery<CartItemType[]>(
        'products',
        getProducts
    );

    const getTotalItems = (items: CartItemType[]) =>
        items.reduce((previousValue: number, item) => previousValue + item.amount, 0)

    const handleAddToCart = (clickedItem: CartItemType) => {
        setCartItems(prev => {
            const isItemInCart = prev.find(item => item.id === clickedItem.id);

            if (isItemInCart) {
                return prev.map(item =>
                    item.id === clickedItem.id
                        ? {...item, amount: item.amount + 1}
                        : item
                );
            }
            // First time the item is added
            return [...prev, {...clickedItem, amount: 1}];
        });
    };

    const handleRemoveFromCart = (id: number) => {
        setCartItems(prev =>
            prev.reduce((previousCartItemType, item) => {
                if (item.id === id) {
                    if (item.amount === 1) return previousCartItemType;
                    return [...previousCartItemType, {...item, amount: item.amount - 1}];
                } else {
                    return [...previousCartItemType, item];
                }
            }, [] as CartItemType[])
        );
    };

    if (isLoading) return <Backdrop open><CircularProgress color="inherit"/></Backdrop>;
    if (error) return <div>Something went wrong...</div>;

    return (
        <Wrapper>
            <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
                <Cart
                    cartItems={cartItems}
                    addToCart={handleAddToCart}
                    removeFromCart={handleRemoveFromCart}
                />
            </Drawer>
            <AppBar>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant={"h6"}
                            noWrap
                            component={"div"}
                            sx={{mr: 2, display: {sx: 'none', md: 'flex'}}}
                        >
                            another-react-shopping-cart
                        </Typography>
                        <Box sx={{flexGrow: 1}}/>
                        <Box>
                            <IconButton aria-label="cart" size="large" color="inherit"
                                        onClick={() => setCartOpen(true)}>
                                <Badge color="error" badgeContent={getTotalItems(cartItems)} showZero>
                                    <ShoppingCart/>
                                </Badge>
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Grid container marginTop={8} spacing={4}>
                {data?.map(item => (
                    <Grid item key={item.id} xs={12} sm={4} lg={2}>
                        <Item item={item} handleAddToCart={handleAddToCart}/>
                    </Grid>
                ))}
            </Grid>
        </Wrapper>
    )
}

export default App;
