const throttle = (fn: any, threshold = 100) => {
// @ts-expect-error TS(7034): Variable 'last' implicitly has type 'any' in some ... Remove this comment to see the full error message
	let last;
// @ts-expect-error TS(7034): Variable 'timer' implicitly has type 'any' in some... Remove this comment to see the full error message
	let timer;

	return () => {
		const now = +new Date();
// @ts-expect-error TS(7005): Variable 'last' implicitly has an 'any' type.
		const timePassed = !!last && now < last + threshold;

		if (timePassed) {
// @ts-expect-error TS(7005): Variable 'timer' implicitly has an 'any' type.
			clearTimeout(timer);

			timer = setTimeout(() => {
				last = now;
				fn();
			}, threshold);
		} else {
			last = now;
			fn();
		}
	};
};

export default throttle;
