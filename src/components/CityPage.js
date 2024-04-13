import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CityPage = () => {
    const [cities, setCities] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchCities();
    }, []);

    const fetchCities = async () => {
        try {
            const response = await axios.get(
                'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100'
            );
            setCities(response.data.results);

        } catch (error) {
            console.error('Error fetching city data:', error);
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleCityClick = (city,latitude, longitude) => {
        navigate(`/${city}/${latitude}/${longitude}`);
      };

    const handleContextMenu = (e, cityName) => {
        e.preventDefault(); // Prevent the default context menu from appearing
      
        // Check if the right mouse button is clicked
        if (e.button === 2) {
          window.open(`https://weather.com/${cityName}`, '_blank'); // Open the weather page in a new tab
        }
      };
      


    return (
        <div className="container mx-auto">
            <div className="sm:w-auto w-full mb-4">
                <input
                    type="text"
                    placeholder="Search cities..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="overflow-x-auto rounded-lg">
                <table className="w-full sm:w-auto md:w-full table-auto border-collapse border border-gray-400">
                    <thead>
                        <tr className="bg-blue-500 text-white rounded-lg sm:w-fit">
                            <th className="py-3 px-1 sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 border-r border-gray-400">City Name</th>
                            <th className="py-3 px-1 sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 border-r border-gray-400">Country</th>
                            <th className="text-left lg:text-center md:text-center py-3 px-1 sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 border-r border-gray-400">Timezone</th>

                        </tr>
                    </thead>
                    <tbody>
                        {cities
                            .filter((city) =>
                                city.name.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .map((city, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                    <td
                                        className="px-2 py-3 sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 border-r border-gray-400 text-left"
                                        // onClick={() => handleCityClick(city.name)}
                                        // onContextMenu={(e) => handleContextMenu(city.name, e)}
                                    >
                                        <button
                                            onClick={() => handleCityClick(city.name,city.coordinates.lat,city.coordinates.lon)}
                                            onContextMenu={(e) => handleContextMenu(city.name, e)}
                                            className="focus:outline-none text-left"
                                        >
                                        {city.name}
                                        </button>
                                    </td>

                                    <td className="px-2 py-3 sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 border-r border-gray-400">{city.cou_name_en}</td>
                                    <td className="px-2 py-3 sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3">{city.timezone}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CityPage;