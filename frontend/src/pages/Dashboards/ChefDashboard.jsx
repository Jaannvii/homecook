import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/home.css';

const API_URL = import.meta.env.VITE_API_URL;

const ChefDashboard = () => {
    const [profile, setProfile] = useState(null);
    const [menus, setMenus] = useState([]);

    const [profileMessage, setProfileMessage] = useState('');
    const [profileSuccess, setProfileSuccess] = useState('false');

    const [menuMessage, setMenuMessage] = useState('');
    const [menuSuccess, setMenuSuccess] = useState('false');

    const [menuDeleteMessage, setMenuDeleteMessage] = useState('');
    const [menuDeleteSuccess, setMenuDeleteSuccess] = useState('false');

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
            setProfile(res.data.chef);
            setFormData({
                name: res.data.chef.name || '',
                contactNumber: res.data.chef.contactNumber || '',
                address: {
                    street: res.data.chef.address?.street || '',
                    city: res.data.chef.address?.city || '',
                    state: res.data.chef.address?.state || '',
                    postalCode: res.data.chef.address?.postalCode || '',
                    country: res.data.chef.address?.country || '',
                },
            });
        } catch (err) {
            setProfileMessage('Error fetching profile');
            setProfileSuccess('false');
        }
    };

    const fetchMenus = async () => {
        try {
            const res = await axios.get(`${API_URL}/menu/`, {
                withCredentials: true,
            });
            setMenus(res.data.menus);
        } catch (err) {
            setMenuMessage('Error fetching item');
            setMenuSuccess('false');
        }
    };

    const updateProfile = async () => {
        const payload = {
            name: formData.name,
            contactNumber: formData.contactNumber,
            address: { ...formData.address },
        };

        try {
            await axios.put(`${API_URL}/chef/update`, payload, {
                withCredentials: true,
            });
            setProfileMessage('Profile updated successfully!');
            setProfileSuccess(true);
            fetchProfile();
        } catch (err) {
            setProfileMessage('Failed to update profile.');
            setProfileSuccess(false);
        } finally {
            setTimeout(() => {
                setProfileMessage('');
                setProfileSuccess(null);
            }, 3000);
        }
    };

    const createMenu = async () => {
        if (
            !menuData.itemName ||
            !menuData.description ||
            !menuData.price ||
            !menuData.category ||
            !menuData.imageUrl
        ) {
            setMenuMessage('Please fill all required fields.');
            return;
        }

        const payload = {
            itemName: menuData.itemName.trim(),
            description: menuData.description.trim(),
            price: Number(menuData.price),
            category: menuData.category.trim(),
            imageUrl: menuData.imageUrl.trim(),
        };

        try {
            await axios.post(`${API_URL}/menu/create`, payload, {
                withCredentials: true,
            });
            setMenuMessage(
                'Item created successfully! Awaiting admin approval.'
            );
            setMenuSuccess(true);
            setMenuData({
                itemName: '',
                description: '',
                price: '',
                category: 'Breakfast',
                imageUrl: '',
            });
            fetchMenus();
        } catch (err) {
            const msg = err.response?.data?.message || 'Failed to create item.';
            if (err.response?.status === 400) {
                setMenuMessage(msg);
                setMenuSuccess(false);
            } else if (err.response?.status === 403) {
                setMenuMessage(msg);
                setMenuSuccess(false);
            } else {
                setMenuMessage('Failed to create item.');
                setMenuSuccess(false);
            }
        } finally {
            setTimeout(() => {
                setMenuMessage('');
                setMenuSuccess(null);
            }, 3000);
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
            setMenuSuccess(true);
            setEditMenuId(null);
            fetchMenus();
        } catch (err) {
            setMenuMessage('Failed to update menu item.');
            setMenuSuccess(false);
        } finally {
            setTimeout(() => {
                setMenuMessage('');
                setMenuSuccess(null);
            }, 3000);
        }
    };

    const deleteMenu = async (id) => {
        try {
            if (!window.confirm('Delete this menu item?')) return;
            await axios.delete(`${API_URL}/menu/delete/${id}`, {
                withCredentials: true,
            });
            setMenuDeleteMessage('Item deleted successfully');
            setMenuDeleteSuccess(true);
            fetchMenus();
        } catch (err) {
            setMenuDeleteMessage('Failed to delete item.');
            setMenuDeleteSuccess(false);
        } finally {
            setTimeout(() => {
                setMenuDeleteMessage('');
                setMenuDeleteSuccess(null);
            }, 3000);
        }
    };

    useEffect(() => {
        fetchProfile();
        fetchMenus();
    }, []);

    return (
        <div className="bgColor">
            <h1 className="py-4 text-center title">Chef Dashboard</h1>

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
                            className={`text-center ${
                                profileSuccess ? 'text-success' : 'text-danger'
                            } mt-2 `}
                        >
                            {profileMessage}
                        </p>
                    )}
                </div>
            </div>

            <div className="container card mb-4 shadow-sm">
                <div className="card-body">
                    <h4 className="mb-3 title">
                        {editMenuId ? 'Update Item' : 'Create Item'}
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
                                {editMenuId ? 'Update Item' : 'Create Item'}
                            </button>
                        </div>
                    </div>
                    {menuMessage && (
                        <p
                            className={`text-center ${
                                menuSuccess ? 'text-success' : 'text-danger'
                            } mt-2`}
                        >
                            {menuMessage}
                        </p>
                    )}
                </div>
            </div>

            <div className="container card shadow-sm">
                <div className="card-body">
                    <h4 className="mb-3 title">My Item</h4>
                    {menuDeleteMessage && (
                        <p
                            className={`text-center ${
                                menuDeleteSuccess
                                    ? 'text-success'
                                    : 'text-danger'
                            } mt-2`}
                        >
                            {menuDeleteMessage}
                        </p>
                    )}
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
                                            <h4 className="card-title">
                                                {menu.itemName}
                                            </h4>
                                            <p className="card-text">
                                                {menu.description}
                                            </p>
                                            <p className="fw-bold">
                                                ₹{menu.price}
                                            </p>
                                            <div className="d-flex gap-2">
                                                <button
                                                    className="btn btn-sm btn-warning"
                                                    onClick={() => {
                                                        setEditMenuId(menu._id);
                                                        setMenuData({
                                                            itemName:
                                                                menu.itemName ||
                                                                '',
                                                            description:
                                                                menu.description ||
                                                                '',
                                                            price:
                                                                menu.price ||
                                                                '',
                                                            category:
                                                                menu.category ||
                                                                'Breakfast',
                                                            imageUrl:
                                                                menu.imageUrl ||
                                                                '',
                                                        });
                                                    }}
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
