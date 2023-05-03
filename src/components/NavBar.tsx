interface Props {
  cartItemsCount: number;
}

const NavBar = ({ cartItemsCount }: Props) => {
  return <>Items: {cartItemsCount}</>;
};

export default NavBar;
