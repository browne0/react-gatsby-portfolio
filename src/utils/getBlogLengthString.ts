const getBlogLengthString = (body: string) => {
	const blogLength = body
		.replace(/[^a-zA-Z0-9']+/g, ' ')
		.trim()
		.split(' ').length;
	return blogLength / 275 < 1
		? `${((blogLength / 275) * 60).toFixed()} SEC READ`
		: `${(blogLength / 275).toFixed()} MIN READ`;
};

export default getBlogLengthString;
