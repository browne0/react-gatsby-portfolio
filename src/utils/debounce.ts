// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
const debounce = (func: any, wait: any, immediate: any) => {
// @ts-expect-error TS(7034): Variable 'timeout' implicitly has type 'any' in so... Remove this comment to see the full error message
	let timeout;
	return () => {
		const context = this;
// @ts-expect-error TS(2304): Cannot find name 'arguments'.
		const args = arguments;
		const later = () => {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
// @ts-expect-error TS(7005): Variable 'timeout' implicitly has an 'any' type.
		const callNow = immediate && !timeout;
// @ts-expect-error TS(7005): Variable 'timeout' implicitly has an 'any' type.
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

export default debounce;
