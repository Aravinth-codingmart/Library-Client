import React, { useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { getAuthorsQuery, getBooksQuery } from "../queries/getQueries"
import { addBookMutation } from "../queries/addQueries";

const AddBook = () => {
    const [details, setDetails] = useState({
        name: "",
        genre: "",
        authorId: ""
    });
    const { loading, data } = useQuery(getAuthorsQuery)
    const [addBook, { data: addedBook }] = useMutation(addBookMutation, {
        refetchQueries: [getBooksQuery]
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const formSubmit = (e) => {
        e.preventDefault();
        console.log(details)
        addBook({ variables: details });
        setDetails({
            name: "",
            genre: "",
            authorID: ""
        })
    }
    return (
        <div>
            <form id="add-book" onSubmit={formSubmit}>
                <div className="field">
                    <label htmlFor="">Book Name</label>
                    <input type="text" name="name" onChange={handleChange} value={details.name} />
                </div>
                <div className="field">
                    <label htmlFor="">Genre</label>
                    <input type="text" name="genre" onChange={handleChange} value={details.genre} />
                </div>
                <div className="field">
                    <label htmlFor="">Author</label>
                    <select name="authorId" id="" onChange={handleChange}>
                        {
                            loading ?
                                <option value="" id="loading">Loading Authors...</option>
                                :
                                (
                                    <React.Fragment>
                                        <option disabled id="select">Select Author</option>
                                        {
                                            data && data.authors && data.authors.map((author, index) =>
                                                <option id={`${author.id}-${index}`} value={author.id}>{author.name}</option>
                                            )}
                                    </React.Fragment>
                                )
                        }
                    </select>
                </div>
                <button>+</button>
            </form>
        </div>
    )
}

export default AddBook;