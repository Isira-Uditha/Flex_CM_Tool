import React from "react"
const GuestList = (props) => {
    return (
        props.guestList.map((val, idx) => {
            console.log(val.url)
            let speaker = `speaker-${idx}`, url = `url-${idx}`
            return (
                <tr key={val.index}>
                    <td style={{width:"450px"}}>
                        <input
                            type="String"
                            name="speaker"
                            className="form-control"
                            data-id={idx}
                            id={speaker}
                            {...(val.speaker !== '' ? {defaultValue: val.speaker} : {})}
                        />
                    </td>
                    <td style={{width:"450px"}}>
                        <div className={"col-md-12"}>
                            <input
                                type="File"
                                className="form-control"
                                id={url}
                                data-id={idx}
                                name="url"
                            />
                        </div>
                    </td>
                    <td style={{textAlign:"left"}}>
                        {
                            idx===0?<button onClick={()=>props.add()} type="button" className="btn btn-primary text-center">Add</button>
                                : <button className="btn btn-danger" onClick={(() => props.delete(val))} >Remove</button>
                        }
                    </td>
                </tr >
            )
        })
    )
}
export default GuestList
