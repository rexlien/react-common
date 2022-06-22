import React from "react"
import {TextField, Select, InputLabel} from '@material-ui/core'


export const FinalFormTextField = ({input: {name, onChange, value, ...restInput}, meta, ...rest}) => {
    const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched
    return(
        <div>
        <TextField fullWidth {...rest}
                   helperText={showError ? meta.error || meta.submitError : undefined}
                   error={showError}
                   name={name}
                   value={value}
                   inputProps={restInput}
                   onChange={onChange}
        />
        </div>
    )
}

export const FinalFormSelect = ({input: {name, onChange, value, ...restInput}, meta, label, ...rest}) => {
    const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched
    return (
        <div>
            <InputLabel>{label}</InputLabel>
            <Select fullWidth {...rest}
                    label={""}
                    error={showError}
                    name={name}
                    value={value}
                    inputProps={restInput}
                    onChange={onChange}
            />
        </div>
    )
}

