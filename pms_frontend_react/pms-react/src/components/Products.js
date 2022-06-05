import {useEffect,useRef,useState} from "react";
import { Link } from "react-router-dom";
function Products(param) { 

    let [products,setProducts] = useState([]);
    let [checkstatus,setStatus] = useState(false);
    let form = useRef();

    let editProductValue = useRef({});

    let updateProductValue = editProductValue.current;
    
    function dynamicFieldValueFetch(property,value){
        updateProductValue[property] = value;
        console.log(updateProductValue);
    }

    useEffect(()=>{
        fetch("http://localhost:8001/products")
        .then((response)=>response.json())
        .then((products)=>{
            console.log(products)
            setProducts(products);

        })
        .catch((err)=>console.log(err));
    },[]);

    function getSingleProduct(product){
        setStatus(true);
        editProductValue.current = product;
    }

    function editProduct(ID){
        fetch("http://localhost:8001/products?id="+ID,{
            method:"PUT",
            "Content-Type":"Application/json",
            body:JSON.stringify(updateProductValue)
        })
        .then((res)=>res.json())
        .then((msg)=>{
            console.log(msg);
        })
    }

    function deleteFunction(ID){
        console.log(ID);
        fetch("http://localhost:8001/products?id="+ID,{
            method:"DELETE"
        })
        .then((res)=>res.json())
        .then((res)=>{
            console.log(res);
            if(res.status===true){
                let temp = [...products];
                let indX = temp.findIndex((ele)=>Number(ele.id)===Number(ID));
                temp.splice(indX,1);
                setProducts(temp);
                console.log(res.status +" "+ indX);
            }
        })
    }
    return(
        <div className="container">


            {
                (checkstatus===true)?
                (
                    <div className="editmessage" style={{color:"white"}}>
                        <h3>Edit Product</h3>
                        <form ref={form}>
                            <div className="mb-3 inputBox">
                                Product Id
                                <input type="text" readOnly defaultValue={editProductValue.current.id} placeholder="Enter Product Id" className="form-control" />
                            </div>
                            <div className="mb-3 inputBox">
                                Product Name
                                {
                                    // console.log(editProductValue.current.name)

                                }
                                <input type="text" placeholder="Enter Product Name" defaultValue={editProductValue.current.name} onChange={(event)=>{ dynamicFieldValueFetch("name",event.target.value) }} className="form-control" />
                            </div>
                            <div className="mb-3 inputBox">
                                Product Price
                                <input type="text" placeholder="Enter Product Price" defaultValue={editProductValue.current.price} onChange={(event)=>{ dynamicFieldValueFetch("price",event.target.value) }} className="form-control" />
                            </div>
                            <div className="mb-3 inputBox">
                                Product Quantity
                                <input type="text" placeholder="Enter Product Quantity" defaultValue={editProductValue.current.quantity} onChange={(event)=>{ dynamicFieldValueFetch("quantity",event.target.value) }} className="form-control" />
                            </div>
                            <div className="addButtons">
                                    <button type="button" className="btn btn-primary btn-addProduct" onClick={()=>{ editProduct() }}>Submit</button>
                                    <button className="btn btn-danger btn-addProduct" onClick={()=>{
                                        setStatus(false);
                                        form.current.reset();
                                    }} >Cancel</button>
                            </div>
                        </form>
                    </div>
                )
                : null
            }



            <div className="allProductsHeader">
                <h2>All Products</h2> 
                <Link to={"/AddProduct"}>
                    <button className="btn btn-primary">Add Product</button>
                </Link>
            </div>
            <table className="table table-striped" >
                <thead>
                    <tr>
                        <th scope="col" >Sl No</th>
                        <th scope="col" >Products Name</th>
                        <th scope="col" >Price</th>
                        <th scope="col" >Quantity</th>
                        <th scope="col" >Action</th> 
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((ele,ind)=>{
                            return (
                                <tr key={ind}>
                                    <td>{++ind}</td>
                                    <td>{ele.name}</td>
                                    <td>{ele.price}</td>
                                    <td>{ele.quantity}</td>
                                    <td>
                                        <i className="fa-solid fa-pencil" onClick={()=>{
                                            getSingleProduct(ele);
                                        }} ></i> 
                                        <i className="fa-solid fa-trash" onClick={()=>{
                                            deleteFunction(ele.id)}
                                        }></i>
                                    </td>
                                </tr>
                            )

                        })
                    }
                </tbody>
            </table>
            
        </div>
    )
}

export default Products;