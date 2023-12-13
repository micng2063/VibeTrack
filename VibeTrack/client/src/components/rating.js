import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../css/starRating.css';
import { FaStar } from "react-icons/fa";

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
};

export default function StarRating(props) {    
    const params = useParams();

    const [form, setForm] = useState({
      _id: "",
      id: "",
      name: "",
      about: "",
      phone: "",
      website: "",
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      saturday: "",
      sunday: "",
      facebook: "",
      instagram: "",
      yelp: "",
      amenities: "",
      tags: "",
      price: "",
      rating: "",
      review: "",
    });
  
    useEffect(() => {
      async function fetchData() {
        const id = params.id.toString();
        const response = await fetch(`http://localhost:5050/record/${params.id}`);
  
        if (!response.ok) {
          const message = `An error has occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }
  
        const venue = await response.json();
        if (!venue) {
          window.alert(`Reviews for venue with id ${id} not found`);
          return;
        }
  
        setForm(venue);
      }
  
      fetchData();
    }, [params.id]);

    const stars = Array(5).fill(0);    

     return (
        <div className="rating-component">
            <div className="grid-rating">
                <div className="item">
                    <div className="stars">
                    {stars.map((value, index) => {
    // Get the decimal part of form.rating
    const decimalPart = form.rating - Math.floor(form.rating);

    // Set a threshold for rounding up
    const roundUpThreshold = 0.5;

    // Determine whether to round up or down based on the threshold
    const roundedRating = decimalPart > roundUpThreshold ? Math.ceil(form.rating) : Math.floor(form.rating);

    return (
        <FaStar
            key={index}
            size={24}
            color={index < roundedRating ? colors.orange : colors.grey}
            style={{
                marginRight: 10,
            }}
        />
    );
})}

                    </div>
                </div>
            </div>
        </div>
    );
};