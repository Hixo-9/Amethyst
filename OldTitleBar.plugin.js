/**
 * @name OldTitleBar
 * @author DevilBro
 * @authorId 278543574059057154
 * @version 1.8.7
 * @description Allows you to switch to Discord's old Titlebar
 * @invite Jx3TjNS
 * @donate https://www.paypal.me/MircoWittrien
 * @patreon https://www.patreon.com/MircoWittrien
 * @website https://mwittrien.github.io/
 * @source https://github.com/mwittrien/BetterDiscordAddons/tree/master/Plugins/OldTitleBar/
 * @updateUrl https://mwittrien.github.io/BetterDiscordAddons/Plugins/OldTitleBar/OldTitleBar.plugin.js
 */

module.exports = (_ => {
	const changeLog = {
		
	};

	return !window.BDFDB_Global || (!window.BDFDB_Global.loaded && !window.BDFDB_Global.started) ? class {
		constructor (meta) {for (let key in meta) this[key] = meta[key];}
		getName () {return this.name;}
		getAuthor () {return this.author;}
		getVersion () {return this.version;}
		getDescription () {return `The Library Plugin needed for ${this.name} is missing. Open the Plugin Settings to download it. \n\n${this.description}`;}
		
		downloadLibrary () {
			BdApi.Net.fetch("https://mwittrien.github.io/BetterDiscordAddons/Library/0BDFDB.plugin.js").then(r => {
				if (!r || r.status != 200) throw new Error();
				else return r.text();
			}).then(b => {
				if (!b) throw new Error();
				else return require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0BDFDB.plugin.js"), b, _ => BdApi.UI.showToast("Finished downloading BDFDB Library", {type: "success"}));
			}).catch(error => {
				BdApi.UI.alert("Error", "Could not download BDFDB Library Plugin. Try again later or download it manually from GitHub: https://mwittrien.github.io/downloader/?library");
			});
		}
		
		start () {
			if (!window.BDFDB_Global || !Array.isArray(window.BDFDB_Global.pluginQueue)) window.BDFDB_Global = Object.assign({}, window.BDFDB_Global, {pluginQueue: []});
			if (!window.BDFDB_Global.downloadModal) {
				window.BDFDB_Global.downloadModal = true;
				BdApi.UI.showConfirmationModal("Library Missing", `The Library Plugin needed for ${this.name} is missing. Please click "Download Now" to install it.`, {
					confirmText: "Download Now",
					cancelText: "Cancel",
					onCancel: _ => {delete window.BDFDB_Global.downloadModal;},
					onConfirm: _ => {
						delete window.BDFDB_Global.downloadModal;
						this.downloadLibrary();
					}
				});
			}
			if (!window.BDFDB_Global.pluginQueue.includes(this.name)) window.BDFDB_Global.pluginQueue.push(this.name);
		}
		start () {this.load();}
		stop () {}
		getSettingsPanel () {
			let template = document.createElement("template");
			template.innerHTML = `<div style="color: var(--header-primary); font-size: 16px; font-weight: 300; white-space: pre; line-height: 22px;">The Library Plugin needed for ${this.name} is missing.\nPlease click <a style="font-weight: 500;">Download Now</a> to install it.</div>`;
			template.content.firstElementChild.querySelector("a").addEventListener("click", this.downloadLibrary);
			return template.content.firstElementChild;
		}
	} : (([Plugin, BDFDB]) => {
		var _this;
		var patched, lastWindowRects;
		var titleBarButton;
		var toolbars = [];
		
		const OldTitleBarToolbarComponent = class OldTitleBarToolbar extends BdApi.React.Component {
			componentDidMount() {
				if (toolbars.indexOf(this) == -1) toolbars.push(this);
			}
			componentWillUnmount() {
				BDFDB.ArrayUtils.remove(toolbars, this, true);
			}
			render() {
				let children = [];
if (_this.settings.general.minimizeButton) children.push(BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.Clickable, {
	className: BDFDB.disCNS.channelheadericonwrapper + BDFDB.disCN.channelheadericonclickable,
	onClick: _ => BDFDB.LibraryModules.WindowUtils.minimize(),
	children: BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.SvgIcon, {
		className: BDFDB.disCN.channelheadericon,
		iconSVG: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22ZM15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H15C15.4142 11.25 15.75 11.5858 15.75 12Z" fill="#576074"/>
		</svg>`
	})
}));


if (_this.settings.general.maximizeButton) {
	const [isHovered, setIsHovered] = [false, false];

	children.push(BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.Clickable, {
		className: BDFDB.disCNS.channelheadericonwrapper + BDFDB.disCN.channelheadericonclickable,
		onMouseEnter: () => setIsHovered(true),
		onMouseLeave: () => setIsHovered(false),
		onClick: _ => _this.maximize(),
		children: BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.SvgIcon, {
			className: BDFDB.disCN.channelheadericon,
			iconSVG: isHovered
				? `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12C22 7.28595 22 4.92893 20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447ZM13.25 7C13.25 7.41421 13.5858 7.75 14 7.75H15.1893L12.9697 9.96967C12.6768 10.2626 12.6768 10.7374 12.9697 11.0303C13.2626 11.3232 13.7374 11.3232 14.0303 11.0303L16.25 8.81066V10C16.25 10.4142 16.5858 10.75 17 10.75C17.4142 10.75 17.75 10.4142 17.75 10V7C17.75 6.58579 17.4142 6.25 17 6.25H14C13.5858 6.25 13.25 6.58579 13.25 7ZM11.0303 14.0303C11.3232 13.7374 11.3232 13.2626 11.0303 12.9697C10.7374 12.6768 10.2626 12.6768 9.96967 12.9697L7.75 15.1893V14C7.75 13.5858 7.41421 13.25 7 13.25C6.58579 13.25 6.25 13.5858 6.25 14V17C6.25 17.4142 6.58579 17.75 7 17.75H10C10.4142 17.75 10.75 17.4142 10.75 17C10.75 16.5858 10.4142 16.25 10 16.25H8.81066L11.0303 14.0303Z" fill="#576074"></path>
				</svg>`

				: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M7.25007 2.38782C8.54878 2.0992 10.1243 2 12 2C13.8757 2 15.4512 2.0992 16.7499 2.38782C18.06 2.67897 19.1488 3.176 19.9864 4.01358C20.824 4.85116 21.321 5.94002 21.6122 7.25007C21.9008 8.54878 22 10.1243 22 12C22 13.8757 21.9008 15.4512 21.6122 16.7499C21.321 18.06 20.824 19.1488 19.9864 19.9864C19.1488 20.824 18.06 21.321 16.7499 21.6122C15.4512 21.9008 13.8757 22 12 22C10.1243 22 8.54878 21.9008 7.25007 21.6122C5.94002 21.321 4.85116 20.824 4.01358 19.9864C3.176 19.1488 2.67897 18.06 2.38782 16.7499C2.0992 15.4512 2 13.8757 2 12C2 10.1243 2.0992 8.54878 2.38782 7.25007C2.67897 5.94002 3.176 4.85116 4.01358 4.01358C4.85116 3.176 5.94002 2.67897 7.25007 2.38782ZM15 12C15 12.5523 15.4477 13 16 13C16.5523 13 17 12.5523 17 12L17.0001 8.50003C17.0001 7.67128 16.3281 7 15.5 7H12C11.4477 7 11 7.44772 11 8C11 8.55229 11.4477 9 12 9L15.0001 9L15 12ZM9 12C9 11.4477 8.55228 11 8 11C7.44772 11 7 11.4477 7 12V15.5C7 16.3284 7.67157 17 8.5 17H12C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15H9V12Z" fill="#576074"></path>
				</svg>`
		})
	}));
}

				if (_this.settings.general.closeButton) children.push(BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.Clickable, {
					className: BDFDB.disCNS.channelheadericonwrapper + BDFDB.disCN.channelheadericonclickable,
					onClick: _ => BDFDB.LibraryModules.WindowUtils.close(),
					children: BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.SvgIcon, {
						className: BDFDB.disCN.channelheadericon,
						iconSVG: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2Zm3.36 12.3c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22s-.38-.07-.53-.22l-2.3-2.3-2.3 2.3c-.15.15-.34.22-.53.22s-.38-.07-.53-.22a.754.754 0 0 1 0-1.06l2.3-2.3-2.3-2.3a.754.754 0 0 1 0-1.06c.29-.29.77-.29 1.06 0l2.3 2.3 2.3-2.3c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06l-2.3 2.3 2.3 2.3Z" fill="#576074"></path></svg>`

					})
				}));

				return !children.length ? null : BDFDB.ReactUtils.createElement("div", {
					className: BDFDB.disCN._oldtitlebartoolbar,
					children: [
						this.props.addFirstDivider && BDFDB.ReactUtils.createElement("div", {className: BDFDB.disCN.channelheaderdivider}),
						children
					].flat(10)
				});
			}
		};
		
		return class OldTitleBar extends Plugin {
			onLoad () {
				_this = this;

				this.defaults = {
					general: {
						addToSettings:		{value: true, 				description: "Adds a Titlebar to Settings Windows"},
						reloadButton:		{value: true, 				description: "Adds a Reload Button to the Titlebar"},
						minimizeButton:		{value: true, 				description: "Adds a Minimize Button to the Titlebar"},
						maximizeButton:		{value: true, 				description: "Adds a Resize/Maximize Button to the Titlebar"},
						closeButton:		{value: true, 				description: "Adds a Close Button to the Titlebar"}
					}
				};
			
				this.modulePatches = {
					before: [
						"HeaderBar",
						"HeaderBarDiscovery",
						"TitleBar"
					],
					after: [
						"AuthWrapper",
						"SettingsView"
					]
				};
				
				this.css = `
					${BDFDB.dotCN.app} {
						--custom-app-top-bar-height: 0px;
					}
					${BDFDB.dotCNS._oldtitlebarenabled + BDFDB.dotCN.titlebar},
					${BDFDB.dotCNS._oldtitlebarenabled + BDFDB.dotCN.titlebarthick},
					${BDFDB.dotCNS._oldtitlebarenabled + BDFDB.dotCN.authboxcharacterbackground}:before,
					${BDFDB.dotCNS._oldtitlebarenabled + BDFDB.dotCN.authboxsplashbackground}:before {
						display: none !important;
					}
					
					${BDFDB.dotCNS._oldtitlebarenabled + BDFDB.dotCN.guildswrapper} {
						margin-top: 0;
						padding-top: 0;
					}

					${BDFDB.dotCNS._oldtitlebarenabled + BDFDB.dotCN.guildsscroller} {
						padding-top: 4px;
					}
					
					${BDFDB.dotCNS._oldtitlebarenabled + BDFDB.dotCN.channelheaderheaderbar},
					${BDFDB.dotCNS._oldtitlebarenabled + BDFDB.dotCN.channelheaderdiscovery} {
						padding-right: 8px;
					}
					
					${BDFDB.dotCNS._oldtitlebarenabled + BDFDB.dotCN.channelheaderdiscoverysearchfloating} {
						position: static;
					}
					
					${BDFDB.dotCNS._oldtitlebarenabled + BDFDB.dotCN.settingswindowstandardsidebarview}:before {
						display: none;
					}
					
					${BDFDB.dotCN._oldtitlebartoolbar} {
						display: flex;
						flex: 1 0 auto;
						justify-content: flex-end;
						align-items: center;
					}
					
					${BDFDB.dotCN.titlebarthick} ~ * ${BDFDB.dotCNS._oldtitlebartoolbar + BDFDB.dotCN.channelheadericonwrapper} {
						--chat-input-icon-size: 24px;
						transform: scale(90%);
					}
					
					${BDFDB.dotCNS.chatthreadsidebaropen} > *:first-child ${BDFDB.dotCN._oldtitlebartoolbar} {
						display: none !important;
					}

					${BDFDB.dotCN._oldtitlebarsettingstoolbar} {
						display: flex;
						position: absolute;
						top: 0;
						right: 0;
						padding: 10px;
						z-index: 103;
						-webkit-app-region: drag !important;
					}
					.platform-win ${BDFDB.dotCN._oldtitlebarsettingstoolbar} {
						top: 22px;
					}
					
					${BDFDB.dotCNS._oldtitlebarenabled + BDFDB.dotCNS.authboxcharacterbackground + BDFDB.dotCN._oldtitlebarsettingstoolbar},
					${BDFDB.dotCNS._oldtitlebarenabled + BDFDB.dotCNS.authboxsplashbackground + BDFDB.dotCN._oldtitlebarsettingstoolbar} {
						background: rgba(0, 0, 0, 0.3);
						border-radius: 0 0 0 5px;
						top: 0;
					}

					${BDFDB.dotCN.channelheaderheaderbar},
					${BDFDB.dotCNS.channelheaderheaderbar + BDFDB.dotCN.channelheaderchildren},
					${BDFDB.dotCNS.channelheaderheaderbar + BDFDB.dotCN.channelheadertoolbar} {
						-webkit-app-region: drag !important;
					}

					${BDFDB.dotCNS.stopanimations + BDFDB.dotCN.channelheaderheaderbar},
					${BDFDB.dotCN.channelheaderheaderbar} * {
						-webkit-app-region: no-drag !important;
					}
				`;
			}
			
			onStart () {
				BDFDB.ListenerUtils.add(this, window, "resize", e => {
					BDFDB.ReactUtils.forceUpdate(toolbars);
				});

				BDFDB.DOMUtils.addClass(document.body, BDFDB.disCN._oldtitlebarenabled);

				BDFDB.DiscordUtils.rerenderAll();
			}
			
			onStop () {
				BDFDB.DiscordUtils.rerenderAll();

				BDFDB.DOMUtils.removeClassFromDOM(BDFDB.disCN._oldtitlebarenabled);
			}

			getSettingsPanel (collapseStates = {}) {
				let settingsPanel;
				return settingsPanel = BDFDB.PluginUtils.createSettingsPanel(this, {
					collapseStates: collapseStates,
					children: _ => {
						let settingsItems = [];
						
						for (let key in this.defaults.general) settingsItems.push(BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.SettingsSaveItem, {
							type: "Switch",
							plugin: this,
							keys: ["general", key],
							label: this.defaults.general[key].description,
							value: this.settings.general[key],
						}));
						
						return settingsItems;
					}
				});
			}

			onSettingsClosed () {
				if (this.SettingsUpdated) {
					delete this.SettingsUpdated;

					BDFDB.DiscordUtils.rerenderAll();
				}
			}
			
			processTitleBar (e) {
				titleBarButton = e.instance.props.trailing;
			}
			
			processHeaderBarDiscovery (e) {
				this.injectButtons(e.instance.props.children);
			}
			
			processHeaderBar (e) {
				if (e.instance.props.className && e.instance.props.className.indexOf("fullscreen") > -1) return;
				let wrapper = BDFDB.ReactUtils.findChild(e.instance, {props: ["toolbar", "children"]});
				if (!wrapper) return;
				let children = BDFDB.ArrayUtils.is(wrapper.props.toolbar) ? wrapper.props.toolbar : BDFDB.ObjectUtils.get(wrapper, "props.toolbar.props.children");
				if (!children) {
					children = [];
					wrapper.props.toolbar = [
						wrapper.props.toolbar,
						BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.Flex, {children})
					];
				}
				children.push(titleBarButton);
				this.injectButtons(children, true);
			}

			processAuthWrapper (e) {
				if (!BDFDB.ArrayUtils.is(e.returnvalue.props.children)) e.returnvalue.props.children = [e.returnvalue.props.children];
				this.injectSettingsToolbar(e.returnvalue.props.children, true);
			}

			processSettingsView (e) {
				if (!BDFDB.ArrayUtils.is(e.returnvalue.props.children)) e.returnvalue.props.children = [e.returnvalue.props.children];
				this.injectSettingsToolbar(e.returnvalue.props.children);
			}
			
			injectSettingsToolbar (children, fixed) {
				if (!this.settings.general.addToSettings) return;
				let toolbar = BDFDB.ReactUtils.createElement("div", {
					className: BDFDB.disCN._oldtitlebarsettingstoolbar,
					children: [],
					style: fixed ? {position: "fixed"} : null
				});
				this.injectButtons(toolbar.props.children);
				children.push(toolbar);
			}
			
			injectButtons (children, addFirstDivider) {
				children.push(BDFDB.ReactUtils.createElement(OldTitleBarToolbarComponent, {addFirstDivider: addFirstDivider}));
			}
			
			isMaximized () {
				let rects = this.getWindowRects();
				return rects.x == 0 && rects.y == 0 && this.isScreenSize(rects);
			}
			
			isScreenSize (rects) {
				return screen.availWidth - rects.width == 0 && screen.availHeight - rects.height == 0;
			}
			
			maximize () {
				if (!this.isMaximized()) {
					lastWindowRects = this.getWindowRects();
					BDFDB.LibraryModules.WindowUtils.maximize();
				}
				else {
					BDFDB.LibraryModules.WindowUtils.maximize();
					BDFDB.TimeUtils.timeout(_ => {
						if (!this.isMaximized()) return;
						if (!lastWindowRects || this.isScreenSize(lastWindowRects)) {
							let rects = this.getWindowRects();
							window.resizeTo(rects.width/2, rects.height/2);
							window.moveTo(rects.width/4, rects.height/4);
						}
						else {
							window.resizeTo(lastWindowRects.width, lastWindowRects.height);
							window.moveTo(lastWindowRects.x, lastWindowRects.y);
						}
					}, 100);
				}
			}
			
			getWindowRects () {
				return {x: window.screenX, y: window.screenY, width: window.outerWidth, height: window.outerHeight};
			}
		};
	})(window.BDFDB_Global.PluginUtils.buildPlugin(changeLog));
})();
