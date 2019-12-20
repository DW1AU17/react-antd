import React, { useState, useEffect } from 'react'

export default function Hook() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        document.title = `Adu - ${count}`
    })

    return (
        <div>
            <div>hello 丽丽 {count} </div>
            <button onClick={() => setCount(count + 1)}>点击</button>
        </div>
    )
}


