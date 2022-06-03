

const useGenres = (selectedgenres) =>{
    if(selectedgenres.length < 1) return "";

    const genreId = selectedgenres.map((g) =>g.id);
    return genreId.reduce((acc, curr)=>acc+','+curr); // reduce has two methods acc, curr so it is gonna make our array 1,2,3,4
};

export default useGenres;