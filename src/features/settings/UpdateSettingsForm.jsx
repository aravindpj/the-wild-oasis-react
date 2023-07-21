import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  const { isUpdating, updateTheSetting } = useUpdateSetting();

  function handleToUpdateSetting(e) {
    updateTheSetting({ [e.target.name]: e.target.value });
  }

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          name="minBookingLength"
          disabled={isUpdating}
          defaultValue={minBookingLength}
          onBlur={(e) => handleToUpdateSetting(e)}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          name="maxBookingLength"
          disabled={isUpdating}
          defaultValue={maxBookingLength}
          onBlur={(e) => handleToUpdateSetting(e)}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          name="maxGuestsPerBooking"
          disabled={isUpdating}
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleToUpdateSetting(e)}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          name="breakfastPrice"
          disabled={isUpdating}
          defaultValue={breakfastPrice}
          onBlur={(e) => handleToUpdateSetting(e)}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
