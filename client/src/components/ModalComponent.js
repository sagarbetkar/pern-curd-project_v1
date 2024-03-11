import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { fetchCategories } from './fetchCategories';
import { Button } from 'react-bootstrap';
import axios from 'axios';


export default function ModalComponent({show, handleClose, details}) {
    const [formData, setFormData] = useState({productName: details.productName, categoryId: details.categoryId});
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories().then((res) => {
            setCategories(res.data)
        })
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            name: formData.productName,
            categoryId: formData.categoryId
        };
        if(details.id) {
            axios
            .put(`http://https://pern-curd-project-v1.onrender.com/api/v1/updateProduct/${details.id}`, data)
            .then((res) => {
                console.log(res.data)
                setFormData({productName: "", categoryId: ""});
                handleClose();
            }).catch((error) => {
                console.log(error);
            })
        } else {
            axios
            .post('http://https://pern-curd-project-v1.onrender.com/api/v1/createProduct', data)
            .then((res) => {
                console.log(res.data)
                setFormData({productName: "", categoryId: ""});
                handleClose();
            }).catch((error) => {
                console.log(error);
            })
        }
    };

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form method="post" onSubmit={handleSubmit}>
                    <div className='my-2'>
                        <label>
                            Product name: 
                            <input className="form-control" type="text" name="productName" value={formData.productName} onChange={handleChange}/> 
                        </label>                        
                    </div>
                    <div className='my-2'>
                        <label>
                            Category: 
                            <select className="form-select" name="categoryId" onChange={handleChange} value={formData.categoryId}>
                                <option value={null}>{"Choose a category"}</option>
                                {categories.map((category) => <option value={category.id} key={category.id}>{category.name}</option>)}
                            </select> 
                        </label>
                    </div>
                    <div className='my-4'>
                        <Button className='btn' type="submit">Submit form</Button>
                    </div>
                </form>
            </Modal.Body>
      </Modal>
    )
}