import { useRef } from "react";

function AddProduct(){
    let product = {};
    let form = useRef();
    function setProductInstance(entity,value){
        (entity==="id") ? product[entity] = Number(value) :product[entity] = value; 
        // console.log(product);
    }

    function addProduct(){
        fetch("http://localhost:8001/products",{
            method:"POST",
            "Conetnt-Type":"application/json",
            body:JSON.stringify(product)
        })
        .then((res)=>res.json())
        .then((msg)=>{
            if(msg.status === 200){
                form.current.reset();
            }
        });
    }
    return(
        <div className="container addProduct">
            <form ref={form}>
                <div className="mb-3 inputBox">
                    Product Id
                    <input type="text" placeholder="Enter Product Id" onChange={(event)=>{ setProductInstance("id",event.target.value) }} className="form-control" />
                </div>
                <div className="mb-3 inputBox">
                    Product Name
                    <input type="text" placeholder="Enter Product Name" onChange={(event)=>{ setProductInstance("name",event.target.value) }} className="form-control" />
                </div>
                <div className="mb-3 inputBox">
                    Product Price
                    <input type="text" placeholder="Enter Product Price" onChange={(event)=>{ setProductInstance("price",event.target.value) }} className="form-control" />
                </div>
                <div className="mb-3 inputBox">
                    Product Quantity
                    <input type="text" placeholder="Enter Product Quantity" onChange={(event)=>{ setProductInstance("quantity",event.target.value) }} className="form-control" />
                </div>
                <div className="addButtons">
                        <button type="button" className="btn btn-primary btn-addProduct" onClick={()=>{ addProduct() }}>Submit</button>
                    <button className="btn btn-danger btn-addProduct">Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default AddProduct;