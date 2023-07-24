import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import axios from 'axios';


export default function CategoryModal({show, handleClose, details}) {
    const [categoryName, setCategoryName] = useState(`${details.categoryName}`);

    const handleChange = (event) => {
        setCategoryName(event.target.value);
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            name: categoryName,
        };
        if(details.id) {
            axios
            .put(`http://localhost:2611/api/v1/update/${details.id}`, data)
            .then((res) => {
                console.log(res.data)
                setCategoryName("");
                handleClose();
            }).catch((error) => {
                console.log(error);
            })
        } else {
            axios
            .post('http://localhost:2611/api/v1/create', data)
            .then((res) => {
                console.log(res.data)
                setCategoryName("");
                handleClose();
            }).catch((error) => {
                console.log(error);
            })
        }
    };
    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form method="post" onSubmit={handleSubmit}>
                    <div className='my-2'>
                        <label>
                            Category name: 
                            <input className="form-control" type="text" name="categoryName" value={categoryName} onChange={handleChange}/> 
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