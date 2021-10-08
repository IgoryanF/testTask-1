import {configureStore} from "@reduxjs/toolkit";
import fakeDataReducer from "./fake-data-reducer"

const store = configureStore({
    reducer: {
        fakeDataReducer
    },
})

export default store;