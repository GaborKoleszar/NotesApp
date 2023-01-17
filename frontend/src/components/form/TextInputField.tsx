import { Form } from "react-bootstrap"
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form"

interface TextInputFieldProps   {
    name: string,
    label: string,
    register: UseFormRegister<any>,
    registerOptions?: RegisterOptions,
    error?: FieldError,
    [x: string]: any,
}

export default function TextInputField({name, label, register, registerOptions, error, ...props} : TextInputFieldProps)  {
  return (
    <Form.Group className="mb-3" controlId={name + "-input"}>
        
    </Form.Group>
  )
}
