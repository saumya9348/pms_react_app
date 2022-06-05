import {useState,useEffect,useRef} from "react"

function Demo (props){

    let h3 = useRef();
    function dosomething(){
        h3.current.style.color="red";
    }

    let [name,setName] = useState("Hii");

    let [student,setStudent] = useState({name:"sam",age:12});

    let ref = useRef("hi");

    function changeText(){
        setName("Biiii");

        let x =student;
        x.name="hh";

        ref.current = "biii";

        console.log(x);
        setStudent(x);
        
    }
    let xyz = useRef();
    function changeEffect(){
        xyz.current.style.color="blue";
    }

    useEffect(()=>{
        console.log("Ima side effect")
    },[name])

    return(
        <div ref={xyz}>
            <h3 ref={h3} >Hii im Demo</h3>
            <h4 onClick={()=>{ dosomething() }}>{ props.name +" " + props.age }</h4>
            <h6>{name}</h6>

            <h5 onClick={()=>{changeEffect()}} >{student.name +" age-"+ student.age +ref.current}</h5>

            <button onClick={()=>{ changeText() }} >Change Effect</button>
        </div>
    )
}

export default Demo;