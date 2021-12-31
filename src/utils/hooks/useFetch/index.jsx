import { useState, useEffect } from 'react'

export function useFetch(url){

    const [data, setData] = useState({});
    const [isDataLoading, setDataLoading] = useState(false);
    const [error, setError] = useState(false);
    
    // Using the fetch API on its own
    // useEffect(() => {
	//	   if(!url) return; // If no url is provided, stop there
    //     setDataLoading(true);
    //     fetch(url)
    //         .then((response) => response.json())
    //         .then(data => setData(data))
    //         .then(setDataLoading(false))
    //         .catch((error) => console.log(error))
    //     )
    // }, [url]);

    // Using async await
    useEffect(() => {
        if(!url) return; // If no url is provided, stop there
        setDataLoading(true);
        async function Fetch(){
            try{
                const response = await fetch(url);
                const data = await response.json();
                setData(data);
            }
            catch(err){
                console.log(err);
                setError(true);
            }
            finally{setDataLoading(false)}
        };
        Fetch()
    }, [url]);

    return {isDataLoading, data, error};
}