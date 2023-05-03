import ProjectList from '../../data/projects';

const getRandomBlogIndex = (min: any, max: any) => {
	const newMin = Math.ceil(min);
	const newMax = Math.floor(max);
	return Math.floor(Math.random() * (newMax - newMin + 1)) + newMin;
};

class PortfolioDelegate {
	projects = ProjectList;

// @ts-expect-error TS(7006): Parameter 'name' implicitly has an 'any' type.
	getProjectIndex = name => {
		const index = this.projects.findIndex(item => item.name === name);
		return index;
	};

// @ts-expect-error TS(7006): Parameter 'project' implicitly has an 'any' type.
	getNextProject = project => {
		const index = this.getProjectIndex(project);

		if (index + 1 > this.projects.length - 1) {
			return this.projects[0];
		}

		return this.projects[index + 1];
	};

// @ts-expect-error TS(7024): Function implicitly has return type 'any' because ... Remove this comment to see the full error message
	getNextBlog = (blogArray, title) => {
		const sortedBlogArray = blogArray.sort(
// @ts-expect-error TS(7006): Parameter 'a' implicitly has an 'any' type.
			(a, b) => new Date(b.node.date) - new Date(a.node.date)
		);

		const index = sortedBlogArray.findIndex(
// @ts-expect-error TS(7006): Parameter 'blog' implicitly has an 'any' type.
			blog => blog.node.title.title === title
		);

		if (index + 1 > sortedBlogArray.length - 1) {
			const rand = getRandomBlogIndex(0, sortedBlogArray.length - 1);
			if (rand === index || rand === index - 1) {
				return this.getNextBlog(blogArray, title);
			}
			return sortedBlogArray[rand].node;
		}

		return sortedBlogArray[index + 1].node;
	};

// @ts-expect-error TS(7024): Function implicitly has return type 'any' because ... Remove this comment to see the full error message
	getPreviousBlog = (blogArray, title) => {
		const sortedBlogArray = blogArray.sort(
// @ts-expect-error TS(7006): Parameter 'a' implicitly has an 'any' type.
			(a, b) => new Date(b.node.date) - new Date(a.node.date)
		);

		const index = sortedBlogArray.findIndex(
// @ts-expect-error TS(7006): Parameter 'blog' implicitly has an 'any' type.
			blog => blog.node.title.title === title
		);

		if (index - 1 < 0) {
			const rand = getRandomBlogIndex(0, sortedBlogArray.length - 1);
			if (rand === index || rand === index + 1) {
				return this.getPreviousBlog(blogArray, title);
			}
			return sortedBlogArray[rand].node;
		}

		return sortedBlogArray[index - 1].node;
	};

// @ts-expect-error TS(7006): Parameter 'blogArray' implicitly has an 'any' type... Remove this comment to see the full error message
	getMostPopularBlogs = (blogArray) => {
// @ts-expect-error TS(7006): Parameter 'blog' implicitly has an 'any' type.
		return blogArray.filter(blog => blog.node.popularPost)
	}
}

export default PortfolioDelegate;