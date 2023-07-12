import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";

const fetchHotels = async () => {
	const response = await fetch("http://localhost:3001/hotels");
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json();
};

const HotelList = () => {
	const {
		data: hotels,
		isLoading,
		error,
	} = useQuery({ queryKey: ["hotels"], queryFn: fetchHotels });

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error fetching Hotels! {error.message}</div>;
	}

	return (
		<>
			{hotels.map((hotel) => (
				<div key={hotel.id}>
					<Link href={`/hotel/${hotel.id}`}>
						<h2>{hotel.name}</h2>
						<p>{hotel.description}</p>
					</Link>
				</div>
			))}
		</>
	);
};

export default HotelList;
