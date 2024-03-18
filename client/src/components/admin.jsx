import React, { useEffect, useState } from 'react'
import {
    faPenToSquare,
    faEye,
    faTrash,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { toast } from "react-toastify";
import { getAccountById } from "../services/AccountServices";
import CakeServices from '../services/CakeServices';
import axios from "axios";


export default function Admin() {
    const history = useHistory();
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    // Input field state variables:
    const [imageFile, setImageFile] = useState(null); // For file input
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [cakeList, setCakeList] = useState([]);
    const [cake, setCake] = useState({});


    function getAuthToken() {
        const token = localStorage.getItem('token');
        return token;
    }
    function getAccountId() {
        const accountid = localStorage.getItem('accountid');
        return accountid;
    }
    function getRole() {
        const admin = localStorage.getItem('admin');
        return admin;
    }
    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('accountid');
        localStorage.removeItem('admin');

        history.push('/home');
        toast.success("Logout Successfully")

    }
    const authToken = getAuthToken();
    const accountid = getAccountId();
    const admin = getRole();
    useEffect(() => {

        getAccountById(accountid, authToken)
            .then((response) => {
                setUser(response.data);
                setIsAdmin(response.data.admin || false);
            })
            .catch((error) => {
                console.error("Error fetching account:", error);
            });
    }, [accountid]
    );

    useEffect(() => {
        CakeServices.getCake()
            .then((response) => {
                setCakeList(response.data)
            })
            .catch((error) => {
                console.error("Error fetching account:", error);
            });
    }, []
    );



    // Handle file input change:
    const handleImageChange = (event) => {
        setImageFile(event.target.files[0].name || null); // Access the selected file
    };

    // Handle text input changes:
    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleEdit = (cake_id) => {
        CakeServices.getCakebyId(cake_id)
            .then((response) => {
                setImageFile(imageFile || response.data.urlImage);
                setCake(response.data)
                console.log("cake info", response.data)
            })
            .catch((error) => {
                toast.error('Error fetching cake details. Please try again.');
            });


    };

    const handleEditSubmit = (event, cakeid) => {
        event.preventDefault();
        const cakeData = {
            type: type !== '' ? type : cake.type,
            urlImage: imageFile !== '' ? imageFile : cake.urlImage,
            name: name !== '' ? name : cake.name,
            price: price !== '' ? price : cake.price,
            user: accountid
        };
        axios.put('http://localhost:3000/cakes/' + cakeid, cakeData, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
        })
            .then((response) => {
                // console.log('Cake Updated successfully:', response.data);
                window.location.reload();
                toast.success('Cake Updated successfully');
            })
            .catch((error) => {
                // console.error('Error update cake:', error.response.data);
                toast.error('Error update cake. Please try again.');
            });
    };
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!imageFile) {
            toast.error('Please select an image.');
            return;
        }
        if (!name) {
            toast.error('Please enter a name.');
            return;
        }
        if (!type) {
            toast.error('Please enter the cake type.');
            return;
        }
        if (!price || isNaN(price) || Number(price) <= 0) {
            toast.error('Please enter a valid price (positive number).');
            return;
        }

        const cakeData = {
            type: type,
            urlImage: imageFile,
            name: name,
            price: price,
            user: accountid
        };
        axios.post('http://localhost:3000/cakes', cakeData, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
        })
            .then((response) => {
                window.location.reload();
                toast.success('Cake added successfully');
            })
            .catch((error) => {
                // console.error('Error adding cake:', error.response.data);
                toast.error('Error adding cake. Please try again.');
            });
    };

    const handleDelete = (event, id) => {
        event.preventDefault();
        const shouldDelete = window.confirm(
            "Are you sure you want to delete this cake?"
        );
        if (shouldDelete) {

            axios.delete(`http://localhost:3000/cakes/${id}`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                },
            })
                .then((response) => {
                    toast.success('Cake deleted successfully');
                    window.location.reload();
                })
                .catch((error) => {
                    // console.error('Error deleting cake:', error.response.data);
                    toast.error('Error deleting cake. Please try again.');
                });
        }
    }




    return (

        <>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">
                    Cake Shop
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a style={{ marginRight: '500px' }} className="nav-link" href="/home">
                                Home <span className="sr-only">(current)</span>
                            </a>
                        </li>
                        {isAdmin && (
                            <a className="nav-link" href="">
                                Manage <span className="sr-only"></span>
                            </a>
                        )}
                        {user && (
                            <a className="nav-link" href="">
                                Hi, {user.username} ! <span className="sr-only"></span>
                            </a>
                        )}
                        {authToken && (
                            <a onClick={logout} style={{ float: 'right' }} className="nav-link" href="">
                                Logout
                            </a>
                        )}
                        {!authToken && (
                            <a style={{ float: 'right' }} className="nav-link" href="/login">
                                Login
                            </a>
                        )}
                    </ul>
                </div>

            </nav>

            <div style={{ marginTop: '50px' }} className="container">
                <div className="row flex-lg-nowrap">


                    <div className="col">
                        <div className="e-tabs mb-3 px-3">
                            <ul className="nav nav-tabs">
                                <li className="nav-item"><a className="nav-link active" href="#">Cakes List</a></li>
                            </ul>
                            {isAdmin && (
                                <button className="btn btn-success btn-block mt-5" type="button" data-toggle="modal" data-target="#user-form-modal">New Cake</button>
                            )}

                        </div>

                        <div className="row flex-lg-nowrap">
                            <div className="col mb-3">
                                <div className="e-panel card">
                                    <div className="card-body">
                                        <div className="e-table">
                                            <div className="table-responsive table-lg mt-3">
                                                <table className="table table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th className="max-width">Image</th>
                                                            <th className="max-width">Name</th>
                                                            <th className="sortable">Type</th>
                                                            <th className="sortable">Price</th>
                                                            {isAdmin && (
                                                                <th className="sortable">User Posted</th>
                                                            )}
                                                            {isAdmin && (
                                                                <th>Actions</th>
                                                            )}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {cakeList.length === 0 ? (
                                                            <tr>
                                                                <td colSpan="6" className="text-center">No cakes found.</td>
                                                            </tr>
                                                        ) : (
                                                            cakeList.map((cake, index) => (
                                                                <tr key={index}>
                                                                    <td className="align-middle text-center">
                                                                        <img src={`/assets/img/${cake.urlImage}`} style={{ width: '35px', height: '35px', borderRadius: '3px' }} alt="Cake" />
                                                                    </td>
                                                                    <td className="text-nowrap align-middle">{cake.name}</td>
                                                                    <td className="text-nowrap align-middle">{cake.type}</td>
                                                                    <td className="text-nowrap align-middle">{cake.price}</td>
                                                                    {isAdmin && (
                                                                        <td className="text-nowrap align-middle">{cake.user.username}</td>
                                                                    )}
                                                                    {isAdmin && (
                                                                        <td className="text-center align-middle">
                                                                            <div className="btn-group align-top">
                                                                                <button className="btn btn-sm btn-outline-secondary" type="button" data-toggle="modal" data-target="#cake-update-form-modal">
                                                                                    <FontAwesomeIcon onClick={() => handleEdit(cake._id)} icon={faPenToSquare} />
                                                                                </button>
                                                                                <button className="btn btn-sm btn-outline-secondary" type="button">
                                                                                    <FontAwesomeIcon onClick={(event) => handleDelete(event, cake._id)} style={{ color: 'red' }} icon={faTrash} />
                                                                                </button>
                                                                            </div>
                                                                        </td>
                                                                    )}
                                                                </tr>
                                                            ))
                                                        )}

                                                    </tbody>
                                                </table>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* model create cake */}
                        <div className="modal fade" role="dialog" tabIndex={-1} id="user-form-modal">
                            <div className="modal-dialog modal-lg" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Create Cake</h5>
                                        <button type="button" className="close btn btn-secondary" data-dismiss="modal">
                                            <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="py-1">
                                            <form className="form" noValidate="">
                                                <div className="row">
                                                    <div className="col">
                                                        <div className="row">
                                                            <div className="col">
                                                                <div className="form-group">
                                                                    <label>Image:</label>
                                                                    <input
                                                                        className="form-control"
                                                                        type="file"
                                                                        name="image"
                                                                        placeholder=""
                                                                        defaultValue=""
                                                                        onChange={handleImageChange}
                                                                    />
                                                                </div>
                                                            </div>


                                                        </div>
                                                        <div className="row mt-3">
                                                            <div className="col">
                                                                <div className="form-group">
                                                                    <label>Name:</label>
                                                                    <input
                                                                        className="form-control"
                                                                        type="text"
                                                                        name="name"
                                                                        placeholder=""
                                                                        defaultValue=""
                                                                        onChange={handleNameChange}

                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row mt-3">
                                                            <div className="col">
                                                                <div className="form-group">
                                                                    <label>Type:</label>
                                                                    <input
                                                                        className="form-control"
                                                                        type="text"
                                                                        placeholder=""
                                                                        onChange={handleTypeChange}

                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row mt-3">
                                                            <div className="col">
                                                                <div className="form-group">
                                                                    <label>Price:</label>
                                                                    <input
                                                                        className="form-control"
                                                                        type="text"
                                                                        placeholder=""
                                                                        onChange={handlePriceChange}

                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <button onClick={handleSubmit} style={{ float: 'right' }} className="btn btn-success mt-3" type="submit">
                                                    Save Changes
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* model update cake */}
                        <div className="modal fade" role="dialog" tabIndex={-1} id="cake-update-form-modal">
                            <div className="modal-dialog modal-lg" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Update Cake</h5>
                                        <button type="button" className="close btn btn-secondary" data-dismiss="modal">
                                            <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="py-1">
                                            <form className="form" noValidate="">
                                                <div className="row">
                                                    <div className="col">
                                                        <div className="row">
                                                            <div className="col">
                                                                <div className="form-group">
                                                                    <label>Current Image:</label>
                                                                    <img src={`../assets/img/${cake.urlImage}`} style={{ width: '100px', height: '100px', borderRadius: '3px', marginLeft: '60px' }} />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label>Image:</label>
                                                                    <input
                                                                        className="form-control"
                                                                        type="file"
                                                                        name="image"
                                                                        placeholder=""
                                                                        defaultValue={cake.urlImage}
                                                                        onChange={handleImageChange}
                                                                    />
                                                                </div>
                                                            </div>


                                                        </div>
                                                        <div className="row mt-3">
                                                            <div className="col">
                                                                <div className="form-group">
                                                                    <label>Name:</label>
                                                                    <input
                                                                        className="form-control"
                                                                        type="text"
                                                                        name="name"
                                                                        placeholder=""
                                                                        defaultValue={cake.name}
                                                                        onChange={handleNameChange}

                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row mt-3">
                                                            <div className="col">
                                                                <div className="form-group">
                                                                    <label>Type:</label>
                                                                    <input
                                                                        className="form-control"
                                                                        type="text"
                                                                        placeholder=""
                                                                        onChange={handleTypeChange}
                                                                        defaultValue={cake.type}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row mt-3">
                                                            <div className="col">
                                                                <div className="form-group">
                                                                    <label>Price:</label>
                                                                    <input
                                                                        className="form-control"
                                                                        type="text"
                                                                        placeholder=""
                                                                        onChange={handlePriceChange}
                                                                        defaultValue={cake.price}

                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <button onClick={(event) => handleEditSubmit(event, cake._id)} style={{ float: 'right' }} className="btn btn-success mt-3" type="submit">
                                                    Update
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>

    )

}