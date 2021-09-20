import { useQuery } from "@apollo/client";
import React from "react";
import { getBookQuery } from "../queries/getQueries";

const BookDetails = ({ bookId }) => {
    console.log(bookId);
    const { data, loading } = useQuery(getBookQuery, {
        variables: { id: bookId }
    });
    console.log(data)
    return (
        <div id="book-details">
            {
                loading ?
                    <p>Book details loading...</p>
                    :
                    data && data.book ?
                        <React.Fragment>
                            <p>Book Details here:</p>
                            <h4>Name: {data.book.name}</h4>
                            <h5>Genre: {data.book.genre}</h5>
                            <h5>Author: {data.book.author.name}</h5>
                            <p>All the books by this author</p>
                            <ul>
                                {
                                    data.book.author.books.map(book =>
                                        <li id={book.id}>{book.name}</li>
                                    )
                                }
                            </ul>
                        </React.Fragment> :
                        <p>No Book is selected</p>
            }
        </div>
    )
}

export default BookDetails;