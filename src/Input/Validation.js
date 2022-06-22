import {required} from "react-admin";

export const RequiredNotEmpty = [required()]//(message = 'Required') =>
    //value => (value !== null && value !== "") ? undefined : message;

export const FFRequired = value => (value ? undefined : 'Required')

export const ValidateArrayDuplicate = (key, values, parent) => {
    const errors = []
    if (values == null) {
        return undefined
    }
    let errorObj = {}
    errorObj[key] = "Duplicate Found"

    let map = new Map()
    for (const [i, v] of values.entries()) {
        //console.log(v)
        if (typeof v !== 'undefined' && key in v) {
            if (map.has(v[key])) {
                errors[i] = errorObj
                return errors
            } else {
                map.set(v[key], null)
            }
        }
    }

    return undefined
};


