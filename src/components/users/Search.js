import { useState } from 'react'
import PropTypes from 'prop-types'

const Search = ({ showClear, clearUsers, clearUser, setAlert, searchUsers }) => {

    const [text, setText] = useState('');

    const onChange = (e) => {
        // this.setState({ [e.target.name]: e.target.value })
        setText(e.target.value);

    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (text === '') {
            setAlert('Please enter something', 'light')
        } else {
            searchUsers(text);
            setText('');
        }
    }

    const handleClick = () => {
        clearUsers();
        // clearUser();
    }

    return (
        <div>
            <form onSubmit={onSubmit} className="form">
                <input
                    type='text'
                    name='text'
                    placeholder='Search Users...'
                    value={text}
                    onChange={onChange}
                />

                <input
                    type='submit'
                    value='Search'
                    className='brn btn-dark btn-block'
                />
            </form>

            {showClear && (
                <button
                    className="btn btn-light btn-block"
                    onClick={handleClick}
                >Clear
                </button>
            )}
        </div>
    )
}

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
}

export default Search
