import { useReducer } from "react";

const init_inputState = {
	value: '',
	isTouched: false
}

const inputStateReducer = (state, action) => {
	if (action.type === 'INPUT') {
		return { value: action.value, isTouched: state.isTouched };
	}
	if (action.type === 'BLUR') {
		return { value: state.value, isTouched: true };
	}
	//if (action.type === 'RESET') {//필요X
		//return { isTouched: false, value: "" };
	//}
	return init_inputState;
};

const useInputReducer = (validateValue) => {
	const [inputState, dispatch] = useReducer(inputStateReducer, init_inputState);
	
	const isValid = validateValue(inputState.value);
	const hasError = !isValid && inputState.isTouched;

	const valueChangeHandler = (event) => {
		dispatch({type: 'INPUT', value: event.target.value})
	};

	const valueBlurHandler = (event) => {
		dispatch({type: 'BLUR'})
	};

	const reset = () => {
		dispatch({type: 'RESET'})
	};

	return {
		value: inputState.value,
		isValid,
		hasError,
		valueChangeHandler,
		valueBlurHandler,
		reset
	}
};

export default useInputReducer;