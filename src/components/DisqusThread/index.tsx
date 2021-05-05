import React, { useEffect } from 'react';

type DisqusThreadProps = {
	/**
	 * Your basename will be the base url for your page or blog. This must be provided otherwise the component will not be rendered
	 */
	basename: string;
	/**
	 * Shortname is your unique identifier for your forum on Disqus.
	 * If this is left undefined, the disqus embedded item should not work.
	 */
	shortname: string;

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
	identifier: string;

	/**
	 * The 'title' prop tells Disqus the title of the current page.
	 * This is used when creating the thread on disqus for the first time.
	 * If left alone, Disqus will use the title attibute on the document object.
	 * If there is no title, it will use the URL of the page.
	 */
	title?: string;

	/**
	 * The url tells the Disqus service the URL of the current page.
	 * If left undefined, Disqus will use the window.location.href property.
	 * This URL is used to look up or create a thread if disqus_identifier
	 * is undefined. In addition, this URL is always saved when a thread is
	 * being created so that Disqus knows what page a thread belongs to.
	 */
	url?: string;

	/**
	 * `categoryId` tells the Disqus service the category to be used for
	 * the current page. This is used when creating the thread on Disqus
	 * for the first time.
	 */
	categoryId?: string;

	className?: string;
};

declare global {
	interface Window {
		DISQUS: {
			reset: (options: { reload: boolean }) => void;
		};
		disqus_shortname: string;
		disqus_identifier: string;
		disqus_title?: string;
		disqus_url?: string;
	}
}

const DisqusThread = (props: DisqusThreadProps) => {
	const [flag, setFlag] = React.useState(false);
	const renderDisqus = () => {
		if (props.basename && props.identifier) {
			if (window.DISQUS === undefined) {
				const script = document.createElement('script');
				script.async = true;
				script.src = `https://${props.shortname}.disqus.com/embed.js`;
				document.getElementsByTagName('head')[0].appendChild(script);
			} else {
				window.DISQUS.reset({ reload: true });
			}
		}
	};

	const handleScroll = () => {
		const rootHeight =
			(document.getElementById('___gatsby') as HTMLElement).scrollHeight -
			document.body.clientHeight;
		const windowHeight = window.pageYOffset;
		if (flag === false && windowHeight > rootHeight - 427) {
			renderDisqus();
			setFlag(true);
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [handleScroll]);

	const { identifier, title, url, shortname, className } = props;

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
						<a href="https://disqus.com/?ref_noscript">
							comments powered by Disqus.
						</a>
					</span>
				</noscript>
			</div>
		</div>
	);
};

export default DisqusThread;
