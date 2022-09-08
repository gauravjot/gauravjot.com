import React from 'react'

export default function ThemeToggle() {
    let toggleBtn = React.useRef();

    const enableDarkMode = () => {
        document.body.classList.add("darkmode")
        localStorage.setItem("darkMode","enabled");
        toggleBtn.current.classList.add("enabled")
    }

    const disableDarkMode = () => {
        document.body.classList.remove("darkmode")
        localStorage.setItem("darkMode","disabled");
        toggleBtn.current.classList.remove("enabled")
    }

    const toggle = () => {
        let darkMode = localStorage.getItem("darkMode")
        if (darkMode !== 'enabled') {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    }

    React.useEffect(()=> {
        let darkMode = localStorage.getItem("darkMode")
        
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            if (darkMode === null || darkMode === 'enabled') {
                /* User have not manually selected a theme; use system
                 * or
                 * User has dark system theme and is also current */
                document.body.classList.add("darkmode")
                toggleBtn.current.classList.add("enabled")
            } else if (darkMode === 'disabled') {
                // User has dark system theme but wants to use light
                document.body.classList.remove("darkmode")
                toggleBtn.current.classList.remove("enabled")
            }
        } else {
            if (darkMode === null || darkMode === 'disabled') {
                /* User have not manually selected a theme; use system
                 * or
                 * User has white system theme and is also current */
                document.body.classList.remove("darkmode")
                toggleBtn.current.classList.remove("enabled")
            } else if (darkMode === 'enabled') {
                // User has white system theme but wants to use dark
                document.body.classList.add("darkmode")
                toggleBtn.current.classList.add("enabled")
            }
        }
    },[])

    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', event => {
        if (localStorage.getItem("darkMode") === null) {
            if (event.matches) {
                //dark mode
                document.body.classList.add("darkmode")
                toggleBtn.current.classList.add("enabled")
            } else {
                //light mode
                document.body.classList.remove("darkmode")
                toggleBtn.current.classList.remove("enabled")
            }
        }
    })

    return (
        <div className="darkmode-toggle" onClick={toggle}>
            <button ref={toggleBtn}><i className="fas fa-moon"></i><i className="fas fa-sun"></i></button>
        </div>
    )
}