import { useState } from 'react'

//components
import Drawer from '@material-ui/core/Drawer'
import LinearProgress from '@material-ui/core/LinearProgress'
import Grid from '@material-ui/core/Grid'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Badge from '@material-ui/core/Badge'

//Styles
import { Wrapper, StyledButton } from './App.styles'
import { useQuery } from 'react-query'
import Item from './Item/Item'

//Types
export type CartItemType = {
  id: number;
  category: string;
  image: string;
  price: number;
  title: string;
  description: string;
  amount: number;
}

const getProducts = async (): Promise<CartItemType[]> => 
  await (await fetch('https://fakestoreapi.com/products')).json()

const App =() => {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([] as CartItemType[])
  const { data, status } = useQuery<CartItemType[]>(
    'products', 
    getProducts
    );
    console.log(data)

const getTotalItems = (items: CartItemType[]) => {
  return(
    items.reduce((ack: number, item) => ack + item.amount, 0)
  )
}

const handleAddToCart = (clickedItem: CartItemType) => null

const handleRemoveFromCart = () => null



  return (
    <div className="App">
      {status === 'loading' && (
        <LinearProgress />
      )}
      {status === 'error' && (
        <div>Something went wrong!!</div>
      )}
      {status === 'success' && (
        <Wrapper>
          <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
            Cart items here!!
          </Drawer>
          <StyledButton onClick={()=> setCartOpen(true)} >
            <Badge badgeContent={getTotalItems(cartItems)} color='error'>
              <AddShoppingCartIcon />
            </Badge>
          </StyledButton>

          <Grid container spacing={3}>
            {data?.map(item => (
              <Grid item key={item.id} xs={12} sm={4}>
                <Item item={item} handleAddToCart={handleAddToCart} />
                </Grid>
            ))}
          </Grid>
        </Wrapper>
      )}
    </div>
  );
}

export default App;
