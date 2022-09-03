const DOMStrings = {
    hamburgerMenuButton: document.querySelector('.hamburger-menu__button'),
    menu: document.querySelector('.menu'),
    menuWrap: document.querySelector('.menu__wrap'),
    menuItem: '',
    menuSubmenu: '',
    menuSubmenuWrap: ''
}

class Event {
    // When we click outside the menu, or the elements with classes 'menu__target', we reset the menu to it's
    // default state.
    static notMenuTarget() {
        window.addEventListener('click', function(event) {
            const menuTarget = event.target.classList.contains('menu__target')
            if (!menuTarget) { UI.resetMenu() }
        })
    }

    // Clicking a menu will show it's submenu. We loop through each element with class 'menu__item' and attached
    // a click event to the current element clicked 'i'. We add classes from our sass to show the submenu.
    static showMenuSubmenu() {
        for (let i = 0; i < DOMStrings.menuItem.length; i++) {
            DOMStrings.menuItem[i].addEventListener('click', function() {
                UI.resetMenu() // We need to reset the menu first.
                DOMStrings.menuSubmenu[i].classList.add('menu__submenu-active')
                DOMStrings.menuItem[i].classList.add('menu__item-active')
            })
        }
    }

    // Clicking the hamburger menu.
    static toggleMenu() {
        DOMStrings.hamburgerMenuButton.addEventListener('click', function() {
            DOMStrings.hamburgerMenuButton.classList.toggle('hamburger-menu__button-active')
            DOMStrings.menu.classList.toggle('menu__active')
        })
    }
}

class UI {
    static resetMenu() {
        for (let i = 0; i < DOMStrings.menuItem.length; i ++) {
            DOMStrings.menuSubmenu[i].classList.remove('menu__submenu-active')
            DOMStrings.menuItem[i].classList.remove('menu__item-active')
        }
    }

    // Constructing the template literal for the menu and it's submenu.
    static displayMenu() {
        // For the menu.
        let menuHTML = ''
        for (let i = 0; i < settings.navmenu.length; i++) {
            menuHTML += `
            <div class="menu__item menu__target">
                <div class="menu__link-and-icon menu__target">
                    <a class="menu__link menu__target">${settings.navmenu[i].name}</a>
                    <svg class="menu__link-down-icon menu__target" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 26">
                        <g class="menu__target" id="icon-down-arrow" transform="translate(-8550 2434)">
                            <g class="menu__target" id="Group_175" data-name="Group 175" opacity="0">
                                <rect class="menu__target" id="Rectangle_84" data-name="Rectangle 84" width="24" height="26" transform="translate(8550 -2434)" fill="#fff"/>
                                <rect class="menu__target" id="Rectangle_85" data-name="Rectangle 85" width="20" height="18" transform="translate(8552 -2430)" fill="#d58484"/>
                            </g>
                            <path class="menu__target" id="chevron-up" d="M106.618,171.475a1.428,1.428,0,0,1-1.012-.417L98.047,163.5l-7.559,7.559a1.427,1.427,0,1,1-2.018-2.018l8.571-8.571a1.423,1.423,0,0,1,2.018,0l8.571,8.571a1.426,1.426,0,0,1-1.012,2.434Z" transform="translate(8660.05 -2255.521) rotate(180)"/>
                        </g>
                    </svg>
                </div>
                <div class="menu__submenu">
                    <div class="menu__submenu-wrap"></div>
                </div>
            </div>
            `
        }
        DOMStrings.menuWrap.innerHTML = menuHTML
        DOMStrings.menuItem = document.querySelectorAll('.menu__item')
        DOMStrings.menuSubmenu = document.querySelectorAll('.menu__submenu')
        DOMStrings.menuSubmenuWrap = document.querySelectorAll('.menu__submenu-wrap')

        // For the submenu.
        let menuSubmenuHTML = ''
        for (let i = 0; i < settings.navmenu.length; i++) {
            for (let j = 0; j < settings.navmenu[i].submenu.length; j++) {
                menuSubmenuHTML += `
                    <div class="menu__submenu-item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 26">
                            <g id="icon-play" transform="translate(-8569 2504)">
                                <g id="Group_179" data-name="Group 179" opacity="0">
                                <rect id="Rectangle_81" data-name="Rectangle 81" width="24" height="26" transform="translate(8569 -2504)" fill="#fff"/>
                                <rect id="Rectangle_82" data-name="Rectangle 82" width="20" height="18" transform="translate(8571 -2500)" fill="#d58484"/>
                                </g>
                                <path id="Union_2" data-name="Union 2" d="M129.493-135.378a1.2,1.2,0,0,1-.464-.737l-.028.02-.016-15.734.03.021a1.17,1.17,0,0,1,.478-.814,1.978,1.978,0,0,1,2.325,0l9.872,7.714a1.1,1.1,0,0,1,0,1.817l-9.872,7.714a1.9,1.9,0,0,1-1.165.378A1.883,1.883,0,0,1,129.493-135.378Z" transform="translate(8445.016 -2347)"/>
                            </g>
                        </svg>
                        <a href="#" class="menu__submenu-item-link">${settings.navmenu[i].submenu[j].name}</a>
                    </div>
                `
            }
            DOMStrings.menuSubmenuWrap[i].innerHTML = menuSubmenuHTML
            menuSubmenuHTML = ''
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    UI.displayMenu()
    Event.toggleMenu()
    Event.showMenuSubmenu()
    Event.notMenuTarget()
})