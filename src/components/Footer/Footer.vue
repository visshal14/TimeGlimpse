<template>
    <div class="footer">
        <div class="footer-content">
            <h2 class="footer-title">Time Glimpse</h2>
            <a href="https://github.com/visshal14" target="_blank" class="github-icon" aria-label="GitHub">
                <img src="../../assets/githublogo.svg" alt="GitHub" />
            </a>
            <div class="footer-links">
                <a href="/privacy-policy" class="footer-link">Privacy Policy</a>
                <a href="/term-of-service" class="footer-link">Terms of Service</a>
                <a href="mailto:vishal.2002.12.29@gmail.com" class="footer-link">Contact Us</a>
            </div>
            <div class="footer-divider"></div>
            <p class="footer-copyright">© 2024 TimeGlimpse. All rights reserved.</p>
        </div>
    </div>
</template>

<script>

</script>

<style scoped>
.footer {
    color: white;
    width: 100%;
    padding-top: 16px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 8px;
    background-color: var(--newTileBackground);
    font-family: 'Gadems', sans-serif;
}

.footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.footer-title {
    font-size: 24px;
    margin-bottom: 8px;
}

.github-icon {
    background-color: var(--contentBackground);
    width: 40px;
    height: 40px;
    display: block;
    border-radius: 50%;
    padding: 8px;
    transition: background-color 0.3s ease;
}

.github-icon img {
    width: 100%;
    height: 100%;
}

.github-icon:hover {
    background-color: var(--newTileBackground);
}

.footer-links {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin: 8px 0;
}

.footer-link {
    color: white;
    font-size: 14px;
    text-decoration: none;
    transition: text-decoration 0.3s;
}

.footer-link:hover {
    text-decoration: underline;
}

.footer-divider {
    width: 100%;
    border-bottom: 2px solid var(--contentBackground);
    margin: 8px 0;
}

.footer-copyright {
    font-family: 'Montserrat', sans-serif;
    color: white;
}
</style>
