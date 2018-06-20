import ProjectList from "../../data/projects";

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
    const sortedBlogArray = blogArray.sort((a, b) => new Date(b.node.date) - new Date(a.node.date));

    const index = sortedBlogArray.findIndex(blog => blog.node.title.title === title);

    if (index + 1 > sortedBlogArray.length - 1) {
      return null;
    }

    return sortedBlogArray[index + 1].node;
  };

  getPreviousBlog = (blogArray, title) => {
    blogArray = blogArray.sort((a, b) => new Date(b.node.date) - new Date(a.node.date));

    const index = blogArray.findIndex(blog => blog.node.title.title === title);

    if (index - 1 < 0) {
      return null;
    }

    return blogArray[index - 1].node;
  };
}

export default PortfolioDelegate;
