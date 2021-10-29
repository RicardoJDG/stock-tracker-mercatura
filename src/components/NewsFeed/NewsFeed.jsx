import React from "react"
import { useEffect, useState } from "react"
import { requestNews } from "./services"
import convertMillisecondsToNewsFeedTime from "../../utils/convertMillisecondsToNewsFeedTime"
import "./styles.css"
import { useSymbol } from "../../contexts/SymbolContext"

function NewsFeed() {
	const [articles, setArticles] = useState(null)
	const { symbol } = useSymbol()

	useEffect(() => {
		requestNews(symbol).then((news) => {
			setArticles(news)
		})
	}, [symbol])

	if (articles) {
		return (
			<div className="newsfeed__background">
				<h2 className="latest-news-text">Latest News</h2>
				{articles.length
					? articles.map((article) => {
							return (
								<NewsArticle
									key={article.headline}
									link={article.url}
									content={article.headline}
									timeSincePublication={600000}
									source={article.source}
								/>
							)
					  })
					: "ERROR LOADING NEWS"}
			</div>
		)
	} else {
		return null
	}
}

function NewsArticle({ link, content, timeSincePublication, source }) {
	const timeString = convertMillisecondsToNewsFeedTime(timeSincePublication)

	return (
		<div className="article">
			<a href={link}>
				<h3 className="article__content">{content}</h3>
			</a>
			<p className="article__time-source">{`${timeString} - ${source}`}</p>
		</div>
	)
}

export default NewsFeed
