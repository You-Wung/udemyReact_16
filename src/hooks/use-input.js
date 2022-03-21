import { useState } from "react";

const useInput = (validateValue) => {
	const [value, setValue] = useState("");
	const [isTouched, setIsTouched] = useState(false);

	const isValid = validateValue(value);
	const hasError = !isValid && isTouched;

	const valueChangeHandler = (event) => {
		setValue(event.target.value);
	};

	const valueBlurHandler = (event) => {
		setIsTouched(true);
	};

	const reset = () => {
		setValue('');
		setIsTouched(false);
	};

	return {
		value,
		isValid,
		hasError,
		valueChangeHandler,
		valueBlurHandler,
		reset
	}
};

export default useInput;