//eslint-disable-next-line
import useInput from "../hooks/use-input";
import useInputReducer from "../hooks/use-inputReducer";

//커스텀훅와 일반함수와의 차이점
// 일반함수안에서는 훅을 못쓴다.

const SimpleInput = (props) => {
  const {
		value: name,
    isValid: enteredNameIsValid,
		hasError: nameInputHasError,
		valueChangeHandler: nameChangeHandler,
		valueBlurHandler: nameBlurHandler,
    reset: resetName,
	} = useInputReducer(value => value.trim() !== '');

  const {
    value: email,
    isValid: enteredEmailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInputReducer(value => value.includes('@'));


	let formValid = false;
	if (enteredNameIsValid && enteredEmailIsValid) formValid = true;
	else formValid = false;

	const formSubmissionHandler = (event) => {
		event.preventDefault();

		if (!enteredNameIsValid) return;
		resetName();
    resetEmail();
	};

	const nameInputClasses = nameInputHasError
		? "form-control invalid"
		: "form-control";

	const emailInputClasses = emailHasError
		? "form-control invalid"
		: "form-control";

	return (
		<form onSubmit={formSubmissionHandler}>
			<div className={nameInputClasses}>
				<label htmlFor="name">Your Name</label>
				<input
					type="text"
					id="name"
					onChange={nameChangeHandler}
					onBlur={nameBlurHandler}
					value={name}
				/>
				{nameInputHasError && (
					<p className="error-text">Name must not be empty.</p>
				)}
			</div>
			<div className={emailInputClasses}>
				<label htmlFor="email">Your e-mail</label>
				<input
					type="email"
					id="email"
					onChange={emailChangeHandler}
					onBlur={emailBlurHandler}
					value={email}
				/>
				{emailHasError && (
					<p className="error-text">Please enter a valid email.</p>
				)}
			</div>
			<div className="form-actions">
				<button disabled={!formValid}>Submit</button>
			</div>
		</form>
	);
};

export default SimpleInput;
