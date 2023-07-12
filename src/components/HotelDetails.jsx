import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import BookingForm from "./BookingForm";

const fetchHotel = async (id) => {
	const response = await fetch(`http://localhost:3001/hotels/${id}`);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json();
};

const HotelDetails = () => {
	const [match, params] = useRoute("/hotel/:id");
	const {
		data: hotel,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["hotel", params.id],
		queryFn: () => fetchHotel(params.id),
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error fetching Hotel! {error.message}</div>;
	}

	return (
		<>
			<h2>{hotel.name}</h2>
			<p>{hotel.description}</p>
			<BookingForm />
		</>
	);
};

export default HotelDetails;
