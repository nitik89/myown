import React, { useState,useContext, useEffect } from 'react'
import { signup } from '../apicalls/auth/authcalls';
import Base from '../basic/Base'


import { Link } from 'react-router-dom';
import { UserContext } from '../../App'
import { createEvent, getAllEventManagers } from '../apicalls/auth/eventcalls';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CreateEvents = () => {
const token=localStorage.getItem("jwt");
const user=JSON.parse(localStorage.getItem("user"))

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    participants:"",
    duration:"",
    datetime:"",
    photo: "",
    managers:[],
    event_manager: "",
    url:"",
  
    
    formData: ""
  });

  const {
    name,
    price,
    duration,
  managers,
url,
    event_manager,
    participants,
    datetime,
    formData
  } = values;

  const preload = () => {
    getAllEventManagers(user._id,token).then(users=>{
      
      setValues({ ...values,managers:users, formData: new FormData() });
    })
        
      
    
  };

  useEffect(() => {
    preload();
  }, []);

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createEvent( formData,user._id, token).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          participants:"",
          duration:"",
          datetime:"",
          photo: "",
         url:"",
          event_manager: "",
        });
      }
    });
  };

  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    console.log(formData.get(name));
    setValues({ ...values, [name]: value });
  };



  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="name"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          name="price"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("url")}
          type="url"
          name="url"
          className="form-control"
          placeholder="Url"
          value={url}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("event_manager")}
          className="form-control"
          placeholder="Event Manger"
          name="event_manager"
        >
          <option>Select</option>
          {
            managers.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.firstname}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("datetime")}
          type="datetime-local"
          name="datetime"
          className="form-control"
          placeholder="Date time"
          value={datetime}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("duration")}
          type="number"
          name="duration"
          className="form-control"
          placeholder="Duration"
          value={duration}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Create Product
      </button>
    </form>
  );

  return (
    <>
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
         
          {createProductForm()}
        </div>
      </div>
    </>
  );
};

export default CreateEvents;
