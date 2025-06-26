import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const PAGE_SIZE = 6;
export default function Pagination() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    const fetchData = async function () {
        const response = await fetch('https://dummyjson.com/products?limit=200');
        const { products } = await response.json();
        setProducts(products);
    }

    useEffect(() => {
        fetchData();
    }, [])

    const totalProducts = products.length;
    const noOfPage = Math.ceil(totalProducts / PAGE_SIZE);
    const start = currentPage * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    const prevPageHandler = function () {
        if (currentPage > 0) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    }

    const nextPageHandler = function () {
        if (currentPage < noOfPage - 1) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    }

    const pageHandler = function (page) {
        setCurrentPage(page);
    }



    return (
        <div>
            <h1>Pagination</h1>
            <div>
                {products.length === 0 && <h1>Loading...</h1>}
                {products.length > 0 && (
                    <div className="container">
                        {products.slice(start, end).map(({ id, title, thumbnail }) => (
                            <ProductCard key={id} title={title} thumbnail={thumbnail} />
                        ))}
                    </div>
                )}
            </div>
            <div className="wrapper">
                <span className="btn" onClick={prevPageHandler}>⏪</span>
                {[...new Array(noOfPage)].map((_, i) => <span className={`btn ${i == currentPage ? 'active' : ''}`} onClick={() => pageHandler(i)}>{i + 1}</span>)}
                <span className="btn" onClick={nextPageHandler}>⏭️</span>
            </div>
        </div>
    )
}