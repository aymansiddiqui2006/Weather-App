import { BgContext } from "./BgContext";

import React, { useState } from 'react'

function BgContextProvider({ children }) {

    const [weather, setWeather] = useState("")

    return (
        <BgContext.Provider value={{ weather , setWeather}}>{children}</BgContext.Provider>
    )
}

export default BgContextProvider