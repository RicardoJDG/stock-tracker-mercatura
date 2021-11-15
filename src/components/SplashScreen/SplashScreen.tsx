import React, { useEffect, useState } from "react"
// import { CSSTransition } from 'react-transition-group';
import "./styles.css"
import ProgressBar from "./ProgressBar"
import SearchBar from "../Search/SearchBar"
import LogoColumn from "../Logo/LogoColumn"
// import { useSymbol } from "../../contexts/SymbolContext"

const SplashScreen = () => {
	const [progress, setProgress] = useState(0)
	// const { setSymbol } = useSymbol()

	const checkIfLoaded = () => {
		return sessionStorage.getItem("loaded") === "loaded"
	}

	useEffect(() => {
		if (progress < 100) {
			const progressIntervalId = setInterval(() => {
				setProgress((prev) => prev + 1)
			}, 20)

			return () => {
				clearInterval(progressIntervalId)
				if (progress === 99) {
					sessionStorage.setItem("loaded", "loaded")
				}
			}
		}
	}, [progress])

	return (
		<>
			{progress < 100 && !checkIfLoaded() ? (
				<div className="splashscreen">
					<ProgressBar completed={progress} />
				</div>
			) : (
				<>
					<LogoColumn alignment="center" />
					<div className="searchbar__container">
						<div className="grayborder" style={{ width: "100%" }}>
							<SearchBar />
						</div>
					</div>
				</>
			)}
		</>
	)
}

export default SplashScreen
