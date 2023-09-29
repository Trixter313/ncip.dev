import { html, css, LitElement } from 'lit';
import '@shoelace-style/shoelace/dist/components/card/card.js';
import { IconButton } from "./iconButton.js";
import { TextButton } from "./textButton.js";
import '@shoelace-style/shoelace/dist/components/tag/tag.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import { SlTooltip } from "@shoelace-style/shoelace";

export class MyCard extends LitElement {

	static properties = {
		title: { type: String },
		region: { type: String },
		price: { type: Number },
		tags: { type: Array },
		description: { type: String },
		lastAccessed: { type: String },
		dataSize: { type: Number },
		downloadCount: { type: Number },
		citations: { type: Number },
		isBookmarked: { type: Boolean },
	};

	static styles = css`
		:host {
			color: var(--on-primary-color);
		}

		sl-card::part(base) {
			box-shadow: var(--sl-shadow-small);
			--border-radius: var(--sl-border-radius-x-large);
		}

		sl-card {
			min-width: 25rem;
			/* max-width: 800px; */
			margin-bottom: .75rem;
		}

		header {
			display: flex;
			justify-content: space-between;
		}

		img {
			width: 2.2rem;
			height: 2.2rem;
		}

		.dataType {
			color: var(--secondary-color);
			font-size: 28px;
			margin-right: 0.6rem;
			position: relative;
			top: 0.62rem;
		}

		h3 {
			width: 100%;
			font-size: 21px;
			position: relative;
			margin-top: 0.625rem;
			margin-bottom: 0.5rem;
		}

		h3 a {
			text-decoration: none;
			color: var(--secondary-color);
		}

		h3 a:hover{
			text-decoration: underline;
		}

		.region{
			display: flex;
			color: var(--secondary-color);
			font-size: 80%;
			justify-content: center;
		}

		.region sl-icon {
			margin-top: 0.22rem;
			margin-right: 0.25rem;
			font-size: 13px;
		}

		#bookmark {
			cursor: pointer;
			position: relative;
		}

		.bookmark-icon {
			font-size: 21px;
			color: var(--secondary-color);
			position: relative;
			left: 0.2em;
			top: -0.1em;
		}

		.card__price {
			margin-bottom: 0.5rem;
			font-size: 17px;
			font-weight: 600;
			text-align: center;
		}

		.subscription {
			margin-right: 1em;
		}

		.tags {
			display: flex;
			justify-content: center;
		}

		sl-tag {
			margin-right: 0.2em;
		}

		.card__description {
			font-size: 16px;
			letter-spacing: .004rem;
			margin-bottom: 0.5em;
		}

		footer {
			user-select: none;
			margin: auto;
			text-align: center;
		}

		.disabled {
			display: none;
		}
	`;

	constructor() {
		super();
		this.title = "Brain MRI Images for Brain Tumor Detection";
		this.region = "North-America";
		this.price = "350";
		this.tags = ['Federated', 'Verified Provider'];
		this.description = `This is a dataset's description. It explains initial information about the dataset that would be needed when browsing. It will be short and to the point; the full description is available on the preview page. In order to find out more information, please click on the data title.`;
		this.lastAccessed = "1/1/2020";
		this.dataSize = "1,403";
		this.downloadCount = "23,456";
		this.citations = "3,456";
		this.isBookmarked = false;
	}

	toggleIconFill() {
		const icons = this.renderRoot.querySelectorAll(".bookmark-icon");
		icons.forEach((icon) => icon.classList.toggle("disabled"));
	}

	render() {
		return html`
			<sl-card>
				<header>
					<sl-icon class="dataType" library="fa" name="fas-cloud"></sl-icon>
					<h3>
						<a href="/preview" target="_blank">${this.title}</a>
						<span class="region">
							<sl-icon library="fa" name="fas-location-dot"></sl-icon>
							${this.region}
						</span>
					</h3>
					<icon-button @click=${this.toggleIconFill} id="bookmark" title="Bookmark database">
						<sl-icon slot="icon" class="bookmark-icon" library="fa" name="far-bookmark" label="Add listing to favorites">
						</sl-icon>
						<sl-icon slot="icon" class="bookmark-icon disabled" library="fa" name="fas-bookmark"
							label="Remove listing from favorites"></sl-icon>
					</icon-button>
				</header>
				<div class="card__price">
					<span class="subscription">Annual cost: $350</span>
					<span class="buy">Buy data: $${this.price}</span>
				</div>
				<div class="tags">
					${this.tags.map((tag) =>
						html`<sl-tag size="medium" variant="primary" pill>${tag}</sl-tag>`
					)}
				</div>
				<p class="card__description">${this.description}</p>
				<footer>
					<sl-tooltip content="Date last used" placement="bottom">
						<text-button>
							<svg slot="icon" xmlns="http://www.w3.org/2000/svg" height="30" width="30">
								<path
									d="M12.333 13.292 9.333 10.229V5.917H10.583V9.75L13.229 12.396ZM10 16.938Q7.312 16.938 5.344 15.198Q3.375 13.458 3.104 10.792H4.333Q4.625 12.917 6.229 14.302Q7.833 15.688 10 15.688Q12.354 15.688 14.01 14.021Q15.667 12.354 15.667 10Q15.667 7.625 14.01 5.969Q12.354 4.312 9.979 4.312Q8.646 4.312 7.458 4.906Q6.271 5.5 5.479 6.542H7.521V7.792H3.521V3.625H4.771V5.417Q5.75 4.25 7.115 3.656Q8.479 3.062 9.979 3.062Q11.396 3.062 12.667 3.604Q13.938 4.146 14.885 5.094Q15.833 6.042 16.375 7.302Q16.917 8.562 16.917 9.979Q16.917 11.417 16.375 12.677Q15.833 13.938 14.885 14.885Q13.938 15.833 12.688 16.385Q11.438 16.938 10 16.938Z" />
							</svg>
							${this.lastAccessed}
						</text-button>
					</sl-tooltip>
					<sl-tooltip content="Database size" placement="bottom">
						<text-button>
							<svg slot="icon" xmlns="http://www.w3.org/2000/svg" height="30" width="30">
								<path
									d="M3.708 16.125Q3.125 16.125 2.688 15.688Q2.25 15.25 2.25 14.667V5.792Q2.25 5.208 2.708 4.75Q3.167 4.292 3.75 4.292H8.646L9.917 5.542H16.312Q16.854 5.542 17.229 5.927Q17.604 6.312 17.667 6.792H9.396L8.146 5.542H3.75Q3.646 5.542 3.573 5.615Q3.5 5.688 3.5 5.792V14.479Q3.5 14.562 3.542 14.615Q3.583 14.667 3.667 14.708L5.625 8.458H19.312L17.229 15.104Q17.083 15.562 16.729 15.844Q16.375 16.125 15.896 16.125ZM4.917 14.875H16L17.646 9.625H6.562ZM4.917 14.875 6.562 9.625 4.917 14.875ZM3.5 6.792V5.792Q3.5 5.688 3.5 5.615Q3.5 5.542 3.5 5.542V6.792Z" />
							</svg>
							${this.dataSize}
						</text-button>
					</sl-tooltip>
					<sl-tooltip content="Download count" placement="bottom">
						<text-button>
							<svg slot="icon" xmlns="http://www.w3.org/2000/svg" height="30" width="30">
								<path
									d="M10 12.896 6.458 9.375 7.354 8.5 9.375 10.521V3.771H10.625V10.521L12.646 8.5L13.542 9.375ZM5.417 16.021Q4.771 16.021 4.333 15.583Q3.896 15.146 3.896 14.521V12.396H5.146V14.521Q5.146 14.625 5.229 14.698Q5.312 14.771 5.417 14.771H14.583Q14.688 14.771 14.771 14.698Q14.854 14.625 14.854 14.521V12.396H16.104V14.521Q16.104 15.146 15.667 15.583Q15.229 16.021 14.583 16.021Z" />
							</svg>
							${this.downloadCount}
						</text-button>
					</sl-tooltip>
					<sl-tooltip content="Citation count" placement="bottom">
						<text-button>
							<svg slot="icon" xmlns="http://www.w3.org/2000/svg" height="30" width="30">
								<path
									d="M12.333 9.333H15.167V6.5H12.333ZM4.833 9.333H7.667V6.5H4.833ZM13.042 13.917 14.646 10.583H11.083V5.25H16.417V10.562L14.833 13.917ZM5.542 13.917 7.146 10.583H3.583V5.25H8.917V10.562L7.333 13.917ZM6.25 7.917ZM13.75 7.917Z" />
							</svg>
							${this.citations}
						</text-button>
					</sl-tooltip>
				</footer>
			</sl-card>
		`;
	};
}

// firstUpdated() {
// 	const modelIndicatorTooltip = this.renderRoot.querySelector(
// 		"#modelIndicatorTooltip"
// 	);
// 	const distributedIcon =
// 			this.renderRoot.querySelector("#distributedIcon");

// 	const federatedIcon =
// 			this.renderRoot.querySelector("#federatedIcon");
// 	if (this.modelType === "federated") {

// 		distributedIcon.classList.add("disabled");
// 		modelIndicatorTooltip.setAttribute(
// 			"content",
// 			"Federated learning model"
// 		);
// 	} else if (this.modelType === "distributed") {

// 		federatedIcon.classList.add("disabled");
// 		modelIndicatorTooltip.setAttribute(
// 			"content",
// 			"Distributed learning model"
// 		);
// 	}
// }

customElements.define('my-card', MyCard);