import { ChangeEvent } from 'react'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'
import { FieldRenderProps } from 'react-final-form'

type Props = FieldRenderProps<string> & TextFieldProps

const CustomTextField = ({ input, onChange, meta, ...props }: Props) => {
  if (!input || !meta) {
    throw Error('Sorry my friend. Did you forget field from final form?')
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event)
    input.onChange(event)
  }

  return (
    <TextField
      {...input}
      {...props}
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
      onChange={handleChange}
      variant="outlined"
    />
  )
}

export default CustomTextField
