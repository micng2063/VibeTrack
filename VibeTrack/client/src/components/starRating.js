import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../css/starRating.css';
import { FaStar } from "react-icons/fa";

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
};

export default function StarRating(props) {
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);

    // Function to handle when a star is clicked
    const handleClick = value => {
      setCurrentValue(value);
    }

    // Function to handle when the mouse hovers over a star
    const handleMouseOver = newHoverValue => {
      setHoverValue(newHoverValue);
    };

    // Function to handle when the mouse leaves the star area
    const handleMouseLeave = () => {
      setHoverValue(undefined);
    }

    // Function to calculate new rating
    function calculateNewRating(userRating, currentRating, currentNumber) {
      const newRating = (userRating + currentRating * currentNumber) / (currentNumber + 1);
      return newRating.toFixed(1); 
    }
    
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

    // Function to handle form submission
    async function onSubmit(e) {
      e.preventDefault();
      const editedVenue = {
        // Need to include otherwise venue's fields will be wiped upon submit
        _id : form._id,
        id : form.id,
        name: form.name,
        address: form.address,
        about: form.about,
        phone: form.phone,
        website: form.website,
        monday: form.monday,
        tuesday: form.tuesday,
        wednesday: form.wednesday,
        thursday: form.thursday,
        friday: form.friday,
        saturday: form.saturday,
        sunday: form.sunday,
        facebook: form.facebook,
        instagram: form.instagram,
        yelp: form.yelp,
        amenities: form.amenities,
        tags: form.tags,
        price: form.price, 

        rating: calculateNewRating(currentValue, form.rating, form.review),
        review: parseFloat(form.review) + 1,
      };
      
      await fetch(`http://localhost:5050/record/${params.id}`, {
        method: "PATCH",
        body: JSON.stringify(editedVenue),
        headers: {
          'Content-Type': 'application/json'
        },
      });
    }
  
    const stars = Array(5).fill(0);    

     return (
        <div className="rating-component" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div className="grid-rating" >
                    <div className="stars">
                        {stars.map((value, index) => (
                            <FaStar
                                key={index}
                                size={24}
                                onClick={() => handleClick(index + 1)}
                                onMouseOver={() => handleMouseOver(index + 1)}
                                onMouseLeave={handleMouseLeave}
                                color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                                style={{
                                    marginRight: 10,
                                    cursor: "pointer"
                                }}
                            />
                        ))}
                    </div>

                    <form onSubmit={onSubmit} style={{ color: '#000000', paddingTop:'10px' }}>
                        <div className="form-group">
                            <input
                                type="submit"
                                value="Submit rating"
                                className="btn btn-primary"
                                style={{ backgroundColor: '#e24e99', color: '#000',  }}
                            />
                        </div>
                    </form>
            </div>
        </div>
    );
};