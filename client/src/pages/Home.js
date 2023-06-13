import React, { useState, useEffect, useContext } from 'react'
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';

function Home() {
    return (
        <motion.div>
            <Link to="/titanic">
                <motion.button className="p-1 m-1 bg-slate-300 border-2 border-black">
                    Titanic Survival Prediction
                </motion.button>
            </Link>
        </motion.div>
    )
}

export default Home
