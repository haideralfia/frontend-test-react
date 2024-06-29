import React from 'react';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Button } from './components/ui/button';
import { FormEvent, useState } from 'react';

// Instructions for Candidate:
// 1. Add an input field to accept an email.
// 2. Add a button that passes the input value to the parent component.
// 3. In the parent component, add logic to send the value to a backend with a POST request to
// the following url https://webhook.site/6064735c-c7f2-4584-ba9d-1f0e80f32721. Along with the email, send your github username in the JSON.
// 4. Add styling to the button (Button) and input (Input) using the ShadCN Component library here: https://ui.shadcn.com/docs/components/input

const URL = 'https://webhook.site/6064735c-c7f2-4584-ba9d-1f0e80f32721/';

const gitUserId = 'haideralfia';

type userData = {
	email: string;
};

const DATA: FormData = {
	email: '',
};

interface propType {
	email: string;
	updateInput: (fields: userData) => void;
	handleSubmit: () => void;
}

const EmailForm = ({ email, updateInput, handleSubmit }: propType) => {
	return (
		<div className="">
			<form method="POST">
				<Label htmlFor="email">Email</Label>
				<Input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => updateInput({ email: e.target.value })}
					name="email"
				/>
				<Button
					className="btn bg-black text-white"
					type="submit"
					onClick={handleSubmit}
				>
					Submit
				</Button>
			</form>
		</div>
	);
};

export default function App() {
	const [val, setVal] = useState(DATA);
	function updateInput(fields: FormData) {
		setVal((prev) => {
			return { ...prev, ...fields };
		});
	}

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();
		// console.log(val);
		const data = {
			val,
			gitUserId,
		};
		// console.log(data);
		try {
			const response = await fetch(URL, {
				mode: 'no-cors',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			if (!response.ok) {
				throw new Error('Error is present');
			}
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<div className="grid xl:w-1/4 md:w-1/2 w-full max-w-sm m-72 items-center gap-2 space-x-2">
				<h1>Hello CodeSandbox</h1>
				<h2>Start editing to see some magic happen!</h2>
				<EmailForm
					updateInput={updateInput}
					handleSubmit={handleSubmit}
				/>
			</div>
		</>
	);
}
