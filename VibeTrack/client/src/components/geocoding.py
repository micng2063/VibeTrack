import csv
from geopy.geocoders import Nominatim
import pymongo
import os
import dotenv

# Load environment variables from .env file
dotenv.load_dotenv()

def read_addresses_from_csv(csv_file):
    addresses = []
    with open(csv_file, newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            addresses.append(row["Address"])
    return addresses

def geocode_and_store_addresses(addresses):
    # Initialize geolocator
    geolocator = Nominatim(user_agent="venue_geocoding")

    # MongoDB connection
    # Use the URI from the .env file
    mongo_uri = os.getenv("ATLAS_URI")
    client = pymongo.MongoClient(mongo_uri)
    db = client["Venues"]
    collection = db["Venues"]

    for address in addresses:
        location = geolocator.geocode(address)
        if location:
            coordinates = {
                "address": address,
                "latitude": location.latitude,
                "longitude": location.longitude,
            }
            collection.insert_one(coordinates)

if __name__ == "__main__":
    # Read addresses from the CSV file
    csv_file = "Venues.Venues.csv"
    venue_addresses = read_addresses_from_csv(csv_file)

    # Geocode and store the addresses
    geocode_and_store_addresses(venue_addresses)
