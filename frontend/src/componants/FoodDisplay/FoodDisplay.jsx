import React from 'react'
import './FoodDisplay.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext.jsx'
import FoodItem from '../foodItem/FoodItem.jsx'

const FoodDisplay = ({ category }) => {
    const { food_list, searchQuery, setSearchQuery } = useContext(StoreContext)

    const filteredList = food_list.filter(item => {
        const matchesCategory = category === 'All' || category === item.category;
        const matchesSearch = !searchQuery || 
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className='food-display' id='food-display'>
            <h2>
                Top dishes near you
            </h2>
            <div className="food-display-list">
                {filteredList.map((item, index) => {
                    return <FoodItem key={index} id={item._id} name={item.name} price={item.price} description={item.description} image={item.image} />
                })}
            </div>
            {filteredList.length === 0 && (
                <div className="food-display-empty">
                    <p className="no-items-message">No dishes found matching your search</p>
                    <button className="clear-search-btn" onClick={() => setSearchQuery('')}>Clear Search</button>
                </div>
            )}
        </div>
    )
}

export default FoodDisplay
