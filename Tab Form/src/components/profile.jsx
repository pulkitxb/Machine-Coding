export default function Profile({ data, setData, errors }) {
    const { name, age, email } = data;

    function onChangeHandler(e, item) {
        setData(prevState => ({
            ...prevState,
            [item]: e.target.value
        }))
    }
    return (
        <div className="wrapper">
            <div>
                <label htmlFor="name">Name</label>
                <input name="name" id="text" value={name} onChange={(e) => onChangeHandler(e, 'name')} />
                {errors.name && <span className="error">{errors.name}</span>}
            </div>
            <div>
                <label htmlFor="age">Age</label>
                <input type="number" id="age" value={age} onChange={(e) => onChangeHandler(e, 'age')} />
                {errors.age && <span className="error">{errors.age}</span>}
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" value={email} onChange={(e) => onChangeHandler(e, 'email')} />
                {errors.email && <span className="error">{errors.email}</span>}
            </div>
        </div>
    )
}