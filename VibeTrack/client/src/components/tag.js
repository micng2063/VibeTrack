// tags.js

// Function to check if a tag is a Menu Item
export const isMenuItem = (tag) => {
    const menuItems = [
        'American (New)',
        'American (Traditional)',
        'Breakfast & Brunch',
        'Burgers',
        'Chicken Wings',
        'Coffee & Tea',
        'Comfort Food',
        'Desserts',
        'Irish',
        'Mexican',
        'Pizza',
        'Small Plates',
        'Sushi',
        'Tapas',
        'Tex-Mex',
        'Wine',
    ];
    return menuItems.includes(tag);
  };
  
  // Function to check if a tag is a Venue Type
  export const isVenueType = (tag) => {
    const venueTypes = [
        'Bar',
        'Brewery',
        'Cafe',
        'Cinema',
        'Event Space',
        'Food Truck',
        'Gastropub',
        'Lounge',
        'Music Venue',
        'Pub',
        'Venue',
    ]; 
    return venueTypes.includes(tag);
  };
  
  // Function to check if a tag is a Venue Feature
  export const isVenueFeature = (tag) => {
    const venueFeatures = [
        'Arcade',
        'Beer Bar',
        'Bowling',
        'Cocktail Bar',
        'Dive Bar',
        'Grill',
        'Karaoke',
        'Mini Golf',
        'Pool Hall',
        'Sake Bar',
        'Sport Bar',
        'Tiki Bar',
        'Wine Bar',
    ]; 
    return venueFeatures.includes(tag);
  };
  
  // Function to categorize tags into three categories
  export const categorizeTags = (tags) => {
    const categories = {
      menuItem: [],
      venueType: [],
      venueFeatures: [],
    };
  
    // Categorize each tag based on your criteria
    tags.forEach((tag) => {
      if (isMenuItem(tag)) {
        categories.menuItem.push(tag);
      } else if (isVenueType(tag)) {
        categories.venueType.push(tag);
      } else if (isVenueFeature(tag)) {
        categories.venueFeatures.push(tag);
      }
    });
  
    return categories;
  };
  