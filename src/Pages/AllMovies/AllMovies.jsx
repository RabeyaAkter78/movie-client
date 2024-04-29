import { useEffect, useState } from "react";

const AllMovies = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch('movies.json')
            .then(res => res.json())
            .then(data => {
                setMovies(data);
                console.log(data)
            })
    }, [])
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center">
            {movies.map((movie) => <div key={movie.imdbmovieid}>
                <div >
                    <div className="card card-compact w-96 bg-base-100 shadow-xl">
                        <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Shoes!</h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>)}


        </div>
    );
};

export default AllMovies;