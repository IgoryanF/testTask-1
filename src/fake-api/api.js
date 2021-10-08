import data from "../data/data.json"

const api = {
    setData: (ms) => new Promise(((resolve, reject) => {
        setTimeout(() => {
            resolve(data)
        }, ms);
    }))

}

export default api