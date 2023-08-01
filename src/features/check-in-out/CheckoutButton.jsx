import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const {isCheckout,Checkout } = useCheckout();

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => Checkout(bookingId)}
      disabled={isCheckout}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
