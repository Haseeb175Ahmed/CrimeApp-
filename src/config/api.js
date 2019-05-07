import { promised, resolve, reject } from "q";


function searchData(crimecategory,policeforce)
{
    return new Promise((resolve,reject) =>
    {
        const Api = `https://data.police.uk/api/crimes-no-location?category=${crimecategory}&force=${policeforce}`;
console.log(Api)
        fetch(Api)
        .then(res => res.json())
        .then(res => {
            resolve(res);
        }).catch(e => {
            reject({
                message: "Error"
            })
        })
      
    })
}

function Police()
{
    return new Promise((resolve,reject) =>
    {
        fetch("https://data.police.uk/api/forces")
        .then(res => res.json())
        .then(res => {
            resolve(res);
        }).catch(e => {
            reject({
                message: "Error"
            })
        })
      
    })
}

function Crime()
{
    return new Promise((resolve,reject) =>
    {
        fetch("https://data.police.uk/api/crime-categories")
        .then(res => res.json())
        .then(res => {
            resolve(res);
        }).catch(e => {
            reject({
                message: "Error"
            })
        })
      
    })
}
export{
    searchData,
    Police,
    Crime
}


