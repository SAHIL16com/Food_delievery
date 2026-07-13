import React, { useContext, useEffect, useState } from 'react';
import './Settings.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Settings = () => {
    const { token, setUserProfile } = useContext(StoreContext);
    const navigate = useNavigate();

    const [notifications, setNotifications] = useState({
        orderStatus: true,
        promotions: false,
        newsletters: true
    });

    const [foodPreference, setFoodPreference] = useState("all");
    const [darkMode, setDarkMode] = useState(false);
    const [profile, setProfile] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        avatar: ""
    });

    useEffect(() => {
        const storedToken = localStorage.getItem("token") || token;
        if (!storedToken) {
            navigate("/");
            return;
        }

        // Load settings from localStorage
        const savedSettings = localStorage.getItem("userSettings");
        if (savedSettings) {
            try {
                const parsed = JSON.parse(savedSettings);
                if (parsed.notifications) setNotifications(parsed.notifications);
                if (parsed.foodPreference) setFoodPreference(parsed.foodPreference);
                if (parsed.darkMode) setDarkMode(parsed.darkMode);
                if (parsed.profile) setProfile(parsed.profile);
            } catch (error) {
                console.error("Failed to parse user settings:", error);
            }
        }
    }, [token, navigate]);

    const handleToggle = (key) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 1024 * 1024) {
                alert("File size is too large! Please choose an image smaller than 1MB.");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile(prev => ({ ...prev, avatar: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        const settingsToSave = {
            notifications,
            foodPreference,
            darkMode,
            profile
        };
        localStorage.setItem("userSettings", JSON.stringify(settingsToSave));
        setUserProfile(profile);
        alert("Settings saved successfully!");
    };

    return (
        <div className='settings-page'>
            <div className="settings-container">
                <h2>Account Settings</h2>
                <hr />

                {/* Profile Section */}
                <div className="settings-section">
                    <h3>Profile Information</h3>
                    
                    <div className="avatar-upload-container">
                        <div className="avatar-preview">
                            <img src={profile.avatar || assets.profile_icon} alt="Avatar Preview" />
                            <label htmlFor="avatar-input" className="avatar-edit-overlay">
                                <span>Change DP</span>
                            </label>
                        </div>
                        <input 
                            type="file" 
                            id="avatar-input" 
                            accept="image/*" 
                            onChange={handleAvatarChange} 
                            style={{ display: 'none' }} 
                        />
                        <p className="field-desc">Click image to upload custom profile picture.</p>
                    </div>

                    <div className="settings-field">
                        <label>Name</label>
                        <input 
                            type="text" 
                            placeholder="John Doe" 
                            value={profile.name} 
                            onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))} 
                            className="settings-input" 
                        />
                    </div>
                    <div className="settings-field">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            placeholder="john.doe@example.com" 
                            value={profile.email} 
                            onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))} 
                            className="settings-input" 
                        />
                    </div>
                </div>

                {/* Preferences Section */}
                <div className="settings-section">
                    <h3>Preferences</h3>
                    <div className="settings-field dropdown-field">
                        <label>Food Dietary Preference</label>
                        <select 
                            value={foodPreference} 
                            onChange={(e) => setFoodPreference(e.target.value)} 
                            className="settings-select"
                        >
                            <option value="all">All Foods</option>
                            <option value="veg">Vegetarian Only</option>
                            <option value="non-veg">Non-Vegetarian Only</option>
                            <option value="vegan">Vegan</option>
                        </select>
                    </div>
                </div>

                {/* Notifications Section */}
                <div className="settings-section">
                    <h3>Notification Settings</h3>
                    <div className="settings-toggle-group">
                        <div className="settings-toggle-item">
                            <div>
                                <span>Order Status Emails</span>
                                <p className="field-desc">Receive real-time updates about your order status.</p>
                            </div>
                            <div 
                                className={`toggle-switch ${notifications.orderStatus ? 'active' : ''}`} 
                                onClick={() => handleToggle('orderStatus')}
                            >
                                <div className="toggle-slider"></div>
                            </div>
                        </div>

                        <div className="settings-toggle-item">
                            <div>
                                <span>Promotional Offers</span>
                                <p className="field-desc">Get notifications about sales, discounts, and active coupons.</p>
                            </div>
                            <div 
                                className={`toggle-switch ${notifications.promotions ? 'active' : ''}`} 
                                onClick={() => handleToggle('promotions')}
                            >
                                <div className="toggle-slider"></div>
                            </div>
                        </div>

                        <div className="settings-toggle-item">
                            <div>
                                <span>Newsletter</span>
                                <p className="field-desc">Stay updated with our weekly culinary blogs and trends.</p>
                            </div>
                            <div 
                                className={`toggle-switch ${notifications.newsletters ? 'active' : ''}`} 
                                onClick={() => handleToggle('newsletters')}
                            >
                                <div className="toggle-slider"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Interface Settings */}
                <div className="settings-section">
                    <h3>Display Options</h3>
                    <div className="settings-toggle-item">
                        <div>
                            <span>Dark Mode (Beta)</span>
                            <p className="field-desc">Switch application view to dark theme.</p>
                        </div>
                        <div 
                            className={`toggle-switch ${darkMode ? 'active' : ''}`} 
                            onClick={() => {
                                setDarkMode(!darkMode);
                                alert("Dark Mode is currently in Beta. Stay tuned!");
                            }}
                        >
                            <div className="toggle-slider"></div>
                        </div>
                    </div>
                </div>

                <div className="settings-actions">
                    <button className="cancel-btn" onClick={() => navigate('/')}>Back to Home</button>
                    <button className="save-btn" onClick={handleSave}>Save Settings</button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
