import {useEffect,useState} from "react";

function Products1(){

    let [products,useProducts] = useState([]);
    useEffect(()=>{
        useProducts([1,2,3]);

    },[])

    // let [products, useProducts] = useState([])
    // useProducts([1,2,3])  
    // useEffect(()=>{
    // fetch('http://localhost:8000/products')
    // //    let dd = await d.json()
    // //    useProducts(dd)
    //     .then((response)=>{
    //         return response.json()
    //     })
    //     .then((data)=>{
    //         // useProducts(data);
    //         console.log(data);
    //     })
    //     .catch((error)=>{
    //         console.log(error)
    //     })
    // },[])

    return(
        <div>
            Hi there
            {
                products.map((prop,ind)=>{
                    return(
                        console.log(ind)
                    )
                })
            }
        </div>
    )

}

export default Products1; 