(function () {

    function deleteSession() {
        document.cookie = "session=; path=/; max-age=0";
    }

    function redirectHome() {
        window.location.href = "../index.html";
    }

    // Optional: also support a logout button if it exists
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            deleteSession();
            redirectHome();
        });
    }

})();