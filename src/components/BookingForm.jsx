import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import useStore from "../store";

const BookingForm = ({ hotel }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const addReservation = useStore((state) => state.addReservation);

	const onSubmit = (data) => {
		addReservation(hotel, data);
		toast.success("Reservation made!");
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input type="date" {...register("startDate", { required: true })} />
			{errors.startDate && (
				<span style={{ color: "red" }}>Start date is required</span>
			)}

			<input type="date" {...register("endDate", { required: true })} />
			{errors.endDate && (
				<span style={{ color: "red" }}>End date is required</span>
			)}

			<input type="submit" value="Make Reservaation" />
		</form>
	);
};

export default BookingForm;
