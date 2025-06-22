import { useState } from "react"
import Interest from "./interest"
import Profile from "./profile"
import Setting from "./setting"
import { validate } from "graphql"

export default function TabForm() {
    const [activeTab, isActiveTab] = useState(0);
    const [data, setData] = useState({
        name: '',
        age: '',
        email: '',
        interest: ['coding'],
        theme: 'dark'
    })
    const [errors, setErrors] = useState({})

    const tabConfig = [
        {
            name: 'Profile',
            component: Profile,
            validate: () => {
                const err = {};
                if (!data.name || data.name.length < 2) {
                    err.name = "Name should more than 2 character";
                }
                if (!data.age || Number(data.age) < 18) {
                    err.age = "Age should be more than 18";
                }
                if (!data.email || data.email.length < 2) {
                    err.email = "Email should be more than 2 character";
                }
                setErrors(err);
                return err.name || err.age || err.email ? false : true;
            }
        },
        {
            name: 'Interest',
            component: Interest,
            validate: () => {
                const err = {};
                if (data.interest.length < 1) {
                    err.interest = "Select atleast 1 interest";
                }
                setErrors(err);
                return err.interest ? false : true
            }
        },
        {
            name: 'Setting',
            component: Setting,
            validate: () => {
                return true;
            }
        }
    ]

    function tabChangeHandler(index) {
        isActiveTab(index)
    }

    function prevHandler() { isActiveTab(prevTab => prevTab - 1) }
    function nextHandler() {
        console.log(tabConfig[activeTab].validate())
        if (!tabConfig[activeTab].validate()) {
            return;
        }
        isActiveTab(nextTab => nextTab + 1)
    }
    function onSubmitHandler() { console.log('Submitted') }

    const ActiveTabComponent = tabConfig[activeTab].component
    return (
        <div className="header-container">
            {tabConfig.map(({ name }, index) => <span key={name} className="header" onClick={() => tabConfig[activeTab].validate() && tabChangeHandler(index)}>{name}</span>)}
            {<ActiveTabComponent data={data} setData={setData} errors={errors} />}
            {activeTab > 0 && <button onClick={prevHandler}>Prev</button>}
            {activeTab < tabConfig.length - 1 && <button onClick={nextHandler}>Next</button>}
            {activeTab === tabConfig.length - 1 && <button onClick={onSubmitHandler}>Submit</button>}
        </div>
    )
}