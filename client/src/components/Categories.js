import { useEffect, useState } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import { Container, Spinner, Dropdown, ButtonGroup } from "react-bootstrap";
import axios from "axios";
import { fetchCategories } from "./fetchCategories";
import CategoryModal from "./CategoryModal";

function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [categoryDetails, setCategoryDetails] = useState({id: "", categoryName: ""})

    const columns = [{
        dataField: 'id',
        text: 'Category Id'
    }, {
        dataField: 'name',
        text: 'Category Name'
    },{
        dataField: '',
        formatter: (cell, row, rowIndex, formatExtraData) => {
            return (
                <Dropdown as={ButtonGroup}>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic"></Dropdown.Toggle>
                    <Dropdown.Menu> 
                        <Dropdown.Item onClick={() => handleEdit(row)}>Edit</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDelete(row.id)}>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            )
        },
        text: 'Action List',
    }];

    const handleEdit = (details) => {
        setCategoryDetails({id: details.id, categoryName: details.name})
        setShow(true);
    }
    const handleDelete = async (id) => {
        setLoading(true);
        const res = await axios.delete(`http://https://pern-curd-project-v1.onrender.com/api/v1/delete/${id}`);
        console.log(res);
        fetchCategories().then((res) => {
            setCategories(res.data)
            setLoading(false);
        })
    }

    useEffect(() => {
        fetchCategories().then((res) => {
            setCategories(res.data)
            setLoading(false);
        })
    }, [])

    const handleShow = () => {
        setShow(true);
    }
    const handleClose = () => {
        setCategoryDetails({id: "", categoryName: ""});
        setShow(false);
        fetchCategories().then((res) => {
            setCategories(res.data)
            setLoading(false);
        })
    };

    return (
        <Container className="mt-4">
            <button className="btn btn-primary" onClick={handleShow} ><b>+</b> Add Category</button>
            <CategoryModal show={show} handleClose={handleClose} details={categoryDetails}/>
            <Container className="mt-4">
                <BootstrapTable 
                    bootstrap4 
                    keyField='id'
                    data={ categories } 
                    columns={ columns }
                    noDataIndication={loading ? (
                        <>
                            <Spinner as="span" animation="border" role="status" aria-hidden="true" className="mx-2" />
                            <span style={{ verticalAlign: "super" }}>loading...</span>
                        </>
                    ) : 'No Data Found'} />
            </Container>
        </Container>
    )
}

export default Categories;