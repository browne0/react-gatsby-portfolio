import ProjectList from "../../data/projects";

class PortfolioDelegate {
  projects = ProjectList;

  getProjectIndex = name => {
    let index = this.projects.findIndex(item => item.name === name);
    return index;
  };

  getNextProject = project => {
    let index = this.getProjectIndex(project);

    if (index + 1 > this.projects.length - 1) {
      return this.projects[0];
    }

    return this.projects[index + 1];
  };

  getNextBlog = (blogArray, title) => {
    blogArray = blogArray.sort((a, b) => {
      return new Date(b.node.date) - new Date(a.node.date);
    });

    let index = blogArray.findIndex(blog => blog.node.title.title === title);

    if (index + 1 > blogArray.length - 1) {
      return null;
    }

    return blogArray[index + 1].node;
  };

  getPreviousBlog = (blogArray, title) => {
    blogArray = blogArray.sort((a, b) => {
      return new Date(b.node.date) - new Date(a.node.date);
    });

    let index = blogArray.findIndex(blog => blog.node.title.title === title);    

    if (index - 1 < 0) {
      return null;
    }


    return blogArray[index - 1].node;
  };
}

export default PortfolioDelegate;