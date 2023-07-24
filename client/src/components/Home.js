import { useEffect, useState } from "react";
import fetchProducts from "./fetchProducts";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationListStandalone, PaginationProvider } from 'react-bootstrap-table2-paginator';
import { Container, Spinner, Dropdown, ButtonGroup } from "react-bootstrap";
import axios from "axios";
import ModalComponent from "./ModalComponent";

function Home() {
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [productDetails, setProductDetails] = useState({id: "", productName: "", categoryId: ""})

    const columns = [{
        dataField: 'id',
        text: 'Product ID'
    }, {    
        dataField: 'name',
        text: 'Product Name'
    }, {
        dataField: 'categoryId',
        text: 'Category Id'
    }, {
        dataField: 'category.name',
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
        setShow(true);
        setProductDetails({id: details.id, productName: details.name, categoryId: details.categoryId})
    }
    const handleDelete = async (id) => {
        setLoading(true);
        const res = await axios.delete(`http://localhost:2611/api/v1/deleteproduct/${id}`);
        console.log(res);
        fetchProducts(currentPage).then((res) => {
            setCount(res.products.count);
            setProducts(res.products.rows);
            setLoading(false)
        })
    }

    const options = { 
        custom:true,
        hideSizePerPage: true,
        totalSize: count,       
        paginationSize: count,    
        pageStartIndex: 1,
        alwaysShowAllBtns: false,
        pageButtonRenderer: ({page, active, onPageChange}) => {
            const handleClick = (e) => {
                e.preventDefault();
                setCurrentPage(page);
            };
            const activeStyle = {};
            if (active) {
                activeStyle.backgroundColor = 'gray';
                activeStyle.color = 'black';
            } else {
                activeStyle.backgroundColor = 'gray';
                activeStyle.color = 'black';
            }
            if (typeof page === 'string') {
                activeStyle.backgroundColor = 'white';
                activeStyle.color = 'black';
            }
            return (
                <li className="page-item" key={page}>
                    <button type="link" className="page-link" style={ activeStyle } onClick={handleClick}>{ page }</button>
                </li>
            );
        }
    }
    
    useEffect(() => {
        fetchProducts(currentPage).then((res) => {
            setCount(res.products.count);
            setProducts(res.products.rows);
            setLoading(false)
        })
    }, [currentPage]);

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        fetchProducts(currentPage).then((res) => {
            setCount(res.products.count);
            setProducts(res.products.rows);
            setLoading(false)
        })
    };

    return (
        <Container className="mt-4">
            <button className="btn btn-primary" onClick={handleShow}><b>+</b> Add Product</button>
            <ModalComponent show={show} handleClose={handleClose} details={productDetails}/>
            <Container className="mt-4">
                <PaginationProvider pagination={ paginationFactory(options) }>
                {
                    ({paginationProps, paginationTableProps}) => (
                        <>
                            <BootstrapTable 
                                bootstrap4 
                                keyField='id'
                                data={ products } 
                                columns={ columns }
                                { ...paginationTableProps }
                                noDataIndication={loading ? (
                                    <>
                                        <Spinner as="span" animation="border" role="status" aria-hidden="true" className="mx-2" />
                                        <span style={{ verticalAlign: "super" }}>loading...</span>
                                    </>
                                ) : 'No Data Found'} />
                            <PaginationListStandalone { ...paginationProps } />
                        </>
                    )
                }
                </PaginationProvider>
            </Container>
        </Container>
    )
}

export default Home;