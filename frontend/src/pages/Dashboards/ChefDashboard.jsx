import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/home.css';

const API_URL = import.meta.env.VITE_API_URL;

const ChefDashboard = () => {
    const [profile, setProfile] = useState(null);
    const [menus, setMenus] = useState([]);

    const [profileMessage, setProfileMessage] = useState('');
    const [menuMessage, setMenuMessage] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        contactNumber: '',
        address: {
            street: '',
            city: '',
            state: '',
            postalCode: '',
            country: '',
        },
    });

    const [menuData, setMenuData] = useState({
        itemName: '',
        description: '',
        price: '',
        category: 'Breakfast',
        imageUrl: '',
    });

    const [editMenuId, setEditMenuId] = useState(null);

    const fetchProfile = async () => {
        try {
            const res = await axios.get(`${API_URL}/chef/profile`, {
                withCredentials: true,
            });
            setProfile(res.data);
            setFormData({
                name: res.data.name || '',
                contactNumber: res.data.contactNumber || '',
                address: {
                    street: res.data.address?.street || '',
                    city: res.data.address?.city || '',
                    state: res.data.address?.state || '',
                    postalCode: res.data.address?.postalCode || '',
                    country: res.data.address?.country || '',
                },
            });
        } catch (err) {
            console.error('Error fetching profile:', err);
        }
    };

    const fetchMenus = async () => {
        try {
            const res = await axios.get(`${API_URL}/menu/`, {
                withCredentials: true,
            });
            setMenus(res.data);
        } catch (err) {
            console.error('Error fetching menus:', err);
        }
    };

    const updateProfile = async () => {
        const payload = {
            name: formData.name,
            contactNumber: formData.contactNumber,
            address: { ...formData.address },
        };

        try {
            const chefId = profile._id;
            await axios.put(`${API_URL}/chef/update/${chefId}`, payload, {
                withCredentials: true,
            });
            setProfileMessage('Profile updated successfully!');
            fetchProfile();
        } catch (err) {
            console.error('Error saving profile:', err);
            setProfileMessage('Failed to save profile.');
        }
    };

    const createMenu = async () => {
        const payload = {
            itemName: menuData.itemName,
            description: menuData.description,
            price: menuData.price,
            category: menuData.category,
            imageUrl: menuData.imageUrl,
        };

        try {
            await axios.post(`${API_URL}/menu/create`, payload, {
                withCredentials: true,
            });
            setMenuMessage('Menu item created successfully!');
            fetchMenus();
        } catch (err) {
            console.error('Error creating menu:', err);
            setMenuMessage('Failed to create menu item.');
        }
    };

    const updateMenu = async () => {
        const payload = {
            itemName: menuData.itemName,
            description: menuData.description,
            price: menuData.price,
            category: menuData.category,
            imageUrl: menuData.imageUrl,
        };

        try {
            await axios.put(`${API_URL}/menu/update/${editMenuId}`, payload, {
                withCredentials: true,
            });
            setMenuMessage('Menu item updated successfully!');
            setEditMenuId(null);
            fetchMenus();
        } catch (err) {
            console.error('Error updating menu:', err);
            setMenuMessage('Failed to update menu item.');
        }
    };

    const deleteMenu = async (id) => {
        try {
            await axios.delete(`${API_URL}/menu/delete/${id}`, {
                withCredentials: true,
            });
            fetchMenus();
        } catch (err) {
            console.error('Error deleting menu:', err);
            setMenuMessage('Failed to delete menu item.');
        }
    };

    useEffect(() => {
        fetchProfile();
        fetchMenus();
    }, []);

    return (
        <div className="py-4 bgColor">
            <h1 className="mb-4 text-center title">Chef Dashboard</h1>

            <div className="container card mb-4 shadow-sm">
                <div className="card-body">
                    <h4 className="mb-3 title">Update Profile</h4>
                    <div className="row g-3">
                        <div className="col-md-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="col-md-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Contact Number"
                                value={formData.contactNumber}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        contactNumber: e.target.value,
                                    })
                                }
                            />
                        </div>

                        {Object.keys(formData.address).map((field) => (
                            <div className="col-md-4" key={field}>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder={field}
                                    value={formData.address[field]}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            address: {
                                                ...formData.address,
                                                [field]: e.target.value,
                                            },
                                        })
                                    }
                                />
                            </div>
                        ))}

                        <div className="col-12">
                            <button
                                className="btn btn-primary"
                                onClick={updateProfile}
                            >
                                Save Profile
                            </button>
                        </div>
                    </div>
                    {profileMessage && (
                        <p
                            className={`mt-3 ${
                                profileMessage.includes('success')
                                    ? 'text-success'
                                    : 'text-danger'
                            }`}
                        >
                            {profileMessage}
                        </p>
                    )}
                </div>
            </div>

            <div className="container card mb-4 shadow-sm">
                <div className="card-body">
                    <h4 className="mb-3 title">
                        {editMenuId ? 'Update Product' : 'Create Product'}
                    </h4>
                    <div className="row g-3">
                        <div className="col-md-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Item Name"
                                value={menuData.itemName}
                                onChange={(e) =>
                                    setMenuData({
                                        ...menuData,
                                        itemName: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="col-md-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Description"
                                value={menuData.description}
                                onChange={(e) =>
                                    setMenuData({
                                        ...menuData,
                                        description: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="col-md-4">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Price"
                                value={menuData.price}
                                onChange={(e) =>
                                    setMenuData({
                                        ...menuData,
                                        price: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="col-md-4">
                            <select
                                className="form-control"
                                value={menuData.category}
                                onChange={(e) =>
                                    setMenuData({
                                        ...menuData,
                                        category: e.target.value,
                                    })
                                }
                            >
                                <option value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Dinner">Dinner</option>
                                <option value="Snacks">Snacks</option>
                                <option value="Dessert">Dessert</option>
                                <option value="Beverages">Beverages</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Image URL"
                                value={menuData.imageUrl}
                                onChange={(e) =>
                                    setMenuData({
                                        ...menuData,
                                        imageUrl: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="col-12">
                            <button
                                className={`btn ${
                                    editMenuId ? 'btn-warning' : 'btn-success'
                                }`}
                                onClick={editMenuId ? updateMenu : createMenu}
                            >
                                {editMenuId ? 'Update Menu' : 'Create Menu'}
                            </button>
                        </div>
                    </div>
                    {menuMessage && (
                        <p
                            className={`mt-3 ${
                                menuMessage.includes('success')
                                    ? 'text-success'
                                    : 'text-danger'
                            }`}
                        >
                            {menuMessage}
                        </p>
                    )}
                </div>
            </div>

            <div className="container card shadow-sm">
                <div className="card-body">
                    <h4 className="mb-3 title">My Menu</h4>
                    <div className="row">
                        {menus.length > 0 ? (
                            menus.map((menu) => (
                                <div className="col-md-4 mb-3" key={menu._id}>
                                    <div className="card h-100">
                                        <img
                                            src={menu.imageUrl}
                                            className="card-img-top"
                                            alt={menu.itemName}
                                            style={{
                                                height: '200px',
                                                objectFit: 'cover',
                                            }}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                {menu.itemName}
                                            </h5>
                                            <p className="card-text">
                                                {menu.description}
                                            </p>
                                            <p className="fw-bold">
                                                ₹{menu.price}
                                            </p>
                                            <div className="d-flex gap-2">
                                                <button
                                                    className="btn btn-sm btn-warning"
                                                    onClick={() =>
                                                        setEditMenuId(menu._id)
                                                    }
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() =>
                                                        deleteMenu(menu._id)
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted">
                                No menu items added yet.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChefDashboard;
