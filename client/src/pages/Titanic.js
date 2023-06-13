import React, { useState, useEffect, useContext } from 'react'
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';

function Titanic() {

    const [data, setData] = useState()
    const [afterReq, setAfterReq] = useState(false)

    const handleTitanicSubmit = (event) => {
        event.preventDefault(); // Prevent form submission and page refresh

        const inputData = {
            Pclass: +event.target.elements.Pclass.value,
            Sex: event.target.elements.Sex.value,  // Include the "Sex" key
            Age: +event.target.elements.Age.value,
            SibSp: +event.target.elements.SibSp.value,
            Parch: +event.target.elements.Parch.value,
            Fare: +event.target.elements.Fare.value,
            Embarked_C: +event.target.elements.Embarked_C.value,
            Embarked_Q: +event.target.elements.Embarked_Q.value,
            Embarked_S: +event.target.elements.Embarked_S.value,
        };


        fetch("/TitanicPredictionKNN", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' //Explicitly specify content type
            },
            body: JSON.stringify(inputData)
        })
            .then(res => res.json())
            .then(data => {
                setData(data)
                setAfterReq(true)
                console.log(data)
            }
            )
    }

    return (
        <motion.div>
            <form onSubmit={handleTitanicSubmit}>
                <motion.div>
                    <label>
                        Pclass
                    </label>
                    <input className="p-1 m-1 border-2 border-slate-400 rounded-md active:border-slate-900" type="text" name="Pclass" />
                    <br />

                    <label>
                        Sex
                    </label>
                    <input className="p-1 m-1 border-2 border-slate-400 rounded-md active:border-slate-900" type="text" name="Sex" />
                    <br />

                    <label>
                        Age
                    </label>
                    <input className="p-1 m-1 border-2 border-slate-400 rounded-md active:border-slate-900" type="text" name="Age" />
                    <br />

                    <label>
                        SibSp
                    </label>
                    <input className="p-1 m-1 border-2 border-slate-400 rounded-md active:border-slate-900" type="text" name="SibSp" />
                    <br />

                    <label>
                        Parch
                    </label>
                    <input className="p-1 m-1 border-2 border-slate-400 rounded-md active:border-slate-900" type="text" name="Parch" />
                    <br />

                    <label>
                        Fare
                    </label>
                    <input className="p-1 m-1 border-2 border-slate-400 rounded-md active:border-slate-900" type="text" name="Fare" />
                    <br />

                    <label>
                        Embarked_C
                    </label>
                    <input className="p-1 m-1 border-2 border-slate-400 rounded-md active:border-slate-900" type="text" name="Embarked_C" />
                    <br />

                    <label>
                        Embarked_Q
                    </label>
                    <input className="p-1 m-1 border-2 border-slate-400 rounded-md active:border-slate-900" type="text" name="Embarked_Q" />
                    <br />

                    <label>
                        Embarked_S
                    </label>
                    <input className="p-1 m-1 border-2 border-slate-400 rounded-md active:border-slate-900" type="text" name="Embarked_S" />
                    <br />

                    <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4 mx-20"
                        type="submit"
                        value="Submit"
                    />

                </motion.div>
            </form>

            <motion.div>
                {data && afterReq && "You Survived!"}
                {!data && afterReq && "DED 💀"}
            </motion.div>
        </motion.div>
    )
}

export default Titanic
