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

	getPodcast = (blogArray, title) => {
		const sortedPodcastArray = blogArray
			.filter(blog => blog.node.podcast)
			.map(blog => blog.node)
			.sort((a, b) => new Date(b.date) - new Date(a.date));

		const index = sortedPodcastArray.findIndex(
			blog => blog.title.title === title
		);
		let rand;
		do {
			rand = getRandomBlogIndex(0, sortedPodcastArray.length - 1);
		} while (rand === index);

		return sortedPodcastArray[rand];
	};

	getBlogPost = (blogArray, title) => {
		const sortedBlogArray = blogArray
			.filter(blog => !blog.node.podcast)
			.map(blog => blog.node)
			.sort((a, b) => new Date(b.date) - new Date(a.date));

		const index = sortedBlogArray.findIndex(
			blog => blog.title.title === title
		);

		let rand;
		do {
			rand = getRandomBlogIndex(0, sortedBlogArray.length - 1);
		} while (rand === index);

		return sortedBlogArray[rand];
	};
}

export default PortfolioDelegate;
