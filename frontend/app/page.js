"use client";

import { useState} from "react";

export default function Home(){
    const [file ,setFile] = useState(null);
    const [result ,setResult]= useState("");
    const [loading ,setLoading]= useState(false);

    const uploadFile = async () => {
        if(!file) return;

        const formData = new FormData();;
        formData.append("file",file);

        setLoading(true);

        try{
            const res =await fetch("http://localhost:5000/upload",{
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            setResult(data.analysis);

        }catch (err){
            setResult("Error occured");
        }

        setLoading(false);
    };

    return (
        <div style = {{ padding:30}}>
            <h1> AI Resume Analyzer</h1>

            <input type = "file" onChange={(e)=> setFile(e.target.files[0])}/>

            <button onClick ={uploadFile}> Upload</button>

            {loading && <p>Analyzing...</p>}

            <pre>{result}</pre>
        </div>
    );
}