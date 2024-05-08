"use client"

import React, {useEffect, useState} from "react"
import exployeeContext from "./employeeContext"

const EmployeeState = (props) => {
    const [EmpData, setEmpData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("https://divyanshuweb.onrender.com/getData");
            const data = await res.json();
            setEmpData(data);
        }
        fetchData();
    }, []);


    return (
        <exployeeContext.Provider value={EmpData}>
            {props.children}
        </exployeeContext.Provider>
    );

};

export default EmployeeState;