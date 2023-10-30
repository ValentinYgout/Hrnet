import React, { useState } from 'react';
import "./style.css";
import Modal from 'modal-vy2';


import Dropdown from '../../components/Dropdown';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addEmployeeData } from '../../employeeSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const CreateEmployee = () => {

    const dispatch = useDispatch();


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [employeeData,setEmployeeData] = useState({

            firstName: '',
            lastName: '',
            dateOfBirth: '',
            startDate: '',
            street: '',
            city: '',
            state: '',
            zipCode: '',
            department: 'Sales', // Default department
        });

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    // Function to handle form submission
    const saveEmployee = (e) => {
        e.preventDefault();

        // Ensure dateOfBirth and startDate are serializable
        const serializableEmployeeData = {
            ...employeeData,
            dateOfBirth: employeeData.dateOfBirth
                ? employeeData
                    .dateOfBirth
                    .toString()
                : null,
            startDate: employeeData.startDate
                ? employeeData
                    .startDate
                    .toString()
                : null
        };
        console.log(serializableEmployeeData)
        dispatch(addEmployeeData(serializableEmployeeData));

        // Reset to default
        setEmployeeData({
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            startDate: '',
            street: '',
            city: '',
            state: '',
            zipCode: '',
            department: 'Sales'
        });
        // Show a confirmation message or make an API call to save the data
        toggleModal();
    };

    return (

        <div className="container">


            <div className="title">
                <h1>HRnet</h1>
            </div>

            <Link to="/employee-list">View Current Employees</Link>
            <h2>Create Employee</h2>
            <form onSubmit={saveEmployee} autoComplete="off">
                <label htmlFor="first-name">First Name</label>
                <input
                    required
                    type="text"
                    id="first-name"
                    value={employeeData.firstName}
                    onChange={(e) => setEmployeeData({
                        ...employeeData,
                        firstName: e.target.value
                    })} />

                <label htmlFor="last-name">Last Name</label>
                <input
                    required
                    type="text"
                    id="last-name"
                    value={employeeData.lastName}
                    onChange={(e) => setEmployeeData({
                        ...employeeData,
                        lastName: e.target.value
                    })} />
                <label htmlFor="date-of-birth">Date of birth</label>
                <DatePicker
                    required
                    selected={employeeData.dateOfBirth}
                    id="date-of-birth"
                    showMonthDropdown
                    showYearDropdown
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                        setEmployeeData({
                            ...employeeData,
                            dateOfBirth: date
                        });
                    }} />
                <label htmlFor="start-date">Start Date</label>
                <DatePicker required selected={employeeData.startDate} id="start-date" showMonthDropdown showYearDropdown dateFormat="dd/MM/yyyy" // Specify the desired date format
                    onChange={(date) => {
                        setEmployeeData({
                            ...employeeData,
                            startDate: date
                        });
                    }} /> {/* Address Fields */}
                <fieldset className="address">
                    <legend>Address</legend>
                    <label htmlFor="street">Street</label>
                    <input
                        required
                        type="text"
                        id="street"
                        value={employeeData.street}
                        onChange={(e) => setEmployeeData({
                            ...employeeData,
                            street: e.target.value
                        })} />

                    <label htmlFor="city">City</label>
                    <input
                        required
                        type="text"
                        id="city"
                        value={employeeData.city}
                        onChange={(e) => setEmployeeData({
                            ...employeeData,
                            city: e.target.value
                        })} /> {/*
          <label htmlFor="state">State</label>
          <select
            name="state"
            id="state"
            value={employeeData.state}
            onChange={(e) =>
              setEmployeeData({
                ...employeeData,
                state: e.target.value,
              })
            }
          >
            <option>State 1</option>
            <option>State 2</option>
            <option>State 3</option>
          </select> */}

                    <Dropdown
                        required
                        label="state"
                        options={[
                            "Alabama",
                            "Alaska",
                            "American Samoa",
                            "Arizona",
                            "Arkansas",
                            "California",
                            "Colorado",
                            "Connecticut",
                            "Delaware",
                            "District Of Columbia",
                            "Federated States Of Micronesia",
                            "Florida",
                            "Georgia",
                            "Guam",
                            "Hawaii",
                            "Idaho",
                            "Illinois",
                            "Indiana",
                            "Iowa",
                            "Kansas",
                            "Kentucky",
                            "Louisiana",
                            "Maine",
                            "Marshall Islands",
                            "Maryland",
                            "Massachusetts",
                            "Michigan",
                            "Minnesota",
                            "Mississippi",
                            "Missouri",
                            "Montana",
                            "Nebraska",
                            "Nevada",
                            "New Hampshire",
                            "New Jersey",
                            "New Mexico",
                            "New York",
                            "North Carolina",
                            "North Dakota",
                            "Northern Mariana Islands",
                            "Ohio",
                            "Oklahoma",
                            "Oregon",
                            "Palau",
                            "Pennsylvania",
                            "Puerto Rico",
                            "Rhode Island",
                            "South Carolina",
                            "South Dakota",
                            "Tennessee",
                            "Texas",
                            "Utah",
                            "Vermont",
                            "Virgin Islands",
                            "Virginia",
                            "Washington",
                            "West Virginia",
                            "Wisconsin",
                            "Wyoming"
                        ]}
                        value={employeeData.state}
                        onChange={(e) => {
                            setEmployeeData({
                                ...employeeData,
                                state: e.target.value
                            });
                        }} />

                    <label htmlFor="zip-code">Zip Code</label>
                    <input
                        required
                        type="number"
                        id="zip-code"
                        value={employeeData.zipCode}
                        onChange={(e) => setEmployeeData({
                            ...employeeData,
                            zipCode: e.target.value
                        })} />
                </fieldset>

                <Dropdown
                    required
                    label="department"
                    options={["Sales", "Marketing", "Engineering", "Human Resources", "Legal"]}
                    onChange={(e) => {
                        setEmployeeData({
                            ...employeeData,
                            department: e.target.value
                        });
                    }} />

                <button type="submit">Save</button>
            </form>

            <Modal isOpen={isModalOpen} onClose={toggleModal} content="Employee Created!" darkmode={false} />
        </div>
    );
}

export default CreateEmployee;