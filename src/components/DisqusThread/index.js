import React, { Component } from 'react';
import PropTypes from 'prop-types'

class DisqusThread extends Component {
  constructor() {
    super()

    this.state = {
      flag: false
    }

    this.handleScroll = this.handleScroll.bind(this)
  }
  static propTypes = {
    /**
     * Your basename will be the base url for your page or blog. This must be provided otherwise the component will not be rendered
     */
    basename: PropTypes.string.isRequired,
    /**
     * Shortname is your unique identifier for your forum on Disqus. 
     * If this is left undefined, the disqus embedded item should not work.
     */
    shortname: PropTypes.string.isRequired,
    
    /**
     * Identfier tells the Disqus service how to identify your forum. 
     * The identifier is used to find the correct thread. 
     * If it is undefined, the page url will be used, which can sometimes be unreliable
     * 
     * The identifier can be anything to uniquely describe a Disqus instance, it can be:
     * - a number
     * - some sort of string
     * - a path to a specific url under your basename
     */
    identifier: PropTypes.string.isRequired,

    /**
     * The 'title' prop tells Disqus the title of the current page.
     * This is used when creating the thread on disqus for the first time.
     * If left alone, Disqus will use the title attibute on the document object.
     * If there is no title, it will use the URL of the page.
     */
    title: PropTypes.string,

    /**
     * The url tells the Disqus service the URL of the current page.
     * If left undefined, Disqus will use the window.location.href property.
     * This URL is used to look up or create a thread if disqus_identifier
     * is undefined. In addition, this URL is always saved when a thread is
     * being created so that Disqus knows what page a thread belongs to.
     */
    url: PropTypes.string,
    
    /**
     * `categoryId` tells the Disqus service the category to be used for
     * the current page. This is used when creating the thread on Disqus
     * for the first time.
     */
    categoryId: PropTypes.string,

    className: PropTypes.string
  }

  static defaultProps = {
    shortname: null,
    identifier: null,
    title: null,
    url: null,
    categoryId: null
  }

  shouldComponentUpdate(nextProps) {
    return this.props.identifier !== nextProps.identifier ||
      this.props.title !== nextProps.title ||
      this.props.url !== nextProps.url;
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
  

  handleScroll() {
    const rootHeight = document.getElementById('___gatsby').scrollHeight - document.body.clientHeight;
    const windowHeight = window.pageYOffset;
    if (this.state.flag === false && windowHeight > rootHeight - 427) {
      this.renderDisqus();
      this.setState({
        flag: true
      })
    }
  }

  componentDidUpdate() {
    this.renderDisqus();
  }
  

  renderDisqus() {
    if (this.props.basename && this.props.identifier) {
      if (window.DISQUS === undefined) {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://${this.props.shortname}.disqus.com/embed.js`;
        document.getElementsByTagName('head')[0].appendChild(script);
      } else {
        window.DISQUS.reset({reload: true});
      }
    }
  }

  render() {
    const { identifier, title, url, shortname, className } = this.props;

    if (process.env.BROWSER) {
      window.disqus_shortname = shortname;
      window.disqus_identifier = identifier;
      window.disqus_title = title;
      if (url) {
        window.disqus_url = url;        
      } else {
        window.disqus_url = window.location.href;
      }
    }

    return (
      <div className={className}>
        <div id="disqus_thread">
          <noscript>
            <span>
              Please enable JavaScript to view the
              <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
            </span>
          </noscript>
        </div>
      </div>
    );
  }
}

export default DisqusThread;