import { v1 } from 'uuid'
import { FilterValuesType, TodolistType } from '../types/types'

export type RemoveTodolistActionType = {
	type: 'REMOVE-TODOLIST'
	id: string
}
export type AddTodolistActionType = {
	type: 'ADD-TODOLIST'
	title: string
	todolistId: string
}
export type ChangeTodolistTitleActionType = {
	type: 'CHANGE-TODOLIST-TITLE'
	id: string
	title: string
}
export type ChangeTodolistFilterActionType = {
	type: 'CHANGE-TODOLIST-FILTER'
	id: string
	filter: FilterValuesType
}

type ActionsType =
	| RemoveTodolistActionType
	| AddTodolistActionType
	| ChangeTodolistTitleActionType
	| ChangeTodolistFilterActionType

export const todolistsReducer = (
	state: Array<TodolistType>,
	action: ActionsType
) => {
	switch (action.type) {
		case 'REMOVE-TODOLIST':
			return state.filter(tl => tl.id != action.id)
		case 'ADD-TODOLIST':
			return [
				...state,
				{ id: action.todolistId, title: action.title, filter: 'all' },
			]
		case 'CHANGE-TODOLIST-TITLE': {
			const todolist = state.find(tl => tl.id === action.id)
			if (todolist) {
				todolist.title = action.title
			}
			return [...state]
		}
		case 'CHANGE-TODOLIST-FILTER': {
			const todolist = state.find(tl => tl.id === action.id)
			if (todolist) {
				todolist.filter = action.filter
			}
			return [...state]
		}
		default:
			throw new Error("I don't understand this type")
	}
}

export const RemoveTodolistAC = (
	todolistId: string
): RemoveTodolistActionType => {
	return { type: 'REMOVE-TODOLIST', id: todolistId }
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
	return { type: 'ADD-TODOLIST', title: title, todolistId: v1() }
}
export const ChangeTodolistTitleAC = (
	todolistId: string,
	title: string
): ChangeTodolistTitleActionType => {
	return { type: 'CHANGE-TODOLIST-TITLE', title: title, id: todolistId }
}
export const ChangeTodolistFilterAC = (
	todolistId: string,
	filter: FilterValuesType
): ChangeTodolistFilterActionType => {
	return { type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: todolistId }
}
