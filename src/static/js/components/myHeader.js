import { html, css, LitElement } from 'lit';
import '@material/web/tabs/tabs.js';
import '@material/web/tabs/primary-tab.js';
import '@material/web/switch/switch.js';
import '@material/web/elevation/elevation.js';

export class MyHeader extends LitElement {

	static properties = {
		title: { type: String },
		// activeTabIndex: { type: Number },
	};

	static styles = css`
		:host {
			z-index: 1;
			position: fixed;
			width: 100%;
			--md-elevation-level: 0;
			container-type: inline-size;
		}

		header {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			background-color: var(--md-sys-color-primary);
			color: var(--md-sys-color-on-primary);
		}

		#topItems {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 16px;
		}

		h1 {
			font-size: var(--md-sys-typescale-headline-large-font-size);
			font-weight: var(--md-sys-typescale-headline-large-font-weight);
			line-height: var(--md-sys-typescale-headline-large-line-height);
			letter-spacing: var(--md-sys-typescale-headline-large-letter-spacing);
			padding-left: 15px;
		}

		#rightItems {
			display: flex;
			align-items: center;
		}

		md-icon {
			font-size: 40px;
			width: 40px;
			height: 40px;
			margin: 5px 5px 0 0;
		}

		md-tabs {
			background-color: var(--md-sys-color-surface);
			padding-right: 60%;
			--md-elevation-level: 0;
		}

		#tabBarContainer {
			background-color: var(--md-sys-color-background);
		}

		@container (max-width: 600px) {
			h1 {
				padding-left: 0;
			}
			
			md-tabs {
				padding-right: 0;
			}
		}
	`;

	constructor() {
		super();
		this.title = "Title";
		// this.activeTabIndex = 0;
	}

	render() {
		return html`
			<header>
				<md-elevation></md-elevation>
				<div id="topItems">
					<h1>${this.title}</h1>
					<div id="rightItems">
						<label for="darkModeToggler">
							<md-icon>dark_mode</md-icon>
						</label>
						<md-switch id="darkModeToggler" aria-label="Toggle site dark mode"></md-switch>
					</div>
				</div>
				<md-tabs @change="${this._bubbleChange}" activeTabIndex=${this.activeTabIndex}>
					<slot></slot>
				</md-tabs>
			</header>
		`;
	};

	_bubbleChange(e) {
		const changeEvent = new Event('change', {
			bubbles: true,
			composed: true
		});
		changeEvent.activeTabIndex = e.target.activeTabIndex;
		this.dispatchEvent(changeEvent);
	}
}

customElements.define('my-header', MyHeader);