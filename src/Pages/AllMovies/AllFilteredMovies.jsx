import { useEffect, useState } from "react";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";

const AllFilteredMovies = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch('movies.json')
            .then(res => res.json())
            .then(data => {
                setMovies(data);
            })
    }, []);

    // Function to filter movies based on search term
    const filterMovies = () => {
        return movies.filter(movie => {
            // Check if any property (movielanguages, moviecountries, moviegenres) contains the search term (case-insensitive)
            return movie.movielanguages.some(language => language.toLowerCase().includes(searchTerm.toLowerCase())) ||
                movie.moviecountries.some(country => country.toLowerCase().includes(searchTerm.toLowerCase())) ||
                movie.moviegenres.some(genre => genre.toLowerCase().includes(searchTerm.toLowerCase()));
        });
    };

    // Function to handle search term change
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div>
            <SectionTitle heading={"Find Your Favourite Movies"}
                 />

            <div className="my-8">
                <label className="input input-bordered flex items-center gap-2">
                    <input type="text"
                        placeholder="Search movie"
                        value={searchTerm}
                        onChange={handleSearch} />
                </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-center items-center">
                {/* Map over filtered movies */}
                {filterMovies().map((movie) => (
                    <div key={movie.imdbmovieid} className="card card-compact w-72 h-96 shadow-xl shadow-slate-400">
                        <figure>
                            <img className="w-auto" src={movie.moviemainphotos} alt={movie.movietitle} />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title font-bold">Movie: {movie.movietitle}</h2>
                            <p>Imdb Moview Id: {movie.imdbmovieid}</p>
                            <div className="card-actions justify-end">
                                {/* Open the modal using document.getElementById('ID').showModal() method */}
                                <button className="btn btn-outline border-0 border-b-4 btn-error " onClick={() => document.getElementById('my_modal_5').showModal()}>View Details</button>
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
        </div>
    );
};

export default AllFilteredMovies;