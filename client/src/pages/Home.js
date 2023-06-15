import React, { useState, useEffect, useContext } from 'react'
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { AutoComplete } from "primereact/autocomplete";

import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";

import ModelList from '../components/ModelList.jsx'
import DropdownMenu from '../components/Dropdown.jsx';


function Home() {

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <DropdownMenu />
            </div>
        </>
    )
}

export default Home
