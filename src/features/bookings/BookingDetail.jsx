import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { HiArrowDownOnSquare } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import {useBookingdelete} from '../../features/bookings/useBookingdelete'
import Modal from '../../ui/Modal'
import ConfirmDelete from '../../ui/ConfirmDelete'

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const { isLoading, booking } = useBooking();
  const {isCheckout,Checkout}=useCheckout()
  const {isDeleting,deleteBooking}=useBookingdelete()
  const moveBack = useMoveBack();
  
  if (isLoading) return <Spinner />;

  const { id: bookingId, status } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  function handleDelete(){
    deleteBooking(bookingId,{
      onSuccess:()=>navigate(-1),
    })
    
  }
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      
      <ButtonGroup>
        <Modal>
          <Modal.Open id="delete">
            <Button disabled={isDeleting} variation="danger" onClick={handleDelete}>Delete</Button>
          </Modal.Open>
          <Modal.Window id="delete">
              <ConfirmDelete resourceName="Booking" disabled={isDeleting} onConfirm={handleDelete} />
          </Modal.Window>
        </Modal>
        {status === "unconfirmed" && (
          <Button
            icon={<HiArrowDownOnSquare />}
            onClick={() => navigate(`/checkin/${bookingId}`)}
          >
            check in
          </Button>
        )}
        {status === "checked-in" && (
          <Button
            icon={<HiArrowDownOnSquare />}
            disabled={isCheckout}
            onClick={() => Checkout(bookingId)}
          >
            check out
          </Button>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
