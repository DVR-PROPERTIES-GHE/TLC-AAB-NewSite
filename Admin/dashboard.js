(function () {
    const container = document.getElementById('backend-v2');
    const topnav = document.getElementById('topnav');

    function getCookie(name) {
        const cookies = document.cookie.split("; ");
        for (let c of cookies) {
            const [key, value] = c.split("=");
            if (key === name) return value;
        }
        return null;
    }

    function setSession(username) {
        const expiry = Date.now() + (60 * 60 * 1000);
        const sessionData = btoa(username + "|" + expiry);
        document.cookie = "session=" + sessionData + "; path=/";
    }

    function deleteSession() {
        document.cookie = "session=; path=/; max-age=0";
    }

    function redirectHome() {
        window.location.href = "../index.html";
    }

    const raw = getCookie("session");
    if (!raw) {
        redirectHome();
        return;
    }

    const usernameMap = {
        "DVR": "Developer",
        "TLC-Chad": "Chad",
        "TLC-Terri": "Terri",
        "NewUser": "NewUser"
    };

    function renderDashboard(username) {
        const displayName = usernameMap[username] || username;

        // Minimal view for NewUser
        if (username === "NewUser") {
            topnav.style.display = "none";
            container.innerHTML = `
                <div class="column">
                    <h3>Welcome, ${displayName}</h3>
                    <p>You are logged in.</p>
                    <button class="logout-btn" id="simple-logout">Logout</button>
                </div>
            `;
            document.getElementById("simple-logout").addEventListener("click", () => {
                deleteSession();
                redirectHome();
            });
            return;
        }

        // Full dashboard for all other users
        topnav.style.display = "flex";
        container.innerHTML = `
            <div class="column">
                <h3>Welcome, ${displayName}</h3>
                <p>You are logged in.</p>
                <button class="logout-btn" id="simple-logout">Logout</button>
            </div>
            <div class="column V2_ImagePg">
                <div class="V2_Img usr-btn" data-user="DVR">Dev</div>
                <div class="V2_Img usr-btn" data-user="TLC-Chad">Chad</div>
                <div class="V2_Img usr-btn" data-user="TLC-Terri">Terri</div>
                <div class="V2_Img usr-btn" data-user="NewUser">___</div>
            </div>
            <div class="column postCol">
                <div class="post roundcorner">
                    <iframe class="fb-frame" src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid0t7AXhnEKHcpn5g1bPytMNJn8J9EzBuuE9ox2nUCaXbYyQJchYvBq9bjEsrbiQ4nbl%26id%3D100057787024350&show_text=true&width=500" width="500" height="250" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                </div>
                <div class="post roundcorner">
                    <iframe class="fb-frame" src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid0r99ccxeWEDMgmqWexVghnUiYC587W5qMMHpWWKNewKBqtmWt1km1dTRkJtm2MWK8l%26id%3D100057787024350&show_text=true&width=500" width="500" height="716" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                </div>
            </div>
        `;

        // Logout button
        document.getElementById("simple-logout").addEventListener("click", () => {
            deleteSession();
            redirectHome();
        });

        // User buttons: switch account
        const userBtns = container.querySelectorAll(".usr-btn");
        userBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const newUser = btn.dataset.user;
                setSession(newUser);
                renderDashboard(newUser);
            });
        });
    }

    try {
        const [user, expiry] = atob(raw).split("|");
        if (Date.now() > parseInt(expiry)) {
            deleteSession();
            redirectHome();
            return;
        }
        renderDashboard(user);
    } catch(e) {
        deleteSession();
        redirectHome();
    }

    // Topnav logout button
    document.getElementById("logout-btn").addEventListener("click", () => {
        deleteSession();
        redirectHome();
    });
})();