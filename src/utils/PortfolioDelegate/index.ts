import ProjectList from '../../data/projects';

const getRandomBlogIndex = (min, max) => {
	const newMin = Math.ceil(min);
	const newMax = Math.floor(max);
	return Math.floor(Math.random() * (newMax - newMin + 1)) + newMin;
};

class PortfolioDelegate {
	projects = ProjectList;

	getProjectIndex = name => {
		const index = this.projects.findIndex(item => item.name === name);
		return index;
	};

	getNextProject = project => {
		const index = this.getProjectIndex(project);

		if (index + 1 > this.projects.length - 1) {
			return this.projects[0];
		}

		return this.projects[index + 1];
	};

	getNextBlog = (blogArray, title) => {
		const sortedBlogArray = blogArray.sort(
			(a, b) => new Date(b.node.date) - new Date(a.node.date)
		);

		const index = sortedBlogArray.findIndex(
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

	getPreviousBlog = (blogArray, title) => {
		const sortedBlogArray = blogArray.sort(
			(a, b) => new Date(b.node.date) - new Date(a.node.date)
		);

		const index = sortedBlogArray.findIndex(
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

	getMostPopularBlogs = (blogArray) => {
		return blogArray.filter(blog => blog.node.popularPost)
	}
}

export default PortfolioDelegate;