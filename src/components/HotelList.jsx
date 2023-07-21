import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";

import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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
			<Typography variant="h4" component="h2">
				Booking App
			</Typography>
			;
			<Stack spacing={2}>
				{hotels.map((hotel) => (
					<Link key={hotel.id} href={`/hotel/${hotel.id}`}>
						<Card sx={{ maxWidth: 345, backgroundColor: "#e8e8e8" }}>
							<CardMedia
								sx={{ height: 140 }}
								image={hotel.image}
								title={hotel.name}
							/>
							<CardContent>
								<Typography gutterBottom variant="h5" component="div">
									{hotel.name}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									{hotel.description}
								</Typography>
							</CardContent>
							<CardActions>
								<Button size="small">See Details</Button>
							</CardActions>
						</Card>
					</Link>
				))}
			</Stack>
		</>
	);
};

export default HotelList;
