import React, {useEffect, useState} from "react";
import {useParams, useHistory} from "react-router-dom";
import axios from "axios";

const UpdateForm = props => {
    const initialUpdateData = {
        id: "",
        title: '',
        director: '',
        metascore: null,
        stars: []
    }
    const [updateData, setUpdateData] = useState(initialUpdateData);
    const {id} = useParams();
    const history = useHistory();

    const onChange = e => {
        let value = e.target.value;
        if(e.target.name === "stars") value = e.target.value.split(",");

        setUpdateData({
            ...updateData,
            [e.target.name]: value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`, updateData).then(({data})=>{
            setUpdateData(initialUpdateData)
            history.push("/");
        }).catch(err=>{
            console.log(err);
        });
    }

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/movies/${id}`).then(({data})=>{
            setUpdateData({
                ...data
            })
        }).catch(err=>{
            console.log(err);
        });
    }, []);

    console.log(updateData);

    return (
        <div className="update-movie">
            <h1>Update Movie</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor="title">
                    Title: <input onChange={onChange} type="text" name="title" value={updateData.title}/>
                </label>
                <label htmlFor="title">
                    Director: <input onChange={onChange} type="text" name="director" value={updateData.director}/>
                </label>
                <label htmlFor="title">
                    Metascore: <input onChange={onChange} type="text" name="metascore" value={updateData.metascore}/>
                </label>
                <label htmlFor="title">
                    Stars: <input onChange={onChange} type="text" name="stars" value={updateData.stars.join(",")}/>
                </label>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default UpdateForm;