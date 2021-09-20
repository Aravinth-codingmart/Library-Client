import React, { useState } from "react";
import { useQuery } from "@apollo/client"
import { getBooksQuery } from "../queries/getQueries";
import BookDetails from "./BookDetails";

function BookList() {
    const { loading, data } = useQuery(getBooksQuery);
    const [selected, setSelected] = useState(null);
    return (
        <div>
            <ul id="book-list">
                {
                    loading && <h4>Loading...</h4>
                }
                {
                    data && data.books &&
                    data.books.map(book =>
                        <li key={book.id} onClick={() => setSelected(book.id)} >{book.name}</li>
                    )
                }
            </ul>
            <BookDetails bookId={selected} />
        </div>
    );
}

export default BookList;
