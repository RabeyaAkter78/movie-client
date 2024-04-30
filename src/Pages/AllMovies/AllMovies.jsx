import { useEffect, useState } from "react";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";

const AllMovies = () => {
    const [movies, setMovies] = useState([]);
    const [showAllMovies, setShowAllMovies] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredMovies, setFilteredMovies] = useState([]);

    useEffect(() => {
        fetch('movies.json')
            .then(res => res.json())
            .then(data => {
                setMovies(data);
                // console.log(data)
            })
    }, []);

    const filterArrayByValue = (array, value) => {
        return array.filter(obj => {
            for (const key in obj) {
                if (Array.isArray(obj[key])) {
                    if (obj[key].includes(value)) {
                        return true;
                    }
                } else if (obj[key] === value) {
                    return true;
                }
            }
            return false;
        });
    }

    const filteredByValue = filterArrayByValue(movies, 'value');
    console.log(filteredByValue);

    const handleSearch = () => {
        const filteredByValue = filterArrayByValue(movies, searchTerm);
        setFilteredMovies(filteredByValue);
    };

    return (


        <div>
            <SectionTitle
                heading={"All Movies "}
            ></SectionTitle>
            <div className="my-8">
                <div>
                    <input
                        type="text"
                        placeholder="Search by value..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                    <div>
                        {filteredMovies.map((movie, index) => (
                            <div key={index}>
                                <p>{JSON.stringify(movie)}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-center items-center">
                {
                    // filteredByValue.map((movie) => (
                    (showAllMovies ? movies : movies.slice(0, 21)).map((movie, index) => (

                        <div key={movie.imdbmovieid} className="card card-compact w-72 shadow-xl">

                            <figure>
                                <img className="w-auto" src={movie.moviemainphotos} alt={movie.movietitle} />
                                <p>{index + 1}</p>
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title font-bold">Movie: {movie.movietitle}</h2>
                                <p>Imdb Moview Id: {movie.imdbmovieid}</p>
                                <div className="card-actions justify-end">
                                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                                    <button className="btn" onClick={() => document.getElementById('my_modal_5').showModal()}>View Details</button>
                                    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                        <div className="modal-box font-semibold">
                                            <img className="p-5 w-full" src={movie.moviemainphotos} alt={movie.movietitle} />
                                            <h3 className="font-bold text-lg">Movie Name: {movie.movietitle}</h3>
                                            <p className="py-4">Imdb ID: {movie.imdbmovieid}</p>
                                            <p className="py-4">Movie Language: {movie.movielanguages}</p>
                                            <p className="py-4">Movie Countries: {movie.moviecountries}</p>
                                            <p className="py-4">Movie Genre: {movie.moviegenres}</p>
                                            <div className="modal-action">
                                                <form method="dialog">
                                                    {/* if there is a button in form, it will close the modal */}
                                                    <button className="btn">Close</button>
                                                </form>
                                            </div>
                                        </div>
                                    </dialog>
                                </div>
                            </div>
                        </div>
                    ))}


            </div>
            <div className=" flex justify-center items-center">
                {!showAllMovies && (
                    <button
                        className="btn btn-primary w-96 mt-4 "
                        onClick={() => setShowAllMovies(true)}
                    >
                        View All
                    </button>
                )}
            </div>
        </div>

    );
};

export default AllMovies;


