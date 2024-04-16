import TextField from '@mui/material/TextField/TextField'
import { ChangeEvent, FC, useState } from 'react'

type EditableSpanPropsType = {
	value: string
	onChange: (newValue: string) => void
	className?: any
}

export const EditableSpan = ({
	value,
	onChange,
	className,
}: EditableSpanPropsType) => {
	let [editMode, setEditMode] = useState(false)
	let [title, setTitle] = useState(value)

	const activateEditMode = () => {
		setEditMode(true)
		setTitle(value)
	}
	const activateViewMode = () => {
		setEditMode(false)
		onChange(title)
	}
	const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}

	return editMode ? (
		<TextField
			variant='outlined'
			value={title}
			onChange={changeTitle}
			autoFocus
			onBlur={activateViewMode}
			className={className}
		/>
	) : (
		<span className={className} onDoubleClick={activateEditMode}>
			{value}
		</span>
	)
}
